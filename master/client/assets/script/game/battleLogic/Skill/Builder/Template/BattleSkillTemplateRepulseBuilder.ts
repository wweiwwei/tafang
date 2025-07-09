import { BattleSkillBaseTemplate } from "../../Template/BattleSkillBaseTemplate";
import { BattleSkillTemplateLightningChain } from "../../Template/BattleSkillTemplateLightningChain";
import { BattleSkillTemplateRepulse } from "../../Template/BattleSkillTemplateRepulse";
import { BattleSkillBaseTemplateBuilder } from "./BattleSkillBaseTemplateBuilder";
/** 击退 */
export class BattleSkillTemplateRepulseBuilder extends BattleSkillBaseTemplateBuilder {
    constructor() {
        super();
    }
    build(): BattleSkillBaseTemplate {
        if (this._distance === undefined) {
            throw new Error("BattleSkillTemplateRepulseBuilder: distance is required");
        }
        return new BattleSkillTemplateRepulse(this);
    }
    _distance: number | string = 0;
    /** 击退距离 */
    distance(v: number | string): this {
        this._distance = v;
        return this;
    }
}
