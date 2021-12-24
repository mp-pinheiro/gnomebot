import { WOO } from "../../constants.js"
import DiscordUtil from "../../util/discord.js"
import Logger from "../../util/logger.js"

const logger = new Logger("woo_trigger")

const { getUserNameIDString, getChannelNameIDString } = DiscordUtil

export default {
  name: "Random Woo",
  desc: "Randomly joins a chat channel and woo.",
  /**
   * @param {import('discord.js').VoiceState} oldVoiceState
   * @param {import('discord.js').VoiceState} newVoiceState
   */
  async test(oldVoiceState, newVoiceState) {
    return (
      newVoiceState.channel &&
      Math.random() < 0.04 &&
      (oldVoiceState.channelID !== newVoiceState.channelID ||
        (oldVoiceState.deaf && !newVoiceState.deaf))
    )
  },
  /**
   * @param {import('discord.js').VoiceState} oldVoiceState
   * @param {import('discord.js').VoiceState} newVoiceState
   */
  async execute(oldVoiceState, newVoiceState) {
    let member = newVoiceState.member

    logger.log(
      `${getUserNameIDString(
        member.user
      )} joined channel: ${getChannelNameIDString(newVoiceState.channel)})`
    )

    DiscordUtil.playSound(newVoiceState.channel, WOO)
  },
}
