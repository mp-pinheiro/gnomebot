const logger = require('../util/logger')
const { woo } = require('../util/discord')
const { Message } = require('discord.js')

module.exports = {
  name: 'gnottem',
  desc: `Proxy 'woo' command`,
  /**
   *
   * @param {Message} message
   * @param {Array<String>} args
   */
  async execute(message, args) {
    try {
      const channel_id = args[0]

      // TODO: check if user is admin

      let channel = await message.client.channels.fetch(channel_id)

      await woo(channel)
    } catch (err) {
      logger.log('An error occured in gnottem')
      console.log(err)
    }
  },
}
