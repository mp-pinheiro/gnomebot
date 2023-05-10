export default {
    name: "source",
    desc: "Replies with my github repository.",
    /**
     *
     * @param {Message} message
     * @param {Array<String>} args
     */
    // eslint-disable-next-line no-unused-vars
    async execute(message, args) {
        message.channel.send("https://www.github.com/hadley31/gnomebot")
    },
}
