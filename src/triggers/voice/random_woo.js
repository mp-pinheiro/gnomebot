import { VoiceState } from "discord.js"
import { WOO } from "../../constants.js"
import DiscordUtil from "../../util/discord.js"
import logger from "../../util/logger.js"

const { getUserNameIDString, getChannelNameIDString } = DiscordUtil

export default {
  name: "Random Woo",
  desc: "Randomly joins a chat channel and woo.",
  /**
   * @param {VoiceState} oldVoiceState
   * @param {VoiceState} newVoiceState
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
   * @param {VoiceState} oldVoiceState
   * @param {VoiceState} newVoiceState
   */
  async execute(oldVoiceState, newVoiceState) {
    let member = newVoiceState.member

    logger.log(
      `${getUserNameIDString(
        member.user
      )} joined channel: ${getChannelNameIDString(newVoiceState.channel)})`
    )

    DiscordUtil.play_sound(newVoiceState.channel, WOO)
  },
}
