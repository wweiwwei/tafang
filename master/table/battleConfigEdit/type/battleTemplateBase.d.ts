declare abstract class BattleSkillBaseTemplateBuilder {
    /** 切换动画 */
    abstract changeAnimation(animation: string): this;
    /** 条件重复 */
    abstract conditionRepeat(s: string): this;
    /** 条件触发 */
    abstract triggerCondition(c: string): this;
    /**
     * 概率触发配置
     *
     * 示例：
     *
     * .triggerProbability(0.3) 30%概率触发
     *
     * 即使不触发也会进入下一流程
     *
     * independant 多目标每个独立触发判定，默认开启
     *
     * */
    abstract triggerProbability(p: number | string, independant = true): this;
    /** 该字段只是用来标志这个类型，没有任何含义，不要使用 */
    private _templateSign: symbol;
    /**
     * 命中触发
     *
     * 示例: .afterHit = 模板
     *
     * 命中后触发特定模板
     */
    afterHit: BattleSkillBaseTemplateBuilder;

    /** 命中后模板触发率 */
    afterHitProbability: number;

    /** 击杀后触发 */
    afterKill: BattleSkillBaseTemplateBuilder;

    /** 击杀后触发概率 */
    afterKillProbability: number;

    /** 技能模板目标 */
    target: BattleTargetBuilder;

    /** 下一步执行的技能模板 */
    next: BattleSkillBaseTemplateBuilder;

    /** 增加特效 */
    addEffect(e: BattleEffectBuilder): this;
    /** 延迟触发，毫秒 */
    delay(time: number): this;

    /** 禁用平行处理，意味着将会一个目标一个目标执行 */
    abstract disableParallel(): this;
}
