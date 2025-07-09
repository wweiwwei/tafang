
const readLine = require("readline-sync")
const fs = require('fs');
const args = process.argv
const serverIndex = args[2]
const version = args[3]


const serverList = {
    1:"test"
}

const serverCode = serverList[Number(serverIndex)]
console.log(`开始设置版本信息 当前服务器${serverCode} 当前版本${version}`)


const versionInfo = {
    version,
    serverCode,
}

const config = `const PlatformConfig = ${JSON.stringify(versionInfo, null, 4)};

export default PlatformConfig;
`

const filePath = "../client/assets/script/game/config/PlatformConfig.ts"

fs.writeFileSync(filePath,config)

console.log("设置版本信息成功")
console.log("版本信息如下")
console.log(config)