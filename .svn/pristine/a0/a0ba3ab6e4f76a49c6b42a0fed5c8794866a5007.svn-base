import { BattleTriggerEvent } from "../../Event/BattleTriggerEvent";
import { BattleLaserArea } from "../../Object/Area/BattleLaserArea";
import { BattleBattleStageContext } from "../../Processor/BattleBattleStageContext";
import { BattleUtils } from "../../Utils/BattleUtils";
import { BattleSkillTemplateLaserBuilder } from "../Builder/Template/BattleSkillTemplateLaserBuilder";
import { BattleSkillBaseTemplate } from "./BattleSkillBaseTemplate";

export class BattleSkillTemplateLaser extends BattleSkillBaseTemplate {
    private handleCb: Function;
    private targetFrame: number;
    protected process(ctx: BattleBattleStageContext, e: BattleTriggerEvent): boolean {
        this.handleCb = () => {
            this.handleDotArea(ctx, e);
        };
        this.targetFrame = ctx.data.frame + this.builder._delay / GConstant.battle.logicTick;
        return false;
    }

    tick(ctx: BattleBattleStageContext): boolean {
        if (ctx.data.frame >= this.targetFrame) {
            this.handleCb();
            return true;
        } else {
            return false;
        }
    }

    handleDotArea(ctx: BattleBattleStageContext, e: BattleTriggerEvent) {
        const targetList = this.getTarget(ctx, e);
        const [x, y] = ctx.object.position;
        targetList.forEach((t) => {
            const area = new BattleLaserArea(
                ctx.data.uuidGenerator.uuid(),
                [x, y + 100],
                ctx,
                this.builder as BattleSkillTemplateLaserBuilder
            );
            ctx.data.addEffectArea(area);
        });
    }
}
