const logger = require("../util/logger")
const { Message } = require("discord.js")
const { GNOME_POWER } = require("../constants/sound_files")
const { play_sound } = require("../util/discord")
const DiscordUtil = require("../util/discord")

module.exports = {
  name: "power",
  desc: "Plays GNOME POWER in your voice chat.",
  /**
   *
   * @param {Message} message
   * @param {Array<String>} args
   */
  async execute(message, args) {
    if (args.length > 0 && args[0].toLowerCase() == "stop") {
      message.guild?.voice?.channel?.leave()
      return
    }
    if (message.member.voice.channel) {
      play_sound(message.member.voice.channel, GNOME_POWER)
    } else {
      message.reply("you are not in a voice channel!")
    }
  },
}
