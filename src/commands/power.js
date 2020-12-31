const logger = require('../util/logger')
const { Message } = require('discord.js')

module.exports = {
  name: 'power',
  desc: 'Plays GNOME POWER in your voice chat.',
  /**
   *
   * @param {Message} message
   * @param {Array<String>} args
   */
  async execute(message, args) {
    try {
      let gnome = ascii_gnomes[Math.floor(Math.random() * ascii_gnomes.length)]
      message.channel.send(gnome)
    } catch (err) {
      logger.log('An error occured in ascii command')
    }
  },
}
