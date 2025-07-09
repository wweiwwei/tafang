import PlatformConfig from "../../game/config/PlatformConfig";
import EventName from "../../game/event/EventName";
import WindowCommonConfirm from "../../game/module/common/WindowCommonConfirm";
import EventBus from "../event/EventBus";

export default class HotUpdateHelper {
    /** 更新游戏资源 */
    static async updateGameResources() {
        if (CC_PREVIEW) return;
        if (!cc.sys.isNative) return;
        const localVersion = PlatformConfig.version;
        const remoteVersionInfo = HttpServer.packageInfo.remoteVersion;
        const remoteVersion = remoteVersionInfo.gameResVersion;
        const previewVersion = remoteVersionInfo.previewVersion;
        GLog.debug(`localVersion:${localVersion},remoteVersion:${remoteVersion}`);
        if (localVersion === remoteVersion || localVersion === previewVersion) {
            GLog.debug("远程版本与本地版本一致，不需要更新");
            return;
        }
        const { patch } = await HttpServer.request("game/patch", { currentVersion: localVersion });
        if (patch.patch.length === 0) {
            GLog.debug("补丁没有任何内容，不需要更新");
            return;
        }
        GLog.debug(`获取到了补丁，文件数${patch.patch.length}`);
        // 移除临时文件夹
        if (jsb.fileUtils.isDirectoryExist(this.tempPath())) {
            GLog.debug(`移除临时文件夹`);
            this.removeDirRecursively(this.tempPath());
        }
        GLog.debug(`下载文件到临时文件夹`);
        // 下载文件到临时文件夹
        await this.downloadGameRes(patch);
        GLog.debug(`从临时文件夹拷贝文件到存储文件夹`);
        // 拷贝临时文件到存储文件夹
        this.copyFileFromTempToStorage();
        GLog.debug(`拷贝完成，移除临时文件夹`);
        // 移除临时文件夹
        this.removeDirRecursively(this.tempPath());
        GLog.debug(`重新设置搜索路径`);
        // 重新设置搜索路径
        this.resetSearchPath();
        // 重启游戏
        cc.game.restart();
    }

    private static removeDirRecursively(dir: string) {
        const flies: string[] = [];
        jsb.fileUtils.listFilesRecursively(dir, flies);
        // 遍历源文件夹下的每个文件路径
        for (var i = 0; i < flies.length; i++) {
            if (flies[i].endsWith("/") || flies[i].endsWith("\\")) {
                // 文件夹，跳过拷贝
                continue;
            }
            const succ = jsb.fileUtils.removeFile(flies[i]);
            if (!succ) GLog.warn(`删除文件失败${flies[i]}`);
        }
    }

    private static tempPath() {
        return jsb.fileUtils.getWritablePath() + "remoteTemp";
    }

    private static storagePath() {
        return jsb.fileUtils.getWritablePath() + "remotePath";
    }

    private static copyFileFromTempToStorage() {
        const sourceDir = this.tempPath();
        const destinationDir = this.storagePath();
        this.jsbCopyDirectory(sourceDir, destinationDir);
    }

    private static jsbCopyDirectory(sourceDir: string, destinationDir: string) {
        // 获取源文件夹下的所有文件路径列表
        const flies: string[] = [];
        jsb.fileUtils.listFilesRecursively(sourceDir, flies);
        // 遍历源文件夹下的每个文件路径
        for (var i = 0; i < flies.length; i++) {
            if (flies[i].endsWith("/") || flies[i].endsWith("\\")) {
                // 文件夹，跳过拷贝
                continue;
            }
            const destinationFile = flies[i].replace(sourceDir, destinationDir);
            GLog.debug("拷贝" + flies[i]);
            // 如果目标文件夹中已存在同名文件，则删除它
            if (jsb.fileUtils.isFileExist(destinationFile)) {
                GLog.debug("存在" + flies[i] + "删除原来的文件");
                jsb.fileUtils.removeFile(destinationFile);
            }

            // 读取源文件的内容
            // @ts-ignore
            const fileData = jsb.fileUtils.getDataFromFile(flies[i]);

            const dir = destinationFile.substring(0, destinationFile.lastIndexOf("/"));
            if (!jsb.fileUtils.isDirectoryExist(dir)) {
                GLog.debug("文件夹不存在，创建文件夹" + flies[i]);
                jsb.fileUtils.createDirectory(dir);
            }
            // 将源文件的内容写入目标文件
            // @ts-ignore
            jsb.fileUtils.writeDataToFile(fileData, destinationFile);
        }
    }

