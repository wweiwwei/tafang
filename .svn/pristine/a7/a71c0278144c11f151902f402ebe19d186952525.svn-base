import { BattleSkillBaseTemplate } from "../../Template/BattleSkillBaseTemplate";
import { BattleSkillTemplateAddBuff } from "../../Template/BattleSkillTemplateAddBuff";
import { BattleEffectBuilder } from "../Effect/BattleEffectBuilder";
import { BattleSkillBaseTemplateBuilder } from "./BattleSkillBaseTemplateBuilder";
/** 附加buff，需要设置属性类型，持续回合数，buff数值 */
export class BattleSkillTemplateAddBuffBuilder extends BattleSkillBaseTemplateBuilder {
    build(): BattleSkillBaseTemplate {
        if (!this._value || !this._kind) {
            throw new Error("BattleSkillAddBuffTemplateBuilder: value is required");
        }
        return new BattleSkillTemplateAddBuff(this);
    }
    _value: number | string;
    /** 设置buff的数值 */
    value(v: number | string): this {
        this._value = v;
        return this;
    }
    _kind: string;
    /** 设置buff类型 */
    kind(s: PropertySign): this {
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
    /** 最大层数 */
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
    _showPercent: boolean;
    /** 是否显示百分比 */
    showPercent(b: boolean): this {
        this._showPercent = b;
        return this;
    }
}
