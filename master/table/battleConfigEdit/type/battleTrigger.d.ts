declare type SkillTriggerBuilder = {
    /** 该字段只是用来标志这个类型，没有任何含义，不要使用 */
    _triggerSign: symbol;
    /** 合并两种触发条件 */
    concat: (t: SkillTriggerBuilder) => SkillTriggerBuilder;
};

/** 触发条件 */
declare let trigger: {
    /** 独立触发 */
    independent(coldDown: number | string): SkillTriggerBuilder;
    /** 超级技能 */
    ex(coldDown: number | string): SkillTriggerBuilder;
    /** 普攻触发 */
    normalAttack(): SkillTriggerBuilder;
    /** 冷却时间触发 */
    coldDown(coldDown: number | string): SkillTriggerBuilder;
    // /** 怒气值到达特定数值触发，使用该触发条件默认技能完成消耗所有怒气 */
    // minEnergy(e: number | string): SkillTriggerBuilder;
    /** 被动触发，被动技能在战斗前的被动效果附加阶段被触发 */
    passive(): SkillTriggerBuilder;
    /** 事件发生后触发，第一个参数是事件目标，第二个参数是事件类型 */
    afterEvent(t: BattleTargetBuilder, e: EventSign): SkillTriggerBuilder;
};
