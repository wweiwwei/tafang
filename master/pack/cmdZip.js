const JSZip = require("jszip");
// const args = process.argv
// const data = args[2]
const fs = require("fs")

const data = fs.readFileSync("../tool/tables/table.json", "utf-8")
const zipSingleStringToBase64  = async () => {
    const zip = new JSZip();
    zip.file("str", data);
    const str = await zip.generateAsync({
        type: "base64",
        compression: "DEFLATE",
        compressionOptions: { level: 9 },
    });
    fs.writeFileSync("../tool/tables/releaseClientTable.json", JSON.stringify({data:str}), "utf-8")
}

zipSingleStringToBase64()