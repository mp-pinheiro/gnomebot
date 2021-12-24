import _ from "lodash"
import handleDiscordMessage, { getMoves } from "../../services/chess.js"

export default {
  name: "Chess",
  desc: `Makes a chess move if it is valid algebraic notation`,
  /**
   * @param {import('discord.js').Message} message
   */
  async test(message) {
    const moves = await getMoves(message.channel.id) || []
    return moves.includes(message.content)
  },
  
  /**
   * @param {import('discord.js').Message} message
   */
  async execute(message) {
    return handleDiscordMessage(message, message.content)
  },
}
