import Logger from "../util/logger.js"
import { Message, MessageAttachment } from "discord.js"
import handleDiscordMessage, { getMoves } from "../services/chess.js"
import { HELP_CHESS } from "../constants.js"


const logger = new Logger("commands/chess")

export default {
  name: "chess",
  desc: "Play chess with gnomebot",
  help: HELP_CHESS,
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
      const moves = getMoves(message.channel.id).join(', ')
      return message.reply(`valid moves are: ${moves}`)
    }

    const move = args[0]

    return handleDiscordMessage(message, move)
  },
}
