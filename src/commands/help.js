import logger from '../util/logger.js'
import { Message } from 'discord.js'

export default {
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
