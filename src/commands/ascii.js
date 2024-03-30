import logger from "../utilities/logger.js"
import { ASCII_GNOMES } from "../constants.js"
import _ from "lodash"

export default {
  name: "ascii",
  desc: "Prints a random ascii gnome to the chat.",
  /**
   *
   * @param {import('discord.js').CommandInteraction} interaction
   */
  async execute(interaction) {
    try {
      const gnome = _.sample(ASCII_GNOMES)
      interaction.reply(gnome)
    } catch (err) {
      logger.info("An error occured in ascii command")
    }
  },
}
