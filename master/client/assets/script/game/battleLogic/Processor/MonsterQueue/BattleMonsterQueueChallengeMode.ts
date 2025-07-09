import { BattleDisplayEvent } from "../../Display/BattleDisplayEvent";
import { BattleBattleStageObject } from "../../Object/BattleStage/BattleBattleStageObject";
import { BattleBattleStageData } from "../BattleBattleStageData";
import { BattleProcessor } from "../BattleProcessor";
import BattleMonsterQueue from "./BattleMonsterQueue";
import { BattleMonsterQueueScheduler } from "./BattleMonsterQueueScheduler";

export default class BattleMonsterQueueChallengeMode extends BattleMonsterQueue {
    private schedulerList: BattleMonsterQueueScheduler[] = [];
    private wave = 0;
    private waveFrame: number[] = [0];
    private waveCountDown: number = 0;
    private waveOrigin: number = 0;
    private maxWave: number = 0;
    constructor(public waveId: number, public ctx: BattleProcessor) {
        super();
        const tbl = GTable.getById("MonsterWaveTbl", waveId);
        const tblList = tbl.waveList.map((id) => GTable.getById("MonsterWaveDetailTbl", id));
        this.maxWave = tbl.waveList.length;
        this.waveCountDown = tblList[0].waveTime;
        this.waveOrigin = tblList[0].waveTime;
        // let acc = 0;
        // this.waveDeadLineList = tblList.map((t) => {
        //     const res = acc;
        //     acc += Math.round(t.waveTime / GConstant.battle.logicTick);
        //     return res;
        // });
        tblList.forEach((t, index) => {
            const waveLevel = t.waveLevel;
            t.wave
                .map((l) => new BattleMonsterQueueScheduler(index, l, waveLevel))
                .forEach((s) => {
                    this.schedulerList.push(s);
                });
        });
        if (tblList[0].waveTip > 0) {
            ctx.pushDisplayEvent(new BattleDisplayEvent("showEnemyTip", { kind: 1 }));
        }
    }
    checkNextWave(ctx: BattleBattleStageData): void {
        this.waveCountDown -= GConstant.battle.logicTick;
        if (this.wave === this.maxWave - 1) return;
        if (this.waveCountDown <= 0) {
            // 时间到，强制下一波
            this.newWave(ctx);
            return;
        }
        if (ctx.defendTeam.size === 0 && !this.hasWaveRemain()) {
            this.newWave(ctx);
        }
    }

    newWave(ctx: BattleBattleStageData) {
        const tbl = GTable.getById("MonsterWaveTbl", this.waveId);
        const tblList = tbl.waveList.map((id) => GTable.getById("MonsterWaveDetailTbl", id));
        this.wave++;
        if (tblList[this.wave].waveTip > 0) {
            ctx.pushDisplayEvent(new BattleDisplayEvent("showEnemyTip", { kind: 1 }));
        }
        this.waveCountDown = tblList[this.wave].waveTime;
        this.waveOrigin = tblList[this.wave].waveTime;
        this.waveFrame[this.wave] = ctx.frame;
    }

    nextMonster(ctx: BattleBattleStageData): BattleBattleStageObject[] {
        const res: BattleBattleStageObject[] = [];
        this.schedulerList.forEach((s) => {
            if (s.isActive(this.wave)) {
                s.nextPortal(ctx, this.wave, this.waveFrame[s.wave]).forEach((p) => {
                    ctx.pushDisplayEvent(new BattleDisplayEvent("showPortal", { position: p }));
                });
                s.nextMonster(ctx, this.wave, this.waveFrame[s.wave]).forEach((m) => {
                    res.push(m);
                });
            }
        });
        return res;
    }

    hasWaveRemain() {
        return this.schedulerList.some((s) => s.isActive(this.wave));
    }

    nextEquipmentMonster(ctx: BattleBattleStageData, quality: number, uniqueId: number) {
        return [];
    }

    isEmpty() {
        return this.schedulerList.every((s) => s.isEmpty());
    }

    progress(ctx: BattleBattleStageData): number {
        let total = 0;
        let hasSpawn = 0;
        let equipmentMonsterCount = ctx.equipmentMonster.length;
        this.schedulerList.forEach((s) => {
            total += s.count;
            hasSpawn += s.hasSpawn;
        });
        const alive = ctx.defendTeam.size - equipmentMonsterCount;
        return (hasSpawn - alive) / total;
    }
    getWave(): number {
        return this.wave + 1;
    }
    getWaveProgress(): number {
        return (this.waveOrigin - this.waveCountDown) / this.waveOrigin;
    }
}
