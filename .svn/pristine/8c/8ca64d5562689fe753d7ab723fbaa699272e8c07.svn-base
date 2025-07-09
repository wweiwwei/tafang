const readLine = require("readline-sync");
const archiver = require("archiver");
const fs = require("fs");
const { execSync } = require("child_process");
const uploadToOSS = require("./uploadToOSS");

const fileList = [];
const args = process.argv;
const serverIndex = args[2];
const currentVersion = args[3];

const serverList = {
    1: "tower/test/",
};

generatePatch = async () => {
    const oldVersion = fs.readdirSync("./native/release").filter((s) => s !== currentVersion);
    const srcDir = "./native/release";
    const completeDir = "./native/complete";
    const archive = archiver("zip", { zlib: { level: 0 } });
    // 生成当前版本的完整包
    const output = fs.createWriteStream(`${completeDir}/${currentVersion}.zip`);
    archive.pipe(output);
    archive.directory(`${srcDir}/${currentVersion}`, false);
    console.log("开始生成完整包" + currentVersion + ".zip");
    await archive.finalize();
    console.log("生成完整包成功");
    fileList.push(`${completeDir}/${currentVersion}.zip`);

    console.log("是否生成补丁包？不生成更新时需要重新下载完整包(y/n)");
    const generatePatch = readLine.question();
    if (generatePatch === "y") {
        console.log("以下为旧的发行版本，将生成以下版本到当前版本的补丁包，请确认");
        oldVersion.forEach((v) => console.log(v));
        console.log("确认无误后输入y");
        const confirm = readLine.question();
        if (confirm !== "y") {
            console.log("取消生成补丁包");
            console.log("操作中止");
            process.exit(1);
        }
        // 生成补丁包
        const patchDir = "./native/patch";
        for (let i = 0; i < oldVersion.length; i++) {
            const archive = archiver("zip", { zlib: { level: 9 } });
            const old = oldVersion[i];
            const tempDir = `./native/temp/temp_${old}_to_${currentVersion}`;
            if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir);
            const diffCommand = `git diff ${srcDir}/${old} ${srcDir}/${currentVersion} --name-only`;
            // console.log("执行指令:"+diffCommand)
            // const diffFiles = nodeCmd.runSync("diff.bat")
            try {
                execSync(diffCommand);
            } catch (error) {
                const diffFiles = error.stdout.toString().toString().trim().split("\n");
                diffFiles.forEach((file) => {
                    // console.log("拷贝文件" + file)
                    const shortName = file.replace(`${srcDir}/${currentVersion}/`, "");
                    const destDir = `${tempDir}/${shortName.substring(0, shortName.lastIndexOf("/"))}`;
                    const src = file.substring(0, file.lastIndexOf("/"));
                    const fileName = file.substring(file.lastIndexOf("/") + 1);
                    try {
                        const copyCommand = `robocopy ${src} ${destDir} ${fileName}`;
                        // console.log("执行指令:"+copyCommand)
                        execSync(copyCommand);
                    } catch {}
                });
                const output = fs.createWriteStream(`${patchDir}/${old}to${currentVersion}patch.zip`);
                archive.pipe(output);
                archive.directory(tempDir, false);
                console.log("开始生成补丁包" + old + "to" + currentVersion + "patch.zip");
                await archive.finalize();
                console.log("生成补丁包成功");
                fileList.push(`${patchDir}/${old}to${currentVersion}patch.zip`);
            }
            // 删除临时文件夹
            fs.rmSync(tempDir, { recursive: true });
        }
    }
    console.log("是否上传到cdn？(y/n)");
    const upload = readLine.question();
    if (upload === "y") {
        for (let i = 0; i < fileList.length; i++) {
            const file = fileList[i];
            console.log("开始上传文件" + file);
            await uploadToOSS(file, `${serverList[serverIndex]}${file.replace("./", "")}`);
        }
    }
};

generatePatch();
