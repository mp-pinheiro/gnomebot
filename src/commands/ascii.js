import Logger from "../util/logger.js"
import { ASCII_GNOMES } from "../constants.js"
import _ from "lodash"

const logger = new Logger('ascii')

export default {
  name: "ascii",
  desc: "Prints a random ascii gnome to the chat.",
  /**
   *
   * @param {import('discord.js').MessageInteraction} interaction
   */
  async execute(interaction) {
    try {
      const gnome = _.sample(ASCII_GNOMES)
      interaction.reply(gnome)
    } catch (err) {
      logger.log("An error occured in ascii command")
    }
  },
}
