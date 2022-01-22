import { ERROR_RESPONSES } from "../constants.js"
import chess from "../services/chess.js"
import { getGameImageEmbed } from "../util/chess.js"
import logger from "../util/logger.js"

const usageHelp = `\
!gnome chess *<move>*   -   Makes a move against me in the current channel
!gnome chess moves   -   Displays possible moves
!gnome chess new *[side]* *[force]*   -   Starts a new game in this channel (Admin)`

export default {
  name: "chess",
  desc: "Play chess with gnomebot",
  help: usageHelp,
  /**
   *
   * @param {import('discord.js').CommandInteraction} interaction
   */
  async execute(interaction) {
    if (interaction.options.getSubcommand() === 'move') return handleSubcommandMove(interaction)

    if (interaction.options.getSubcommand() === 'moves') return handleSubcommandMoves(interaction)

    if (interaction.options.getSubcommand() === 'fen') return handleSubcommandFEN(interaction)

    if (interaction.options.getSubcommand() === "new") return handleSubcommandNew(interaction)
  }
}


/**
 * Handles chess subcommand: 'move'
 * @param {import('discord.js').CommandInteraction} interaction
 */
const handleSubcommandMove = async (interaction) => {
  const moveOption = interaction.options.getString('move')
  const result = await chess.handleMove(interaction.channelId, moveOption)

  if (result.error) {
    return interaction.reply({ content: result.errorReply, ephemeral: true })
  }

  const { game, side, reply, move } = result

  const embedOptions = { move: move, reply: reply, side: side }
  const imageEmbed = await getGameImageEmbed(game.fen(), embedOptions)

  return interaction.reply(imageEmbed)
}


/**
 * Handles chess subcommand: 'new'
 * @param {import('discord.js').CommandInteraction} interaction
 */
const handleSubcommandNew = async (interaction) => {
  const sideOption = interaction.options.getString('side')
  const fenOption = interaction.options.getString('fen') || undefined
  const forceCreateOption = interaction.options.getBoolean('force')
  const hasPermission = interaction.member?.permissions.has("ADMINISTRATOR")
  const existingGame = await chess.getGame(interaction.channelId)

  if (existingGame && !existingGame.game_over() && !forceCreateOption) {
    return interaction.reply({ content: 'There is already game in progress in this channel', ephemeral: true })
  }

  if (forceCreateOption && !hasPermission) {
    return interaction.reply({ content: 'You do not have permission to use force option.', ephemeral: true })
  }

  const side = getSide(sideOption)

  const game = await chess.createGame(interaction.channelId, { side: side, fen: fenOption })

  if (!game) {
    return interaction.reply({ content: 'Something went wrong... Unable to create new game.', ephemeral: true })
  }

  const move = game.history({ verbose: true }).at(-1) || {}
  const imageEmbed = await getGameImageEmbed(game.fen(), { reply: 'Created new game.', move: move, side: side })

  return interaction.reply(imageEmbed)
}


const getSide = (sideOption) => {
  if (sideOption === 'random') {
    return Math.random() < 0.5 ? 'w' : 'b'
  }
  return sideOption === 'black' ? 'b' : 'w'
}


/**
 * Handles chess subcommand: 'fen'
 * @param {import('discord.js').CommandInteraction} interaction
 */
const handleSubcommandFEN = async (interaction) => {
  const game = await chess.getGame(interaction.channelId)

  if (!game) {
    return interaction.reply({ content: ERROR_RESPONSES['NO_CHESS_GAME'], ephemeral: true })
  }

  return interaction.reply({ content: `\`${game.fen()}\``, ephemeral: true })
}


/**
 * Handles chess subcommand: 'moves'
 * @param {import('discord.js').CommandInteraction} interaction
 */
const handleSubcommandMoves = async (interaction) => {
  const game = await chess.getGame(interaction.channelId)

  if (!game) {
    return interaction.reply({ content: ERROR_RESPONSES['NO_CHESS_GAME'], ephemeral: true })
  }

  const moves = await game.moves()
  const moveString = moves.map(x => `**${x}**`).join(', ')
  return interaction.reply({ content: `Valid moves are: ${moveString}`, ephemeral: true })
}
