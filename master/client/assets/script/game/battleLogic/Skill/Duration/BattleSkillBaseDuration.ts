import { BattleBattleStageContext } from "../../Processor/BattleBattleStageContext";
import { BattleIoc } from "../../Processor/BattleIoc";
import { BattleSkillConfigNode, BattleSkillNodeType } from "../BattleSkillConfigGraph";

export abstract class BattleSkillBaseDuration {
    constructor(public ctx: BattleBattleStageContext, public nodeId: number, public finishFunc: Function) {
        this.init();
    }

    init() {}

    finish() {
        if (this.finishFunc) this.finishFunc();
    }

    get nodeConfig() {
        const graph = this.ctx.skill.graph;
        return graph.getNodeById(this.nodeId);
    }

    get nodeKey(): string {
        return `${this.ctx.skill.id}_${this.nodeId}`;
    }

    remove() {}

    static createDuration(
        ctx: BattleBattleStageContext,
        configNode: BattleSkillConfigNode,
        finishFunc: Function
    ): BattleSkillBaseDuration {
        if (configNode == null) {
            const c = BattleIoc.getClass(BattleSkillNodeType.DurationSkillEnd);
            return Reflect.construct(c, [ctx, -1, finishFunc]);
        } else {
            const c = BattleIoc.getClass(configNode.type);
            return Reflect.construct(c, [ctx, configNode.id, finishFunc]);
        }
    }
}
