declare abstract class BattleEffectBuilder {
    /** 该字段只是用来标志这个类型，没有任何含义，不要使用 */
    _effectSign: symbol;

    /** 特效名，这个值必须配置 */
    abstract effectName(name: string): this;
    /** 特效动画，这个值默认是skillattack，大多数特效动画都是这个值，不需要修改 */
    abstract effectAnimation(animation: string): this;
    /** 位置类型，self自身，target目标，scene场景 */
    abstract positionType(type: "self" | "target" | "scene"): this;
    /** 缩放，这个值不设置默认是1 */
    abstract scale(scale: number): this;
    /** 偏移，这个值不设置默认是[0,0] */
    abstract offset(x: number, y: number): this;
    /** 延迟毫秒数，这个值不设置默认是0，如果动画效果需要一定的延迟才飘出伤害数字，可以使用这个属性 */
    abstract delay(ms: number): this;
    /** 按伤害源的方向旋转 */
    abstract withDirection(b: boolean): this;
}

declare let effect: BattleEffectBuilder;
