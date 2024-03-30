import { createClient } from 'redis'
import { Chess } from 'chess.js'
import logger from '../utilities/logger.js'

export class ChessGameStore {
  /**
   * Retrieves the current game for the given channel id
   * @param {String} channelId The channel id
   * @returns {Promise<import('chess.js').Chess?>}
   */
  async getGame(channelId) {
    throw Error('Not Implemented!')
  }

  /**
   * Updates or sets a game for the given channel id
   * @param {String} channelId The channel id
   * @param {import('chess.js').Chess} game 
   */
  async updateGame(channelId, game) {
    throw Error('Not Implemented!')
  }
}

export class SimpleGameStore extends ChessGameStore {
  constructor() {
    super()
    this.store = {}
  }

  /**
   * Retrieves the current game for the given channel id
   * @param {String} channelId The channel id
   * @returns {Promise<import('chess.js').Chess?>}
   */
  async getGame(channelId) {
    const key = this.getKey(channelId)
    return this.store[key]
  }

  /**
   * Updates or sets a game for the given channel id
   * @param {String} channelId The channel id
   * @param {import('chess.js').Chess} game 
   */
  async updateGame(channelId, game) {
    const key = this.getKey(channelId)

    if (game) {
      this.store[key] = game
    } else {
      delete this.store[channelId]
    }
  }

  getKey(channelId) {
    return `cg_${channelId}`
  }
}


export class RedisGameStore extends ChessGameStore {
  constructor(host, port = 6379) {
    super()
    this.host = host
    this.port = port
    this.client = createClient({ url: `redis://${host}:${port}` })
  }

  /**
   * Retrieves the current game for the given channel id
   * @param {String} channelId The channel id
   * @returns {Promise<import('chess.js').Chess?>}
   */
  async getGame(channelId) {
    if (!this.client.isOpen) await this.client.connect()
    const key = this.getKey(channelId)
    const pgn = await this.client.get(key)

    logger.info(`channel: ${channelId} pgn: ${pgn}`)
    if (!pgn) {
      return null
    }

    const game = new Chess()

    game.loadPgn(pgn)

    return game
  }

  /**
   * Updates or sets a game for the given channel id
   * @param {String} channelId The channel id
   * @param {import('chess.js').Chess} game 
   */
  async updateGame(channelId, game) {
    if (!this.client.isOpen) await this.client.connect()
    const key = this.getKey(channelId)
    if (game) {
      this.client.set(key, game.pgn())
    } else {
      this.client.del(key)
    }
  }

  getKey(channelId) {
    return `cg_${channelId}`
  }
}