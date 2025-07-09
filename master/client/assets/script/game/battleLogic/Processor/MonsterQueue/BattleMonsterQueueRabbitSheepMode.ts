import { BattleDisplayEvent } from "../../Display/BattleDisplayEvent";
import { BattleBattleStageObject } from "../../Object/BattleStage/BattleBattleStageObject";
import { BattleBattleStageData } from "../BattleBattleStageData";
import { BattleProcessor } from "../BattleProcessor";
import BattleMonsterQueue from "./BattleMonsterQueue";
import { BattleMonsterQueueScheduler } from "./BattleMonsterQueueScheduler";

export default class BattleMonsterQueueRabbitSheepMode extends BattleMonsterQueue {
    private monsterId = 602001;

    constructor(public waveId: number, public ctx: BattleProcessor) {
        super();
        const tbl = GTable.getById("MonsterWaveTbl", waveId);
        // this.monsterId = tbl.peaceMode[0][0];
    }

    checkNextWave(ctx: BattleBattleStageData): void {}

    nextMonster(ctx: BattleBattleStageData): BattleBattleStageObject[] {
        if (this.remain <= 0 || ctx.frame - this.lastFrame < 5) return [];
        this.lastFrame = ctx.frame;
        this.remain -= 1;
        const sr = ctx.sr;
        const radius = 500;
        const angle = sr.nextInt(0, 360);
        const pos = {
            x: radius * Math.cos(angle),
            y: radius * Math.sin(angle),
        };
        const monster = BattleBattleStageObject.createMonster(ctx, this.monsterId, this.ctx.env, pos);
        return [monster];
    }

    nextEquipmentMonster(ctx: BattleBattleStageData, quality: number, uniqueId: number) {
        return [];
    }
    private remain: number = 1;
    private lastFrame: number = 0;
    nextGuideMonster(ctx: BattleBattleStageData, count: number): BattleBattleStageObject[] {
        this.remain += count;
        // this.lastFrame = ctx.frame;
        return [];
    }

    isEmpty() {
        return false;
    }

    progress(ctx: BattleBattleStageData): number {
        return 0;
    }
}
