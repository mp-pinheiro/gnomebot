import Logger from "../util/logger.js"
import { Message, MessageAttachment } from "discord.js"
import handleDiscordMessage, { getMoves } from "../services/chess.js"


const logger = new Logger("commands/chess")

const usageHelp = `\
!gnome chess *<move>*   -   Makes a move against me in the current channel
!gnome chess moves   -   Displays possible moves
!gnome chess new *[side]*   -   Starts a new game in this channel (Admin)`

export default {
  name: "chess",
  desc: "Play chess with gnomebot",
  help: usageHelp,
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
