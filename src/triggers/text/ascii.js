import { Message } from "discord.js"
import { ASCII_GNOMES } from "../../constants.js"
import _ from "lodash"

const gnome_regex = /.*g.*n.*o.*m.*e.*/gi

export default {
  name: "Random Woo",
  desc: `Prints a gnome if a message contains 'gnome'.`,
  /**
   * @param {Message} message
   */
  async test(message) {
    return gnome_regex.test(message.content)
  },
  /**
   * @param {Message} message
   */
  async execute(message) {
    const gnome = _.sample(ASCII_GNOMES)
    message.channel.send(gnome)
  },
}
