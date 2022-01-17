import _ from "lodash"
import logger from "../../util/logger.js"
import { getGameImageEmbed } from "../../util/chess.js"
import chess from "../../services/chess.js"

export default {
  name: "Chess",
  desc: `Makes a chess move if it is valid algebraic notation`,
  /**
   * @param {import('discord.js').Message} message
   */
  async test(message) {
    const game = await chess.getGame(message.channelId)
    return game && game.moves().includes(message.content)
  },

  /**
   * @param {import('discord.js').Message} message
   */
  async execute(message) {
    const result = await chess.handleMove(message.channelId, message.content)

    if (result.error) {
      logger.error('Something went wrong')
      return
    }

    const { game, side, reply, move } = result

    const embedOptions = { move: move, reply: reply, side: side }
    const imageEmbed = await getGameImageEmbed(game.fen(), embedOptions)

    return message.reply(imageEmbed)
  },
}
