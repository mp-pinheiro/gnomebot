import { Chess } from 'chess.js'
import { closestMatch } from 'closest-match'
import _ from "lodash"
import { ERROR_RESPONSES } from '../constants.js'
import logger from '../utilities/logger.js'
import { RedisGameStore, SimpleGameStore } from './ChessGameStore.js'


class ChessService {
  /**
   * 
   * @param {Object} options
   * @param {import('./ChessGameStore.js').ChessGameStore} options.store
   */
  constructor({ store, moveGenerator } = {}) {
    this.store = store
    this.moveGenerator = moveGenerator
  }

  generateMove(game) {
    return this.moveGenerator(game)
  }

  /**
   * 
   * @param {import('discord.js').Channel} channel The current Discord text channel
   * @param {import('discord.js').User} user The current Discord text channel
   * @param {String} userMove The Discord user's move
   */
  async handleMove(channel, user, userMove) {
    logger.debug(`Handling ${userMove} by ${user} in ${channel.id}`)
    const game = await this.getGame(channel, { createIfNotExists: true })
    const side = game.turn()

    if (game.isGameOver()) {
      return {
        error: true,
        errorReply: ERROR_RESPONSES['NO_CHESS_GAME']
      }
    }

    if (user.id != this.getUserBySide(game, side)) {
      return {
        error: true,
        errorReply: ERROR_RESPONSES['NOT_YOUR_TURN'],
      }
    }

    // Attempt to make player's move
    let move;
    try {
      move = game.move(userMove)
    } catch (err) {
      const possibleMoves = game.moves()
      const closestMatchingMove = closestMatch(userMove, possibleMoves)
      return {
        error: true,
        errorReply: `Invalid move: **${userMove}**\n*Did you mean*: **${closestMatchingMove}**? Use \`/chess moves\` to see all possible moves.`,
      }
    }

    // If the user's move ended the game
    if (game.isCheckmate()) {
      // Update Game in Store
      logger.debug('Storing new chess game state...')
      this.store.updateGame(channel.id, game)

      return {
        reply: 'You win. Well played!',
        game: game,
        side: side,
        move: move
      }
    } else if (game.isGameOver()) {
      return {
        reply: 'It\'s a draw!',
        game: game,
        side: side,
        move: move
      }
    }

    if (!this.isBotGame(game, channel)) {
      this.store.updateGame(channel.id, game)
      const otherUserSide = side == 'w' ? 'b' : 'w';
      const otherUserId = this.getUserBySide(game, otherUserSide)
      logger.debug(`Other user: ${otherUserId}`)
      logger.debug(channel.client.users)
      const otherUser = await channel.client.users.fetch(otherUserId)
      return {
        reply: `${user} made the move: **${userMove}**. Your move, ${otherUser}!`,
        game: game,
        side: otherUserSide,
        move: move
      }
    }

    // Gnomebot makes a move
    const gnomeStringMove = this.generateMove(game)
    const gnomeMove = game.move(gnomeStringMove) // verbose move
    logger.debug(`Gnomebot making move in ${channel}: ${gnomeStringMove}`)

    // Update Game in Store
    logger.debug('Storing new chess game state...')
    this.store.updateGame(channel.id, game)

    // Check if gnomebot wins after moving
    if (game.isCheckmate()) {
      return {
        reply: `Nice try, but **${gnomeStringMove}** is checkmate. Better luck next time!`,
        game: game,
        side: side,
        move: gnomeMove
      }
    }

    // Game is not over
    return {
      reply: `Nice move! My move is **${gnomeStringMove}**.`,
      game: game,
      side: side,
      move: gnomeMove
    }
  }

  /**
   * Creates a chess game in a given channel
   * @param {String} channelId
   * @param {Object} options
   * @param {String} options.side
   * @param {String} options.fen
   * @returns {Promise<import('chess.js').Chess>}
   */
  async createGame(channelId, { side = 'w', fen, whiteUserId, blackUserId } = {}) {
    logger.info(`Creating new chess game for channel: ${channelId}`)
    const game = new Chess(fen)

    game.header('White', whiteUserId)
    game.header('Black', blackUserId)

    if (game.turn() != side) {
      const move = this.generateMove(game)

      logger.info(`Starting fen turn does not match desired side, making initial move: ${move}`)

      game.move(move)
    }

    logger.info(`Storing chess game state for channel: ${channelId}`)
    await this.store.updateGame(channelId, game)

    return game
  }

  isBotGame(game, channel) {
    const botId = channel.client.user.id
    return game.header().White == botId || game.header().Black == botId
  }

  getUserBySide(game, side) {
    const color = side == 'w' ? 'White' : 'Black'
    return game.header()[color]
  }

  /**
   * 
   * @param {import('discord.js').Channel} channel
   * @param {Object} options 
   * @param {Boolean} options.createIfNotExists 
   * @returns {Promise<import('chess.js').Chess?>}
   */
  async getGame(channel, { createIfNotExists = false } = {}) {
    logger.debug(`Getting chess game for channel: ${channel.id}`)
    const game = await this.store.getGame(channel.id)

    if (!game && createIfNotExists) {
      logger.info(`No existing chess game found in channel: ${channel.id}`)
      return this.createGame(channel.id, { whiteUserId: null, blackUserId: channel.client.user.id })
    }

    return game
  }

  async clearGame(channelId) {
    this.store.updateGame(channelId, null)
  }
}


const { REDIS_HOST } = process.env
const gameStore = REDIS_HOST ? new RedisGameStore(REDIS_HOST) : new SimpleGameStore()

if (gameStore instanceof RedisGameStore) {
  logger.info('Using redis-enabled chess game store')
}

/**
 * Generates a random move based on a given board position
 * @param {import('chess.js').Chess} game 
 */
const randomMove = (game) => _.sample(game.moves())

const service = new ChessService({ store: gameStore, moveGenerator: randomMove })

export default service
