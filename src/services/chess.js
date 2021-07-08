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
    const { side, game } = getGameInChannel(message.channel.id)

    if (!game) {
        return message.reply("no game for this channel! Start a new game with `!gnome chess new [side]`")
    }

    const moveFromMessage = game.move(move) // verbose move

    if (!moveFromMessage) {
        logger.log(`${message.author.username} tried to play ${move}, what an idiot lol`)
        return message.reply('invalid move!')
    }


    // If the user's move ended the game
    if (game.game_over()) {
        const fen = game.fen()
        game.reset()
        return replyWithGameImage(message, fen, {
            reply: 'you win. Well played!',
            move: moveFromMessage
        })
    }

    // Gnomebot makes a move
    const gnomeStringMove = _.sample(game.moves())
    const gnomeMove = game.move(gnomeStringMove) // verbose move

    // Check if gnomebot wins after moving
    if (game.game_over()) {
        const fen = game.fen()
        game.reset()
        return replyWithGameImage(message, fen, {
            reply: `nice try, but ${gnomeStringMove} is checkmate. Better luck next time!`,
            move: gnomeMove
        })
    }

    // Game is not over
    return replyWithGameImage(message, game.fen(), {
        reply: `sick move! My move is ${gnomeStringMove}.`,
        move: gnomeMove
    })
}

/**
 * 
 * @param {string} channelID 
 * @returns {ChessInstance}
 */
export function getMoves(channelID) {
    return getGameInChannel(channelID).game.moves()
}


export function getGameInChannel(channelID) {
    if (!(channelID in games)) {
        games[channelID] = { side: 'w', game: new Chess() }
    }
    return games[channelID]
}


/**
 * 
 * @param {string} channelID
 * @param {object} options
 * @param {string} options.side
 * @param {string} options.fen
 * @returns 
 */
export function newGameInChannel(channelID, { side, fen }) {
    const currentGame = getGameInChannel(channelID)
    if (currentGame?.game && !currentGame.game.game_over()) {
        return false
    }

    games[channelID] = {
        side: side || 'w',
        game: new Chess(fen)
    }

    return games[channelID]
}



/**
 * Sends a reply message containing an image of the current board state
 * @param {Message} message
 * @param {String} fen
 * @param {Move} move
 * @param {String} reply
 */
async function replyWithGameImage(message, fen, { move = {}, reply = '', side = 'w' }) {
    const imageBuffer = await generateImage(fen, {
        move: { [move.from]: true, [move.to]: true, },
        flipped: side === 'b'
    })
    return message.reply(reply, new MessageAttachment(imageBuffer))
}



/**
 * Generates an image buffer of a particular board state
 * @param {String} fen
 */
async function generateImage(fen, { move = {}, flipped = false }) {
    imageGenerator.setHighlightedSquares(move)
    imageGenerator.flipped = flipped
    imageGenerator.loadFEN(fen)
    return imageGenerator.generateBuffer()
}
