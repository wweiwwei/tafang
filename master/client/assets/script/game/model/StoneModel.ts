import EventBus from "../../framework/event/EventBus";
import { EquipmentMonster } from "../entity/EquipmentMonster";
import Item from "../entity/Item";
import { PlayerEquipment } from "../entity/PlayerEquipment";
import EventName from "../event/EventName";
import { StoneAutoSetting } from "./StoneAutoSetting";
import { StoneInfo } from "./StoneInfo";

export default class StoneModel {
    /** 是否开启了自动 */
    private auto = false;
    /** 启动自动 */
    openAuto() {
        if (GModel.knapsack.getStorageById(GIndex.id.turntableStorageId) <= 0) {
            return;
        }
        if (!this.auto) GTip.showTip([GLang.code.ui.auto_start]);
        this.auto = true;
        EventBus.emit(EventName.stoneAutoChange);
    }
    /** 停止自动 */
    stopAuto() {
        if (this.auto) GTip.showTip([GLang.code.ui.auto_end]);
        this.auto = false;
        EventBus.emit(EventName.stoneAutoChange);
    }
    /** 当前是否自动状态 */
    isAuto() {
        return this.auto;
    }
    /** 石头信息 */
    stone(): StoneInfo {
        return GState.data.stone;
    }
    /** 石头自动设置 */
    stoneAuto(): StoneAutoSetting {
        return GState.data.stoneAuto;
    }
    /** 修改自动设置 */
    changeAutoSetting(setting: StoneAutoSetting): Promise<void> {
        return GApi.stone.changeAutoSetting({ setting });
    }
    /** 阶段升级 */
    upgradeStage(): Promise<void> {
        return GApi.stone.upgradeStage();
    }
    /** 升级 */
    upgrade(): Promise<void> {
        return GApi.stone.upgrade();
    }
    /**
     * 升级加速（减少时间）
     * kind: 1使用视频加速，2使用物品加速
     * count: 加速物品/视频消耗次数
     * */
    accelerate(kind: number, count: number): Promise<void> {
        return GApi.stone.accelerate({ kind, count });
    }

    /** 抽卡 */
    async drawCard(uniqueId: number): Promise<
        {
            /** 获得的装备 */
            equipment: PlayerEquipment;
            /** 分解出来的物品和其他奖励物品 */
            reward: Item[];
            /** 分解得到的经验值 */
            exp: number;
            /** 是否被自动售出了 */
            sell: boolean;
        }[]
    > {
        const res = await GApi.stone.drawCard({ auto: this.auto, uniqueId });
        // 修复原型链
        res.forEach((d) => Reflect.setPrototypeOf(d.equipment, PlayerEquipment.prototype));
        return res;
    }

    /** 抽卡，直接版 */
    async drawCard2(): Promise<
        {
            /** 获得的装备 */
            equipment: PlayerEquipment;
            /** 分解出来的物品和其他奖励物品 */
            reward: Item[];
            /** 分解得到的经验值 */
            exp: number;
            /** 是否被自动售出了 */
            sell: boolean;
        }[]
    > {
        const res = await GApi.stone.drawCard2({ auto: this.auto });
        // 修复原型链
        res.forEach((d) => Reflect.setPrototypeOf(d.equipment, PlayerEquipment.prototype));
        return res;
    }
    /** 召唤 */
    summon(count: number) {
        return GApi.stone.summon({ count });
    }

    /** 经验进度 */
    getLevelProgress() {
        const info = this.stone();
        const total = info.totalSummon;
        const preAcc = GTable.getList("StoneLevelTbl")
            .filter((t) => t.level < info.level)
            .reduce((pre, c) => pre + c.upgradeCost, 0);
        const tbl = GTable.getList("StoneLevelTbl").find((t) => t.level === info.level);
        const current = total - preAcc;
        return {
            current,
            require: tbl.upgradeCost,
        };
    }
    equipmentMonster() {
        return GState.data.equipmentMonster;
    }
}
