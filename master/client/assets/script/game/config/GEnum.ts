/** 建筑类型 */
export enum EnumFacilityType {
    /** 材料建筑 */
    material = 1,
    /** 功能入口 */
    entrance = 2,
    /** 宿舍 */
    dormitory = 3,
    /** 餐厅 */
    restaurant = 4,
    /** 医院 */
    hospital = 5,
    /** 船长室 */
    captain = 6,
    /** 温室 */
    greenhouse = 7,
}

/** 建筑属性 */
export enum EnumFacilityProperty {
    /** 产出 */
    produce = 1,
    /** 工人上限 */
    workerLimit = 2,
    /** 疲劳恢复 */
    fatigueRecover = 3,
    /** 宿舍服务上限 */
    dormClientLimit = 4,
    /** 疾病恢复 */
    illnessRecover = 5,
    /** 饱食度恢复 */
    satietyRecover = 6,
    /** 餐食上限 */
    mealLimit = 7,
    /** 餐厅服务上限 */
    mealClientLimit = 8,
    /** 医院服务上限 */
    hospitalClientLimit = 9,
}

/** 时间类型 */
export enum EnumTimeType {}

export const EnumHeroProperty = {
    // /** 等级 */
    // level: "level",
    // /** 阶数 */
    // rank: "rank",
    // /** 星级 */
    // star: "star",
    // /** 品质 */
    // quality: "quality",
    /** 攻击 */
    attack: "attack",
    /** 最大生命值 */
    maxHp: "maxHp",
    /** 防御 */
    armor: "armor",
    /** 最大怒气 */
    maxEnergy: "maxEnergy",
    /** 初始怒气 */
    initialEnergy: "initialEnergy",
    /** 击杀恢复怒气 */
    killEnergy: "killEnergy",
    /** 单次攻击恢复怒气 */
    energyRecover: "energyRecover",
    /** 受击怒气恢复 */
    hitEnergyRecover: "hitEnergyRecover",
    /** 命中 */
    hit: "hit",
    /** 闪避 */
    dodge: "dodge",
    /** 暴击率 */
    critical: "critical",
    /** 反暴击 */
    criticalImmune: "criticalImmune",
    /** 暴击伤害 */
    criticalDamage: "criticalDamage",
    /** 暴击伤害抵抗 */
    criticalResistant: "criticalResistant",
    /** 增伤 */
    damage: "damage",
    /** 减伤 */
    defence: "defence",
    /** 治疗强度系数 */
    healFactor: "healFactor",
    /** 被治疗时的恢复系数 */
    recoverFactor: "recoverFactor",
    // /** 对附带某一个tag伤害的特殊增伤 */
    // specialDamage: "specialDamage",
    // /** 对附带某一个tag伤害的特殊减伤 */
    // specialDefence: "specialDefence",
    // /** 对带有某一个tag的角色的特殊增伤 */
    // specialDamageByHeroTag: "specialDamageByHeroTag",
    // /** 对带有某一个tag的角色的特殊减伤 */
    // specialDefenceByHeroTag: "specialDefenceByHeroTag",
    /** 格挡率 */
    block: "block",
    /** 破击率 */
    penetrate: "penetrate",
    /** 格挡减伤 */
    blockDefence: "blockDefence",
    /** 破击增伤 */
    penetrateDamage: "penetrateDamage",
    /** 破击增伤 */
    fixDamage: "fixDamage",
    /** 固定值减伤 */
    fixDefense: "fixDefense",
    /** 无视闪避概率 */
    ignoreDodge: "ignoreDodge",
    /** 移动速度 */
    moveSpeed: "moveSpeed",
    /** 普通攻击间隔 */
    normalAttackInterval: "normalAttackInterval",
    /** 普通攻击速度 */
    normalAttackSpeed: "normalAttackSpeed",
    /** 普通攻击范围 */
    normalAttackRange: "normalAttackRange",
    /** 复活概率 */
    revive: "revive",
    /** 技能范围 */
    skillRange: "skillRange",
    /** 普攻连击率 */
    combo: "combo",
    /** 普攻连击减免 */
    antiCombo: "antiCombo",
    /** 普攻击晕率 */
    stun: "stun",
    /** 普攻击晕减免 */
    antiStun: "antiStun",
    /** 普攻吸血 */
    lifeSteal: "lifeSteal",
    /** 普攻吸血减免 */
    antiLifeSteal: "antiLifeSteal",
    /** 技能冷却 */
    skillColdDown: "skillColdDown",
    /** 生命恢复(每秒) */
    lifeRecover: "lifeRecover",
    /** 生命恢复抑制(每秒) */
    antiLifeRecover: "antiLifeRecover",
    /** 防御塔普攻伤害提升 */
    towerNormalAttackDamage: "towerNormalAttackDamage",
    /** 防御塔普攻速度增加 */
    towerNormalAttackSpeed: "towerNormalAttackSpeed",
    /** 防御塔技能cd减少 */
    towerSkillColdDownReduce: "towerSkillColdDownReduce",
    /** 防御塔属性继承比例提升 */
    towerSucceed: "towerSucceed",
    /** 防御塔普攻射程 */
    towerNormalAttackRange: "towerNormalAttackRange",
    /** 防御塔普攻吸血 */
    towerLifeSteal: "towerLifeSteal",
} as const;
export type EnumHeroProperty = keyof typeof EnumHeroProperty;

export enum MineMapType {
    /** 砖块1 */
    BRICK_1 = 1,
    /** 砖块3 */
    BRICK_3 = 2,
    /** 无奖励砖块 */
    NOREWARD1 = 3,
    /** 地图炸弹 */
    MAP_BOMB = 4,
    /** 随机砖块，这个砖块实际不会在地图中出现 */
    RANDOM_BRICK = 5,
    /** 无奖励砖块2 */
    NOREWARD2 = 6,
}

export enum MineMapRewardType {
    /** 无 */
    NONE = 0,
    /** 道具 */
    ITEM = 1,
    /** 体力 */
    POWER = 2,
    /** 广告宝箱 */
    AD_CHEST = 3,
}
