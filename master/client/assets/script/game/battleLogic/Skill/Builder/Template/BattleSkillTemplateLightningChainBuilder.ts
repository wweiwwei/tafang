import { BattleSkillBaseTemplate } from "../../Template/BattleSkillBaseTemplate";
import { BattleSkillTemplateLightningChain } from "../../Template/BattleSkillTemplateLightningChain";

import { BattleSkillBaseTemplateBuilder } from "./BattleSkillBaseTemplateBuilder";
/** 闪电链 */
export class BattleSkillTemplateLightningChainBuilder extends BattleSkillBaseTemplateBuilder {
    build(): BattleSkillBaseTemplate {
        if (this._bounce === undefined) {
            throw new Error("BattleSkillLightningChainBuilder: bounce is required");
        }
        return new BattleSkillTemplateLightningChain(this);
    }
    _bounce: number | string = 0;
    /** 闪电链跳转次数 */
    bounce(v: number | string): this {
        this._bounce = v;
        return this;
    }

    _targetMode: "selfTeam" | "enemyTeam" | "all" = "enemyTeam";

    /** 仅对敌人有效 */
    onlyEnemy(): this {
        this._targetMode = "enemyTeam";
        return this;
    }
    /** 仅对自身有效 */
    onlySelf(): this {
        this._targetMode = "selfTeam";
        return this;
    }
    /** 不限队伍，把 */
    notLimitTeam(): this {
        this._targetMode = "all";
        return this;
    }
}