    private static resetSearchPath() {
        // 重设搜索路径
        const storagePath = this.storagePath();
        const seachPaths = jsb.fileUtils.getSearchPaths();
        // const tempPath = jsb.fileUtils.getWritablePath() + "_temp";
        const newSearchPath = seachPaths.filter((path) => path !== storagePath);
        newSearchPath.unshift(storagePath);
        jsb.fileUtils.setSearchPaths(newSearchPath);
        cc.sys.localStorage.setItem("HotUpdateSearchPaths", JSON.stringify(newSearchPath));
        GLog.debug(`set search path ${newSearchPath.join(",")}`);
        GLog.debug(`storage path ${storagePath}`);
    }

    private static async downloadGameRes(patch: {
        fromVersion: string;
        toVersion: string;
        baseUrl: string;
        patch: string[];
    }) {
        const networkUrlToRelateUrl = new Map<string, string>();
        const networkUrl = patch.patch.map((u) => {
            const net = patch.baseUrl + u;
            networkUrlToRelateUrl.set(net, u);
            return net;
        });
        EventBus.emit(EventName.setLoadProgress, [GLang.code.ui.loading_download_resource], 0);
        let okCount = 0;
        const tempPath = this.tempPath();
        const downloadResult = await GUtils.http.downloadFileBatchWithCallBack(networkUrl, 3, 5, (ok, file, url) => {
            if (ok) {
                okCount++;
                EventBus.emit(
                    EventName.setLoadProgress,
                    [GLang.code.ui.loading_download_resource],
                    okCount / patch.patch.length
                );
                const relateUrl = networkUrlToRelateUrl.get(url);
                const path = tempPath + "/" + relateUrl;
                const dir = path.substring(0, path.lastIndexOf("/"));
                if (!jsb.fileUtils.isDirectoryExist(dir)) {
                    jsb.fileUtils.createDirectory(dir);
                }
                GLog.debug(`save file ${path}`);
                const u8 = new Uint8Array(file);
                // @ts-ignore
                jsb.fileUtils.writeDataToFile(u8, path);
                GLog.debug(`save file ${path} end length ${u8.byteLength}`);
            }
        });
        if (downloadResult.allOk) {
            return;
        } else {
            const ok = GWindow.open(WindowCommonConfirm, {
                tip: [`_rs部分资源下载失败，请检查网络状态后重试，是否继续下载？`],
            });
            if (ok) {
                // 下载剩余文件
                return await this.downloadGameRes({
                    ...patch,
                    patch: downloadResult.failList.map((u) => networkUrlToRelateUrl.get(u)),
                });
            } else {
                cc.game.end();
            }
        }
    }

