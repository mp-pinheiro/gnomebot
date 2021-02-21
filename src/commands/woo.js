import logger from "../util/logger.js"
import DiscordUtil from "../util/discord.js"
import { Message } from "discord.js"
import { SOUNDS } from "../constants.js"

const { getUserNameIDString } = DiscordUtil

var random = function (object) {
  var keys = Object.keys(object);
  return object[keys[Math.floor(keys.length * Math.random())]];
};

export default {
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

      var sound = random(SOUNDS);

      DiscordUtil.play_sound(channel, sound)
    } else if (message.member.voice.channel) {
      DiscordUtil.play_sound(message.member.voice.channel, sound)
    } else {
      message.reply("you are not in a voice channel!")
    }
  },
}
