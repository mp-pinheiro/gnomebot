const { VoiceState } = require('discord.js')
const { WOO } = require('../../constants/sound_files')
const { getUserNameIDString, getChannelNameIDString, play_sound } = require('../../util/discord')
const logger = require('../../util/logger')

module.exports = {
  name: 'Random Woo',
  desc: 'Randomly joins a chat channel and woo.',
  /**
   * @param {VoiceState} oldVoiceState
   * @param {VoiceState} newVoiceState
   */
  async test(oldVoiceState, newVoiceState) {
    return (
      newVoiceState.channel &&
      Math.random() < 0.04 &&
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

    logger.log(`${getUserNameIDString(member.user)} joined channel: ${getChannelNameIDString(newVoiceState.channel)})`)

    play_sound(newVoiceState.channel, WOO)
  },
}
