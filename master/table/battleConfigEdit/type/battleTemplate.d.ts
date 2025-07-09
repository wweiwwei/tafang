declare abstract class BattleSkillTemplateAddBuffBuilder extends BattleSkillBaseTemplateBuilder {
    /** 特效列表 */
    _durationeffect:BattleEffectBuilder[];
    /** 设置buff的数值 */
    value(v:number | string):this;
    /** 设置buff类型 */
    kind(s:PropertySign):this;
    /** 设置buff持续时间，一般为回合数，默认持续时间无限 */
    duration(d:number | string):this;
    /** 最大层数 */
    maxLayer(d:number | string):this;
    /** 设置为不可驱散 */
    unDispelable():this;
    /** 动态计算，一般buff数值固定，这个设置可以让buff动态计算，例如随血量下降提升伤害 */
    dynamic():this;
    /** 增加特效 */
    addDurationEffect(e:BattleEffectBuilder):this;
    /** 是否显示百分比 */
    showPercent(b:boolean):this;
        }
declare abstract class BattleSkillTemplateAddStateBuilder extends BattleSkillBaseTemplateBuilder {
    /** 特效列表 */
    _durationeffect:BattleEffectBuilder[];
    /** 设置状态的数值，例如燃烧伤害数值，持续回血数值 */
    value(v:number | string):this;
    /** 设置状态类型 */
    kind(s:StateSign):this;
    /** 设置buff持续时间，一般为回合数，默认持续时间无限 */
    duration(d:number | string):this;
    /** 最大层数，这个主要对燃烧，持续回血，持续回能量之类的状态生效。默认最大层数是1，也就是不叠加。生命护盾默认可以无限累计 */
    maxLayer(d:number | string):this;
    /** 设置为不可驱散 */
    unDispelable():this;
    /** 动态计算，一般buff数值固定，这个设置可以让buff动态计算，例如随血量下降提升伤害 */
    dynamic():this;
    /** 增加特效 */
    addDurationEffect(e:BattleEffectBuilder):this;
        }
declare abstract class BattleSkillTemplateAuraBuilder extends BattleSkillBaseTemplateBuilder {

    /** 设置buff的数值 */
    value(v:number | string):this;
    /** 设置buff类型 */
    kind(s:string):this;
    /** 光环目标针对敌方，没有设置默认针对己方 */
    forEnemy():this;
        }
declare abstract class BattleSkillTemplateDamageBuilder extends BattleSkillBaseTemplateBuilder {

    /** 设置伤害数值 */
    value(v:number | string):this;
    /** 设置伤害数值 */
    withoutEvent():this;
    /** 设置伤害tag */
    tag(t:string):this;
    /** 设置伤害豁免规则 */
    exempt(e:BattleDamageExemptBuilder):this;
    /** 设置伤害文本的样式，目前唯一有效的值只有lifeRemove，可以显示出生命移除的字样 */
    damageText(text:string):this;
        }
declare abstract class BattleSkillTemplateDispelBuilder extends BattleSkillBaseTemplateBuilder {

    /** 只驱散正面Buff */
    onlyPositive():this;
    /** 只驱散负面Buff */
    onlyNegative():this;
        }
declare abstract class BattleSkillTemplateDotAreaBuilder extends BattleSkillBaseTemplateBuilder {
    /** 效果列表 */
    effectList:BattleSkillBaseTemplateBuilder[];
    /** 范围半径列表（圆形模式必须有） */
    radiusList:number[];
    /** 效果间隔列表 */
    intervalList:number[];
    /** 宽列表（矩形模式必须有） */
    widthList:number[];
    /** 高列表（矩形模式必须有） */
    heightList:number[];
    /** 矩形模式 */
    rectMode():this;
    /** 圆形模式 */
    circleMode():this;
    /** 仅对敌人有效 */
    onlyEnemy():this;
    /** 仅对自身队伍有效 */
    onlySelf():this;
    /** 不限队伍 */
    notLimitTeam():this;
    /** 特效名，这个值必须配置 */
    effectName(name:string):this;
    /** 特效动画，这个值默认是skillattack，大多数特效动画都是这个值，不需要修改 */
    effectAnimation(animation:string):this;
    /** 缩放，这个值不设置默认是1 */
    scale(scale:number):this;
    /** 持续时间，这个值不设置默认是无限 */
    duration(duration:number):this;
    /** 层级，1常规层级，会被怪物遮挡，2特效层级，不会被怪物遮挡 */
    layer(layer:number):this;
        }
declare abstract class BattleSkillTemplateEnergyRecoverBuilder extends BattleSkillBaseTemplateBuilder {

    /** 设置能量恢复数值 */
    value(v:number | string):this;
        }
declare abstract class BattleSkillTemplateEnergyReduceBuilder extends BattleSkillBaseTemplateBuilder {

