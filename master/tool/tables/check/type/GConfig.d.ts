
declare type CommonConfig = {
    facility: {
        /** 每层楼梯位置 */
        stairs: number[],
        /** 建筑阶数等级上限 */
        rankLevelLimit: number[],
        /** 建筑英雄入驻品质系数 */
        heroQualityBuff: number[],
        /** 玩家初始建筑 */
        initFacility: number[],
        /** 建筑升星等级限制 */
        facilityUpgradeStarRequire: number[],
        /** 建筑挂机最大收益时间（分钟） */
        maxAfkTime: number,
        /** 建筑升星需达到阶数 */
        facilityUpstarPremise: number,
    }
    hero: {
        /** 英雄各阶等级上限 */
        rankLevelLimit: number[],
        /** 英雄各星级等级上限 */
        starLevelLimit: number[],
        /** 英雄装备各阶等级上限 */
        equipmentRankLevelLimit: number[],
        /** 英雄技能解锁所需星级 */
        skillUnlockStar: number[],
        /** 不同品质英雄合成所需碎片数量 */
        composeRequire: number[],
        /** 重置英雄钻石消耗 */
        resetHeroDiamond: number,
        /** 玩家初始英雄 */
        initHero: number[],
        /** 玩家初始编队(前锋，空军，后排，留空填-1) */
        initFormation: number[],
        /** 编队位置解锁（船长室阶数） */
        formationUnlock: number[],
        /** 通关1-1时获得英雄 */
        stageReward: number,
    }
    stage: {
        /** 关卡各声望等级的需求 */
        reputationLevelRequire: number[],
        /** 关卡挂机宝箱最大挂机收益时间（分钟） */
        battleMaxAfkTime: number,
        /** 关卡地图最大挂机收益时间（分钟） */
        mapMaxAfkTime: number,
    }
    battleDefault: {
        /** 默认最大怒气 */
        maxEnergy: number,
        /** 默认初始怒气 */
        initialEnergy: number,
        /** 默认击杀恢复怒气 */
        killEnergy: number,
        /** 默认单次攻击恢复怒气 */
        energyRecover: number,
        /** 默认受击怒气恢复 */
        hitEnergyRecover: number,
        /** 默认命中 */
        hit: number,
        /** 默认闪避 */
        dodge: number,
        /** 默认暴击率 */
        critical: number,
        /** 默认暴击伤害 */
        criticalDamage: number,
        /** 默认格挡率 */
        block: number,
        /** 默认破击率 */
        penetrate: number,
        /** 默认格挡减伤 */
        blockDefence: number,
        /** 默认破击增伤 */
        penetrateDamage: number,
    }
    battlePoint: {
        /** 战斗力计算_攻击 */
        attack: number,
        /** 战斗力计算_防御 */
        armor: number,
        /** 战斗力计算_最大生命值 */
        maxHp: number,
        /** 战斗力计算_初始怒气 */
        initialEnergy: number,
        /** 战斗力计算_击杀回怒气 */
        killEnergy: number,
        /** 战斗力计算_攻击回怒气 */
        energyRecover: number,
        /** 战斗力计算_命中 */
        hit: number,
        /** 战斗力计算_闪避 */
        dodge: number,
        /** 战斗力计算_暴击率 */
        critical: number,
        /** 战斗力计算_反暴击 */
        criticalImmune: number,
        /** 战斗力计算_暴击伤害 */
        criticalDamage: number,
        /** 战斗力计算_暴击伤害抵抗 */
        criticalResistant: number,
        /** 战斗力计算_增伤 */
        damage: number,
        /** 战斗力计算_减伤 */
        defence: number,
    }
    survivorSettle: {
        /** 幸存者最大饱食度 */
        satietyMax: number,
        /** 幸存者安全疲劳度（大于这个疲劳度进入疲劳状态，疾病度开始变化） */
        fatigueSafe: number,
        /** 幸存者安全饱食度（小于这个饱食度进入饥饿状态，疾病度开始变化） */
        satietySafe: number,
        /** 幸存者安全疾病度（大于这个疾病度进入生病状态，前往医院） */
        illnessSafe: number,
        /** 幸存者最大疾病度（大于这个疾病度死亡） */
        illnessMax: number,
        /** 幸存者疲劳状态疾病度变化 */
        illnessFatigue: number,
        /** 幸存者饥饿状态状态疾病度变化 */
        illnessHungry: number,
        /** 幸存者工作时间饱食度变化（上班） */
        satietyWork: number,
        /** 幸存者工作时间疲劳度变化（上班） */
        fatigueWork: number,
        /** 幸存者工作时间饱食度变化（闲置） */
        satietyIdle: number,
        /** 幸存者工作时间疲劳度变化（闲置） */
        fatigueIdle: number,
        /** 幸存者用餐时间疲劳变化 */
        fatigueEat: number,
        /** 幸存者用餐时间饱食度变化（无论有没有吃饭都会累加该值） */
        satietyEat: number,
        /** 幸存者睡眠时间饱食度变化 */
        satietySleep: number,
        /** 幸存者在医院疲劳度变化 */
        fatigueHeal: number,
        /** 幸存者在医院饱食度变化 */
        satietyHeal: number,
        /** 幸存者死亡后复活所需的时间（毫秒） */
        reviveTime: number,
    }
    survivorTick: {
        /** 幸存者跨建筑移动速度（像素/帧） */
        speedMove: number,
        /** 幸存者建筑内漫步速度（像素/帧） */
        speedRamble: number,
        /** 幸存者闲逛时在建筑内停留时间范围（毫秒） */
        idleStayTime: number[],
        /** 幸存者吃饭耗时（毫秒） */
        eatTime: number,
        /** 幸存者睡眠气泡耗时（毫秒） */
        sleepTime: number,
        /** 幸存者工作气泡耗时（毫秒） */
        workTime: number,
        /** 幸存者治疗气泡耗时（毫秒） */
        healTime: number,
        /** 幸存者工作时出现睡眠气泡概率 */
        workSleep: number,
        /** 幸存者到达点随机区间范围 */
        reachRange: number,
        /** 幸存者跨建筑跑步移动速度（像素/帧） */
        speedRun: number,
    }
    knapsack: {
        /** 玩家初始物品 */
        initItem: {id:number,count:number}[],
    }
    enemy: {
        /** 每日外敌入侵免费刷新次数 */
        freeRefresh: number,
        /** 每日外敌入侵挑战次数 */
        challengeLimit: number,
        /** 外敌入侵每日可购买挑战次数 */
        buyChallengeLimit: number,
        /** 外敌入侵购买挑战次数消耗 */
        buyChallengeCost: number,
    }
    battle: {
        /** 外敌入侵战斗时间限制（秒） */
        enemyTimeLimit: number,
        /** 战斗中火球伤害(受庇护所等级影响) */
        fireballDamage: number[],
        /** 战斗属性计算公式 */
        propertyFormula: string,
        /** 竞技场战斗时间限制（秒） */
        arenaTimeLimit: number,
        /** 离线关卡战斗最大时间限制（分钟） */
        offlineStageTimeMax: number,
        /** 离线最少多久之后可以触发离线战斗窗口（分钟） */
        offlineStageTimeMin: number,
        /** 关卡战斗时间限制（秒）超过时间限制怪物未被全部消灭认为是失败 */
        stageTimeLimit: number,
        /** 爬塔战斗时间限制（秒） */
        towerTimeLimit: number,
        /** 挖矿战斗时间限制（秒） */
        mineTimeLimit: number,
        /** 建筑战斗时间限制（秒） */
        facilityTimeLimit: number,
        /** 玩家技能基础属性提升 */
        playerSkillBuff: string,
        /** 同伴基础属性提升 */
        petBuff: string,
    }
    mine: {
        /** 古井挖矿层数系数 */
        levelBuff: number[],
        /** 古井挖矿体力上限 */
        powerLimit: number,
        /** 古井挖矿体力恢复间隔（毫秒） */
        powerRecoverInterval: number,
        /** 古井挖矿重置所需层数 */
        resetFloorRequire: number,
        /** 古井挖矿重置钻石消耗 */
        resetCost: number,
        /** 古井挖矿每日看广告恢复道具和体力次数限制 */
        videoPowerLimit: number,
        /** 古井挖矿看广告恢复体力点数 */
        videoPowerRecover: number,
    }
    survivor: {
        /** 看视频获得的幸存者人数 */
        videoAddSurvivor: number,
    }
    cardPool: {
        /** 英雄卡池第一抽固定奖励（填写CardPoolReward的id） */
        firstHero: number,
        /** 装备卡池第一抽固定奖励（填写CardPoolReward的id） */
        firstEquipment: number,
        /** 卡池每日广告抽卡次数 */
        videoLimit: number,
        /** 卡池广告抽卡初始抽数|抽数增长|抽数上限 */
        videoConfig: number[],
    }
    story: {
        /** 新手剧情-暴风雨字幕 */
        subtitling: string,
        /** 新手剧情-黑屏提示 */
        enterTip: string,
    }
    arena: {
        /** 竞技场开放时间（开启和关闭时间，例如8-22点） */
        openTime: number[],
        /** 竞技场单场战斗结算基础分数 */
        pointBase: number,
        /** 竞技场单场战斗结算分数计算公式 */
        pointFormula: string,
        /** 竞技场单场结算分数上限 */
        pointLimit: number,
        /** 竞技场每日挑战次数 */
        challengeDaily: number,
        /** 竞技场购买挑战次数价格（钻石） */
        challengeCost: number,
        /** 竞技场每次购买挑战次数限制 */
        challengeBuyLimit: number,
        /** 竞技场购买刷新对手价格（钻石） */
        refreshCost: number,
        /** 竞技场每次刷新对手人数 */
        refreshCount: number,
        /** 竞技场挑战券价格配置 */
        cost: number[],
    }
    turntable: {
        /** 转盘3件/5件奖励概率 */
        rare: number[],
        /** 转盘庇护所等级系数 */
        captainReward: number[],
        /** 转盘每日视频限制 */
        videoLimit: number,
        /** 转盘视频冷却（毫秒） */
        videoColdDown: number,
        /** 看视频获得转盘消耗物数量 */
        videoAddStorage: number,
        /** 转盘第一次固定奖励（转盘表id） */
        firstReward: number,
        /** 漂流瓶保底奖励所需次数 */
        guarantee: number,
    }
    tower: {
        /** 爬塔挂机最大挂机收益时间（分钟） */
        maxAfkTime: number,
    }
    player: {
        /** 玩家改名钻石消耗 */
        changeNameCost: number,
    }
    manor: {
        /** 庄园格子配置（xx行|xx列） */
        gridConfig: number[],
    }
    techTree: {
        /** 科技树每日视频加速（次数|分钟） */
        videoTime: number[],
        /** 科技树加速1次消耗物品数量（id|数量） */
        accelerate: number[],
        /** 科技树加速1次减少的时间（分钟） */
        subTime: number,
    }
    job: {
        /** 转职重置消耗(钻石) */
        resetCost: number,
    }
    damageChallenge: {
        /** 伤害挑战类型(单体|群体) */
        dayOfWeek: number[][],
        /** 伤害挑战boss(单体|群体) */
        boss: number[],
    }
    career: {
        /** 重置职业消耗 */
        reset: number[],
    }
}
        