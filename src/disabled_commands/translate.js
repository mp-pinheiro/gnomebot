import Translate from "@google-cloud/translate"
import { Message } from "discord.js"

const v2 = Translate.v2.Translate

const translate = new v2()

const languages = {}

for (const lang of await getSupportedLanguages()) {
  languages[lang.code] = lang.name
}

export default {
  name: "translate",
  desc: "Translates a language from detected language to desired language",
  /**
   *
   * @param {Message} message
   * @param {Array<String>} args
   */
  async execute(message, args) {
    if (args[0] === "detect") {
      if (args.length < 2) {
        message.react("😞")
        return message.reply("incorrect formatting.")
      }

      const text = args[1]
      const lang = await detectLanguage(text)

      const language = languages[lang.language] ?? "unknown"

      const conf = (lang.confidence * 100).toPrecision(3)

      return message.reply(
        `\n\`\`\`Detected Language: ${language}\nConfidence: ${conf}%\`\`\``
      )
    } else if (args[0] === "to") {
      if (args.length < 3) {
        message.react("😞")
        return message.reply("incorrect formatting.")
      }
      const lang = args[1]
      const text = args[2]
      const result = await translateString(text, lang)

      return message.reply(`the translated text is:\n\`${result}\``)
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
  const [result] = await translate.translate(text, lang)
  return result
}

async function getSupportedLanguages() {
  const [languages] = await translate.getLanguages()
  return languages
}
