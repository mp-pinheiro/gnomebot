const logger = require('../util/logger')
const { Message } = require('discord.js')

module.exports = {
  name: 'help',
  desc: 'Displays all commands and their descriptions.',
  /**
   * @param {Message} message
   * @param {Array<String>} args
   */
  async execute(message, args) {
    const m = message.client.commands
      .mapValues((x) => `**${x.name}** - ${x.desc}`)
      .array()
      .join('\n')
    message.reply(`here are my commands:\n${m}`)
  },
}
