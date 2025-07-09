import { BattleRect } from "../../Map/BattleRect";
import { BattleVec } from "../../Map/BattleVec";
import { BattleBattleStageContext } from "../../Processor/BattleBattleStageContext";
import { BattleSkillBaseTemplateBuilder } from "../../Skill/Builder/Template/BattleSkillBaseTemplateBuilder";
import { BattleSkillTemplateDotAreaBuilder } from "../../Skill/Builder/Template/BattleSkillTemplateDotAreaBuilder";
import { BattleSkillTemplateLaserBuilder } from "../../Skill/Builder/Template/BattleSkillTemplateLaserBuilder";
import { BattleTargetSearch } from "../../Skill/Target/BattleTargetSearch";
import { BattleBattleStageObject } from "../BattleStage/BattleBattleStageObject";
import { BattleEffectArea } from "./BattleEffectArea";

export class BattleLaserArea extends BattleEffectArea {
    private effectList: {
        /** 等待 */
        wait: number;
        /** 间隔 */
        interval: number;
        /** 最大生效次数 */
        countLimit: number;
        /** 已生效次数 */
        hasEffect: number;
        /** 配置信息 */
        builder: BattleSkillBaseTemplateBuilder;
    }[];

    effect: string;
    animation: string;
    scale: number;
    offset: number[];
    time: number = 0;
    targetTeam: string = "enemyTeam";
    endFrame: number;
    currentTarget: BattleBattleStageObject;
    constructor(
        public uid: number,
        public pos: number[],
        public ctx: BattleBattleStageContext,
        public builder: BattleSkillTemplateLaserBuilder
    ) {
        super();
    }

    start(): void {
        const b = this.builder;
        const frame = this.ctx.data.frame;
        this.endFrame = frame + Number(b._duration) / GConstant.battle.logicTick;
        this.targetTeam = b._targetMode;
        this.scale = b._scale;
        // this.offset = b._offset;
        this.animation = b._effectAnimation;
        this.effect = b._effectName;
        this.effectList = [
            {
                wait: Number(b._wait),
                interval: b._interval,
                countLimit: b._count,
                hasEffect: 0,
                builder: b.afterHit,
            },
        ];
        this.findTarget();
        this.setDirection();
    }

    private angle = 0;

    setDirection() {
        if (!this.currentTarget) return;
        const sub = BattleVec.sub(this.pos, this.currentTarget.position);
        this.angle = this.calulateAngle(sub) + 90;
    }

    private calulateAngle(direction: number[]) {
        return (Math.atan2(direction[1], direction[0]) * 180) / Math.PI;
    }
    getAngle(): number {
        return this.angle;
    }
    findTarget() {
        const ctx = this.ctx;
        const mode = this.builder._targetMode;
        if (!this.currentTarget || !this.currentTarget.isAlive) {
            const allTarget = (() => {
                if (mode === "all") {
                    return BattleTargetSearch.searchBaseTarget("selfTeam", ctx, null).concat(
                        BattleTargetSearch.searchBaseTarget("enemyTeam", ctx, null)
                    );
                } else {
                    return BattleTargetSearch.searchBaseTarget(mode, ctx, null);
                }
            })();
            this.currentTarget = allTarget[0];
        }
    }

    tick(): void {
        this.time += GConstant.battle.logicTick;
        this.effectList.forEach((e) => {
            if (this.time > e.wait + e.interval * (e.hasEffect + 1) && e.hasEffect < e.countLimit) {
                e.hasEffect++;
                const ctx = this.ctx;
                this.findTarget();
                if (!this.currentTarget || !this.currentTarget.isAlive) return;
                const t = this.currentTarget;
                const independentSkillProcess = ctx.skill.createIndependantProcess([t], e.builder);
                ctx.data.addIndependentSkillProcess(independentSkillProcess);
            }
        });
        this.setDirection();
    }

    getDisplayPosition() {
        return { x: this.pos[0], y: this.pos[1] };
    }
    isEnd(): boolean {
        const frame = this.ctx.data.frame;
        return frame > this.endFrame;
    }

    _duration: number;
    /** 持续时间，这个值不设置默认是无限 */
    duration(duration: number): this {
        this._duration = duration;
        return this;
    }
    layer = 2;
}
