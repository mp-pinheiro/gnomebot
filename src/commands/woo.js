const logger = require("../util/logger")
const { play_sound } = require("../util/discord")
const { Message } = require("discord.js")
const { WOO } = require("../constants/sound_files")

module.exports = {
  name: "woo",
  desc: "Gnomebot will join your channel and deliver a woo.",
  /**
   * @param {Message} message
   * @param {Array<String>} args
   */
  async execute(message, args) {
    if (message.member.voice.channel) {
      play_sound(message.member.voice.channel, WOO)
    } else {
      message.reply("you are not in a voice channel!")
    }
  },
}
