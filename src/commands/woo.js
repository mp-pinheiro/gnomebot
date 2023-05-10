import logger from "../util/logger.js"
import DiscordUtil from "../util/discord.js"
import { SOUNDS } from "../constants.js"

const { getUserNameIDString } = DiscordUtil

export default {
    name: "woo",
    desc: "Gnomebot will join your channel and deliver a woo.",
    /**
     * @param {Message} message
     * @param {Array<String>} args
     */
    async execute(message, args) {
        if (args.length > 0) {
            const channel_id = args[0];

            if (!message.member.permissions.has("ADMINISTRATOR")) {
                logger.log(
                    `${getUserNameIDString(message.author)} is not an administrator.`
                );
                return;
            }

            let channel = await message.client.channels.fetch(channel_id);

            DiscordUtil.play_sound(channel, SOUNDS.WOO);
        } else if (message.member.voice.channel) {
            DiscordUtil.play_sound(message.member.voice.channel, SOUNDS.WOO);
        } else {
            message.reply("you are not in a voice channel!");
        }
    },
}
