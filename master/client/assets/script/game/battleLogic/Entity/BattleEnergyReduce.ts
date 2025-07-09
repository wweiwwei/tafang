import { BattleBattleStageObject } from "../Object/BattleStage/BattleBattleStageObject";
import { BattleProperty } from "../Object/BattleStage/BattleProperty";

export class BattleEnergyReduce {
    constructor() {}

    // 来源信息
    /** 削减来源 */
    public source: BattleBattleStageObject;
    /** 削减目标 */
    public target: BattleBattleStageObject;
    /** 基本数值 */
    private baseValue: number;
    /** 削减数值 */
    public value: number;
    /** 原怒气值 */
    public originEnergy: number;
    /** 最终怒气值 */
    public finalEnergy: number;

    static createEnergyReduce(
        source: BattleBattleStageObject,
        target: BattleBattleStageObject,
        baseValue: number,
        p: BattleProperty
    ) {
        const r = new BattleEnergyReduce();
        r.source = source;
        r.target = target;
        r.baseValue = baseValue;
        return r;
    }

    static energyReduceSettlement(r: BattleEnergyReduce, p: BattleProperty) {
        r.value = Math.ceil(r.baseValue);
    }
}
