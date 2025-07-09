const fs = require('fs');
const args = process.argv
const serverIndex = args[2]
const version = args[3]


const remoteURL = `https://cdn.handsome.fun/tata/wechat/${version}/`

const configPath = "../client/settings/wechatgame.json"
const data = fs.readFileSync(configPath, 'utf-8')
const config = JSON.parse(data)
config.REMOTE_SERVER_ROOT = remoteURL 
fs.writeFileSync(configPath,JSON.stringify(config, null, 4))