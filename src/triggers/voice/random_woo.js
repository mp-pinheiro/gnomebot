import { SOUNDS } from "../../constants.js"
import DiscordUtil from "../../utilities/discord.js"
import logger from "../../utilities/logger.js"
import { RANDOM_WOO_CHANCE } from "../../constants.js"

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
      Math.random() < RANDOM_WOO_CHANCE &&
      (oldVoiceState.channelId !== newVoiceState.channelId ||
        (oldVoiceState.deaf && !newVoiceState.deaf))
    )
  },
  /**
   * @param {import('discord.js').VoiceState} oldVoiceState
   * @param {import('discord.js').VoiceState} newVoiceState
   */
  async execute(oldVoiceState, newVoiceState) {
    let member = newVoiceState.member

    logger.info(
      `${getUserNameIDString(
        member.user
      )} joined channel: ${getChannelNameIDString(newVoiceState.channel)})`
    )
    if (Math.random() < 0.5) {
        DiscordUtil.playSound(newVoiceState.channel, SOUNDS.WOO)
    } else {
        DiscordUtil.playSound(newVoiceState.channel, SOUNDS.MONKI)
    }
  },
}
