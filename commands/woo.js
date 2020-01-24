const logger = require("../util/logger");
const { woo } = require("../util/discordutil");

module.exports = {
  name: "woo",
  desc: "",
  execute(message, args) {
    if (message.member.voice.channel) {
      woo(message.member.voice.channel);
    } else {
      message.reply("you are not in a voice channel!");
    }
  }
};
