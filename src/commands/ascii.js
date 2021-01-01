const logger = require('../util/logger')
const { Message } = require('discord.js')
const { ASCII_GNOMES } = require('../constants/ascii')
const _ = require('lodash')

module.exports = {
  name: 'ascii',
  desc: 'Prints a random ascii gnome to the chat.',
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
      logger.log('An error occured in ascii command')
    }
  },
}
