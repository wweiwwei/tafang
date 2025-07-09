import WindowCommonConfirm from "../../module/common/WindowCommonConfirm";
import WindowGMLogin from "../../module/test/WindowGMLogin";
import BaseSDK from "../base/BaseSDK";
import { SdkReportEventName } from "../shared/SdkReportEventName";
import TestSdkShared from "../shared/TestSdkShared";

export default class TestServerSDK extends BaseSDK {
    async sdkInit(): Promise<void> {}
    async report(data: SdkReportEventName) {}
    shockScreen(): void {}
    copyToClipboard(text: string): void {}

    isTest: boolean = true;
    async payImpl(itemId: number, extra: string) {
        return TestSdkShared.testPay(itemId, extra);
    }
    currencyCode: CurrencyCode = "cny";
    getPackageName(): string {
        return "com.tower.android.test";
    }
    async sdkLogin(): Promise<void> {
        const { sdkChannel, sdkUid, sdkExtra } = await GWindow.open(WindowGMLogin);
        this.sdkChannel = sdkChannel;
        this.sdkUid = sdkUid;
        this.sdkExtra = sdkExtra;
    }
    async showVideoImpl(videoType: string): Promise<void> {
        await TestSdkShared.testVideo();
    }
}
