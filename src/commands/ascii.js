import Logger from "../util/logger.js"
import { Message } from "discord.js"
import { ASCII_GNOMES } from "../constants.js"
import _ from "lodash"

const logger = new Logger('ascii')

export default {
  name: "ascii",
  desc: "Prints a random ascii gnome to the chat.",
  /**
   *
   * @param {Message} message
   * @param {Array<String>} args
   */
  async execute(message, args) {
    try {
      const gnome = _.sample(ASCII_GNOMES)
      message.channel.send(gnome)
    } catch (err) {
      logger.log("An error occured in ascii command")
    }
  },
}
