import logger from "../util/logger.js"
import { Message } from "discord.js"

export default {
  name: "source",
  desc: "Replies with my github repository.",
  /**
   *
   * @param {Message} message
   * @param {Array<String>} args
   */
  async execute(message, args) {
    message.channel.send("https://www.github.com/hadley31/gnomebot")
  },
}
