import { BattleRect } from "../../Map/BattleRect";
import { BattleBattleStageContext } from "../../Processor/BattleBattleStageContext";
import { BattleSkillBaseTemplateBuilder } from "../../Skill/Builder/Template/BattleSkillBaseTemplateBuilder";
import { BattleSkillTemplateDotAreaBuilder } from "../../Skill/Builder/Template/BattleSkillTemplateDotAreaBuilder";
import { BattleTargetSearch } from "../../Skill/Target/BattleTargetSearch";
import { BattleBattleStageObject } from "../BattleStage/BattleBattleStageObject";

export abstract class BattleEffectArea {
    abstract uid: number;
    abstract start(): void;

    abstract tick(): void;
    abstract getDisplayPosition(): { x: number; y: number };
    abstract isEnd(): boolean;

    abstract effect: string;
    abstract animation: string;

    abstract getAngle(): number;

    abstract layer: number;
}
