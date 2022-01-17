import { Chess } from 'chess.js'
import { closestMatch } from 'closest-match'
import _ from "lodash"
import { ERROR_RESPONSES } from '../constants.js'
import logger from '../util/logger.js'
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
   * @param {String} channelId The current Discord text channel
   * @param {String} userMove The Discord user's move
   */
  async handleMove(channelId, userMove) {
    logger.debug(`Handling ${userMove} in ${channelId}`)
    const game = await this.getGame(channelId, { createIfNotExists: true })
    const side = game.turn()

    if (game.game_over()) {
      return {
        error: true,
        errorReply: ERROR_RESPONSES['NO_CHESS_GAME']
      }
    }

    // Attempt to make player's move
    const move = game.move(userMove)

    const possibleMoves = game.moves()

    if (!move) {
      const closestMatchingMove = closestMatch(userMove, possibleMoves)
      return {
        error: true,
        errorReply: `Invalid move: **${userMove}**\n*Did you mean*: **${closestMatchingMove}**? Use \`/chess moves\` to see all possible moves.`,
      }
    }

    // Update Game in Store
    logger.debug('Storing new chess game state...')
    this.store.updateGame(channelId, game)

    // If the user's move ended the game
    if (game.game_over()) {
      return {
        reply: 'You win. Well played!',
        game: game,
        side: side,
        move: move
      }
    }

    // Gnomebot makes a move
    const gnomeStringMove = this.generateMove(game)
    const gnomeMove = game.move(gnomeStringMove) // verbose move
    logger.debug(`Making move in ${channelId}: ${gnomeStringMove}`)

    // Update Game in Store
    logger.debug('Storing new chess game state...')
    this.store.updateGame(channelId, game)

    // Check if gnomebot wins after moving
    if (game.in_checkmate()) {
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
   * @returns {Promise<import('chess.js').ChessInstance>}
   */
  async createGame(channelId, { side = 'w', fen } = {}) {
    logger.info(`Creating new chess game for channel: ${channelId}`)
    const game = new Chess(fen)

    if (side === 'b') {
      game.move('e4')
    }

    logger.info('Storing chess game state...')
    await this.store.updateGame(channelId, game)

    return game
  }

  /**
   * 
   * @param {String} channelId 
   * @param {Object} options 
   * @param {Boolean} options.createIfNotExists 
   * @returns {Promise<import('chess.js').ChessInstance?>}
   */
  async getGame(channelId, { createIfNotExists = false } = {}) {
    logger.info(`Getting chess game for channel: ${channelId}`)
    const game = await this.store.getGame(channelId)

    if (!game && createIfNotExists) {
      logger.info(`No existing chess game found in channel: ${channelId}`)
      return this.createGame(channelId)
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
 * @param {import('chess.js').ChessInstance} game 
 */
const randomMove = (game) => _.sample(game.moves())

const service = new ChessService({ store: gameStore, moveGenerator: randomMove })

export default service
