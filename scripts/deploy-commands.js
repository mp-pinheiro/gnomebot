import { SlashCommandBuilder } from '@discordjs/builders'
import { REST } from '@discordjs/rest'
import { ChannelType, Routes } from 'discord-api-types/v9'
import dotenv from 'dotenv'

dotenv.config()

const { CLIENT_ID, DISCORD_AUTH_TOKEN, GUILD_ID } = process.env


const commands = [
  new SlashCommandBuilder()
    .setName('chess')
    .setDescription('Play chess against gnomebot!')
    // Command: /chess move
    .addSubcommand(subcommand =>
      subcommand
        .setName('move')
        .setDescription('Make a move')
        // Command: /chess move [san]
        .addStringOption(option =>
          option
            .setName('move')
            .setDescription('The move to make')
            .setRequired(true)
        )
    )
    .addSubcommand(subcommand =>
      subcommand
        .setName('moves')
        .setDescription('Lists possible moves for the current game in this channel')
    )
    .addSubcommand(subcommand =>
      subcommand
        .setName('new')
        .setDescription('Creates a new game in this channel')
        .addStringOption(option =>
          option
            .setName('side')
            .setDescription('Sets the side guild members play as.')
            .addChoice('white', 'white')
            .addChoice('black', 'black')
            .addChoice('random', 'random')
        )
        .addStringOption(option =>
          option
            .setName('fen')
            .setDescription('Sets the starting fen position')
            .setRequired(false)
        )
        .addBooleanOption(option =>
          option
            .setName('force')
            .setDescription('Administrators can use this option to force re-create games')
        )
    ),
  new SlashCommandBuilder()
    .setName('power')
    .setDescription('Plays GNOME POWER in your voice chat!')
    .addSubcommand(subcommand =>
      subcommand
        .setName('stop')
        .setDescription('Stops the song')
    )
    .addSubcommand(subcommand =>
      subcommand
        .setName('play')
        .setDescription('Plays GNOME POWER in a voice channel')
        .addChannelOption(channel =>
          channel
            .setName('channel')
            .setDescription('Join this voice channel')
            .addChannelType(ChannelType.GuildVoice)
        )
        .addUserOption(user =>
          user
            .setName('user')
            .setDescription('Join this user\'s voice channel')
        )
    ),
  new SlashCommandBuilder()
    .setName('woo')
    .setDescription('Plays woo sound in your voice chat!')
    .addChannelOption(channel =>
      channel
        .setName('channel')
        .setDescription('Join this voice channel')
        .addChannelType(ChannelType.GuildVoice)
    )
    .addUserOption(user =>
      user
        .setName('user')
        .setDescription('Join this user\'s voice channel')
    ),
  new SlashCommandBuilder()
    .setName('ascii')
    .setDescription('Prints an ASCII gnome to the chat'),
  new SlashCommandBuilder()
    .setName('source')
    .setDescription('Replies with the source repository of gnomebot'),
  new SlashCommandBuilder()
    .setName('monki')
    .setDescription('Plays hmm monki sound in your voice chat!')
    .addChannelOption(channel =>
      channel
        .setName('channel')
        .setDescription('Join this voice channel')
        .addChannelType(ChannelType.GuildVoice)
    )
    .addUserOption(user =>
      user
        .setName('user')
        .setDescription('Join this user\'s voice channel')
    ),
  new SlashCommandBuilder()
    .setName('quote')
    .setDescription('Adds, displays and lists quotes created by users'),
    .addStringOption(option =>
      option
        .setName('operation')
        .setDescription('Operation to be executed')
        .setRequired(true)
    )
    .addStringOption(option =>
      option
        .setName('quote')
        .setDescription('Quote')
        .setRequired(false)
    )
    .addIntegerOption(option =>
      option
        .setName('index')
        .setDescription('Index of a quote')
        .setRequired(false)
    )
  new SlashCommandBuilder()
    .setName('bill')
    .setDescription('Plays a Bill Wurtz song in your voice channel')
    .addStringOption(option =>
      option
        .setName('title')
        .setDescription('The title of the song to play')
        .setRequired(true)
    )
    .addIntegerOption(option =>
      option
        .setName('volume')
        .setDescription('Volume to use: 0-100')
        .setRequired(false)
    ),
].map(command => command.toJSON())

console.log('Deploying the following commands:')
console.table(commands, ['name', 'description'])

const rest = new REST({ version: '9' }).setToken(DISCORD_AUTH_TOKEN)

rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), { body: commands })
  .then(() => console.log('Successfully registered application commands.'))
  .catch(console.error)
