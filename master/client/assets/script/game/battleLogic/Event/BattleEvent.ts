import { BattleDamage } from "../Entity/BattleDamage";
import { BattleBuff } from "../Object/Buff/BattleBuff";
import { BattleBaseState } from "../Object/State/BattleBaseState";

export class BattleEvent<EventType extends keyof BattleEventDataMap = any> {
    constructor(
        /** 事件类型 */
        public eventType: EventType,
        /** 目标的唯一id */
        public target: number,
        /** 事件含有的tag */
        public tag: string[],
        /** 事件相关数据 */
        public data: BattleEventDataMap[EventType]
    ) {}
}

export type BattleEventDataMap = {
    damageBeforeLaunch: {
        damage: BattleDamage;
    };
    damageAfterLaunch: {
        damage: BattleDamage;
    };
    damageBeforeBeHit: {
        damage: BattleDamage;
    };
    damageAfterBeHit: {
        damage: BattleDamage;
    };
    damageDodgeSuccess: {
        damage: BattleDamage;
    };
    damageDodgeFail: {
        damage: BattleDamage;
    };
    damageHitSuccess: {
        damage: BattleDamage;
    };
    damageHitFail: {
        damage: BattleDamage;
    };
    enter: {};
    dying: {};
    quit: {};
    addState: {
        state: BattleBaseState;
    };
    addBuff: {
        buff: BattleBuff;
    };
    removeBuff: {
        buff: BattleBuff;
    };
    removeState: {
        state: BattleBaseState;
    };
    skillEnd: {};
};
