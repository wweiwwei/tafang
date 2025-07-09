import { BattleBattleStageObject } from "../../Object/BattleStage/BattleBattleStageObject";
import { BattleBattleStageData } from "../BattleBattleStageData";
import { BattleProcessor } from "../BattleProcessor";
import BattleMonsterQueue from "./BattleMonsterQueue";

export default class BattleMonsterQueueGuideMode extends BattleMonsterQueue {
    private monsterId = 0;

    constructor(public waveId: number, public ctx: BattleProcessor) {
        super();
        const tbl = GTable.getById("MonsterWaveTbl", waveId);
        // this.monsterId = tbl.peaceMode[0][0];
    }

    checkNextWave(ctx: BattleBattleStageData): void {}

    nextMonster(ctx: BattleBattleStageData): BattleBattleStageObject[] {
        if (this.remain <= 0 || ctx.frame - this.lastFrame < 15) return [];
        this.lastFrame = ctx.frame;
        this.remain -= 1;
        const monster = BattleBattleStageObject.createMonster(ctx, this.monsterId, this.ctx.env, {
            x: Math.round(-150 + 300 * Math.random()),
            y: Math.round(250 + -100 * Math.random()),
        });
        return [monster];
    }

    nextEquipmentMonster(ctx: BattleBattleStageData, quality: number, uniqueId: number) {
        const tbl = GTable.getById("MonsterWaveTbl", this.waveId);
        const pos = {
            x: 0,
            y: 250,
        };
        const monster = BattleBattleStageObject.createMonster(ctx, tbl.equipmentMonster, this.ctx.env, pos);
        monster.extraInfo = {
            equipmentMonsterUniqueId: uniqueId,
            equipmentQuality: quality,
        };
        const eTbl = GTable.getList("EquipmentMonsterTbl").find((t) => t.quality === quality);
        if (eTbl) {
            monster.info.property.maxHp = Math.round(ctx.attackTeam.get(1).info.property.attack * eTbl.life);
            monster.info.property.defence = 0;
            monster.info.property.armor = 0;
            monster.info.property.dodge = 0;
        }
        return [monster];
    }
    private remain: number = 0;
    private lastFrame: number = 0;
    nextGuideMonster(ctx: BattleBattleStageData, count: number): BattleBattleStageObject[] {
        this.remain += count;
        this.lastFrame = ctx.frame;
        return [];
    }

    isEmpty() {
        return false;
    }

    progress(ctx: BattleBattleStageData): number {
        return 0;
    }
}
