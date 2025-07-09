import WindowCommonConfirm from "../../module/common/WindowCommonConfirm";

export default class TestSdkShared {
    static async testPay(itemId: number, extra: string) {
        const tbl = GTable.getById("ChargeTbl", itemId);
        const ok = await GWindow.open(WindowCommonConfirm, {
            tip: [`_rs测试服充值模拟，看到本窗口代表该功能调用了充值功能，本次充值金额为${tbl.cny / 100}元`],
        });
        if (ok) {
            GApi.charge.testPay({ itemId, extra });
            return { orderId: `test_${Date.now()}` };
        } else {
            throw new Error("测试取消充值");
        }
    }

    static async testVideo() {
        const ok = await GWindow.open(WindowCommonConfirm, {
            tip: [`_rs测试服广告模拟，看到本窗口代表该功能调用了广告`],
        });
        if (!ok) {
            throw new Error("测试取消广告");
        }
    }
}
