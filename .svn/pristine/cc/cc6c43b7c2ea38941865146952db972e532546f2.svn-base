import WindowCommonConfirm from "../../module/common/WindowCommonConfirm";
import WindowGMLogin from "../../module/test/WindowGMLogin";
import BaseSDK from "../base/BaseSDK";
import BrowserSdkShared from "../shared/BrowserSdkShared";
import { SdkReportEventName } from "../shared/SdkReportEventName";
import TestSdkShared from "../shared/TestSdkShared";

export default class H5TestSDK extends BaseSDK {
    async sdkInit(): Promise<void> {}
    async report(data: SdkReportEventName) {}
    shockScreen(): void {}
    copyToClipboard(text: string): void {
        BrowserSdkShared.copy(text);
    }
    isTest: boolean = true;
    async payImpl(itemId: number, extra: string) {
        return TestSdkShared.testPay(itemId, extra);
    }
    currencyCode: CurrencyCode = "cny";
    getPackageName(): string {
        return "com.browser.test";
    }
    async sdkLogin(): Promise<void> {
        const { sdkChannel, sdkUid, sdkExtra } = await GWindow.open(WindowGMLogin);
        this.sdkChannel = sdkChannel;
        this.sdkUid = sdkUid;
        this.sdkExtra = sdkExtra;
        this.extraInfo = JSON.stringify({ stamp: Date.now() });
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
    async showVideoImpl(videoType: string): Promise<void> {
        await TestSdkShared.testVideo();
    }
}
