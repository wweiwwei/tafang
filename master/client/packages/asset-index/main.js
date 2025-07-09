"use strict";

let fs = require("fs");

module.exports = {
    load() {
        // 当 package 被正确加载的时候执行
    },

    unload() {
        // 当 package 被正确卸载的时候执行
    },

    messages: {
        generate() {
            Editor.log("开始生成资源索引");
            const basePath = Editor.Project.path.replace(/\\/g, "/") + "/assets/res";
            const res = {
                prefab: {},
                imageNameToAtlas: {},
                atlas: {},
                spine: {},
            };

            const check = (path, fileName) => {
                if (fs.statSync(path + "/" + fileName).isDirectory()) {
                    fs.readdirSync(path + "/" + fileName).forEach((file) => {
                        check(path + "/" + fileName, file);
                    });
                } else {
                    if (fileName.endsWith(".plist.meta")) {
                        const fullPath = path.slice(basePath.length + 1) + "/" + fileName;
                        const name = fileName.slice(0, fileName.indexOf("."));
                        const relatePath = fullPath.slice(fullPath.indexOf("/") + 1);
                        const data = {
                            bundle: fullPath.slice(0, fullPath.indexOf("/")),
                            path: relatePath.slice(0, relatePath.indexOf(".")),
                        };
                        res.atlas[name] = data;
                        const json = fs.readFileSync(path + "/" + fileName, "utf-8");
                        const subMeta = JSON.parse(json)["subMetas"];
                        const list = Object.keys(subMeta);
                        list.forEach((img) => {
                            const imgName = img.slice(0, img.indexOf("."));
                            res.imageNameToAtlas[imgName] = name;
                        });
                    } else if (fileName.endsWith(".prefab")) {
                        const fullPath = path.slice(basePath.length + 1) + "/" + fileName;
                        const name = fileName.slice(0, fileName.indexOf("."));
                        const relatePath = fullPath.slice(fullPath.indexOf("/") + 1);
                        const data = {
                            bundle: fullPath.slice(0, fullPath.indexOf("/")),
                            path: relatePath.slice(0, relatePath.indexOf(".")),
                        };
                        res.prefab[name] = data;
                    } else if (fileName.endsWith("atlas")) {
                        const fullPath = path.slice(basePath.length + 1) + "/" + fileName;
                        const name = fileName.slice(0, fileName.indexOf("."));
                        const relatePath = fullPath.slice(fullPath.indexOf("/") + 1);
                        const data = {
                            bundle: fullPath.slice(0, fullPath.indexOf("/")),
                            path: relatePath.slice(0, relatePath.indexOf(".")),
                        };
                        res.spine[name] = data;
                    }
                }
            };
            check(Editor.Project.path.replace(/\\/g, "/") + "/assets", "res");
            fs.writeFileSync(
                Editor.Project.path.replace(/\\/g, "/") + "/assets/res/base/assetIndex.json",
                JSON.stringify(res),
                "utf-8"
            );
            fs.writeFileSync(
                Editor.Project.path.replace(/\\/g, "/") + "/assets/Script/a/EditorAssetIndex.ts",
                `
window["EditorAssetIndex"] = ${JSON.stringify(res, null, 4)}
        `,
                "utf-8"
            );
            Editor.log("资源索引生成完毕");
        },
    },
};