    // /** 下载游戏资源 */
    // private static async downloadGameRes(url: string) {
    //     console.log("下载资源链接", url);
    //     console.log("获取下载包大小");
    //     const fileSize = await GUtils.http.getContentLength(url);
    //     console.log("下载包大小", fileSize);
    //     const ok = await GWindow.open(
    //         WindowCommonConfirm,
    //         {
    //             tip: [GLang.code.ui.loading_download_confirm, `_rs${(fileSize / 1024 / 1024).toFixed(2)}M`],
    //         },
    //         { animation: WindowOpenAnimationEnum.no }
    //     );
    //     if (!ok) cc.game.end();
    //     // 重设搜索路径
    //     const storagePath = jsb.fileUtils.getWritablePath() + "remotePath";
    //     const seachPaths = jsb.fileUtils.getSearchPaths();
    //     // const tempPath = jsb.fileUtils.getWritablePath() + "_temp";
    //     const newSearchPath = seachPaths.filter((path) => path !== storagePath);
    //     newSearchPath.unshift(storagePath);
    //     jsb.fileUtils.setSearchPaths(newSearchPath);
    //     cc.sys.localStorage.setItem("HotUpdateSearchPaths", JSON.stringify(newSearchPath));
    //     GLog.debug(`set search path ${newSearchPath.join(",")}`);
    //     GLog.debug(`storage path ${storagePath}`);
    //     // 下载并解压
    //     EventBus.emit(EventName.setLoadProgress, [GLang.code.ui.loading_download_resource], 0);
    //     const zip = await GUtils.http.downloadFile(url, 3);
    //     EventBus.emit(EventName.setLoadProgress, [GLang.code.ui.loading_unzip], 0);
    //     const res = await GUtils.file.unZipFile(zip);
    //     EventBus.emit(EventName.setLoadProgress, [GLang.code.ui.loading_save_file], 0);
    //     // 保存文件
    //     for (let i = 0; i < res.length; i++) {
    //         const e = res[i];
    //         const path = storagePath + "/" + e.relativePath;
    //         const dir = path.substring(0, path.lastIndexOf("/"));
    //         if (!jsb.fileUtils.isDirectoryExist(dir)) {
    //             jsb.fileUtils.createDirectory(dir);
    //         }
    //         GLog.debug(`save file ${path}`);
    //         const u8 = new Uint8Array(e.data);
    //         // @ts-ignore
    //         jsb.fileUtils.writeDataToFile(u8, path);
    //         GLog.debug(`save file ${path} end length ${u8.byteLength}`);
    //         EventBus.emit(EventName.setLoadProgress, [GLang.code.ui.loading_save_file], (i + 1) / res.length);
    //     }
    //     // 重启游戏
    //     cc.game.restart();
    // }

    static async updateGameTable() {
        EventBus.emit(EventName.setLoadProgress, [GLang.code.ui.loading_load_config], 0);
        if (CC_PREVIEW) {
            await this.browerTestLoadTable();
            return;
        }
        if (GSDK.supportZip()) {
            const remoteVersionInfo = HttpServer.packageInfo.remoteVersion;
            const fileTable = await this.loadFileTable();
            if (fileTable.version === remoteVersionInfo.tableVersion) {
                GLog.debug("远程表版本与本地表版本一致，不需要更新");
                GTable.loadTblByData(fileTable);
                return;
            }
            GLog.debug("远程表版本与本地表版本不一致，尝试加载缓存进行对比");
            const localTableCache = await this.loadLocalTableCache();
            if (localTableCache && localTableCache.version === remoteVersionInfo.tableVersion) {
                GLog.debug("缓存表版本与远程表版本一致，不需要更新");
                GTable.loadTblByData(localTableCache);
                return;
            }
            GLog.debug("缓存表版本与远程表版本不一致，开始下载表格");
            EventBus.emit(EventName.setLoadProgress, [GLang.code.ui.loading_dowload_config], 0);
            const remoteUrl = remoteVersionInfo.tableUrl;
            const data = await this.downloadRemoteTable(remoteUrl);
            GTable.loadTblByData(data);
        } else {
            const fileTable = await this.loadFileTableWithoutZip();
            GTable.loadTblByData(fileTable);
        }
    }

    /** 下载远程表格 */
    private static async downloadRemoteTable(url: string): Promise<any> {
        const origin = await GUtils.http.downloadText(url, 3);
        const { data } = JSON.parse(origin);
        cc.sys.localStorage.setItem("tower_table_cache", data);
        const d = await GUtils.file.unZipStringFromBase64(data);
        return JSON.parse(d);
    }

