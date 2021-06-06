import Logger from "../util/logger.js"
import { Message, MessageAttachment } from "discord.js"
import { Chess, ChessInstance } from "chess.js"
import ChessImageGenerator from "chess-image-generator"

const logger = new Logger("chess")

const imageGenerator = new ChessImageGenerator()
const game = new Chess()

export default {
  name: "chess",
  desc: "Play chess with gnomebot",
  /**
   *
   * @param {Message} message
   * @param {Array<String>} args
   */
  async execute(message, args) {
    if (args.length == 0) {
      return message.reply('Please specify a move!')
    }

    const move = args[0]

    if (!game.move(move)) {
      return message.reply('Invalid move!')
    }

    if (game.game_over()) {
      return replyWithGameImage(message, game)
    }

    return replyWithGameImage(message, game)
  },
}


/**
 * Sends a reply message containing an image of the current board state
 * @param {Message} message
 * @param {ChessInstance} game
 */
async function replyWithGameImage(message, game) {
  const imageBuffer = await generateImage(game.fen())
  return message.reply('', new MessageAttachment(imageBuffer))
}


/**
 * Generates an image buffer of a particular board state
 * @param {String} fen
 */
async function generateImage(fen) {
  imageGenerator.loadFEN(fen)
  return imageGenerator.generateBuffer()
}