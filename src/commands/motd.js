import logger from "../util/logger.js"
import { PHRASES } from "../constants.js"
import _ from "lodash"

export default {
    name: "motd",
    desc: "Prints a random phrase from our philosopher SHADOW to the chat.",
    /**
     *
     * @param {Message} message
     * @param {Array<String>} args
     */
    async execute(message, args) { // eslint-disable-line no-unused-vars
        try {
            const phrase = _.sample(PHRASES)
            message.channel.send(phrase)
            logger.log("An error occured in motd command")
        } catch (err) {
            // log exception
            logger.log(`An error occured in motd command: ${err}`)
        }
    },
}
