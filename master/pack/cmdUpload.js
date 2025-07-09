const uploadToOSS = require("./uploadToOSS")

const args = process.argv
const srcFile = args[2]
const remoteURL = args[3]

uploadToOSS(srcFile,remoteURL)