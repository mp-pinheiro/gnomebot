import Logger from '../util/logger.js'
import { Chess } from 'chess.js'
import { CommandInteraction, MessageAttachment, MessageEmbed } from 'discord.js'
import ChessImageGenerator from "chess-image-generator"
import _ from "lodash"
import { closestMatch } from 'closest-match'

const logger = new Logger('services/chess')

const imageOptions = {
  'size': 512,
  'style': 'cburnett'
}

const imageGenerator = new ChessImageGenerator(imageOptions)
const games = {}


/**
 * Handles a message from discord and replies accordingly
 * @param {CommandInteraction} interaction
 * @param {String} move
 */
export default function handleDiscordMessage(interaction, move) {
  const { side, game } = getGameInChannel(interaction.channel.id)

  if (!game) {
    return interaction.reply("No game for this channel! Start a new game with `/chess new [side]`")
  }

  const moveFromMessage = game.move(move) // verbose move

  const validMoves = game.moves()

  if (!moveFromMessage) {
    logger.log(`${interaction.member.username} tried to play ${move}, what an idiot lol`)
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
 * @param {string} channelID 
 * @returns {Array<String>}
 */
export function getMoves(channelID) {
  return getGameInChannel(channelID).game.moves()
}

/**
 * 
 * @param {import('discord.js').Channel} channelID 
 * @returns
 */
export function getGameInChannel(channelID) {
  if (!(channelID in games)) {
    games[channelID] = { side: 'w', game: new Chess() }
  }
  return games[channelID]
}


/**
 * 
 * @param {string} channelID
 * @param {object} options
 * @param {string} options.side
 * @param {string} options.fen
 * @returns {import('chess.js').ChessInstance}
 */
export function newGameInChannel(channelID, { side, fen, force = false }) {
  const currentGame = getGameInChannel(channelID)
  if (currentGame?.game && !currentGame.game.game_over() && !force) {
    return false
  }

  side ||= 'w'
  const game = new Chess(fen)

  if (side === 'b') {
    game.move('e4')
  }

  games[channelID] = {
    side: side,
    game: game
  }

  return games[channelID]
}



/**
 * Sends a reply message containing an image of the current board state
 * @param {CommandInteraction} interaction
 * @param {String} fen
 * @param {Move} move
 * @param {String} reply
 */
export async function replyWithGameImage(interaction, fen, { move = {}, reply = '', side = 'w' }) {
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


/**
 * Generates an image buffer of a particular board state
 * @param {String} fen
 */
export async function generateImage(fen, { move = {}, flipped = false }) {
  imageGenerator.setHighlightedSquares(move)
  imageGenerator.flipped = flipped
  imageGenerator.loadFEN(fen)
  return imageGenerator.generateBuffer()
}
