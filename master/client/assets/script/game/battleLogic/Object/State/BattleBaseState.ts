import { BattleEvent } from "../../Event/BattleEvent";
import { BattleBattleStageContext } from "../../Processor/BattleBattleStageContext";
import { BattleSkillTemplateAddStateBuilder } from "../../Skill/Builder/Template/BattleSkillTemplateAddStateBuilder";
import { BattleSkillBaseDuration } from "../../Skill/Duration/BattleSkillBaseDuration";
import { BattleBattleStageObject } from "../BattleStage/BattleBattleStageObject";

export abstract class BattleBaseState {
    constructor(
        public target: BattleBattleStageObject,
        public ctx: BattleBattleStageContext,
        public builder: BattleSkillTemplateAddStateBuilder
    ) {
        this.stateType = builder._kind;
        // this.interval = this.ctx.skill.evalValue(builder._maxLayer, "final");
        this.dynamic = builder._dynamic;
        this.dispelable = !builder._unDispelable;
        this.init();
    }

    abstract init(): void;

    /** 状态类型 */
    stateType: string;
    /** 状态作用类型 */
    abstract stateEffectType: "abnormal" | "shield" | "dot" | "special";
    /** 最大层数 */
    maxLayer: number;
    /** 层数 */
    layer: number = 1;
    /** 叠加模式 */
    abstract addMode: "layer" | "independent" | "last";
    // /** 间隔 */
    // interval: number;
    /** 技能值缓存 */
    valueCache: number;
    /** 动态 */
    dynamic: boolean;
    /** 可驱散 */
    dispelable: boolean;

    endFrame: number;

    private getValue() {
        return Math.round(
            this.ctx.skill.evalValue(this.builder._value, "base", this.target.propertyManager.baseProperty)
        );
    }

    onAdd(): void {
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
        this.start();
    }

    abstract start(): void;

    abstract tick(): void;

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

    handleEvent(e: BattleEvent) {}

    onRemove() {
        this.end();
    }

    abstract end(): void;
}
