import { BattleGlobalProperty } from "../../Processor/BattleGlobalProperty";
import { BattleProperty } from "./BattleProperty";

export type BattleObjectInfoSkill = {
    /** 肉鸽技能id */
    rogueSkillId?: number;
    /** 关联技能id，主要是职业技能和独立技能 */
    relateSkillId?: number;
    id: number;
    level: number;
};

/** 该类型用于网络传输持久化 */
export class BattleObjectInfo {
    /** 角色id */
    id: number;
    /** 角色类型 */
    objectType: string;
    /** 独立技能 */
    independentSkill: BattleObjectInfoSkill[] = [];
    /** 必杀技 */
    mainSkill: BattleObjectInfoSkill[] = [];
    /** 普攻 */
    normalAttack: BattleObjectInfoSkill;
    /** 其他技能 */
    otherSkill: BattleObjectInfoSkill[] = [];
    /** 必杀技 */
    exSkill: BattleObjectInfoSkill[] = [];
    /** 神器技能 */
    artifact: BattleObjectInfoSkill[] = [];
    /** 英雄位置 */
    heroIndex: number;
    /** 属性 */
    property: BattleProperty;
    /** 全局属性 */
    globalProperty?: BattleGlobalProperty;
    /** 已激活天赋 */
    talent: number[] = [];
}
