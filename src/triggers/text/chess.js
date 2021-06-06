import { Message } from "discord.js"
import _ from "lodash"
import handleDiscordMessage, { getMoves } from "../../services/chess.js"

export default {
  name: "Chess",
  desc: `Makes a chess move if it is valid algebraic notation`,
  /**
   * @param {Message} message
   */
  async test(message) {
    return getMoves(message.channel.id).includes(message.content)
  },
  
  /**
   * @param {Message} message
   */
  async execute(message) {
    return handleDiscordMessage(message, message.content)
  },
}
