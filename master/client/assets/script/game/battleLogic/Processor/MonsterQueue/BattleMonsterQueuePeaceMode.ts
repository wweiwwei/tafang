import { BattleBattleStageObject } from "../../Object/BattleStage/BattleBattleStageObject";
import { BattleBattleStageData } from "../BattleBattleStageData";
import { BattleProcessor } from "../BattleProcessor";
import BattleMonsterQueue from "./BattleMonsterQueue";
import { BattleMonsterQueueScheduler } from "./BattleMonsterQueueScheduler";

export default class BattleMonsterQueuePeaceMode extends BattleMonsterQueue {
    private schedulerList: BattleMonsterQueueScheduler[] = [];
    private wave = 0;
    private waveFrame = 0;
    private waveDeadLineList: number[] = [];

    constructor(public waveId: number, public ctx: BattleProcessor) {
        super();
        this.resetScheduler();
    }

    resetScheduler() {
        const tbl = GTable.getById("MonsterWaveTbl", this.waveId);
        this.waveDeadLineList = tbl.waveTime.map((t) => Math.round(t / GConstant.battle.logicTick));
        [tbl.peaceMode]
            .filter((w) => w.length > 0)
            .forEach((list, index) => {
                const waveLevel = tbl.waveLevel[index];
                list.map((l) => new BattleMonsterQueueScheduler(index, l, waveLevel)).forEach((s) => {
                    this.schedulerList.push(s);
                });
            });
    }

    checkNextWave(ctx: BattleBattleStageData): void {
        if (ctx.defendTeam.size === 0 && !this.hasWaveRemain()) {
            this.newWave(ctx);
        }
    }
    newWave(ctx: BattleBattleStageData) {
        this.resetScheduler();
        this.waveFrame = ctx.frame;
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
    private getMonsterInitPos(ctx: BattleBattleStageData) {
        const sr = ctx.sr;
        const angle = sr.nextInt(0, 360);
        const pos = {
            x: 500 * Math.cos(angle),
            y: 500 * Math.sin(angle),
        };
        return pos;
    }
    nextEquipmentMonster(ctx: BattleBattleStageData, quality: number, uniqueId: number) {
        const tbl = GTable.getById("MonsterWaveTbl", this.waveId);
        const pos = this.getMonsterInitPos(ctx);
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
    isEmpty() {
        return false;
    }
    progress(ctx: BattleBattleStageData): number {
        return 0;
    }
}
