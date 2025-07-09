import { BattleBattleStageData } from "../BattleBattleStageData";

export class BattleGlobalListener {
    kind: string;
    counterKey: string;
    effect: string;
    effectTime = 0;
    constructor(public ctx: BattleBattleStageData) {}

    add(kind: string, count: number) {
        if (kind === this.kind) {
            this.ctx.globalPropertyManager.addCounter(this.counterKey, count);
        }
        if (this.effect) {
            AstUtil.eval(this.effect, [
                {
                    orZero: (value: number) => {
                        return value || 0;
                    },
                    property: this.ctx.globalPropertyManager,
                    self: this,
                    skill: this.ctx.rogueSkillManager,
                    bless: this.ctx.rogueBlessManager,
                    equipment: this.ctx.rogueEquipmentManager,
                },
            ]);
        }
    }
}
