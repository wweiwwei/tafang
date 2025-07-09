import { BattleSkillBaseTemplate } from "../../Template/BattleSkillBaseTemplate";
import { BattleSkillTemplateLaser } from "../../Template/BattleSkillTemplateLaser";
import { BattleSkillTemplateLightningChain } from "../../Template/BattleSkillTemplateLightningChain";

import { BattleSkillBaseTemplateBuilder } from "./BattleSkillBaseTemplateBuilder";
/** 光线，光线为直线攻击技能，指向单一目标，可以选择是否穿透沿途目标 */
export class BattleSkillTemplateLaserBuilder extends BattleSkillBaseTemplateBuilder {
    build(): BattleSkillBaseTemplate {
        return new BattleSkillTemplateLaser(this);
    }
    _penetrate: boolean = false;
    /** 穿透模式 */
    penetrate(): this {
        this._penetrate = true;
        return this;
    }
    _targetMode: "selfTeam" | "enemyTeam" | "all" = "enemyTeam";

    /** 仅对敌人有效 */
    onlyEnemy(): this {
        this._targetMode = "enemyTeam";
        return this;
    }
    /** 仅对自身有效 */
    onlySelf(): this {
        this._targetMode = "selfTeam";
        return this;
    }
    /** 不限队伍，把 */
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

    _interval: number = 0;
    /** 每次效果生效的间隔（毫秒数） */
    interval(v: number | string): this {
        this._interval = Number(v);
        return this;
    }

    _width: number = 0;
    /** 光线宽度 */
    width(v: number | string): this {
        this._width = Number(v);
        return this;
    }
    _count: number = 0;
    /** 设置矩形效果可以生效的次数 */
    count(v: number | string): this {
        this._count = Number(v);
        return this;
    }

    _duration: number | string;
    /** 持续时间，这个值不设置默认是无限 */
    duration(duration: number | string): this {
        this._duration = duration;
        return this;
    }
    _wait: number | string;
    /** 特效等待 */
    wait(d: number | string): this {
        this._wait = d;
        return this;
    }
}
