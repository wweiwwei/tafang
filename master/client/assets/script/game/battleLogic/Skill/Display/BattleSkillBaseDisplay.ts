import { BattleIoc } from "../../Processor/BattleIoc";
import { BattleSkillConfigNode } from "../BattleSkillConfigGraph";
import { BattleBaseSkillProcess } from "../SkillProcess/BattleBaseSkillProcess";

export abstract class BattleSkillBaseDisplay {
    constructor(public ctx: BattleBaseSkillProcess, public nodeConfig: BattleSkillConfigNode) {
        this.init();
    }
    /** 是否立即完成 */
    abstract immediate: boolean;

    abstract init(): void;
    /** 开始展示流程 */
    abstract start(): void;

    abstract tick(): void;

    /** 是否已结束 */
    isEnd(): boolean {
        return true;
    }

    buildDisplay(): BattleBaseSkillProcess {
        const display = this.nodeConfig.getOutput("presentation");
        if (display.length === 0) return null;
        const c = BattleIoc.getClass(display[0].type);
        return Reflect.construct(c, [this.ctx, display[0]]);
    }
}
