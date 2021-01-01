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
    if (args.length > 0) {
      const channel_id = args[0]

      if (!message.member.permissions.has("ADMINISTRATOR")) {
        logger.log(
          `${getUserNameIDString(message.author)} is not an administrator.`
        )
        return
      }

      let channel = await message.client.channels.fetch(channel_id)

      play_sound(channel, WOO)
    } else if (message.member.voice.channel) {
      play_sound(message.member.voice.channel, WOO)
    } else {
      message.reply("you are not in a voice channel!")
    }
  },
}
