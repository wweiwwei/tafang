import { BattleBattleStageObject } from "../../../Object/BattleStage/BattleBattleStageObject";

export class BattleEffectBuilder {
    _effectName: string;
    /** 特效名 */
    effectName(name: string): this {
        this._effectName = name;
        return this;
    }

    _effectAnimation: string = "skillattack";
    /** 特效动画 */
    effectAnimation(animation: string): this {
        this._effectAnimation = animation;
        return this;
    }

    _positionType: "self" | "target" | "scene" = "target";
    /** 位置类型 */
    positionType(type: "self" | "target" | "scene"): this {
        this._positionType = type;
        return this;
    }

    _scale: number = 1;
    /** 缩放 */
    scale(scale: number): this {
        this._scale = scale;
        return this;
    }

    _offset: number[] = [0, 0];
    /** 偏移 */
    offset(x: number = 0, y: number = 0): this {
        this._offset = [x, y];
        return this;
    }
    _delay: number = 0;
    /** 延迟毫秒数 */
    delay(ms: number): this {
        this._delay = ms;
        return this;
    }

    _withDirection: boolean = false;
    /** 按伤害源的方向旋转 */
    withDirection(b: boolean): this {
        this._withDirection = b;
        return this;
    }

    build(
        obj: BattleBattleStageObject,
        parentType: "target" | "scene"
    ): {
        effectName: string;
        effectAnimation: string;
        offset: number[];
        parentType: "target" | "scene";
        obj: BattleBattleStageObject;
        scale: number;
        delay: number;
    } {
        if (!this._effectName) {
            throw new Error("BattleEffectBuilder: effectName is required");
        }
        return {
            effectName: this._effectName,
            effectAnimation: this._effectAnimation,
            offset: this._offset,
            parentType: parentType,
            obj: obj,
            scale: this._scale,
            delay: this._delay,
        };
    }
}
