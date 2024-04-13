const gnome_regex = /.*g.*n.*[o0].*m.*[e3].*/gi

export default {
    name: "gnome emoji",
    desc: `Adds a gnome emoji if a message contains g n o m e.`,
    /**
     * @param {import('discord.js').Message} message
     */
    async test(message) {
        return Math.random() < 0.05 && gnome_regex.test(message.content)
    },
    /**
     * @param {import('discord.js').Message} message
     */
    async execute(message) {
        message.react('gnome:623704257161461792')
    }
}
