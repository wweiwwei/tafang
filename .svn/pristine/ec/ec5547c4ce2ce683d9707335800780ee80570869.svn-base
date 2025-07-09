import { BattleSkillBaseTemplate } from "../../Template/BattleSkillBaseTemplate";
import { BattleSkillTemplateExplosion } from "../../Template/BattleSkillTemplateExplosion";
import { BattleSkillTemplateRectEffect } from "../../Template/BattleSkillTemplateRectEffect";
import { BattleEffectBuilder } from "../Effect/BattleEffectBuilder";
import { BattleSkillBaseTemplateBuilder } from "./BattleSkillBaseTemplateBuilder";

/** 矩形效果，范围默认是角色身前 */
export class BattleSkillTemplateRectEffectBuilder extends BattleSkillBaseTemplateBuilder {
    build(): BattleSkillBaseTemplate {
        if (this._width === undefined || this._height === undefined) {
            throw new Error("BattleSkillTemplateEffectRectBuilder: width and  is required");
        }
        return new BattleSkillTemplateRectEffect(this);
    }
    _width: number;
    _height: number;
    /** 矩形宽 */
    width(width: number | string): this {
        this._width = Number(width);
        return this;
    }
    /** 矩形高 */
    height(height: number | string): this {
        this._height = Number(height);
        return this;
    }

    _targetMode: "selfTeam" | "enemyTeam" | "all" = "enemyTeam";

    /** 仅对敌人有效 */
    onlyEnemy(): this {
        this._targetMode = "enemyTeam";
        return this;
    }
    /** 仅对自身队伍有效 */
    onlySelf(): this {
        this._targetMode = "selfTeam";
        return this;
    }
    /** 不限队伍 */
    notLimitTeam(): this {
        this._targetMode = "all";
        return this;
    }
    _count: number | string = 1;
    /** 设置矩形效果可以生效的次数 */
    count(v: number | string): this {
        this._count = v;
        return this;
    }
    _interval: number | string = 0;
    /** 每次效果生效的间隔（毫秒数） */
    interval(v: number | string): this {
        this._interval = v;
        return this;
    }

    /** 特效列表 */
    _effectWithControl: BattleEffectBuilder[] = [];
    /** 增加特效 */
    addEffectWithControl(e: BattleEffectBuilder): this {
        this._effectWithControl.push(e);
        return this;
    }
}
