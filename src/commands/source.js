export default {
  name: "source",
  desc: "Replies with my github repository.",
  /**
   *
   * @param {import('discord.js').CommandInteraction} interaction
   */
  async execute(interaction) {
    interaction.reply("[](https://www.github.com/hadley31/gnomebot)")
  },
}
