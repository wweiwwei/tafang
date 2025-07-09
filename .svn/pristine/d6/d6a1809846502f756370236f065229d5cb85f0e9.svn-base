import { BattleTriggerEvent } from "../../Event/BattleTriggerEvent";
import { BattleDamageHook } from "../../Object/DamageHook/BattleDamageHook";
import { BattleBattleStageContext } from "../../Processor/BattleBattleStageContext";
import { BattleSkillTemplateHookDamageBuilder } from "../Builder/Template/BattleSkillTemplateHookDamageBuilder";
import { BattleSkillBaseTemplate } from "./BattleSkillBaseTemplate";

export class BattleSkillTemplateHookDamage extends BattleSkillBaseTemplate {
    process(ctx: BattleBattleStageContext, e: BattleTriggerEvent): void {
        const hook = new BattleDamageHook(ctx, this.builder as BattleSkillTemplateHookDamageBuilder);
        ctx.object.damageHookManager.addHook(hook);
    }
}
