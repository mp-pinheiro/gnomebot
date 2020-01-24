const logger = require("../util/logger");

module.exports = {
  name: "gnottem",
  desc: "",
  execute(message, args) {
    try {
      const channel_id = args[0];
      if (message.member.voice.channel) {
        woo(message.member.voice.channel);
      } else {
        message.reply("you are not in a voice channel!");
      }

      let channel = message.client.channels.find(x => x.id == channel_id);

      woo(channel);
    } catch (err) {
      logger.log("An error occured in gnottem");
    }
  }
};
