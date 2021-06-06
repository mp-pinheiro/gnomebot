class Logger {
  constructor(name) {
    this.name = name
  }

  log(message) {
    const d = new Date()
    const timestamp = d.toLocaleString("en-US", {
      timeZoneName: "short",
    })
    console.log(`\n${timestamp} -- ${this.name}\n${message}`)
  }

  error(message) {
    this.log(`ERROR: ${message}`)
  }
}

export default Logger
