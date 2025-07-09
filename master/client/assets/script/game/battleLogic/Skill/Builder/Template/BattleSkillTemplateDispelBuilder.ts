import { BattleSkillBaseTemplate } from "../../Template/BattleSkillBaseTemplate";
import { BattleSkillTemplateDispel } from "../../Template/BattleSkillTemplateDispel";
import { BattleSkillBaseTemplateBuilder } from "./BattleSkillBaseTemplateBuilder";
/** 驱散，默认驱散所有buff和状态，可仅驱散正面Buff或者负面Buff */
export class BattleSkillTemplateDispelBuilder extends BattleSkillBaseTemplateBuilder {
    build(): BattleSkillBaseTemplate {
        return new BattleSkillTemplateDispel(this);
    }
    _mode: "all" | "onlyPositive" | "onlyNegative" = "all";
    /** 只驱散正面Buff */
    onlyPositive(): this {
        this._mode = "onlyPositive";
        return this;
    }
    /** 只驱散负面Buff */
    onlyNegative(): this {
        this._mode = "onlyNegative";
        return this;
    }
}
