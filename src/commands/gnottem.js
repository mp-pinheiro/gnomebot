const logger = require("../util/logger")
const { play_sound, getUserNameIDString } = require("../util/discord")
const { Message } = require("discord.js")
const { WOO } = require("../constants/sound_files")

module.exports = {
  name: "gnottem",
  desc: `Proxy 'woo' command [Must be Admin]`,
  /**
   *
   * @param {Message} message
   * @param {Array<String>} args
   */
  async execute(message, args) {
    try {
      const channel_id = args[0]

      if (!message.member.permissions.has("ADMINISTRATOR")) {
        console.log(
          `${getUserNameIDString(message.author)} is not an administrator.`
        )

        return
      }

      let channel = await message.client.channels.fetch(channel_id)

      await play_sound(channel, WOO)
    } catch (err) {
      logger.log("An error occured in gnottem")
      console.log(err)
    }
  },
}
