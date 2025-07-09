const uploadToOSS = require("./uploadToOSS");
const fs = require("fs");
const path = require("path");
const _ = require("lodash");
const args = process.argv
const serverIndex = args[2]
const version = args[3]
const remoteURL = `tata/wechat/${version}`

const getDirFullPath = (basePath) => {
    const stats = fs.statSync(basePath)
    if (stats.isDirectory()) {
        return fs.readdirSync(basePath).map(p => getDirFullPath(path.join(basePath, p)))
    } else {
        return basePath
    }
}

getFilePathDeep = (basePath) =>{
    const list= _.flatMapDeep(getDirFullPath(basePath))
    return list
}

const upload = async()=>{
    const fileList = getFilePathDeep("../client/build/wechatgame/remote")
    for (let i = 0; i < fileList.length; i++) {
        const file = fileList[i];
        console.log("开始上传文件" + file);
        await uploadToOSS(file, remoteURL + file.replaceAll("\\","/").replace("../client/build/wechatgame", ""));
    }
}

upload()