    /** 设置能量削减数值 */
    value(v:number | string):this;
        }
declare abstract class BattleSkillTemplateEnergyTranslateBuilder extends BattleSkillBaseTemplateBuilder {

    /** 设置生命恢复数值 */
    value(v:number | string):this;
        }
declare abstract class BattleSkillTemplateExplosionBuilder extends BattleSkillBaseTemplateBuilder {

    /** 爆炸范围 */
    range(v:number | string):this;
    /** 仅对敌人有效 */
    onlyEnemy():this;
    /** 仅对自身有效 */
    onlySelf():this;
    /** 不限队伍，把 */
    notLimitTeam():this;
        }
declare abstract class BattleSkillTemplateFireBulletBuilder extends BattleSkillBaseTemplateBuilder {

    /** 子弹速度，单位像素/秒 */
    speed(v:number | string):this;
    /** 普攻弹道类型（1、贝塞尔曲线 2、直线） */
    curveType(v:string | number):this;
    /** 子弹外观 */
    img(v:string):this;
    /** 子弹数量 */
    count(v:string | number):this;
    /** 曲线参数 */
    curveParam(v:string | number):this;
    /** 子弹缩放 */
    scale(v:string | number):this;
    /** 单体模式 */
    focusMode():this;
    /** 子弹间隔，单位毫秒 */
    interval(v:string | number):this;
    /** 穿透型子弹，该类型不追踪敌人，而是对沿途穿透的敌人都造成伤害 */
    penetrateMode(b:boolean):this;
    /** 穿透数，可穿透的敌人数量 */
    penetrateCount(v:string | number):this;
    /** 穿透碰撞半径 */
    penetrateRadius(v:string | number):this;
    /** 穿透持续时间，单位毫秒 */
    penetrateDuration(v:string | number):this;
    /** 穿透碰撞矩形，格式为[left, right, top, bottom] */
    penetrateRect(v:number[]):this;
    /** 穿透效果产生间隔，单位毫秒 */
    penetrateInterval(v:string | number):this;
    /** 子弹锁定旋转，锁定后子弹将不会旋转 */
    lockRotate(b:boolean):this;
    /** 边缘弹射，子弹到达地图边缘后会反弹 */
    borderBounceMode(b:boolean):this;
    /** 分裂模式，该子弹由分裂而来 */
    spliteMode(b:boolean):this;
        }
declare abstract class BattleSkillTemplateGroupBuilder extends BattleSkillBaseTemplateBuilder {

    /** 增加模板 */
    add(t:BattleSkillBaseTemplateBuilder):this;
        }
declare abstract class BattleSkillTemplateHookDamageBuilder extends BattleSkillBaseTemplateBuilder {

    /** 只在攻击时生效 */
    onlyAttack():this;
    /** 只在防守时生效 */
    onlyDefend():this;
    /** 检测状态，可以选择检测伤害源头或者伤害目标，只有状态存在才会触发效果 */
    checkState(target:"source" | "target",state:string):this;
    /** 伤害创建时的数值修正，可以修正基础攻击数值，增伤，暴击率，暴击伤害等数值 */
    hookDamageCreate(property:"baseValue" | "damage" | "critical" | "critDamage",value:string):this;
    /** 伤害结算时的数值修正，可以修正最终伤害值，生命值损伤等 */
    hookDamageHandle(property:"value" | "hpHurt",value:string):this;
        }
declare abstract class BattleSkillTemplateKeyFrameLoopBuilder extends BattleSkillBaseTemplateBuilder {
    /** 每一次到关键帧需要触发的模板 */
    loop:BattleSkillBaseTemplateBuilder;

        }
declare abstract class BattleSkillTemplateLaserBuilder extends BattleSkillBaseTemplateBuilder {

    /** 穿透模式 */
    penetrate():this;
    /** 仅对敌人有效 */
    onlyEnemy():this;
    /** 仅对自身有效 */
    onlySelf():this;
    /** 不限队伍，把 */
    notLimitTeam():this;
    /** 特效名，这个值必须配置 */
    effectName(name:string):this;
    /** 特效动画，这个值默认是skillattack，大多数特效动画都是这个值，不需要修改 */
    effectAnimation(animation:string):this;
    /** 缩放，这个值不设置默认是1 */
    scale(scale:number):this;
    /** 每次效果生效的间隔（毫秒数） */
    interval(v:number | string):this;
    /** 光线宽度 */
    width(v:number | string):this;
    /** 设置矩形效果可以生效的次数 */
    count(v:number | string):this;
    /** 持续时间，这个值不设置默认是无限 */
    duration(duration:number | string):this;
    /** 特效等待 */
    wait(d:number | string):this;
        }
declare abstract class BattleSkillTemplateLifeRecoverBuilder extends BattleSkillBaseTemplateBuilder {

