const { Message } = require('discord.js')
const URL = require('url')
const logger = require('../util/logger')

module.exports = {
  name: 'checkvideo',
  desc: 'Determines if a video contains gnomes.',
  /**
   * @param {Message} message
   * @param {Array<String>} args
   */
  async execute(message, args) {
    if (args.length == 0) {
      message.reply('you must provide a youtube link.')
      return
    }
    const url = URL.parse(args[0], true)
    const id = url?.query?.v

    if (!id) {
      logger.log('Unable to parse URL.')
      return
    }

    const result = await analyseVideoComments(id)
    if (result) {
      message.channel.send('**WARNING**: That video may contain gnomes!')
    }
  },
}

async function analyseVideoComments(video_id) {
  return true
}
