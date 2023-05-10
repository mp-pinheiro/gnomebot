class Logger {
    static log(message) {
        let d = new Date()
        console.log(`\nTimestamp: ${d.toUTCString()}\n${message}`)
    }

    static error(message) {
        Logger.log(`ERROR: ${message}`)
    }
}

export default Logger