    /** 设置生命恢复数值 */
    value(v:number | string):this;
        }
declare abstract class BattleSkillTemplateLightningChainBuilder extends BattleSkillBaseTemplateBuilder {

    /** 闪电链跳转次数 */
    bounce(v:number | string):this;
    /** 仅对敌人有效 */
    onlyEnemy():this;
    /** 仅对自身有效 */
    onlySelf():this;
    /** 不限队伍，把 */
    notLimitTeam():this;
        }
declare abstract class BattleSkillTemplateRectEffectBuilder extends BattleSkillBaseTemplateBuilder {
    /** 特效列表 */
    _effectWithControl:BattleEffectBuilder[];
    /** 矩形宽 */
    width(width:number | string):this;
    /** 矩形高 */
    height(height:number | string):this;
    /** 仅对敌人有效 */
    onlyEnemy():this;
    /** 仅对自身队伍有效 */
    onlySelf():this;
    /** 不限队伍 */
    notLimitTeam():this;
    /** 设置矩形效果可以生效的次数 */
    count(v:number | string):this;
    /** 每次效果生效的间隔（毫秒数） */
    interval(v:number | string):this;
    /** 增加特效 */
    addEffectWithControl(e:BattleEffectBuilder):this;
        }
declare abstract class BattleSkillTemplateRepulseBuilder extends BattleSkillBaseTemplateBuilder {

    /** 击退距离 */
    distance(v:number | string):this;
        }
declare abstract class BattleSkillTemplateReviveBuilder extends BattleSkillBaseTemplateBuilder {

    /** 复活时有多少生命值 */
    value(v:number | string):this;
        }
declare abstract class BattleSkillTemplateWaitAnimationEndBuilder extends BattleSkillBaseTemplateBuilder {


        }
declare abstract class BattleSkillTemplateWaitKeyFrameBuilder extends BattleSkillBaseTemplateBuilder {

    /** 复活时有多少生命值 */
    index(v:number):this;
        }

/** 技能模板 */
declare let template: {
    /** 附加buff，需要设置属性类型，持续回合数，buff数值 */
    addBuff():BattleSkillTemplateAddBuffBuilder
    /** 附加状态，需要设置状态类型，持续回合数，部分需要设置数值 */
    addState():BattleSkillTemplateAddStateBuilder
    /** 未实装，光环 */
    aura():BattleSkillTemplateAuraBuilder
    /** 伤害模板，需要设置伤害数值 */
    damage():BattleSkillTemplateDamageBuilder
    /** 驱散，默认驱散所有buff和状态，可仅驱散正面Buff或者负面Buff */
    dispel():BattleSkillTemplateDispelBuilder
    /** 持续范围效果 */
    dotArea():BattleSkillTemplateDotAreaBuilder
    /** 能量恢复，需要设置恢复数值 */
    energyRecover():BattleSkillTemplateEnergyRecoverBuilder
    /**  */
    energyReduce():BattleSkillTemplateEnergyReduceBuilder
    /** 能量传递，如果传递者保有量低于设置值，则传递保有值 */
    energyTranslate():BattleSkillTemplateEnergyTranslateBuilder
    /** 爆炸，对以目标为中心的单位造成特定效果 */
    explosion():BattleSkillTemplateExplosionBuilder
    /** 发射子弹模板 */
    fireBullet():BattleSkillTemplateFireBulletBuilder
    /** 将多个技能模板打包成一组，以便实现多个模板同时根据条件或者概率触发 */
    group():BattleSkillTemplateGroupBuilder
    /** 未实装，伤害流程定制，可以根据逻辑对伤害进行修正 */
    hookDamage():BattleSkillTemplateHookDamageBuilder
    /** 每个关键帧触发一次模板 */
    keyFrameLoop():BattleSkillTemplateKeyFrameLoopBuilder
    /** 光线，光线为直线攻击技能，指向单一目标，可以选择是否穿透沿途目标 */
    laser():BattleSkillTemplateLaserBuilder
    /** 生命恢复，需要设置恢复数值 */
    lifeRecover():BattleSkillTemplateLifeRecoverBuilder
    /** 闪电链 */
    lightningChain():BattleSkillTemplateLightningChainBuilder
    /** 矩形效果，范围默认是角色身前 */
    rectEffect():BattleSkillTemplateRectEffectBuilder
    /** 击退 */
    repulse():BattleSkillTemplateRepulseBuilder
    /** 矩形效果，范围默认是角色身前 */
    revive():BattleSkillTemplateReviveBuilder
    /** 等待动画播放结束 */
    waitAnimationEnd():BattleSkillTemplateWaitAnimationEndBuilder
    /** 等待下一个关键帧 */
    waitKeyFrame():BattleSkillTemplateWaitKeyFrameBuilder
}