import { BattleSkillBaseTemplate } from "../../Template/BattleSkillBaseTemplate";
import { BattleEffectBuilder } from "../Effect/BattleEffectBuilder";
import { BattleTargetBuilder } from "../Target/BattleTargetBuilder";

export abstract class BattleSkillBaseTemplateBuilder {
    /** 条件重复 */
    _conditionRepeat: string;
    /** 条件重复 */
    conditionRepeat(s: string): this {
        this._conditionRepeat = s;
        return this;
    }
    /** 条件触发 */
    _triggerCondition: string;
    /** 条件触发 */
    triggerCondition(c: string): this {
        this._triggerCondition = c;
        return this;
    }
    _triggerProbability: number | string;
    _triggerProbabilityIndependant: boolean;
    triggerProbability(p: number | string, independant = true): this {
        this._triggerProbability = p;
        this._triggerProbabilityIndependant = independant;
        return this;
    }
    // 同时进行
    _parallel = true;
    disableParallel(): this {
        this._parallel = false;
        return this;
    }

    /**
     * 命中触发
     *
     * 示例: .afterHit = 模板
     *
     * 命中后触发特定模板
     */
    afterHit: BattleSkillBaseTemplateBuilder;
    /** 命中后模板触发率 */
    afterHitProbability: number = 1;
    /** 击杀后触发 */
    afterKill: BattleSkillBaseTemplateBuilder;
    /** 击杀后触发概率 */
    afterKillProbability: number = 1;
    /** 技能模板目标 */
    target: BattleTargetBuilder;
    /** 下一步执行的技能模板 */
    next: BattleSkillBaseTemplateBuilder;

    /** 特效列表 */
    _effect: BattleEffectBuilder[] = [];
    /** 增加特效 */
    addEffect(e: BattleEffectBuilder): this {
        this._effect.push(e);
        return this;
    }
    _delay: number = 0;
    /** 延迟触发，毫秒 */
    delay(time: number): this {
        this._delay = time;
        return this;
    }
    abstract build(): BattleSkillBaseTemplate;
}
