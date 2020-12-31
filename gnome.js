const Discord = require("discord.js");
const DiscordUtil = require("./util/discord");
const logger = require("./util/logger");
const auth = require("./auth.json");
const fs = require("fs");

const prefix = "!gnome";

const client = new Discord.Client();
client.commands = new Discord.Collection();

const command_files = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));

// Load commands
for (const file of command_files) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

client.on("ready", event => {
  logger.log(`Client connected.\nLogged in as: ${DiscordUtil.getUserNameIDString(client.user)}`);
  client.user.setActivity("Hello me ol' chum!");
});

client.on("message", message => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;
  const args = message.content.split(/\s+/);
  args.shift();
  const command = args.shift()?.toLowerCase();

  if (!client.commands.has(command)) return;

  try {
    client.commands.get(command).execute(message, args);
    DiscordUtil.logMessage(message);
  } catch (err) {
    console.log(err);
    message.reply("An error occurred while executing that command!");
  }
});

// Called when anything about a user's voice state changes (i.e. mute, unmute, join,leave,change channel, etc.)
client.on("voiceStateUpdate", (os, ns) => {
  if (!ns.channel) return;
  let member = ns.member;
  if (member.bot) return;
  if (os.channelID === ns.channelID) return;
  if (Math.random() > 0.04) return;

  logger.log(`${DiscordUtil.getUserNameIDString(member.user)} joined channel: ${DiscordUtil.getChannelNameIDString(ns.channel)})`);

  DiscordUtil.woo(ns.channel);
});

client.login(auth.token);
