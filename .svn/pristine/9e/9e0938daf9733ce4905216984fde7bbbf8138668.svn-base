declare type StateSign = {
    /** 该字段仅用于标识类型，不要使用 */
    _stateSign: symbol;
};
declare type BattleStateKind = {
    /** 眩晕(无法移动、攻击、使用主动技能) */
    stupor: StateSign;
    /** 缴械(无法进行普通攻击) */
    disarm: StateSign;
    /** 沉默(无法使用任何主动技能) */
    silence: StateSign;
    /** 无敌（驱散所有负面 buff，不受敌方任何效果影响）*/
    invincible: StateSign;
    /** 不屈（即使生命值为 0 也不会死亡，但如果生命值将为 0，则效果结束后立刻死亡）*/
    unyielding: StateSign;
    /** 燃烧，持续掉血 */
    burn: StateSign;
    /** 中毒，持续掉血 */
    poison: StateSign;
    /** 毒爆，除了中毒效果之外，还带目标角色死亡爆炸的效果 */
    poisonWithExplosion: StateSign;
    /** 持续回血 */
    healing: StateSign;
    /** 持续回怒 */
    charging: StateSign;
    /** 持续损失怒气 */
    energyLeak: StateSign;
    /** 生命护盾 */
    lifeShield: StateSign;
};
/** 状态类型 */
declare let state: BattleStateKind;
