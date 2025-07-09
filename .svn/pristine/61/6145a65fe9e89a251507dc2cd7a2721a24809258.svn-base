import { BattlePlayerCommand } from "../battleLogic/Processor/BattleCommandHandler";
import { BattleProcessor } from "../battleLogic/Processor/BattleProcessor";
import { BattleDisplayToLogicApi } from "./BattleDisplayToLogicApi";
import { BattleProcessorBattleStageApi } from "./BattleProcessorBattleStageApi";

/** 战斗相关接口的管理类 */
export class BattleApiManager {
    private currentBattleProcessor: BattleProcessor[] = [null, null, null];

    displayApi: BattleDisplayToLogicApi[] = [];

    private battleStageApi: BattleProcessorBattleStageApi[] = [null, null, null];
    private playerCommandList: BattlePlayerCommand[] = [];
    private clearCommand() {
        this.playerCommandList = [];
    }
    addCommand(command: BattlePlayerCommand) {
        this.playerCommandList.push(command);
    }

    getCommandGetter() {
        return () => {
            const res = this.playerCommandList;
            this.clearCommand();
            return res;
        };
    }

    beginBattle(processor: BattleProcessor, index: number) {
        this.currentBattleProcessor[index] = processor;
    }

    /** 战斗阶段的api，没有战斗时返回null */
    getBattleStageApi(index: number) {
        if (!this.currentBattleProcessor[index]) return null;
        if (this.battleStageApi[index]) {
            return this.battleStageApi[index];
        } else {
            this.battleStageApi[index] = new BattleProcessorBattleStageApi(this.currentBattleProcessor[index]);
            return this.battleStageApi[index];
        }
    }

    /** 清除战斗数据 */
    clearBattle(index: number) {
        this.currentBattleProcessor[index] = null;
        this.battleStageApi[index] = null;
        this.clearCommand();
    }
}

window["GBattleApiManager"] = new BattleApiManager();

declare global {
    /** 全局战斗管理 */
    const GBattleApiManager: BattleApiManager;
}
