import { BattleDisplayEvent } from "../../Display/BattleDisplayEvent";
import { registerDisplay } from "../../Processor/BattleIoc";
import { BattleSkillBaseDisplay } from "./BattleSkillBaseDisplay";

@registerDisplay("presentation/ShowEffect")
export class BattleSkillShowEffect extends BattleSkillBaseDisplay {
    immediate: boolean = true;
    init(): void {}

    start(): void {
        const spine = this.ctx.ctx.object.getImg();
        const positionType = this.nodeConfig.getProperties("positionType");
        const effectName = this.nodeConfig.getProperties("effect", spine);
        const parentType = this.nodeConfig.getProperties("parentType");
        const scale = Number(this.nodeConfig.getProperties("scale", spine)) || 1;
        let effectAnimation = this.nodeConfig.getProperties("animation");
        if (!effectAnimation || effectAnimation.length === 0) effectAnimation = "idle";
        let offset = this.nodeConfig
            .getProperties("offset", spine)
            .split("|")
            .map((x: string) => Number(x));
        if (offset.length < 2) offset = GConstant.battle.effect.bulletOffset;
        if (positionType === "scene") {
            const finalOffset = [offset[0] - this.ctx.ctx.data.cameraFixRange, offset[1]];
            this.ctx.ctx.data.pushDisplayEvent(
                new BattleDisplayEvent("showEffect", {
                    effectName,
                    offset: finalOffset,
                    parentType,
                    obj: null,
                    effectAnimation,
                    scale,
                })
            );
        } else if (positionType === "self") {
            if (parentType === "scene") {
                const position = this.ctx.ctx.object.position;
                const finalOffset = [position[0] + offset[0], position[1] + offset[1]];
                this.ctx.ctx.data.pushDisplayEvent(
                    new BattleDisplayEvent("showEffect", {
                        effectName,
                        offset: finalOffset,
                        parentType,
                        obj: this.ctx.ctx.object,
                        effectAnimation,
                        scale,
                    })
                );
            } else {
                this.ctx.ctx.data.pushDisplayEvent(
                    new BattleDisplayEvent("showEffect", {
                        effectName,
                        offset,
                        parentType,
                        obj: this.ctx.ctx.object,
                        effectAnimation,
                        scale,
                    })
                );
            }
        } else if (positionType === "target") {
            const targetList = this.ctx.cacheTargetList;
            targetList.forEach((target) => {
                if (parentType === "scene") {
                    const finalOffset = [target.position[0] + offset[0], target.position[1] + offset[1]];
                    this.ctx.ctx.data.pushDisplayEvent(
                        new BattleDisplayEvent("showEffect", {
                            effectName,
                            offset: finalOffset,
                            parentType,
                            obj: target,
                            effectAnimation,
                            scale,
                        })
                    );
                } else {
                    this.ctx.ctx.data.pushDisplayEvent(
                        new BattleDisplayEvent("showEffect", {
                            effectName,
                            offset,
                            parentType,
                            obj: target,
                            effectAnimation,
                            scale,
                        })
                    );
                }
            });
        }
    }
    tick(): void {}
}
