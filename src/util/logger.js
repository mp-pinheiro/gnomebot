class Logger {
  static log(message) {
    const d = new Date()
    const timestamp = d.toLocaleString("en-US", {
      timeZoneName: "short",
    })
    console.log(`\nTimestamp: ${timestamp}\n${message}`)
  }

  static error(message) {
    Logger.log(`ERROR: ${message}`)
  }
}

export default Logger
