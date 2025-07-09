
const OSS = require("ali-oss");

let Config={
    region: 'oss-cn-guangzhou',
    accessKeyId: 'LTAI5t7T4C7RradcPmVsh4yT',
    accessKeySecret: 'VBy6NFBvTqVXTAT9bTxzsNL7WJXzE9',
    bucket: 'xunlugames',
}

module.exports = async function uploadToOSS(srcFile,remoteURL,retry = 5) {
    let client = new OSS(Config);
    for(let i = 0; i < retry; i++){
        try{
            await client.put(remoteURL, srcFile);
            console.log("上传文件成功"+remoteURL)
            break;
        }catch(e){
            console.log("上传失败，重试中...")
        }
    }

}
