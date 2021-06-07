import Logger from '../util/logger.js'
import { Chess } from 'chess.js'
import { Message, MessageAttachment } from 'discord.js'
import ChessImageGenerator from "chess-image-generator"
import _ from "lodash"

const logger = new Logger('services/chess')

const imageOptions = {
    'size': 512,
    'style': 'cburnett'
}

const imageGenerator = new ChessImageGenerator(imageOptions)
const games = {}


/**
 * Handles a message from discord and replies accordingly
 * @param {Message} message
 * @param {String} move
 */
export default function handleDiscordMessage(message, move) {
    const game = getChessGame(message.channel.id)
    if (!game.move(move)) {
        logger.log(`${message.author.username} tried to play ${move}, what an idiot lol`)
        return message.reply('invalid move!')
    }

    // If the user's move ended the game
    if (game.game_over()) {
        const fen = game.fen()
        game.reset()
        return replyWithGameImage(message, fen, 'you win. Well played!')
    }

    // Gnomebot makes a move
    const gnomeMove = _.sample(game.moves())
    game.move(gnomeMove)

    // Check if gnomebot wins after moving
    if (game.game_over()) {
        const fen = game.fen()
        game.reset()
        return replyWithGameImage(message, fen)
    }

    // Game is not over
    return replyWithGameImage(message, game.fen(), `sick move! My move is ${gnomeMove}.`)
}

export function getMoves(channelID) {
    return getChessGame(channelID).moves()
}


export function getChessGame(channelID) {
    if (!(channelID in games)) {
        games[channelID] = new Chess()
    }
    return games[channelID]
}



/**
 * Sends a reply message containing an image of the current board state
 * @param {Message} message
 * @param {String} fen
 */
async function replyWithGameImage(message, fen, reply = '') {
    const imageBuffer = await generateImage(fen)
    return message.reply(reply, new MessageAttachment(imageBuffer))
}



/**
 * Generates an image buffer of a particular board state
 * @param {String} fen
 */
async function generateImage(fen) {
    imageGenerator.loadFEN(fen)
    return imageGenerator.generateBuffer()
}
