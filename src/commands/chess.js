import Logger from "../util/logger.js"
import { Message, MessageAttachment } from "discord.js"
import handleDiscordMessage, { game } from "../services/chess.js"


const logger = new Logger("commands/chess")

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

    if (args[0] == "moves") {
      const moves = game.moves().join(', ')
      return message.reply(`valid moves are: ${moves}`)
    }

    const move = args[0]

    return handleDiscordMessage(message, move)
  },
}
