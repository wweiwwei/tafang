import Item from "../entity/Item";
import PlayerOrder from "../entity/PlayerOrder";
import WindowCongratulation from "../module/common/WindowCongratulation";

export class ChargeModel {
    isClearAd() {
        // todo 是否购买了去广告
        return GState.data.chargeData.clearAd;
    }

    pay(itemId: number, extra: string) {
        GSDK.pay(itemId, extra);
    }

    private doing: boolean = false;
    private todoNext: Function = null;
    async checkReward() {
        const order = GState.data.charge.canGetOrder;
        if (order.length === 0) return;
        const first = order[0];
        if (!this.doing) {
            this.doing = true;
            await this.handleReward(first);
            this.doing = false;
            if (this.todoNext) {
                const func = this.todoNext;
                this.todoNext = null;
                func();
            }
        } else {
            this.todoNext = () => this.checkReward();
        }
    }
    /**查询月卡剩余时间 */
    async checkMonthRemain(): Promise<number> {
        // console.log(await GApi.charge.checkMonthRemain());
        return await GApi.charge.checkMonthRemain();
    }
    /** 查询获取月卡奖励*/
    async checkMonthReward() {
        if (GState.data.chargeData.month1.reward && (await this.checkMonthRemain()) > 0) {
            const reward = await GApi.charge.obtainMonthCardReward();
            console.log("month1", reward);
            await GWindow.open(WindowCongratulation, { items: reward });
        }
        if (GState.data.chargeData.month2.active && GState.data.chargeData.month2.reward) {
            const reward = await GApi.charge.obtainPermanentCardReward();
            console.log("month2", reward);
            await GWindow.open(WindowCongratulation, { items: reward });
        }
    }
    /**充值激活功能 */
    async handleReward(order: PlayerOrder) {
        const tbl = GTable.getById("ChargeTbl", order.itemId);
        GSDK.report({
            kind: "payItemReceive",
            data: { itemId: order.itemId, extra: order.extra, orderId: order.orderId },
        });
        switch (tbl.kind) {
            case 1:
                await this.handleDiamond(order);
                break;
            case 2:
                await this.handlePinkDiamond(order);
                break;
            case 3:
                await this.handleClearAd(order);
                break;
            case 4:
            case 5:
                await this.handleMonthCard(order);
                break;
            case 6:
                await this.handlePackage(order);
                break;
            case 7:
                await this.handleFirstCharge(order);
                break;
            default:
        }
    }
    /**激活钻石 */
    async handleDiamond(order: PlayerOrder) {
        const reward: Item[] = await GApi.charge.obtainReward({ id: order.id });
        GWindow.open(WindowCongratulation, {
            items: reward,
        });
        // reward.forEach((item) => {
        //     GTip.showRewardItem(item);
        // });
    }
    /**激活粉钻 */
    async handlePinkDiamond(order: PlayerOrder) {
        const reward: Item[] = await GApi.charge.obtainReward({ id: order.id });
        reward.forEach((item) => {
            GTip.showRewardItem(item);
        });
    }
    /**激活免广告 */
    async handleClearAd(order: PlayerOrder) {
        const reward: Item[] = await GApi.charge.obtainReward({ id: order.id });
        GWindow.open(WindowCongratulation, { items: reward });
        // reward.forEach((item) => {
        //     GTip.showRewardItem(item);
        // });
        GTip.showTip([GLang.code.ui.clear_advertisement_actived]);
    }
    /**激活月卡或永久卡 */
    async handleMonthCard(order: PlayerOrder) {
        const reward: Item[] = await GApi.charge.obtainReward({ id: order.id });
        GWindow.open(WindowCongratulation, { items: reward });
        // reward.forEach((item) => {
        //     GTip.showRewardItem(item);
        // });
        GTip.showTip([
            GTable.getById("ChargeTbl", order.itemId).kind === 4
                ? GLang.code.ui.month_card_actived
                : GLang.code.ui.permanent_card_actived,
        ]);
    }
    /**激活礼包 */
    async handlePackage(order: PlayerOrder) {
        const reward: Item[] = await GApi.charge.obtainReward({ id: order.id });
        GWindow.open(WindowCongratulation, { items: reward });
        // reward.forEach((item) => {
        //     GTip.showRewardItem(item);
        // });
    }
    /**激活首充 */
    async handleFirstCharge(order: PlayerOrder) {
        const reward: Item[] = await GApi.charge.obtainReward({ id: order.id });
        console.log(reward);

        GWindow.open(WindowCongratulation, { items: reward });
    }

    /** 获取充值项目的价格文本 */
    getItemPriceText(itemId: number): string {
        const tbl = GTable.getById("ChargeTbl", itemId);
        const code = GSDK.currencyCode;
        if (code === "cny") {
            return "_rs" + tbl.cny / 100;
        } else if (code === "usd") {
            return "_rs" + tbl.usd / 100;
        }
    }
}
