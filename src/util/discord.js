import Logger from "./logger.js"
import fs from "fs"
import Discord from "discord.js"

const logger = new Logger("util/discord")

export default class DiscordUtil {
  /**
   *
   * @param {Discord.User} user
   */
  static getUserNameIDString(user) {
    return `${user.username} (${user.id})`
  }

  /**
   *
   * @param {Discord.Channel} channel
   */
  static getChannelNameIDString(channel) {
    return `${channel.name} (${channel.id})`
  }

  /**
   *
   * @param {Discord.Message} message
   */
  static logMessage(message) {
    let userString = DiscordUtil.getUserNameIDString(message.author)
    let server = message.guild
      ? `${message.guild.name} (${message.guild.id})`
      : "none"
    let channel =
      server === "none"
        ? message.channel.id
        : DiscordUtil.getChannelNameIDString(message.channel)
    logger.log(
      `Message (${message.id}):\n\tUser: ${userString}\n\tServer: ${server}\n\tChannel: ${channel}\n\tContent: ${message.content}`
    )
  }

  /**
   *
   * @param {Discord.VoiceChannel} channel
   * @param {String} file_path
   */
  static async play_sound(channel, file_path) {
    if (channel === undefined) {
      logger.log("Channel undefined!")
      return
    }

    const channelString = DiscordUtil.getChannelNameIDString(channel)

    if (file_path === undefined) {
      logger.error("No file path specified!!")
      return
    }

    try {
      const connection = await channel.join()
      logger.log(`\nJoined voice channel: ${channelString}`)
      const dispatcher = connection.play(fs.createReadStream(file_path), {
        highWaterMark: 1,
      })

      dispatcher.on("start", () => {
        logger.log(`Started voice in ${channelString}.`)
        connection.player.streamingData.pausedTime = 0
      })

      dispatcher.on("finish", () => {
        logger.log(`Finished voice in ${channelString}.`)
        dispatcher.destroy()
        connection.disconnect()
      })

      dispatcher.on("error", (e) => {
        logger.log(
          `An error occured while playing a sound in ${channelString}.`
        )
        dispatcher.destroy()
        connection.disconnect()
      })
      connection.on("disconnect", (err) => {
        dispatcher.destroy()
      })
    } catch (err) {
      logger.log(`An error occured while joining ${channelString}`)
      logger.log(err)
    }
  }
}
