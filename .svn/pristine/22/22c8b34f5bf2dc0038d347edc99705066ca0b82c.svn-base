import { BattleBattleStageData } from "../BattleBattleStageData";

export class BattleRogueEquipmentManager {
    constructor(public ctx: BattleBattleStageData) {}

    storage: Map<number, number> = new Map();

    refreshCount = 0;
    currentCards: number[] = [];

    upgradeCardId(kind: number) {
        return GTable.getList("RogueEquipmentTbl").find((t) => t.kind === 2 && t.extra[0] === kind).id;
    }

    currentCost() {
        const costRate = (10000 - this.ctx.globalPropertyManager.finalProperty.skillCoinConsumeRate) * 0.0001;
        return Math.round(
            (this.refreshCount * GConstant.battle.equipmentPrice[0] + GConstant.battle.equipmentPrice[1]) *
                (costRate < 0.2 ? 0.2 : costRate)
        );
    }

    /** 刷新技能，消耗硬币 */
    buyNormal(): boolean {
        const cost = this.currentCost();
        if (this.currentCards.length === 0 && this.ctx.globalPropertyManager.coin >= cost) {
            this.refreshCount++;
            this.ctx.globalPropertyManager.coin -= cost;
            this.refreshCurrentCard();
            return true;
        } else {
            return false;
        }
    }

    curRare = -1;
    /** 使用钻石购买物品 */
    buyRare(): boolean {
        if (this.ctx.globalPropertyManager.diamond >= 1) {
            this.ctx.globalPropertyManager.diamond -= 1;
            this.reRollRare();
            // const id = this.upgradeCardId;
            // this.addItem(id);
            return true;
        } else {
            return false;
        }
    }

    reRollRare() {
        const weight = GTable.getList("RogueEquipmentTbl").map((e) => e.weight2);
        const sr = this.ctx.sr;
        const res = sr.chooseWithWeight(GTable.getList("RogueEquipmentTbl"), weight);
        this.curRare = res.id;
    }

    /** 确认领取物品，返回最终领取到的物品 */
    confirmRare() {
        if (this.curRare === -1) return;
        const res = this.addItem(this.curRare);
        this.curRare = -1;
        return res;
    }
    /** 是否拥有技能升级卡 */
    hasUpgradeCard(kind: number) {
        const id = this.upgradeCardId(kind);
        return this.hasItem(id);
    }
    /** 是否拥有物品 */
    hasItem(id: number) {
        let exist = false;
        this.storage.forEach((v) => {
            if (id === v) exist = true;
        });
        return exist;
    }

    /** 重新刷新，无消耗 */
    reRoll() {
        this.refreshCurrentCard();
    }

    private refreshCurrentCard() {
        const p = this.ctx.globalPropertyManager.finalProperty;
        const sr = this.ctx.sr;
        let list = GTable.getList("RogueEquipmentTbl");
        const res: number[] = [];
        for (let i = 0; i < 3; i++) {
            const t = sr.chooseWithWeight(
                list,
                list.map((d) => d.weight)
            );
            // 概率品质提升
            const base = 10000 - p.equipmentUp3 - p.equipmentUp2 - p.equipmentUp1;
            const weight = [base > 0 ? base : 0, p.equipmentUp1, p.equipmentUp2, p.equipmentUp3];
            const qualityUp = sr.chooseIndexWithWeight(weight);
            let resId: number = t.id;
            if (qualityUp > 0) {
                const series = GTable.getList("RogueEquipmentTbl").filter((d) => d.series === t.series);
                const finalQuality = t.quality + qualityUp;
                const finalTbl = series.find((d) => d.quality === finalQuality);
                if (finalTbl) {
                    resId = finalTbl.id;
                } else {
                    const max = GUtils.array.maxBy(series, (d) => d.quality);
                    resId = max.id;
                }
            }
            res.push(resId);
            list = list.filter((d) => d.id !== resId);
        }
        this.currentCards = res;
    }
    private uid = 1;

    /** 添加物品，返回最终添加的物品 */
    addItem(id: number): { id: number; count: number } {
        let returnValue: { id: number; count: number };
        let itemId = id;
        const tbl = GTable.getById("RogueEquipmentTbl", id);
        if (tbl) {
            if (tbl.kind === 3) {
                // 随机装备箱
                const quality = tbl.extra[0];
                const list = GTable.getList("RogueEquipmentTbl").filter((d) => d.kind === 1 && d.quality === quality);
                const sr = this.ctx.sr;
                itemId = sr.rdArrayElement(list, 1)[0].id;
                returnValue = { id: itemId, count: 1 };
            } else if (tbl.kind === 4) {
                // 金币箱
                itemId = -1;
                this.ctx.globalPropertyManager.coin += tbl.extra[0];
                returnValue = { id: itemId, count: tbl.extra[0] };
            }
        }
        if (itemId > 0) {
            // 刷新buff
            const player = this.ctx.attackTeam.get(1);
            player.propertyManager.setFinalPropertyDirty();
            this.storage.set(this.uid, itemId);
            this.uid++;
        }
        return returnValue;
    }

    removeUpgradeCard(kind: number) {
        const id = this.upgradeCardId(kind);
        return this.removeItem(id);
    }
    removeItem(id: number) {
        // 刷新buff
        const player = this.ctx.attackTeam.get(1);
        player.propertyManager.setFinalPropertyDirty();
        let ok = false;
        let key = -1;
        this.storage.forEach((v, k) => {
            if (id === v) {
                key = k;
                ok = true;
            }
        });
        this.storage.delete(key);
        return ok;
    }
    chooseCard(id: number): boolean {
        if (!this.currentCards.includes(id)) return false;
        this.currentCards = [];
        this.addItem(id);
        return true;
    }
    /** 获取所有背包库存 */
    getAllStorage() {
        const res: { uid: number; id: number }[] = [];
        this.storage.forEach((uid, id) => {
            res.push({
                uid,
                id,
            });
        });
        return res;
    }
    // getEquipmentEffect(): { property: string; value: number }[] {
    //     const player = this.ctx.attackTeam.get(1);
    //     const baseP = player.propertyManager.baseProperty;
    //     const res: { property: string; value: number }[] = [];
    //     this.storage.forEach((id) => {
    //         const tbl = GTable.getById("RogueEquipmentTbl", id);
    //         if (tbl.kind === 1) {
    //             tbl.property.forEach(([p, v]) => {
    //                 res.push({ property: p, value: AstUtil.eval(v, [{ self: baseP }]) });
    //             });
    //         }
    //     });
    //     return res;
    // }
}
