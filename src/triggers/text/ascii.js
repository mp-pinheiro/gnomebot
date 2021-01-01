const { Message } = require('discord.js')
const { ASCII_GNOMES } = require('../../constants/ascii')
const _ = require('lodash')
const logger = require('../../util/logger')

const gnome_regex = /.*g.*n.*o.*m.*e.*/gi

module.exports = {
  name: 'Random Woo',
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
