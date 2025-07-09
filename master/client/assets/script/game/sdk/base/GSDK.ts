import BrowserTestSDK from "../impl/BrowserTestSDK";
import H5TestSDK from "../impl/H5TestSDK";
import MXAndroidSDK from "../impl/MXAndroidSDK";
import TestServerSDK from "../impl/TestServerSDK";
import ZSWechatSDK from "../impl/ZSWechatSDK";
import AndroidSdkShared from "../shared/AndroidSdkShared";
import { SdkReportEventName, VideoTypeText } from "../shared/SdkReportEventName";
import BaseSDK from "./BaseSDK";

export default class SDKManager {
    private sdkImpl: BaseSDK;

    constructor() {
        if (CC_PREVIEW) {
            this.sdkImpl = new BrowserTestSDK();
        } else if (cc.sys.isNative) {
            if (cc.sys.os === cc.sys.OS_ANDROID) {
                const sdkName = AndroidSdkShared.getSdkName();
                if (sdkName === "test") {
                    this.sdkImpl = new TestServerSDK();
                } else if (sdkName === "mx") {
                    this.sdkImpl = new MXAndroidSDK();
                } else {
                    throw Error("unknown sdk");
                }
            }
        } else if (cc.sys.isBrowser) {
            this.sdkImpl = new H5TestSDK();
        } else if (cc.sys.platform === cc.sys.WECHAT_GAME) {
            this.sdkImpl = new ZSWechatSDK();
        }
    }

    get isTest(): boolean {
        return this.sdkImpl.isTest;
    }

    /** 当前sdk渠道，不可为空 */
    get sdkChannel(): string {
        return this.sdkImpl.sdkChannel;
    }
    /** sdk账号唯一id，不可为空 */
    get sdkUid(): string {
        return this.sdkImpl.sdkUid;
    }
    /** sdk额外标识，备用，可以为空 */
    get sdkExtra(): string {
        return this.sdkImpl.sdkExtra;
    }
    /** 额外信息 */
    get extraInfo(): string {
        return this.sdkImpl.extraInfo;
    }
    /** 额外参数 */
    get extraParam(): string {
        return this.sdkImpl.extraParam;
    }
    /** 货币编号 */
    get currencyCode(): CurrencyCode {
        return this.sdkImpl.currencyCode;
    }
    /** 包名 */
    getPackageName(): string {
        return this.sdkImpl.getPackageName();
    }
    async enterMainScene() {
        await this.sdkImpl.enterMainScene();
    }

    /** sdk初始化 */
    async sdkInit(): Promise<void> {
        GLog.debug("sdk init");
        await this.sdkImpl.sdkInit();
        GLog.debug("sdk init end");
        this.report({
            kind: "sdkInit",
            data: {},
        });
    }
    /** sdk登录，初始化sdkChannel，sdkUid，sdkExtra */
    async sdkLogin(): Promise<void> {
        GLog.debug("sdk login");
        await this.sdkImpl.sdkLogin();
        GLog.debug("sdk login end");
        this.report({
            kind: "sdkLogin",
            data: {},
        });
    }
    /** 展示视频，传入视频点信息用于打点 */
    async showVideo(videoType: keyof typeof VideoTypeText): Promise<void> {
        if (GModel.charge.isClearAd()) {
            // 如果已经购买了去广告，不展示视频
            return;
        }
        try {
            GSDK.report({
                kind: "showVideo",
                data: { videoType },
            });
            await this.sdkImpl.showVideoImpl(videoType);
            GSDK.report({
                kind: "showVideoSuccess",
                data: { videoType },
            });
        } catch (e) {
            GSDK.report({
                kind: "showVideoFail",
                data: { videoType },
            });
            throw e;
        }
    }
    /** 支付 */
    async pay(itemId: number, extra: string) {
        GSDK.report({
            kind: "pay",
            data: { itemId, extra },
        });
        const res = await this.sdkImpl.payImpl(itemId, extra);
        GSDK.report({
            kind: "paySuccess",
            data: { itemId, extra },
        });
    }
    /** 打点 */
    async report(data: SdkReportEventName) {
        GLog.debug("sdk report", data);
        if (!this.isTest) HttpServer.report(data);
        try {
            this.sdkImpl.report(data);
        } catch (e) {
            GLog.warn("sdk report error", data, e);
            console.log(e);
        }
    }
    /** 震屏 */
    shockScreen(): void {
        this.sdkImpl.shockScreen();
    }
    /** 复制到剪切板 */
    copyToClipboard(text: string): void {
        this.sdkImpl.copyToClipboard(text);
    }
    /** 信息安全检查 */
    async msgCheck(content: string): Promise<boolean> {
        return await this.sdkImpl.msgCheck(content);
    }
    supportZip() {
        return true;
    }
}

window["GSDK"] = new SDKManager();
declare global {
    const GSDK: SDKManager;
}
