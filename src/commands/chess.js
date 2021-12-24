import handleDiscordMessage, { gameExistsInChannel, getMoves, newGameInChannel, replyWithGameImage } from "../services/chess.js"


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
    if (interaction.options.getSubcommand() === 'move') {
      const move = interaction.options.getString('move')
      return handleDiscordMessage(interaction, move)
    }

    if (interaction.options.getSubcommand() === 'moves') {
      const moves = await getMoves(interaction.channel.id) || []
      const moveString = moves.map(x => `**${x}**`).join(', ')
      return interaction.reply({ content: `Valid moves are: ${moveString}`, ephemeral: true })
    }

    if (interaction.options.getSubcommand() == "new") {
      const sideOption = interaction.options.getString('side')
      const forceCreateOption = interaction.options.getBoolean('force')
      const hasPermission = interaction.member?.permissions.has("ADMINISTRATOR")
      const gameExists = gameExistsInChannel(interaction.channelId)

      if (gameExists && !forceCreateOption) {
        return interaction.reply({ content: 'There is already game in progress in this channel', ephemeral: true })
      }

      if (forceCreateOption && !hasPermission) {
        return interaction.reply({ content: 'You do not have permission to use force option.', ephemeral: true })
      }

      const side = sideOption === "black" ? "b" : "w"

      const result = await newGameInChannel(interaction.channel.id, { side: side })

      if (!result) {
        return interaction.reply({ content: 'Something went wrong... Unable to create new game.', ephemeral: true })
      }

      const { _, game } = result

      const move = game.history({ verbose: true }).at(-1) || {}

      return replyWithGameImage(interaction, game.fen(), { reply: 'Created new game.', move: move, side: side })
    }
  },
}
