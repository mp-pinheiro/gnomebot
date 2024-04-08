import { GNOME_SOUND } from "../../constants.js"
import DiscordUtil from "../../utilities/discord.js"

export default {
  name: "Random Gnome",
  desc: `A throwback to the original trigger for gnome`,
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
    DiscordUtil.playSound(message.member.voice.channel, GNOME_SOUND)
  },
}
