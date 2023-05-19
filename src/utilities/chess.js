import ChessImageGenerator from "chess-image-generator"
import { CommandInteraction, MessageAttachment, MessageEmbed } from 'discord.js'

const imageOptions = {
  'size': 512,
  'style': 'cburnett'
}

const imageGenerator = new ChessImageGenerator(imageOptions)

/**
 * Generates an image buffer of a particular board state
 * @param {String} fen
 */
export async function generateImage(fen, { move = {}, flipped = false } = {}) {
  imageGenerator.setHighlightedSquares(move)
  imageGenerator.flipped = flipped
  imageGenerator.loadFEN(fen)
  return imageGenerator.generateBuffer()
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
export const getGameImageEmbed = async (fen, { move = {}, reply = '', side = 'w' } = {}) => {
  const imageBuffer = await generateImage(fen, {
    move: { [move.from]: true, [move.to]: true, },
    flipped: side === 'b'
  })
  const imageAttachment = new MessageAttachment(imageBuffer, 'chess.png')
  const imageEmbed = new MessageEmbed()
    .setTitle('Chess Game')
    .setDescription(reply)
    .setImage('attachment://chess.png')
  return {
    embeds: [imageEmbed],
    files: [
      imageAttachment
    ]
  }
}
