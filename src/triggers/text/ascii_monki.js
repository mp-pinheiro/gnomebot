import { Message } from "discord.js"
import { ASCII_MONKIS } from "../../constants.js"
import _ from "lodash"

const monki_regex = /.*m.*o.*n.*k.*i.*/gi

export default {
    name: "Random Monki",
    desc: `Prints a monki if a message contains 'monki'.`,
    /**
     * @param {Message} message
     */
    async test(message) {
        return monki_regex.test(message.content)
    },
    /**
     * @param {Message} message
     */
    async execute(message) {
        const monki = _.sample(ASCII_MONKIS)
        message.channel.send(monki)
    },
}
