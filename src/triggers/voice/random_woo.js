import { VoiceState } from "discord.js"
import { SOUNDS } from "../../constants.js"
import { RANDOM_WOO_CHANCE } from "../../constants.js"
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
      Math.random() < RANDOM_WOO_CHANCE &&
      oldVoiceState.channelID !== newVoiceState.channelID &&
      !oldVoiceState.member.bot
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

    DiscordUtil.play_sound(newVoiceState.channel, SOUNDS.WOO)
  },
}
