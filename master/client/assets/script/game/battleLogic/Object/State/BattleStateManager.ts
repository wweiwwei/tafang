import { BattleDisplayEvent } from "../../Display/BattleDisplayEvent";
import { BattleBattleStageContext } from "../../Processor/BattleBattleStageContext";
import { BattleIoc } from "../../Processor/BattleIoc";
import { BattleSkillTemplateAddStateBuilder } from "../../Skill/Builder/Template/BattleSkillTemplateAddStateBuilder";
import { BattleStuporFSM } from "../StateMachine/FSM/BattleStuporFSM";
import { BattleBaseState } from "./BattleBaseState";
import { BattleStatePoison } from "./dot/BattleStatePoison";
import { BattleStateLifeShield } from "./shield/BattleStateLifeShield";

export class BattleStateManager {
    constructor(public ctx: BattleBattleStageContext) {}

    state: BattleBaseState[] = [];

    addState(ctx: BattleBattleStageContext, builder: BattleSkillTemplateAddStateBuilder) {
        let s: BattleBaseState;
        if (builder._kind === "poison") {
            s = new BattleStatePoison(this.ctx.object, ctx, builder);
        }
        if (s.addMode === "independent") {
            // 每个状态独立存在
            this.state.push(s);
            s.onAdd();
            this.ctx.data.pushDisplayEvent(new BattleDisplayEvent("showStateAdd", { obj: this.ctx.object, data: s }));
        } else if (s.addMode === "last") {
            // 同类型状态只保留最后一个
            const exist = this.state.find((x) => x.stateType === s.stateType);
            if (exist) {
                exist.onRemove();
                this.state = this.state.filter((x) => x !== exist);
            }
            this.state.push(s);
            s.onAdd();
            this.ctx.data.pushDisplayEvent(new BattleDisplayEvent("showStateAdd", { obj: this.ctx.object, data: s }));
        } else if (s.addMode === "layer") {
            // 同类型状态叠加
            const exist = this.state.find((x) => x.stateType === s.stateType);
            if (exist) {
                if (exist.builder !== s.builder) {
                    // 不同技能的状态，替代
                    exist.onRemove();
                    this.state = this.state.filter((x) => x !== exist);
                    this.state.push(s);
                    s.onAdd();
                    this.ctx.data.pushDisplayEvent(
                        new BattleDisplayEvent("showStateAdd", { obj: this.ctx.object, data: s })
                    );
                } else {
                    // 同技能的状态，叠加层数
                    exist.addLayer();
                    this.ctx.data.pushDisplayEvent(
                        new BattleDisplayEvent("showStateAdd", { obj: this.ctx.object, data: exist })
                    );
                    return;
                }
            } else {
                // 未找到相同的状态，直接附加
                this.state.push(s);
                s.onAdd();
                this.ctx.data.pushDisplayEvent(
                    new BattleDisplayEvent("showStateAdd", { obj: this.ctx.object, data: s })
                );
            }
        }
        this.ctx.data.pushDisplayEvent(new BattleDisplayEvent("refreshState", { obj: this.ctx.object }));
        this.checkFSM();
    }

    handleNormalAttackStun() {
        // todo 处理击晕
    }

    /** 获取异常状态列表 */
    getAbnormalState(): string[] {
        return [];
    }

    getDefendShield(): any[] {
        return [];
    }

    getLifeShield(): BattleStateLifeShield[] {
        return this.state.filter((x) => x instanceof BattleStateLifeShield) as BattleStateLifeShield[];
    }

    getSpellShield(): any[] {
        return [];
    }

    getAttackShield(): any[] {
        return [];
    }

    getReactiveShield(): any[] {
        return [];
    }

    getMultiLayerDefendShield(): any[] {
        return [];
    }

    /** 移除状态 */
    removeState(s: BattleBaseState) {
        s.onRemove();
        this.state = this.state.filter((x) => x !== s);
        this.ctx.data.pushDisplayEvent(new BattleDisplayEvent("refreshState", { obj: this.ctx.object }));
        this.ctx.data.pushDisplayEvent(new BattleDisplayEvent("showStateRemove", { obj: this.ctx.object, data: s }));
        this.checkFSM();
    }

    /** 驱散 */
    dispel() {
        const needRemove = this.state.filter((b) => b.dispelable);
        needRemove.forEach((b) => {
            b.onRemove();
            this.ctx.data.pushDisplayEvent(
                new BattleDisplayEvent("showStateRemove", { obj: this.ctx.object, data: b })
            );
        });
        this.state = this.state.filter((b) => !b.dispelable);
        this.ctx.data.pushDisplayEvent(new BattleDisplayEvent("refreshState", { obj: this.ctx.object }));
        this.checkFSM();
    }
    tick() {
        this.state.forEach((s) => s.tick());
        const frame = this.ctx.data.frame;
        const needRemove = this.state.filter((s) => s.endFrame <= frame);
        if (needRemove.length === 0) return;
        needRemove.forEach((s) => {
            s.onRemove();
            this.ctx.data.pushDisplayEvent(
                new BattleDisplayEvent("showStateRemove", { obj: this.ctx.object, data: s })
            );
        });
        this.state = this.state.filter((s) => s.endFrame > frame);
        this.ctx.data.pushDisplayEvent(new BattleDisplayEvent("refreshState", { obj: this.ctx.object }));
        this.checkFSM();
    }

    checkFSM() {
        const fsm = this.ctx.object.fsmManager.curFSM;
        if (fsm instanceof BattleStuporFSM) {
            if (!this.isStupor()) {
                this.ctx.object.fsmManager.toBaseFSM();
            }
        } else {
            if (this.isStupor()) {
                this.ctx.object.fsmManager.toStuporFSM();
            }
        }
    }

    isStupor() {
        return this.state.some((x) => x.stateType === "stupor" || x.stateType === "repulse");
    }

    hasShield() {
        return this.state.some((x) => x.stateType === "lifeShield");
    }
}
