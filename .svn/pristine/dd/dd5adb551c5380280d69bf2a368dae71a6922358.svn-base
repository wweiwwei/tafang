import { BattleSkillBaseTemplate } from "../../Template/BattleSkillBaseTemplate";
import { BattleSkillTemplateDotArea } from "../../Template/BattleSkillTemplateDotArea";
import { BattleSkillTemplateExplosion } from "../../Template/BattleSkillTemplateExplosion";
import { BattleSkillTemplateRectEffect } from "../../Template/BattleSkillTemplateRectEffect";
import { BattleSkillBaseTemplateBuilder } from "./BattleSkillBaseTemplateBuilder";
/** 持续范围效果 */
export class BattleSkillTemplateDotAreaBuilder extends BattleSkillBaseTemplateBuilder {
    build(): BattleSkillBaseTemplate {
        if (this._shapeMode === "circle") {
            if (
                this.effectList.length !== this.radiusList.length ||
                this.effectList.length !== this.intervalList.length
            ) {
                throw new Error(
                    "BattleSkillTemplateDotAreaBuilder: effectList, radiusList, intervalList length not equal"
                );
            }
        } else {
            if (
                this.effectList.length !== this.widthList.length ||
                this.effectList.length !== this.heightList.length ||
                this.effectList.length !== this.intervalList.length
            ) {
                throw new Error(
                    "BattleSkillTemplateDotAreaBuilder: effectList, widthList, heightList, intervalList length not equal"
                );
            }
        }
        return new BattleSkillTemplateDotArea(this);
    }
    /** 效果列表 */
    effectList: BattleSkillBaseTemplateBuilder[] = [];
    /** 范围半径列表（圆形模式必须有） */
    radiusList: number[] = [];
    /** 效果间隔列表 */
    intervalList: number[] = [];
    /** 宽列表（矩形模式必须有） */
    widthList: number[] = [];
    /** 高列表（矩形模式必须有） */
    heightList: number[] = [];

    _shapeMode: "rect" | "circle" = "rect";
    /** 矩形模式 */
    rectMode(): this {
        this._shapeMode = "rect";
        return this;
    }
    /** 圆形模式 */
    circleMode(): this {
        this._shapeMode = "circle";
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

    _effectName: string;
    /** 特效名，这个值必须配置 */
    effectName(name: string): this {
        this._effectName = name;
        return this;
    }

    _effectAnimation: string;
    /** 特效动画，这个值默认是skillattack，大多数特效动画都是这个值，不需要修改 */
    effectAnimation(animation: string): this {
        this._effectAnimation = animation;
        return this;
    }

    _scale: number;
    /** 缩放，这个值不设置默认是1 */
    scale(scale: number): this {
        this._scale = scale;
        return this;
    }

    _duration: number;
    /** 持续时间，这个值不设置默认是无限 */
    duration(duration: number): this {
        this._duration = duration;
        return this;
    }

    _layer: number = 1;
    /** 层级，1常规层级，会被怪物遮挡，2特效层级，不会被怪物遮挡 */
    layer(layer: number): this {
        this._layer = layer;
        return this;
    }
}