    /** 读取本地表格缓存 */
    private static async loadLocalTableCache(): Promise<any | null> {
        const cache = cc.sys.localStorage.getItem("tower_table_cache");
        if (cache) {
            try {
                const data = await GUtils.file.unZipStringFromBase64(cache);
                return JSON.parse(data);
            } catch (e) {
                GLog.debug("表格缓存解析失败，清除缓存");
                cc.sys.localStorage.removeItem("tower_table_cache");
                return null;
            }
        } else {
            return null;
        }
    }

    /** 从文件加载表格 */
    private static loadFileTable() {
        return new Promise<any>((resolve, reject) => {
            cc.assetManager.loadBundle("base", (err, bundle) => {
                if (err) {
                    reject(err);
                } else {
                    GLog.debug("加载本地表格");
                    bundle.load("table", cc.JsonAsset, (err, index) => {
                        if (err) {
                            reject(err);
                        } else {
                            GLog.debug("加载到了本地表格");
                            GUtils.file.unZipStringFromBase64(index.json.data).then((str) => {
                                resolve(JSON.parse(str));
                            });
                        }
                    });
                }
            });
        });
    }

    /** 从文件加载表格，非压缩版本 */
    private static loadFileTableWithoutZip() {
        return new Promise<any>((resolve, reject) => {
            cc.assetManager.loadBundle("base", (err, bundle) => {
                if (err) {
                    reject(err);
                } else {
                    GLog.debug("加载本地表格");
                    bundle.load("table", cc.JsonAsset, (err, index) => {
                        if (err) {
                            reject(err);
                        } else {
                            GLog.debug("加载到了本地表格");
                            resolve(index.json);
                        }
                    });
                }
            });
        });
    }

    private static _interval: number;
    /** 浏览器测试模式的表加载 */
    private static async browerTestLoadTable() {
        let href = "";
        // 简单适配一下多开编辑器
        if (window.location.href.indexOf(":7456") > -1) {
            href = window.location.href.replace(":7456/", "");
        } else if (window.location.href.indexOf(":7457") > -1) {
            href = window.location.href.replace(":7457/", "");
        } else if (window.location.href.indexOf(":7458") > -1) {
            href = window.location.href.replace(":7458/", "");
        }
        GLog.debug("浏览器测试环境，从本机服务获取表数据");
        const res = await GUtils.http.get(`${href}:${GConstant.localTablePort}/table.json?stamp=${Date.now()}`);
        const data = JSON.parse(res);
        GLog.debug("加载到了表格原始数据", data);
        GTable.loadTblByData(data);
        GLog.debug("表格初始化完毕", GTable);
        let localVersion = Date.now();
        // 表格检测
        GLog.debug("运行校验表格脚本");
        const tableCheck = await GUtils.http.get(
            `${href}:${GConstant.localTablePort}/check/check.ts?stamp=${Date.now()}`
        );
        const tableCheckScript = tableCheck;
        eval(tableCheckScript);
        GLog.debug("表格校验结束");
        GLog.debug("启动轮询表格热重载");
        if (this._interval) {
            clearInterval(this._interval);
            this._interval = 0;
        }
        this._interval = setInterval(async () => {
            const versionRes = await GUtils.http.get(`${href}:${GConstant.localTablePort}/version?stamp=${Date.now()}`);
            const { version } = JSON.parse(versionRes);
            if (version > localVersion) {
                GLog.debug("检测到新的表格版本");
                const res = await GUtils.http.get(`${href}:${GConstant.localTablePort}/table.json?stamp=${Date.now()}`);
                const data = JSON.parse(res);
                GLog.debug("加载到了表格原始数据", data);
                GTable.loadTblByData(data);
                GLog.debug("表格热重载完成", GTable);
                localVersion = Date.now();
            }
        }, 1000);
    }

    static async updateLangTable() {}
}
