import { BattleBattleStageObject } from "../../Object/BattleStage/BattleBattleStageObject";
import { BattleBattleStageData } from "../BattleBattleStageData";
import { BattleProcessor } from "../BattleProcessor";
import BattleMonsterQueue from "./BattleMonsterQueue";

export default class BattleMonsterQueueBossMode extends BattleMonsterQueue {
    private bossList: number[] = [];
    private hasSpawn = false;

    constructor(public waveId: number, public ctx: BattleProcessor) {
        super();
        const tbl = GTable.getById("MonsterWaveTbl", waveId);
        this.bossList = tbl.boss.map((v) => v);
    }
    checkNextWave(ctx: BattleBattleStageData): void {
        return;
    }

    nextMonster(ctx: BattleBattleStageData): BattleBattleStageObject[] {
        if (this.hasSpawn) return [];
        this.hasSpawn = true;
        const pos = ctx.mapInfo.getBossPos();
        const res: BattleBattleStageObject[] = [];
        this.bossList.forEach((id) => {
            const monster = BattleBattleStageObject.createMonster(ctx, id, this.ctx.env, pos);
            res.push(monster);
        });
        return res;
    }

    isEmpty() {
        return this.hasSpawn;
    }

    progress(ctx: BattleBattleStageData): number {
        const alive = ctx.defendTeam.size;
        return (this.bossList.length - alive) / this.bossList.length;
    }
}
