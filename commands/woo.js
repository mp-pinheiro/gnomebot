const logger = require('../util/logger')
const { woo } = require('../util/discord')
const { Message } = require('discord.js')

module.exports = {
  name: 'woo',
  desc: 'Gnomebot will join your channel and deliver a woo.',
  /**
   * @param {Message} message
   * @param {Array<String>} args
   */
  async execute(message, args) {
    if (message.member.voice.channel) {
      woo(message.member.voice.channel)
    } else {
      message.reply('you are not in a voice channel!')
    }
  },
}
