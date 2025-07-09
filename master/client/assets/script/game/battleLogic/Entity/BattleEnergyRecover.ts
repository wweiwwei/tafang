import { BattleBattleStageObject } from "../Object/BattleStage/BattleBattleStageObject";
import { BattleProperty } from "../Object/BattleStage/BattleProperty";

export class BattleEnergyRecover {
    constructor() {}

    // 来源信息
    /** 恢复来源 */
    public source: BattleBattleStageObject;
    /** 恢复目标 */
    public target: BattleBattleStageObject;
    /** 基础值 */
    private baseValue: number;
    /** 恢复数值 */
    public value: number;
    /** 原怒气值 */
    public originEnergy: number;
    /** 最终怒气值 */
    public finalEnergy: number;

    static createEnergyRecover(
        source: BattleBattleStageObject,
        target: BattleBattleStageObject,
        baseValue: number,
        p: BattleProperty
    ) {
        const r = new BattleEnergyRecover();
        r.source = source;
        r.target = target;
        r.baseValue = baseValue;
        return r;
    }

    static energyRecoverSettlement(r: BattleEnergyRecover, p: BattleProperty) {
        r.value = Math.ceil(r.baseValue);
    }
}
