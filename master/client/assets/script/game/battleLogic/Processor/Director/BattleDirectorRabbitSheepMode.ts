import { BattleBattleStageObject } from "../../Object/BattleStage/BattleBattleStageObject";
import { BattleBattleStageData } from "../BattleBattleStageData";
import { BattleDirector } from "./BattleDirector";

export class BattleDirectorRabbitSheepMode extends BattleDirector {
    tick(): void {}
    private playerObject: BattleBattleStageObject;

    initBattle(): void {
        this.playerObject = this.initPlayer();
        this.battlePrepair();
    }
    constructor(public ctx: BattleBattleStageData) {
        super(ctx);
    }
    /** 战斗是否已结束 */
    isBattleEnd(): boolean {
        return (
            this.ctx.attackTeam.size === 0 || this.ctx.defendTeam.size >= 200 || this.ctx.frame > this.ctx.ctx.tickLimit
        );
    }

    /** 战斗是否胜利 */
    isBattleWin(): boolean {
        return false;
    }
}
