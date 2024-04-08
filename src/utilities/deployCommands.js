import { SlashCommandBuilder } from '@discordjs/builders'
import { REST } from '@discordjs/rest'
import { Routes } from 'discord-api-types/v10'
import dotenv from 'dotenv'

dotenv.config()

const { CLIENT_ID, GUILD_ID, DISCORD_AUTH_TOKEN } = process.env

/**
 * 
 * @param {SlashCommandBuilder[]} commands 
 */
export default function deployCommands(commandBuilders) {
  const commands = commandBuilders.map(command => command.toJSON())

  console.log('Deploying the following commands:')
  console.table(commands, ['name', 'description'])

  const rest = new REST({ version: '10' }).setToken(DISCORD_AUTH_TOKEN)

  if (process.env.NODE_ENV === 'production') {
    rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands })
      .then(() => console.log('Successfully registered application commands.'))
      .catch(console.error)
  } else if (process.env.NODE_ENV === 'development') {
    rest.put(Routes.applicationCommands(CLIENT_ID, GUILD_ID), { body: commands })
      .then(() => console.log('Successfully registered guild commands.'))
      .catch(console.error)
  }
}
