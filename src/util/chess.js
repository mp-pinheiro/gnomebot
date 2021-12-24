import ChessImageGenerator from "chess-image-generator"

const imageOptions = {
  'size': 512,
  'style': 'cburnett'
}

const imageGenerator = new ChessImageGenerator(imageOptions)

/**
 * Generates an image buffer of a particular board state
 * @param {String} fen
 */
export async function generateImage(fen, { move = {}, flipped = false } = {}) {
  imageGenerator.setHighlightedSquares(move)
  imageGenerator.flipped = flipped
  imageGenerator.loadFEN(fen)
  return imageGenerator.generateBuffer()
}