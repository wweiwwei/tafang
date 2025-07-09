import { BattleDisplayEvent } from "../../Display/BattleDisplayEvent";
import { BattleBattleStageObject } from "../../Object/BattleStage/BattleBattleStageObject";
import { BattleBattleStageData } from "../BattleBattleStageData";
import { BattleProcessor } from "../BattleProcessor";
import BattleMonsterQueue from "./BattleMonsterQueue";
import { BattleMonsterQueueScheduler } from "./BattleMonsterQueueScheduler";

export default class BattleMonsterQueueInfiniteMode extends BattleMonsterQueue {
    private schedulerList: BattleMonsterQueueScheduler[] = [];
    private wave = 1;
    private waveFrame = 0;

    constructor(public waveId: number, public ctx: BattleProcessor) {
        super();
        this.initWave(ctx, this.wave);
    }

    private initWave(ctx: BattleProcessor, wave: number) {
        this.schedulerList = [];
        const infiniteTbl = GTable.getList("InfiniteBattleTbl").find((t) => t.lv[0] <= wave && t.lv[1] >= wave);
        const waveId = infiniteTbl.guard;
        const isBoss = this.wave % infiniteTbl.boss === 0;
        const tbl = GTable.getById("MonsterWaveTbl", waveId);
        if (isBoss) {
            ctx.pushDisplayEvent(new BattleDisplayEvent("showEnemyTip", { kind: 2 }));
        } else if (tbl.waveTip[this.wave] > 0) {
            ctx.pushDisplayEvent(new BattleDisplayEvent("showEnemyTip", { kind: 1 }));
        }
        const extraLevel = AstUtil.eval(infiniteTbl.waveLevel, [{ lv: this.wave }]);
        if (isBoss) {
            this.schedulerList.push(new BattleMonsterQueueScheduler(this.wave, [tbl.boss[0], 1, 0, 0, -1], extraLevel));
        } else {
            const dataList = [tbl.wave1, tbl.wave2, tbl.wave3, tbl.wave4, tbl.wave5].filter((w) => w.length > 0);
            const len = dataList.length;
            const index = (this.wave - infiniteTbl.lv[0]) % len;
            const waveLevel = tbl.waveLevel[index];
            dataList[index]
                .map((l) => new BattleMonsterQueueScheduler(index, l, waveLevel + extraLevel))
                .forEach((s) => {
                    this.schedulerList.push(s);
                });
        }
    }
    checkNextWave(ctx: BattleBattleStageData): void {
        if (ctx.defendTeam.size === 0 && !this.hasWaveRemain()) {
            this.newWave(ctx);
        }
    }

    newWave(ctx: BattleBattleStageData) {
        this.wave++;
        this.waveFrame = ctx.frame;
        this.initWave(ctx.ctx, this.wave);
    }

    nextMonster(ctx: BattleBattleStageData): BattleBattleStageObject[] {
        const res: BattleBattleStageObject[] = [];
        this.schedulerList.forEach((s) => {
            if (s.isActive(this.wave)) {
                s.nextMonster(ctx, this.wave, this.waveFrame).forEach((m) => {
                    res.push(m);
                });
            }
        });
        return res;
    }

    hasWaveRemain() {
        return this.schedulerList.some((s) => s.isActive(this.wave));
    }

    isEmpty() {
        return false;
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
        return this.wave;
    }
}
