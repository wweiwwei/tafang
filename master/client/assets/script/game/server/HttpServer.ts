import PlatformConfig from "../config/PlatformConfig";
import WindowCommonTip from "../module/common/WindowCommonTip";
import WindowServerSelect from "../module/loading/WindowServerSelect";
import { SdkReportEventName } from "../sdk/shared/SdkReportEventName";

export class HttpServer {
    serverMap = {
        test: "https://rttest.handsome.fun/",
        local: "http://127.0.0.1:9401/",
        official: "https://rt.handsome.fun/",
    };
    /** http服务器地址 */
    get address() {
        return this.serverMap[PlatformConfig.serverCode];
    }
    /** 包信息 */
    packageInfo: PackageInfo = null;
    /** 玩家信息 */
    // @ts-ignore 赋予一个空对象避免初期获取时报错
    playerInfo: PlayerInfo = {};
    /** 本次登录的sessionKey */
    sessionKey: string = "";
    /** 时间戳 */
    stamp: number = 0;
    /** 当前游戏的服务器代号 */
    gameServerCode: string = null;
    /** 当前游戏服务器名称 */
    gameServerName: string = null;
    /** 当前游戏服务器的url */
    gameServerUrl: string = null;
    /** 角色id */
    roleId: number = null;
    /** 角色名 */
    roleName: string = null;
    /** 角色iconId */
    roleIcon: number = null;
    /** 是否新角色 */
    newRole: boolean = false;
    /** 角色头像框 */
    headFrame: number = null;
    /** 角色创建时间 */
    roleCreateTime: number = 0;

    /** 暂时的时间接口，后续会修改 */
    now() {
        return this.stamp;
    }

    /** 暂时的时间刷新接口，后续会修改 */
    async refreshStamp() {
        const res = await fetch(this.address + "game/time");
        this.stamp = await res.json();
    }

    getChatServerUrl() {
        return this.gameServerUrl.replace("/game", "/chat");
    }

    /** 登录 */
    async login() {
        const param = {
            packageName: GSDK.getPackageName(),
            sdkUid: GSDK.sdkUid,
            sdkChannel: GSDK.sdkChannel,
            sdkExtra: GSDK.sdkExtra,
            extraInfo: GSDK.extraInfo,
            extraParam: GSDK.extraParam,
        };
        GLog.debug("http服务器登录", param);
        const res = await this.request("game/login", param);
        GLog.debug("http服务器登录成功", res);
        this.playerInfo = res.playerInfo;
        this.packageInfo = res.package;
        // @ts-ignore
        this.packageInfo.packageInfo.config = JSON.parse(this.packageInfo.packageInfo.config);
        this.sessionKey = res.playerInfo.sessionKey;
        this.stamp = res.package.stamp;
        if (this.playerInfo.newPlayer) {
            GSDK.report({
                kind: "newPlayer",
                data: {},
            });
        }
        GSDK.report({
            kind: "login",
            data: {},
        });
    }

    /** 选择服务器 */
    async selectServer() {
        let serverCode: string;
        if (GModel.localStorage.loginServerSelect) {
            const res = await GWindow.open(WindowServerSelect, { changeMode: false });
            serverCode = res.serverCode;
        } else {
            serverCode = this.playerInfo.recentServer;
        }
        GLog.debug("http服务器 选择服务器", serverCode);
        const res = await this.request("game/selectServer", { serverCode });
        this.gameServerCode = res.serverCode;
        this.gameServerName = res.serverName;
        this.newRole = res.newRole;
        GLog.debug("http服务器 选择服务器成功", res);
        this.gameServerUrl = res.url;
        this.roleId = res.roleId;
        this.roleName = res.roleName;
        this.roleIcon = res.roleIcon;
        this.headFrame = res.headFrame;
        this.roleCreateTime = res.createTime;
    }

