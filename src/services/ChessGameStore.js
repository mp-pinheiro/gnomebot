import { createClient } from 'redis'
import { Chess } from 'chess.js'
import logger from '../util/logger.js'

export class ChessGameStore {
  /**
   * Retrieves the current game for the given channel id
   * @param {String} channelId The channel id
   * @returns {Promise<import('chess.js').ChessInstance?>}
   */
  async getGame(channelId) {
    throw Error('Not Implemented!')
  }

  /**
   * Updates or sets a game for the given channel id
   * @param {String} channelId The channel id
   * @param {import('chess.js').ChessInstance} game 
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
   * @returns {Promise<import('chess.js').ChessInstance?>}
   */
  async getGame(channelId) {
    const key = this.getKey(channelId)
    return this.store[key]
  }

  /**
   * Updates or sets a game for the given channel id
   * @param {String} channelId The channel id
   * @param {import('chess.js').ChessInstance} game 
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
   * @returns {Promise<import('chess.js').ChessInstance?>}
   */
  async getGame(channelId) {
    if (!this.client.isOpen) await this.client.connect()
    const key = this.getKey(channelId)
    const fen = await this.client.get(key)
    logger.info(`${channelId} fen: ${fen}`)
    return new Chess(fen || undefined)
  }

  /**
   * Updates or sets a game for the given channel id
   * @param {String} channelId The channel id
   * @param {import('chess.js').ChessInstance} game 
   */
  async updateGame(channelId, game) {
    if (!this.client.isOpen) await this.client.connect()
    const key = this.getKey(channelId)
    if (game) {
      this.client.set(key, game.fen())
    } else {
      this.client.del(key)
    }
  }

  getKey(channelId) {
    return `cg_${channelId}`
  }
}