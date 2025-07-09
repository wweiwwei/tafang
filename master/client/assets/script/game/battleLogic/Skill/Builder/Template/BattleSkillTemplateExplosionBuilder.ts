import { BattleSkillBaseTemplate } from "../../Template/BattleSkillBaseTemplate";
import { BattleSkillTemplateExplosion } from "../../Template/BattleSkillTemplateExplosion";
import { BattleSkillBaseTemplateBuilder } from "./BattleSkillBaseTemplateBuilder";
/** 爆炸，对以目标为中心的单位造成特定效果 */
export class BattleSkillTemplateExplosionBuilder extends BattleSkillBaseTemplateBuilder {
    build(): BattleSkillBaseTemplate {
        if (this._range === undefined) {
            throw new Error("BattleSkillExplosionBuilder: range is required");
        }
        return new BattleSkillTemplateExplosion(this);
    }
    _range: number | string = 0;
    /** 爆炸范围 */
    range(v: number | string): this {
        this._range = v;
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