    private post(path: string, data: any): Promise<any> {
        return new Promise((resolve, reject) => {
            GLog.debug("HttpServer:" + this.address + path, data);
            try {
                let xhr = new XMLHttpRequest();
                xhr.onreadystatechange = () => {
                    if (xhr.readyState == 4 && xhr.status >= 200 && xhr.status < 400) {
                        const response = xhr.responseText;
                        resolve(JSON.parse(GUtils.secure.Base64Decode(response)));
                    }
                };
                xhr.onerror = () => {
                    reject();
                };
                if (
                    cc.sys.isNative ||
                    cc.sys.platform == cc.sys.BYTEDANCE_GAME ||
                    cc.sys.platform == cc.sys.WECHAT_GAME
                ) {
                    xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
                }
                xhr.open("POST", this.address + path + `?${Date.now()}`, true);
                let params: any = {
                    sessionKey: this.sessionKey,
                    data,
                };
                xhr.send(GUtils.secure.Base64Encode(JSON.stringify(params)));
            } catch (error) {
                GLog.debug(error);
                reject();
            }
        });
    }

    async request<Path extends keyof HttpServerProtocol>(path: Path, data: Parameters<HttpServerProtocol[Path]>[0]) {
        const now = Date.now();
        GLog.debug("HttpServer:" + path, data);
        const res: { errCode: number; errMessage: string; data: ReturnType<HttpServerProtocol[Path]> } =
            await this.post(path, data);
        GLog.debug("HttpServer:" + path, res, "delay", Date.now() - now, "ms");
        if (res.errCode == 0) {
            return res.data;
        } else if (res.errCode === 2001) {
            GWindow.open(WindowCommonTip, { tip: ["_rs" + res.errMessage] }).then((e) => {
                cc.game.end();
            });
            throw new Error(res.errMessage);
        } else {
            GTip.showTip(["_rs" + res.errMessage]);
            throw new Error(res.errMessage);
        }
    }

    async report(data: SdkReportEventName) {
        const reportUrl = "https://func-jhfb-statistics-mjiqszvbyn.cn-beijing.fcapp.run";
        const player_id = this.playerInfo.playerId || 0;
        const role_id = this.roleId || 0;
        const server_id = this.gameServerCode || "";
        const package_name = GSDK.getPackageName();
        const baseStr = JSON.stringify({
            player_id,
            role_id,
            server_id,
            d_key: data.kind,
            d_data: JSON.stringify(data.data),
            package_name,
        });
        const enc = GUtils.secure.Base64Encode(baseStr);
        GUtils.http.post(reportUrl, { enc });
    }
}

declare global {
    /** http服务器通信 */
    const HttpServer: HttpServer;
}
window["HttpServer"] = new HttpServer();

export type HttpServerProtocol = GameRoute;

type GameRoute = {
    /** 登录 */
    "game/login"(x: {
        sdkChannel: string;
        sdkUid: string;
        sdkExtra: string;
        packageName: string;
        extraInfo: string;
        extraParam: string;
    }): {
        playerInfo: PlayerInfo;
        package: PackageInfo;
    };
    /** 服务器列表 */
    "game/serverList"(x: {}): {
        list: {
            group: string;
            data: {
                /** 服务器名 */
                serverName: string;
                /** 服务器状态 */
                serverState: number;
                /** 服务器id */
                serverCode: string;
                /** 服务器分组 */
                serverGroup: string;
            }[];
        }[];
    };

    /** 选择服务器 */
    "game/selectServer"(x: { serverCode: string }): {
        url: string;
        newRole: boolean;
        roleId: number;
        roleName: string;
        roleIcon: number;
        serverCode: string;
        serverName: string;
        headFrame: number;
        /** 角色创建时间 */
        createTime: number;
    };

    /** 公告 */
    "game/announcement"(x: {}): {
        list: { title: string; content: string }[];
    };

    /** 中顺订单号 */
    "game/zsCpOrderId"(x: { orderId: string }): {
        cpOrderNO: string;
    };

    /** 切换服务器 */
    "game/changeServer"(x: { serverCode: string }): {
        ok: boolean;
    };
    /** 获取资源补丁 */
    "game/patch"(x: { currentVersion: string }): {
        patch: {
            fromVersion: string;
            toVersion: string;
            baseUrl: string;
            patch: string[];
        };
    };
};
