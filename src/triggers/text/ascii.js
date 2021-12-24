import { ASCII_GNOMES } from "../../constants.js"
import _ from "lodash"

const gnome_regex = /.*g.*n.*[o0].*m.*[e3].*/gi

export default {
  name: "ASCII Gnome",
  desc: `Prints a gnome if a message contains g n o m e.`,
  /**
   * @param {import('discord.js').Message} message
   */
  async test(message) {
    return gnome_regex.test(message.content)
  },
  /**
   * @param {import('discord.js').Message} message
   */
  async execute(message) {
    const gnome = _.sample(ASCII_GNOMES)
    message.channel.send(gnome)
  },
}
