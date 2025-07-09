import { BattleBattleStageObject } from "../Object/BattleStage/BattleBattleStageObject";
import { BattleProperty } from "../Object/BattleStage/BattleProperty";

export class BattleHeal {
    constructor() {}

    // 来源信息
    /** 治疗来源 */
    public source: BattleBattleStageObject;
    /** 治疗目标 */
    public target: BattleBattleStageObject;
    /** 基本治疗值 */
    private baseValue: number;
    /** 治疗强度系数 */
    private healFactor: number;
    /** 治疗数值 */
    public value: number;
    /** 原生命值 */
    public originHp: number;
    /** 最终生命值 */
    public finalHp: number;

    static createHeal(
        source: BattleBattleStageObject,
        target: BattleBattleStageObject,
        baseValue: number,
        p: BattleProperty
    ) {
        const t = new BattleHeal();
        t.source = source;
        t.target = target;
        t.baseValue = baseValue;
        t.healFactor = p.healFactor;
        return t;
    }

    static healSettlement(h: BattleHeal, p: BattleProperty) {
        h.value = h.baseValue;
        h.value *= h.healFactor * 0.0001;
        h.value *= p.recoverFactor * 0.0001;
        h.value = Math.ceil(h.value);
    }
}
