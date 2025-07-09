import { BattleBattleStageContext } from "../../Processor/BattleBattleStageContext";
import { BattleSkillTemplateAddBuffBuilder } from "../../Skill/Builder/Template/BattleSkillTemplateAddBuffBuilder";
import { BattleSkillBaseDuration } from "../../Skill/Duration/BattleSkillBaseDuration";
import { BattleBattleStageObject } from "../BattleStage/BattleBattleStageObject";
import { BattleEffect } from "../Effect/BattleEffect";

const buffShowPercentFunc = {
    /** 攻击 */
    attack: (b: BattleBuff) => {
        return Math.round((b.valueCache / b.target.propertyManager.baseProperty[b.property]) * 100);
    },
    /** 防御 */
    armor: (b: BattleBuff) => {
        return Math.round((b.valueCache / b.target.propertyManager.baseProperty[b.property]) * 100);
    },
    /** 最大生命值 */
    maxHp: (b: BattleBuff) => {
        return Math.round((b.valueCache / b.target.propertyManager.baseProperty[b.property]) * 100);
    },
    /** 命中 */
    hit: (b: BattleBuff) => b.valueCache / 100,
    /** 闪避 */
    dodge: (b: BattleBuff) => b.valueCache / 100,
    /** 暴击率 */
    critical: (b: BattleBuff) => b.valueCache / 100,
    /** 反暴击 */
    criticalImmune: (b: BattleBuff) => b.valueCache / 100,
    /** 增伤 */
    damage: (b: BattleBuff) => b.valueCache / 100,
    /** 减伤 */
    defence: (b: BattleBuff) => b.valueCache / 100,
    /** 普通攻击速度 */
    normalAttackSpeed: (b: BattleBuff) => b.valueCache / 100,
    /** 移动速度 */
    moveSpeed: (b: BattleBuff) => {
        return Math.round((b.valueCache / b.target.propertyManager.baseProperty[b.property]) * 100);
    },
};
export class BattleBuff {
    constructor(
        public target: BattleBattleStageObject,
        public ctx: BattleBattleStageContext,
        public builder: BattleSkillTemplateAddBuffBuilder
    ) {
        this.init();
    }
    get isPositive(): boolean {
        return this.valueCache >= 0;
    }

    init() {
        this.property = this.builder._kind;
        this.dynamic = this.builder._dynamic;
        this.dispelable = !this.builder._unDispelable;
    }
    private _effectCache: BattleEffect[];
    getDurationEffectList(): BattleEffect[] {
        if (this._effectCache) return this._effectCache;
        this._effectCache = this.builder._durationeffect.map((data) => {
            const e = new BattleEffect();
            e.position = { x: data._offset[0], y: data._offset[1] };
            e.effectName = data._effectName;
            e.effectAnimation = data._effectAnimation;
            e.loop = true;
            e.scaleX = data._scale;
            e.scaleY = data._scale;
            return e;
        });
        return this._effectCache;
    }

    /** 是否展示百分比 */
    get showPercent(): boolean {
        return this.builder._showPercent;
    }

    /** 百分比 */
    get percent(): number {
        return buffShowPercentFunc[this.property](this);
    }

    get buffKey(): string {
        // todo
        return `${this.ctx.skill.id}`;
    }
    /** 动态 */
    dynamic: boolean;
    /** 可驱散 */
    dispelable: boolean;
    /** 值缓存 */
    valueCache: number;
    /** 最大层数 */
    maxLayer: number;
    /** 属性key */
    property: string;
    /** 层数 */
    layer: number = 1;

    private getValue() {
        return Math.round(
            this.ctx.skill.evalValue(this.builder._value, "base", this.target.propertyManager.baseProperty)
        );
    }

    onAdd() {
        const remainDuration = this.ctx.skill.evalValue(
            this.builder._duration,
            "base",
            this.target.propertyManager.baseProperty
        );
        this.endFrame = Math.round(this.ctx.data.frame + remainDuration / GConstant.battle.logicTick);
        this.maxLayer = Math.round(
            this.ctx.skill.evalValue(this.builder._maxLayer, "base", this.target.propertyManager.baseProperty)
        );
        if (!this.dynamic) {
            this.valueCache = this.getValue();
        }
    }

    endFrame: number;
    /** 剩余持续时间 */
    addLayer() {
        // 重置持续时间
        const remainDuration = this.ctx.skill.evalValue(
            this.builder._duration,
            "base",
            this.target.propertyManager.baseProperty
        );
        this.endFrame = Math.round(this.ctx.data.frame + remainDuration / GConstant.battle.logicTick);
        // 层数+1
        this.layer += 1;
        if (this.layer > this.maxLayer) this.layer = this.maxLayer;
        this.valueCache = this.getValue();
    }

    onRemove() {}

    effect(): { property: string; value: number } {
        const value = this.dynamic ? this.getValue() * this.layer : this.valueCache * this.layer;
        return { property: this.property, value };
    }
}
