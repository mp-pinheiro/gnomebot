const { Translate } = require('@google-cloud/translate').v2
const { Message } = require('discord.js')

const translate = new Translate()

module.exports = {
  name: 'translate',
  desc: 'Translates a language from detected language to desired language',
  /**
   *
   * @param {Message} message
   * @param {Array<String>} args
   */
  async execute(message, args) {
    if (!args[0]) {
      message.channel.send('Please specify a language')
    }
  },
}

/**
 * Detects the language of a certain string
 * @param {String} text
 */
async function detectLanguage(text) {
  let [detection] = await translate.detect(text)
  return detection
}

/**
 * Translates a string from detected language to desired language
 * @param {String} text
 * @param {String} lang
 */
async function translateString(text, lang) {
  translate.translate(text, { targetLanguageCode: lang })
}

async function getSupportedLanguages() {
  const [languages] = await translate.getLanguages()
  return languages
}
