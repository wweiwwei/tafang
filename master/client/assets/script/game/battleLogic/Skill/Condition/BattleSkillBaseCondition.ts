import { BattleBattleStageContext } from "../../Processor/BattleBattleStageContext";

export class BattleSkillBaseCondition {
    constructor(public ctx: BattleBattleStageContext, public nodeId: number) {
        this.init();
    }

    init() {}

    get nodeConfig() {
        const graph = this.ctx.skill.graph;
        return graph.getNodeById(this.nodeId);
    }

    ok(): boolean {
        return false;
    }
}
