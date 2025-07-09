import { BattleRect } from "../../Map/BattleRect";
import { BattleBattleStageContext } from "../../Processor/BattleBattleStageContext";
import { BattleSkillBaseTemplateBuilder } from "../../Skill/Builder/Template/BattleSkillBaseTemplateBuilder";
import { BattleSkillTemplateDotAreaBuilder } from "../../Skill/Builder/Template/BattleSkillTemplateDotAreaBuilder";
import { BattleTargetSearch } from "../../Skill/Target/BattleTargetSearch";
import { BattleBattleStageObject } from "../BattleStage/BattleBattleStageObject";
import { BattleEffectArea } from "./BattleEffectArea";

export class BattleDotArea extends BattleEffectArea {
    private effectList: {
        /** 间隔 */
        interval: number;
        /** 范围 */
        range: {
            shape: "rect" | "circle";
            radius?: number;
            width?: number;
            height?: number;
        };
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
    constructor(
        public uid: number,
        public pos: number[],
        public ctx: BattleBattleStageContext,
        public builder: BattleSkillTemplateDotAreaBuilder
    ) {
        super();
        this.layer = builder._layer;
    }

    getAngle(): number {
        return 0;
    }

    start(): void {
        const b = this.builder as BattleSkillTemplateDotAreaBuilder;
        const frame = this.ctx.data.frame;
        this.endFrame = frame + b._duration / GConstant.battle.logicTick;
        this.targetTeam = b._targetMode;
        this.scale = b._scale;
        // this.offset = b._offset;
        this.animation = b._effectAnimation;
        this.effect = b._effectName;
        this.effectList = b.effectList.map((builder, i) => {
            return {
                interval: b.intervalList[i],
                range: {
                    shape: b._shapeMode,
                    radius: b.radiusList[i],
                    width: b.widthList[i],
                    height: b.heightList[i],
                },
                countLimit: 9999999,
                hasEffect: 0,
                builder,
            };
        });
    }

    tick(): void {
        this.time += GConstant.battle.logicTick;
        this.effectList.forEach((e) => {
            if (this.time > e.interval * (e.hasEffect + 1) && e.hasEffect < e.countLimit) {
                e.hasEffect++;
                const ctx = this.ctx;
                const mode = this.builder._targetMode;
                const allTarget = (() => {
                    if (mode === "all") {
                        return BattleTargetSearch.searchBaseTarget("selfTeam", ctx, null).concat(
                            BattleTargetSearch.searchBaseTarget("enemyTeam", ctx, null)
                        );
                    } else {
                        return BattleTargetSearch.searchBaseTarget(mode, ctx, null);
                    }
                })();
                const [x, y] = this.pos;
                let filterFunc: (t: BattleBattleStageObject) => Boolean;
                if (e.range.shape === "rect") {
                    const rect = new BattleRect(
                        x - e.range.width / 2,
                        y - e.range.height / 2,
                        e.range.width,
                        e.range.height
                    );
                    filterFunc = (t) => {
                        const [tx, ty] = t.position;
                        return rect.isInRect(tx, ty);
                    };
                } else {
                    filterFunc = (t) => {
                        const [tx, ty] = t.position;
                        const dx = x - tx;
                        const dy = y - ty;
                        return dx * dx + dy * dy <= e.range.radius * e.range.radius;
                    };
                }
                const targetList = allTarget.filter(filterFunc);
                targetList.forEach((t) => {
                    const independentSkillProcess = ctx.skill.createIndependantProcess([t], e.builder);
                    ctx.data.addIndependentSkillProcess(independentSkillProcess);
                });
            }
        });
    }

    getDisplayPosition() {
        return { x: this.pos[0], y: this.pos[1] };
    }
    isEnd(): boolean {
        const frame = this.ctx.data.frame;
        return frame > this.endFrame;
    }

    layer = 1;
}
