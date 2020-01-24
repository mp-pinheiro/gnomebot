const logger = require("./logger");
const fs = require("fs");

class DiscordUtil {
  static getUserNameIDString(user) {
    return `${user.username} (${user.id})`;
  }

  static getChannelNameIDString(channel) {
    return `${channel.name} (${channel.id})`;
  }

  static logMessage(message) {
    let user = DiscordUtil.getUserNameIDString(message.author);
    let server = message.guild ? `${message.guild.name} (${message.guild.id})` : "none";
    let channel = server === "none" ? message.channel.id : DiscordUtil.getChannelNameIDString(message.channel);
    logger.log(`Message (${message.id}):\n\tUser: ${user}\n\tServer: ${server}\n\tChannel: ${channel}\n\tContent: ${message.content}`);
  }

  static async woo(channel) {
    if (channel === undefined) {
      logger.log("Channel undefined!");
      return;
    }

    channel
      .join()
      .then(connection => {
        logger.log(`\nJoined voice channel: ${DiscordUtil.getChannelNameIDString(channel)})`);
        const dispatcher = connection.play(fs.createReadStream("gnome_quick.ogg"), {
          highWaterMark: 1
        });

        dispatcher.on("start", () => {
          logger.log("Started voice.");
          connection.player.streamingData.pausedTime = 0;
        });

        dispatcher.on("finish", () => {
          logger.log("Finished voice.");
          dispatcher.destroy();
          connection.disconnect();
        });

        dispatcher.on("error", e => {
          logger.log("An error occured.");
          dispatcher.destroy();
          connection.disconnect();
        });
      })
      .catch(console.log);
  }
}

module.exports = DiscordUtil;
