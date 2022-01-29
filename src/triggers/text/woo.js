import { WOO } from "../../constants.js"
import DiscordUtil from "../../utilities/discord.js"

export default {
  name: "Woo",
  desc: `A throwback to the original trigger for woo`,
  /**
   * @param {import('discord.js').Message} message
   */
  async test(message) {
    return message.content === "hello me ol' chum" && message.member?.voice?.channel
  },
  /**
   * @param {import('discord.js').Message} message
   */
  async execute(message) {
    DiscordUtil.playSound(message.member.voice.channel, WOO)
  },
}
