import { BattleDisplayEvent } from "../../Display/BattleDisplayEvent";
import { BattleTriggerEvent } from "../../Event/BattleTriggerEvent";

import { BattleBattleStageContext } from "../../Processor/BattleBattleStageContext";
import { BattleSkillTemplateAuraBuilder } from "../Builder/Template/BattleSkillTemplateAuraBuilder";
import { BattleSkillTemplateDispelBuilder } from "../Builder/Template/BattleSkillTemplateDispelBuilder";
import { BattleSkillBaseTemplate } from "./BattleSkillBaseTemplate";

export class BattleSkillTemplateAura extends BattleSkillBaseTemplate {
    process(ctx: BattleBattleStageContext, e: BattleTriggerEvent): void {
        const aura = new BattleAura(ctx, this.builder as BattleSkillTemplateAuraBuilder);
        ctx.data.auraManager.addAura(aura);
    }
}
