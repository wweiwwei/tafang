declare type EventSign = {
    /** 这只是个类型标志位，不要使用 */
    _eventSign: symbol;
};

declare type BattleEventKind = {
    /** 生命值归零，但是在死亡判定之前，如果死亡判定时有不屈状态，则角色不会死亡 */
    hpZero: EventSign;
    // /** 伤害结算前（造成伤害） */
    // beforeDamageSettle: EventSign;
    // /** 伤害结算前（受到伤害） */
    // beforeReceiveDamageSettle: EventSign;
    // /** 伤害结算后（造成伤害） */
    // afterDamageSettle: EventSign;
    // /** 伤害结算后（受到伤害） */
    // afterReceiveDamageSettle: EventSign;
    // /** 受伤，这个事件任何角色损血都会触发  */
    // hurt: EventSign;
    // /** 完成击杀 */
    // kill: EventSign;
    // /** 普攻之后 */
    // afterNormalAttack: EventSign;
};
/** 事件类型 */
declare let event: BattleEventKind;
