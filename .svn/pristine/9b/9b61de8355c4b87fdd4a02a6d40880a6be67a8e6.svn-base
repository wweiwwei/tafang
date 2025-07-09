import JSZip = require("./jszip");
export class FileUtils {
    async zipSingleStringToBase64(content: string): Promise<string> {
        const zip = new JSZip();
        zip.file("str", content);
        const str = await zip.generateAsync({
            type: "base64",
            compression: "DEFLATE",
            compressionOptions: { level: 9 },
        });
        return str;
    }

    async unZipStringFromBase64(base64: string): Promise<string> {
        const zip = await JSZip.loadAsync(base64, { base64: true });
        // 解压缩ZIP文件
        const res = [];
        const zipEntryList = [];
        zip.forEach((relativePath, zipEntry) => {
            if (!zipEntry.dir) {
                zipEntryList.push({ relativePath, zipEntry });
            }
        });
        for (let i = 0; i < zipEntryList.length; i++) {
            const e = zipEntryList[i];
            const data = await e.zipEntry.async("string");
            res.push({ relativePath: e.relativePath, name: e.zipEntry.name, data });
        }
        return res[0].data;
    }

    async unZipFile(file: any) {
        const zip = await JSZip.loadAsync(file, { arraybuffer: true });
        // 解压缩ZIP文件
        const res: { relativePath: string; name: string; data: any }[] = [];
        const zipEntryList = [];
        zip.forEach((relativePath, zipEntry) => {
            if (!zipEntry.dir) {
                zipEntryList.push({ relativePath, zipEntry });
            }
        });
        for (let i = 0; i < zipEntryList.length; i++) {
            const e = zipEntryList[i];
            const data = await e.zipEntry.async("arraybuffer");
            res.push({ relativePath: e.relativePath, name: e.zipEntry.name, data });
        }
        return res;
    }
}
