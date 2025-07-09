import { BattleBattleStageData } from "../BattleBattleStageData";
import { BattleDirector } from "./BattleDirector";

export class BattleDirectorNormalMode extends BattleDirector {
    initBattle(): void {
        const playerObject = this.initPlayer();
        this.battlePrepair();
    }
    constructor(public ctx: BattleBattleStageData) {
        super(ctx);
    }
    /** 战斗是否已结束 */
    isBattleEnd(): boolean {
        return (
            this.ctx.attackTeam.size === 0 ||
            (this.ctx.defendTeam.size === 0 && this.ctx.monsterQueue.isEmpty()) ||
            this.overLimitTick >= GConstant.battle.failTick ||
            this.ctx.frame > this.ctx.ctx.tickLimit ||
            this.ctx.frame > this.ctx.bossEndTick
        );
    }

    /** 战斗是否胜利 */
    isBattleWin(): boolean {
        return (
            this.ctx.attackTeam.size > 0 &&
            this.ctx.defendTeam.size === 0 &&
            this.ctx.monsterQueue.isEmpty() &&
            this.ctx.frame <= this.ctx.ctx.tickLimit &&
            this.ctx.frame <= this.ctx.bossEndTick
        );
    }
    overLimitTick = 0;
    tick(): void {
        const monsterLimit = GTable.getById("MonsterWaveTbl", this.ctx.ctx.waveId).monsterLimit;
        if (this.ctx.defendTeam.size >= monsterLimit) {
            this.overLimitTick++;
        } else {
            this.overLimitTick = 0;
        }
    }
}
