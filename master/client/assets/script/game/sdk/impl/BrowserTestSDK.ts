import PlatformConfig from "../../config/PlatformConfig";
import WindowCommonConfirm from "../../module/common/WindowCommonConfirm";
import WindowGMLogin from "../../module/test/WindowGMLogin";
import BaseSDK from "../base/BaseSDK";
import BrowserSdkShared from "../shared/BrowserSdkShared";
import { SdkReportEventName } from "../shared/SdkReportEventName";
import TestSdkShared from "../shared/TestSdkShared";

export default class BrowserTestSDK extends BaseSDK {
    async sdkInit(): Promise<void> {
        // 默认使用测试服
        PlatformConfig.serverCode = "test";
    }
    async report(data: SdkReportEventName) {}
    isTest: boolean = true;
    async payImpl(itemId: number, extra: string) {
        return TestSdkShared.testPay(itemId, extra);
    }
    currencyCode: CurrencyCode = "cny";
    async showVideoImpl(videoType: string): Promise<void> {
        await TestSdkShared.testVideo();
    }

    async sdkLogin() {
        const { sdkChannel, sdkUid, sdkExtra } = await GWindow.open(WindowGMLogin);
        this.sdkChannel = sdkChannel;
        this.sdkUid = sdkUid;
        this.sdkExtra = sdkExtra;
        this.extraInfo = JSON.stringify({
            stamp: Date.now(),
        });
        cc.systemEvent.on(
            cc.SystemEvent.EventType.KEY_DOWN,
            (e) => {
                if (e.keyCode === cc.macro.KEY.enter) {
                    GTest.gmToggle();
                }
            },
            this
        );
    }
    getPackageName(): string {
        return "com.browser.test";
    }

    copyToClipboard(text: string): void {
        BrowserSdkShared.copy(text);
    }

    shockScreen(): void {}
}
