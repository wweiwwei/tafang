import WindowUserTip from "../../module/loading/WindowUserTip";
import BaseSDK from "../base/BaseSDK";
import AndroidSdkShared from "../shared/AndroidSdkShared";
import { SdkReportEventName } from "../shared/SdkReportEventName";

type MXUserExtraData = {
    /** 玩家场景 */
    scene_Id: "enterServer" | "createRole" | "levelUp";
    /** 角色 id */
    roleId: string;
    /** 角色名 */
    roleName: string;
    /** 角色等级 */
    roleLevel: string;
    /** 服务器 id */
    zoneId: string;
    /** 服务器名称 */
    zoneName: string;
    /** 游戏币余额 */
    balance: string;
    /** Vip 等级 */
    vip: string;
    /** 所属帮派 */
    partyName: string;
    /** 单位为秒，创建角色的时间 */
    roleCTime: string;
    /** 单位为秒，角色等级变化时间 */
    roleLevelMTime: string;
};

type MXLoginData = {
    result: string;
    msg: string;
    uid: string;
    time: string;
    gametoken: string;
    sessid: string;
};

export default class MXAndroidSDK extends BaseSDK {
    currencyCode: CurrencyCode = "cny";
    private appClass = "org/cocos2dx/javascript/MXSDKTool";
    constructor() {
        super();
        window["GMXSDK"] = this;
    }
    getPackageName(): string {
        return AndroidSdkShared.getPackageName();
    }
    /** sdk层回调 */
    logoutCallback(): void {
        GUtils.game.restart();
    }
    /** sdk层回调 */
    switchAccountCallback(data: string): void {
        GUtils.game.restart();
    }
    /** sdk层回调 */
    initCallback(data: string): void {
        GLog.debug(data);
        this.sdkInitResolve();
    }
    private sdkInitResolve: () => void;
    private sdkInitReject: (reason?: any) => void;
    sdkInit(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.sdkInitResolve = resolve;
            this.sdkInitReject = reject;
            AndroidSdkShared.callNative(this.appClass, "sdkInit");
        });
    }
    /** sdk层回调 */
    loginCallback(data: string): void {
        const loginData: MXLoginData = JSON.parse(data);
        if (loginData.result === "success") {
            this.sdkChannel = "mx";
            this.sdkUid = loginData.uid;
            this.sdkExtra = "";
            this.extraInfo = data;
            this.extraParam = data;
            this.loginResolve();
        } else {
            this.loginReject();
        }
    }
    private loginResolve: () => void;
    private loginReject: (reason?: any) => void;
    sdkLogin(): Promise<void> {
        return new Promise(async (resolve, reject) => {
            if (!GModel.localStorage.confirmPrivacy) {
                await GWindow.open(WindowUserTip);
            }
            this.loginResolve = resolve;
            this.loginReject = reject;
            AndroidSdkShared.callNative(this.appClass, "sdkLogin");
        });
    }
    /** sdk层回调 */
    videoCallback(data: string): void {
        if (data.startsWith("1")) {
            this.videoResolve();
        } else {
            this.videoReject();
        }
    }
    private videoResolve: () => void;
    private videoReject: (reason?: any) => void;
    showVideoImpl(videoType: string): Promise<void> {
        return new Promise((resolve, reject) => {
            this.videoResolve = resolve;
            this.videoReject = reject;
            AndroidSdkShared.callNative(this.appClass, "showVideo", { videoType });
        });
    }
    payImpl(itemId: number, extra: string): Promise<{ orderId: string }> {
        GTip.showTip(["_rs暂未开放充值功能"]);
        throw new Error("Method not implemented.");
    }
    async report(data: SdkReportEventName): Promise<void> {
        if (["newRole", "enterMainScene", "levelUp"].includes(data.kind)) {
            const extraData: MXUserExtraData = {
                scene_Id: "enterServer",
                roleId: HttpServer.roleId.toString(),
                roleName: HttpServer.roleName,
                roleLevel: GModel.player.level().toString(),
                zoneId: HttpServer.gameServerCode,
                zoneName: HttpServer.gameServerName,
                balance: "0",
                vip: "1",
                partyName: "无",
                roleCTime: Math.floor(HttpServer.roleCreateTime / 1000).toString(),
                roleLevelMTime: Math.floor(Date.now() / 1000).toString(),
            };
            if (data.kind === "newRole") {
                extraData.scene_Id = "createRole";
            } else if (data.kind === "enterMainScene") {
                extraData.scene_Id = "enterServer";
            } else if (data.kind === "levelUp") {
                extraData.scene_Id = "levelUp";
            }
            AndroidSdkShared.callNative(this.appClass, "submitExtraData", extraData);
        }
    }
    shockScreen(): void {
        AndroidSdkShared.vibrate();
    }
    copyToClipboard(text: string): void {
        AndroidSdkShared.copyToClipboard(text);
    }

    /** sdk层回调 */
    onSwitchAccountCallback() {
        GUtils.game.restart();
    }

    /** sdk层回调 */
    onLogoutCallback() {
        GUtils.game.restart();
    }
}
