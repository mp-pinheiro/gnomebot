export default {
  name: "script",
  desc: "Run a gnomescript",
  execute(message, args) {
    const scripts = /`{3}(.+)`{3}/.exec(message.content)
    if (scripts) {
      console.log(scripts)
      message.reply(`script attached. ${scripts[1]}`)
    } else {
      message.reply("no script attached.")
    }
  }
}

function parse(script) {
  const tokens = script.split(/\s+/)
  for (const token of tokens) {
  }
}
