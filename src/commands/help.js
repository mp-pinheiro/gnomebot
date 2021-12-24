import Logger from '../util/logger.js'

const logger = new Logger("help")

const usageHelp = `\
!gnome help   -   Displays all available commands and their descriptions
!gnome help *<command>*   -   Displays usage for a specific command`

export default {
  name: 'help',
  desc: 'Displays help for all or specific commands.',
  help: usageHelp,
  /**
   * @param {import('discord.js').CommandInteraction} interaction
   */
  async execute(interaction) {
    const commandName = interaction.options.getString('command')
    if (!commandName) {
      const m = interaction.client.commands
        .mapValues((x) => `**${x.name}** - ${x.desc}`)
        .array()
        .join('\n')
      return interaction.reply(`here are my commands:\n${m}`)
    }

    const command = interaction.client.commands.find(x => x.name.toLowerCase() == commandName.toLowerCase())

    if (!command) {
      return interaction.reply(`Couldn't resolve command: ${commandName}`)
    }

    if ('help' in command) {
      return interaction.reply(`\n${command.help}`)
    }
    else {
      return interaction.reply('That command does not have a detailed help description.')
    }
  },
}
