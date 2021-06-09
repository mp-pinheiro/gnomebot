import Logger from '../util/logger.js'
import { Message } from 'discord.js'

const logger = new Logger("help")

const usageHelp = `\
!gnome help   -   Displays all available commands and their descriptions
!gnome help *<command>*   -   Displays usage for a specific command`

export default {
  name: 'help',
  desc: 'Displays help for all or specific commands.',
  help: usageHelp,
  /**
   * @param {Message} message
   * @param {Array<String>} args
   */
  async execute(message, args) {
    if (args.length == 0) {
      const m = message.client.commands
        .mapValues((x) => `**${x.name}** - ${x.desc}`)
        .array()
        .join('\n')
      return message.reply(`here are my commands:\n${m}`)
    }

    const c = args[0]

    const command = message.client.commands.find(x => x.name.toLowerCase() == c.toLowerCase())

    if (!command) {
      return message.reply(`Couldn't resolve command: ${c}`)
    }

    if ('help' in command) {
      return message.reply(`\n${command.help}`)
    }
    else{
      return message.reply('that command does not have a detailed help description.')
    }
  },
}
