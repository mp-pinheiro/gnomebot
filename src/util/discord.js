const logger = require("./logger")
const fs = require("fs")
const discord = require("discord.js")

let playing = false

class DiscordUtil {
  /**
   *
   * @param {discord.User} user
   */
  static getUserNameIDString(user) {
    return `${user.username} (${user.id})`
  }

  /**
   *
   * @param {discord.Channel} channel
   */
  static getChannelNameIDString(channel) {
    return `${channel.name} (${channel.id})`
  }

  static logMessage(message) {
    let user = DiscordUtil.getUserNameIDString(message.author)
    let server = message.guild
      ? `${message.guild.name} (${message.guild.id})`
      : "none"
    let channel =
      server === "none"
        ? message.channel.id
        : DiscordUtil.getChannelNameIDString(message.channel)
    logger.log(
      `Message (${message.id}):\n\tUser: ${user}\n\tServer: ${server}\n\tChannel: ${channel}\n\tContent: ${message.content}`
    )
  }

  static async play_sound(channel, file_path) {
    if (playing) {
      logger.log("Already playing a song.")
    }
    if (channel === undefined) {
      logger.log("Channel undefined!")
      return
    }

    try {
      playing = true
      const connection = await channel.join()
      logger.log(
        `\nJoined voice channel: ${DiscordUtil.getChannelNameIDString(
          channel
        )})`
      )
      const dispatcher = connection.play(fs.createReadStream(file_path), {
        highWaterMark: 1,
      })

      dispatcher.on("start", () => {
        logger.log("Started voice.")
        connection.player.streamingData.pausedTime = 0
      })

      dispatcher.on("finish", () => {
        logger.log("Finished voice.")
        dispatcher.destroy()
        connection.disconnect()
        playing = false
      })

      dispatcher.on("error", (e) => {
        logger.log("An error occured while playing a sound.")
        dispatcher.destroy()
        connection.disconnect()
        playing = false
      })
    } catch (err) {
      logger.log("An error occured while join voice.")
      logger.log(err)
      playing = false
    }
  }
}

module.exports = DiscordUtil
