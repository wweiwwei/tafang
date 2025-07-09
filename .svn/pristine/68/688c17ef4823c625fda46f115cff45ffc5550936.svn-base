import { BattleBattleStageData } from "../BattleBattleStageData";

export class BattleRogueSkillManager {
    constructor(public ctx: BattleBattleStageData) {}

    refreshCount = 0;
    currentCards: number[] = [];

    totalSkillLevel = 1;
    getCurrentCardInfo() {
        const player = this.ctx.attackTeam.get(1);
        const independant = player.skillManager.independentSkill;
        return this.currentCards.map((rogueId) => {
            const s = independant.find((i) => i.skillInfo.rogueSkillId === rogueId);
            if (s) {
                // 有这个主动技能
                return {
                    rogueId,
                    level: s.skillInfo.level + 1,
                };
            }
            const passive = player.skillManager.roguePassiveSkill.find((p) => p.rogueSkillId === rogueId);
            if (passive) {
                // 有这个被动技能
                return {
                    rogueId,
                    level: passive.level + 1,
                };
            }
            // 没有这个技能
            return {
                rogueId,
                level: 1,
            };
        });
    }

    currentCost() {
        const costRate = (10000 - this.ctx.globalPropertyManager.finalProperty.skillCoinConsumeRate) * 0.0001;
        return Math.round(
            (this.refreshCount * GConstant.battle.skillPrice[0] + GConstant.battle.skillPrice[1]) *
                (costRate < 0.2 ? 0.2 : costRate)
        );
    }
    /** 刷新技能，消耗硬币 */
    refreshCard(): boolean {
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
    /** 重新刷新，无消耗 */
    reRoll() {
        this.refreshCurrentCard();
    }

    private refreshCurrentCard() {
        const player = this.ctx.attackTeam.get(1);
        const independant = player.skillManager.independentSkill;
        const full = independant.length >= 6;
        const maxLevel = independant
            .filter((s) => {
                // 满级不再刷出
                const tbl = GTable.getById("RogueSkillTbl", s.skillInfo.rogueSkillId);
                const lvMax = this.ctx.rogueEquipmentManager.hasUpgradeCard(tbl.kind) ? 6 : 5;
                return s.skillInfo.level >= lvMax;
            })
            .map((s) => s.skillInfo.rogueSkillId);
        let list: number[] = [];
        if (full) {
            // 只在已选择范围随机
            list = independant.map((s) => s.skillInfo.rogueSkillId).filter((id) => !maxLevel.includes(id));
        } else {
            // 全部可随机
            list = GTable.getList("RogueSkillTbl")
                .filter((t) => t.passive === 0)
                .map((t) => t.id)
                .filter((id) => !maxLevel.includes(id));
        }
        const sr = this.ctx.sr;
        this.currentCards = sr.rdArrayElement(list, 3);
        if (this.currentCards.length < 3) {
            // 主动技能不足，在被动技能中随机
            const list2 = GTable.getList("RogueSkillTbl")
                .filter((t) => t.passive === 1)
                .map((t) => t.id);
            this.currentCards = this.currentCards.concat(sr.rdArrayElement(list2, 3 - this.currentCards.length));
        }
    }

    chooseCard(id: number): boolean {
        if (!this.currentCards.includes(id)) return false;
        return this.upgrade(id);
    }

    private upgrade(id: number): boolean {
        this.currentCards = [];
        const player = this.ctx.attackTeam.get(1);
        const lv = player.skillManager.getRogueSkillLevel(id);
        if (lv === 5) {
            const tbl = GTable.getById("RogueSkillTbl", id);
            const ok = this.ctx.rogueEquipmentManager.removeUpgradeCard(tbl.kind);
            if (!ok) return false;
        }
        player.skillManager.addRougueSkill(id);
        this.totalSkillLevel += 1;
        this.ctx.globalPropertyManager.listenEvent("skillUp", 1);
        return true;
    }

    sellSkill(id: number): boolean {
        const player = this.ctx.attackTeam.get(1);
        const price = player.skillManager.sellRogueSkill(id);
        if (price > 0) {
            this.ctx.globalPropertyManager.coin += price;
            return true;
        } else {
            return false;
        }
    }

    randomUpgrade(count: number) {
        for (let i = 0; i < count; i++) {
            this.randomUpgradeOnce();
        }
    }

    private randomUpgradeOnce() {
        const player = this.ctx.attackTeam.get(1);
        const independant = player.skillManager.independentSkill;
        // 随机升级默认不升级6级技能
        const maxLevel = independant.filter((s) => s.skillInfo.level === 5).map((s) => s.skillInfo.rogueSkillId);
        let list: number[] = independant.map((s) => s.skillInfo.rogueSkillId).filter((id) => !maxLevel.includes(id));
        if (list.length === 0) return;
        const sr = this.ctx.sr;
        const id = sr.rdArrayElement(list, 1)[0];
        this.upgrade(id);
    }
}
