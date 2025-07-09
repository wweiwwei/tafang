import { BattleBattleStageData } from "../BattleBattleStageData";

export class BattleGlobalBuff {
    kind: string;
    value: string | number;

    constructor(public ctx: BattleBattleStageData) {}

    effect(): { property: string; value: number } {
        const valueStr = this.value.toString();
        const value = AstUtil.eval(valueStr, [this.ctx.globalPropertyManager.baseProperty]);
        // console.log(valueStr, value);
        return { property: this.kind, value: Math.round(value) };
    }
}
