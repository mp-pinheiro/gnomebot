import logger from '../util/logger.js'
import { Chess } from 'chess.js'
import { CommandInteraction, MessageAttachment, MessageEmbed } from 'discord.js'
import { generateImage } from '../util/chess.js'
import _ from "lodash"
import { closestMatch } from 'closest-match'

const games = {}


/**
 * Handles a message from discord and replies accordingly
 * @param {CommandInteraction} interaction
 * @param {String} move
 */
export default async function handleDiscordMessage(interaction, move) {
  const { side, game } = await getGameInChannel(interaction.channel.id, { createIfNotExists: true })

  if (!game) {
    return interaction.reply("No game for this channel! Start a new game with `/chess new [side]`")
  }

  const moveFromMessage = game.move(move) // verbose move

  const validMoves = game.moves()

  if (!moveFromMessage) {
    logger.info(`${interaction.member.username} tried to play ${move}, what an idiot lol`)
    const closestMatchingMove = closestMatch(move, validMoves)
    return interaction.reply({
      content: `Invalid move: **${move}**\n*Did you mean*: **${closestMatchingMove}**? Use \`/chess moves\` to see all possible moves.`,
      ephemeral: true
    })
  }

  // If the user's move ended the game
  if (game.game_over()) {
    const fen = game.fen()
    game.reset()
    return replyWithGameImage(interaction, fen, {
      reply: 'You win. Well played!',
      move: moveFromMessage,
      side: side
    })
  }

  // Gnomebot makes a move
  const gnomeStringMove = _.sample(validMoves)
  const gnomeMove = game.move(gnomeStringMove) // verbose move

  // Check if gnomebot wins after moving
  if (game.game_over()) {
    const fen = game.fen()
    game.reset()
    return replyWithGameImage(interaction, fen, {
      reply: `Nice try, but **${gnomeStringMove}** is checkmate. Better luck next time!`,
      move: gnomeMove,
      side: side
    })
  }

  // Game is not over
  return replyWithGameImage(interaction, game.fen(), {
    reply: `Nice move! My move is **${gnomeStringMove}**.`,
    move: gnomeMove,
    side: side
  })
}


/**
 *
 * @param {String} channelId 
 * @returns {Array<String>}
 */
export async function getMoves(channelId) {
  return (await getGameInChannel(channelId, { createIfNotExists: true })).game.moves()
}


/**
 * 
 * @param {String} channelId
 * @returns {Boolean}
 */
export async function gameExistsInChannel(channelId) {
  return games[channelId]?.game && !games[channelId]?.game?.game_over()
}


/**
 * 
 * @param {String} channelId 
 * @returns
 */
export async function getGameInChannel(channelId, { createIfNotExists = false } = {}) {
  if (!(channelId in games) && createIfNotExists) {
    games[channelId] = await newGameInChannel(channelId)
  }
  return games[channelId]
}


/**
 * 
 * @param {string} channelId
 * @param {object} options
 * @param {string} options.side
 * @param {string} options.fen
 * @returns {}
 */
export async function newGameInChannel(channelId, { side = 'w', fen } = {}) {
  const game = new Chess(fen)

  if (side === 'b') {
    game.move('e4')
  }

  games[channelId] = {
    side: side,
    game: game
  }

  return games[channelId]
}


/**
 * Sends a reply message containing an image of the current board state
 * @param {CommandInteraction} interaction
 * @param {String} fen
 * @param {Object} options
 * @param {Move} options.move
 * @param {String} options.reply
 * @param {String} options.side
 */
export async function replyWithGameImage(interaction, fen, { move = {}, reply = '', side = 'w' } = {}) {
  const imageBuffer = await generateImage(fen, {
    move: { [move.from]: true, [move.to]: true, },
    flipped: side === 'b'
  })
  const imageAttachment = new MessageAttachment(imageBuffer, 'chess.png')
  const imageEmbed = new MessageEmbed()
    .setTitle('Chess Game')
    .setDescription(reply)
    .setImage('attachment://chess.png')
  return interaction.reply({
    embeds: [imageEmbed],
    files: [
      imageAttachment
    ]
  })
}
