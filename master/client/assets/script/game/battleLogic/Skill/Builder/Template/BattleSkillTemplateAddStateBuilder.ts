import { BattleSkillBaseTemplate } from "../../Template/BattleSkillBaseTemplate";
import { BattleSkillTemplateAddState } from "../../Template/BattleSkillTemplateAddState";
import { BattleEffectBuilder } from "../Effect/BattleEffectBuilder";
import { BattleSkillBaseTemplateBuilder } from "./BattleSkillBaseTemplateBuilder";
/** 附加状态，需要设置状态类型，持续回合数，部分需要设置数值 */
export class BattleSkillTemplateAddStateBuilder extends BattleSkillBaseTemplateBuilder {
    build(): BattleSkillBaseTemplate {
        if (!this._kind) {
            throw new Error("BattleSkillTemplateAddStateBuilder: kind is required");
        }
        return new BattleSkillTemplateAddState(this);
    }
    _value: number | string = 0;
    /** 设置状态的数值，例如燃烧伤害数值，持续回血数值 */
    value(v: number | string): this {
        this._value = v;
        return this;
    }
    _kind: string;
    /** 设置状态类型 */
    kind(s: StateSign): this {
        this._kind = s;
        return this;
    }
    _duration: number | string = 999999;
    /** 设置buff持续时间，一般为回合数，默认持续时间无限 */
    duration(d: number | string): this {
        this._duration = d;
        return this;
    }
    _maxLayer: number | string = 1;
    /** 最大层数，这个主要对燃烧，持续回血，持续回能量之类的状态生效。默认最大层数是1，也就是不叠加。生命护盾默认可以无限累计 */
    maxLayer(d: number | string): this {
        this._maxLayer = d;
        return this;
    }
    _unDispelable = false;
    /** 设置为不可驱散 */
    unDispelable(): this {
        this._unDispelable = true;
        return this;
    }
    _dynamic = false;
    /** 动态计算，一般buff数值固定，这个设置可以让buff动态计算，例如随血量下降提升伤害 */
    dynamic(): this {
        this._dynamic = true;
        return this;
    }
    /** 特效列表 */
    _durationeffect: BattleEffectBuilder[] = [];
    /** 增加特效 */
    addDurationEffect(e: BattleEffectBuilder): this {
        this._durationeffect.push(e);
        return this;
    }
}
