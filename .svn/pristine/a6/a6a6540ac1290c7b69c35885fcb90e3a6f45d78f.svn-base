import { BattleObjectInfo } from "../battleLogic/Object/BattleStage/BattleObjectInfo";
import { CardInfo } from "../entity/CardInfo";
import { EquipmentMonster } from "../entity/EquipmentMonster";
import { FriendInfo } from "../entity/FriendInfo";
import Hero from "../entity/Hero";
import Item from "../entity/Item";
import { MineAction } from "../entity/MineAction";
import { PlayerArenaHistory } from "../entity/PlayerArenaHistory";
import { PlayerEquipment } from "../entity/PlayerEquipment";
import { PlayerFriendState } from "../entity/PlayerFriendState";
import { VideoGroupPurchase } from "../entity/sharedData/VideoGroupPurchase";
import { StoneAutoSetting } from "../model/StoneAutoSetting";
import { GameSharedDataCache } from "./GameSharedDataCache";
import { NetWorkDataCache } from "./NetWorkDataCache";

export type GameErrorInfo = { code: number; msg: string };

// 服务器响应的消息的基本类型
// export type BaseGameServerResponse<T extends keyof GameServerMessageType> = {
//     errInfo: GameErrorInfo,
//     requestId: number,
//     data: ReturnType<GameServerMessageType[T]>,
// }
// 服务器主动推送的信息的基本类型
export type BaseGameServerNotify =
    | CacheMessage
    | {
          kind: "game"; // todo
          data: any;
      }
    | {
          kind: "error";
          data: GameErrorInfo;
      };

// 服务器推送的缓存更新信息
export type CacheMessage = {
    kind: "cache";
    path: keyof NetWorkDataCache;
    data: any;
    delKey?: any[];
    partial?: boolean;
};

// 服务器推送的共享数据缓存更新信息
export type GameSharedDataMessage = {
    kind: "shared";
    path: keyof GameSharedDataCache;
    data: any;
    mode: "replace" | "append" | "keyUpdate" | "keyDel";
};

export type FriendData = {
    /** 角色头像 */
    roleIcon: number;
    /** 角色名字 */
    roleName: string;
    /** 角色id */
    roleId: number;
    /** 角色战斗力 */
    battlePoint: number;
    /** 角色等级 */
    level: number;
    /** 角色最后上线时间 */
    lastOnLineTime: number;
    /** 角色头像 */
    headFrame: number;
};

export type GameServerApi = {
    /**冲榜活动模块 */
    impact: {
        /**领取任务奖励 */
        obtainMissionReward(x: { id: number }): Promise<Item[]>;
    };
    /**战令模块 */
    warOrder: {
        /**购买战令 */
        buyWarOrder(x: { id: number }): Promise<void>;
        obtain(x: { rewardId: number; free: boolean }): Promise<Item[]>;
    };
    /** 游戏基本模块 */
    game: {
        /** 初始化，请求玩家存档缓存 */
        initCache(x: { key: string[] }): Promise<{
            apiVersion: number;
        }>;
        /** 获取服务器在线玩家人数 */
        onlineCount(): Promise<number>;
    } /** 排行榜模块 */;
    ranking: {
        // /** 船长室等级排行榜 */
        // captainRanking(): Promise<
        //     {
        //         /** 角色id */
        //         roleId: number;
        //         /** 角色排名 */
        //         rank: number;
        //         /** 角色分数 */
        //         point: number;
        //     }[]
        // >;
        /** 爬塔等级排行榜 */
        towerRanking(): Promise<
            {
                /** 角色id */
                roleId: number;
                /** 角色排名 */
                rank: number;
                /** 角色分数 */
                point: number;
            }[]
        >;
        /** 关卡排行榜 */
        stageRanking(): Promise<
            {
                /** 角色id */
                roleId: number;
                /** 角色排名 */
                rank: number;
                /** 角色分数 */
                point: number;
            }[]
        >;
        // /** 抽卡排行榜 */
        // cardPoolRanking(): Promise<
        //     {
        //         /** 角色id */
        //         roleId: number;
        //         /** 角色排名 */
        //         rank: number;
        //         /** 角色分数 */
        //         point: number;
        //     }[]
        // >;
        // /** 装备抽卡排行榜 */
        // equipmentCardPoolRanking(): Promise<
        //     {
        //         /** 角色id */
        //         roleId: number;
        //         /** 角色排名 */
        //         rank: number;
        //         /** 角色分数 */
        //         point: number;
        //     }[]
        // >;
        /** 根据排行榜的编号获取排行榜信息 */
        rankingByIndex(x: { index: number }): Promise<
            {
                /** 角色id */
                roleId: number;
                /** 角色排名 */
                rank: number;
                /** 角色分数 */
                point: number;
            }[]
        >;
    };

    /** gm模块 */
    gm: {
        /** gm加物品 */
        gmAddItem(x: { item: Item }): Promise<void>;
        /** gm加装备 */
        gmAddEquipment(x: { id: number; level: number; count: number }): Promise<void>;
        /** gm加战车装备 */
        gmAddCarEquipment(x: { id: number; level: number; count: number }): Promise<void>;
        /** gm减物品 */
        gmSubItem(x: { item: Item }): Promise<void>;
        /** gm加时间 */
        gmAddTime(x: { time: number }): Promise<void>;
        /** gm获取完整游戏存档 */
        gmGetSaveData(): Promise<string>;
        /** gm测试报错 */
        gmTestError(): Promise<void>;
        /** gm设置英雄等级 */
        gmSetHeroLevel(x: { id: number; lv: number }): Promise<void>;
        /** gm清空数据 */
        gmClearData(): Promise<void>;
        /** gm建筑测试（建筑全部解锁并达到满级） */
        gmFacilityUnlock(): Promise<void>;
        /** gm直接完成所有的任务 */
        gmNextTask(): Promise<void>;
        /** gm下一个测试，直接到下一个任务目标 */
        gmAllMission(): Promise<void>;
        /** 清除所有幸存者 */
        clearAllSurvivor(): Promise<void>;
        /**加技能 */
        gmAddSkill(x: { id: number; count: number }): Promise<void>;
        /**加同伴 */
        gmAddPet(x: { id: number; count: number }): Promise<void>;
    };

    /** 英雄模块 */
    hero: {
        /** 批量英雄合成 */
        batchComposeHero(): Promise<Hero[]>;
        // /** 锁定英雄 */
        // lockHero(x: { uniqueId: number; lock: boolean }): Promise<void>;
        /** 合成英雄 */
        composeHero(x: { id: number }): Promise<Hero>;
        /** 英雄升级 */
        upgradeHeroLevel(x: { uniqueId: number; count: number }): Promise<void>;
        /** 英雄升阶 */
        upgradeHeroRank(x: { uniqueId: number }): Promise<void>;
        /** 英雄升星 */
        upgradeHeroStar(x: { uniqueId: number }): Promise<void>;
        /** 英雄上阵升级 */
        upgradeAllHero(): Promise<void>;
        // /** 重置英雄 */
        // resetHero(x: { uniqueId: number }): Promise<{
        //     item: Item[];
        //     hero: Hero[];
        // }>;
        /** 设置编队 */
        setFormation2(x: { key: string; formation: number[]; change: boolean }): Promise<void>;
        /** 设置英雄装备 */
        setHeroEquipment(x: {
            uniqueId: number;
            equipment: { id: number; level: number; rank: number }[];
        }): Promise<void>;
        /** 替换英雄装备 */
        replaceEquipment2(x: {
            uniqueId: number;
            part: number;
            equipment: { id: number; level: number; rank: number };
            fromHero: number;
            change: boolean;
        }): Promise<void>;
        /** 升级装备 */
        upgradeEquipmentLevel(x: { id: number; level: number; rank: number; count: number }): Promise<void>;
        /** 升级英雄装备 */
        upgradeHeroEquipmentLevel(x: { uniqueId: number; part: number; count: number }): Promise<void>;
        /** 升级英雄全部装备 */
        upgradeAllEquipmentLevel(x: { uniqueId: number }): Promise<void>;
        /** 升级装备阶数 */
        upgradeEquipmentRank(x: { id: number; level: number; rank: number }): Promise<void>;
        /** 升级英雄装备阶数 */
        upgradeHeroEquipmentRank(x: { uniqueId: number; part: number }): Promise<void>;
    };

    /** 建筑模块 */
    facility: {
        /** 占领建筑 */
        occupyFacility(x: { id: number }): Promise<{
            reward: Item[];
            survivor: number;
        }>;
        /** 建筑升级，lvKind的有效值为1和2 */
        upgradeFacility(x: { id: number }): Promise<void>;
        /** 建筑升阶 */
        upgradeFacilityRank(x: { id: number }): Promise<Item[]>;
        /** 建筑升星 */
        upgradeFacilityStar(x: { id: number }): Promise<void>;
        // /** 建筑设置英雄 */
        // setHero(x: { id: number; heroUniqueId: number }): Promise<void>;
        /** 生存者记录 */
        saveSurvivor(x: { data: string }): Promise<void>;
        /** 在线结算 */
        onlineSettle(x: {
            produce: {
                data: { [id: number]: number };
            };
            stamp: number;
        }): Promise<{ success: boolean }>;
        /** 收获建筑产出 */
        harvest(x: { id: number }): Promise<Item[]>;
        /** 收获所有建筑产出 */
        harvestAll(): Promise<Item[]>;
        /** 更换建筑入驻的英雄 */
        changeHero(x: { facilityId: number; heroUniqueId: number }): Promise<void>;
        /** 增加建筑的工人数量 */
        addSurvivorToWork(x: { facilityId: number; count: number }): Promise<void>;
        /** 减少建筑的工人数量 */
        subSurvivorToWork(x: { facilityId: number; count: number }): Promise<void>;
        /** 看视频加幸存者 */
        videoAddSurvivor(): Promise<void>;
    };
    /** 关卡模块 */
    stage: {
        /** 挑战关卡 */
        challengeStage(x: { mapIndex: number; stageIndex: number }): Promise<{
            reward: Item[];
        }>;
        /** 挑战关卡失败 */
        challengeStageFail(x: { mapIndex: number; stageIndex: number; ratio: number; wave: number }): Promise<{
            reward: Item[];
        }>;
        /** 挑战视频双倍奖励 */
        challengeVideoReward(): Promise<{
            reward: Item[];
        }>;
        /** 获取关卡成就任务奖励 */
        obtainAchievementReward(x: { id: number }): Promise<Item[]>;
        /** 上报关卡战斗结束 */
        reportStageBattleEnd(): Promise<void>;
        /** 广告扫荡 */
        adSweep(): Promise<{
            reward: Item[];
        }>;
        /** 获取首通奖励 */
        obtainFirstReward(x: { mapIndex: number; stageIndex: number; index: number }): Promise<Item[]>;
        /** 获取所有首通奖励 */
        obtainAllFirstReward(): Promise<Item[]>;
    };

    /** 好友模块 */
    friend: {
        /** 获取好友信息 */
        friendState(): Promise<PlayerFriendState>;
        /** 获取推荐好友列表 */
        friendRecommend(): Promise<number[]>;
        /** 发送好友申请 */
        sendFriendApplication(x: { friendId: number }): Promise<void>;
        /** 同意好友申请 */
        acceptFriendApplication(x: { friendId: number }): Promise<void>;
        /** 同意所有好友申请 */
        acceptAllFriendApplication(): Promise<void>;
        /** 拒绝好友申请 */
        rejectFriendApplication(x: { friendId: number }): Promise<void>;
        /** 拒绝所有好友申请 */
        rejectAllFriendApplication(): Promise<void>;
        /** 搜索玩家 */
        searchPlayer(x: { query: string }): Promise<number[]>;
        /** 删除好友 */
        deleteFriend(x: { friendId: number }): Promise<void>;
        /** 获取角色信息列表 */
        roleInfo(x: { roleIdList: number[] }): Promise<{
            [roleId: number]: FriendInfo;
        }>;
        /** 加入黑名单 */
        addBlackList(x: { friendId: number }): Promise<void>;
        /** 移除黑名单 */
        removeBlackList(x: { friendId: number }): Promise<void>;
        /** 挑战玩家 */
        challenge(x: { friendId: number }): Promise<string>;
    };

    /** 邮件模块 */
    email: {
        /** 获取邮件奖励 */
        getEmailReward(x: { id: number }): Promise<Item[]>;
        /** 获取所有邮件奖励 */
        getAllEmailReward(): Promise<Item[]>;
    };

    /** cdkey模块 */
    cdKey: {
        /** 获取cdkey奖励 */
        getCdKeyReward(x: { key: string }): Promise<Item[]>;
    };

    /** 头像设置 */
    avatar: {
        /** 设置名字 */
        setName(x: { name: string }): Promise<void>;
        /** 设置头像 */
        setIcon(x: { icon: number }): Promise<void>;
        /** 设置头像框 */
        setHeadFrame(x: { headFrame: number }): Promise<void>;
    };

    /** 充值模块 */
    charge: {
        /** 测试充值 */
        testPay(x: { itemId: number; extra: string }): Promise<void>;
        /** 获取奖励，传入订单id */
        obtainReward(x: { id: number }): Promise<any>;
        /** 领取月卡每日奖励*/
        obtainMonthCardReward(): Promise<Item[]>;
        /** 领取永久卡每日奖励*/
        obtainPermanentCardReward(): Promise<Item[]>;
        /** 检查月卡剩余天数*/
        checkMonthRemain(): Promise<number>;
        /** 激活礼包*/
        activePack(x: { id: number }): Promise<void>;
    };

    /** 卡池模块 */
    cardPool: {
        /** 抽卡 */
        drawCard(x: { id: number; count: number }): Promise<CardInfo[]>;
        /** 设置心愿单 */
        setWishList(x: { id: number; wishList1: number[]; wishList2: number[] }): Promise<void>;
        /** 获取积分奖励 */
        obtainPointReward(x: { id: number }): Promise<Item[]>;
    };

    /** 任务模块 */
    mission: {
        /** 获取任务奖励 */
        obtainMissionReward(x: { id: number }): Promise<Item[]>;
        /** 获取目标奖励 */
        obtainTaskReward(): Promise<Item[]>;
    };

    /** 战车模块 */
    car: {
        /** 战车升级 */
        upgradeCar(): Promise<void>;
        /** 升级战车特定部位的装备 */
        upgradeCarEquipment(x: { part: number }): Promise<void>;
        /** 在背包中升级战车装备 */
        upgradeCarEquipmentInKnapsack(x: { id: number; level: number }): Promise<void>;
        /** 更换战车装备 */
        replaceCarEquipment(x: { part: number; equipment: { id: number; level: number } }): Promise<void>;
        /** 设置战车装备 */
        setCarEquipment(x: { equipment: { id: number; level: number }[] }): Promise<void>;
    };

    /** 图鉴模块 */
    collection: {
        /** 激活羁绊 */
        activateRelation(x: { id: number }): Promise<void>;
        /** 领取图鉴积分，id为英雄id */
        obtainPoint(x: { id: number }): Promise<void>;
        /** 领取等级奖励 */
        obtainLevelReward(x: { page: number; level: number }): Promise<Item[]>;
    };

    /** 外敌入侵模块 */
    enemy: {
        // todo
        /** 获取外敌阵容的详细信息 */
        teamInfo(x: { uid: number }): Promise<any>;
        /** 挑战 */
        challenge(x: { uid: number }): Promise<void>;
        /** 刷新 */
        refreshEnemy(): Promise<void>;
    };

    /** 挖矿模块 */
    mine: {
        /** 看视频恢复体力 */
        videoAddPower(): Promise<void>;
        /** 看视频恢复体力 */
        videoAddDrill(): Promise<void>;
        /** 看视频恢复体力 */
        videoAddBomb(): Promise<void>;
        /** 看视频解锁自动挖矿 */
        videoAuto(): Promise<void>;
        /** 重置层数 */
        resetFloor(): Promise<void>;
        /** 挖矿 */
        hitBrick(x: { uniqueId: number; quick: boolean }): Promise<MineAction[]>;
        /** 挑战boss */
        challengeBoss(): Promise<MineAction[]>;
        /** 视频获取钻石 */
        videoDiamond(): Promise<Item>;
        /** 使用道具 */
        usePro(x: { propType: number; x: number; y: number }): Promise<MineAction[]>;
    };

    /** 爬塔模块 */
    tower: {
        /** 挑战 */
        challengeTower(): Promise<Item[]>;
        /** 领取挂机奖励 */
        collectAfkReward(): Promise<Item[]>;
        /** 获取排名数据 */
        rankList(): Promise<{ rank: number; name: string; level: number }[]>;
        /** 领取等级奖励 */
        obtainLevelReward(x: { level: number }): Promise<Item[]>;
    };

    /** 引导模块 */
    guide: {
        /** 完成引导 */
        complete(x: { id: number }): Promise<void>;
    };
    /** 竞技场模块 */
    arena: {
        /** 玩家信息 */
        info(): Promise<{
            /** 当前玩家分数 */
            point: number;
            /** 当前玩家排名 */
            rank: number;
            /** 今日已刷新次数 */
            todayRefresh: number;
            /** 今日购买次数 */
            todayBuy: number;
        }>;
        /** 获取排行榜信息 */
        top(): Promise<
            {
                /** 角色id */
                roleId: number;
                /** 角色排名 */
                rank: number;
                /** 角色分数 */
                point: number;
            }[]
        >;
        /** 发起挑战 */
        challenge(x: { targetRoleId: number }): Promise<{
            /** 攻方阵容 */
            attackTeam: BattleObjectInfo[];
            /** 守方阵容 */
            defendTeam: BattleObjectInfo[];
            /** 随机种子 */
            seed: number;
            /** uuid */
            uuid: number;
            /** 分数变化 */
            point: number;
            /** 是否胜利 */
            win: boolean;
        }>;
        /** 历史记录 */
        history(): Promise<PlayerArenaHistory[]>;
        /** 挑战列表 */
        challengeList(): Promise<
            {
                /** 角色id */
                roleId: number;
                /** 角色排名 */
                rank: number;
                /** 角色分数 */
                point: number;
            }[]
        >;
        /** 刷新挑战列表 */
        refreshChallengeList(x: { click: boolean }): Promise<
            {
                /** 角色id */
                roleId: number;
                /** 角色排名 */
                rank: number;
                /** 角色分数 */
                point: number;
            }[]
        >;
        /**购买挑战券 */
        buyTicket(): Promise<void>;
    };
    /** 战斗模块 */
    battle: {
        /** 看广告增加法杖 */
        videoAddMagicStaff(x: { id: number }): Promise<void>;
        /** 钻石购买法杖 */
        diamondBuyMagicStaff(x: { id: number; count: number }): Promise<void>;
        /** 使用法杖 */
        useMagicStaff(x: { id: number; count: number }): Promise<void>;
        /** 法杖消耗时间汇报 */
        timeUseReport(x: { time: number }): Promise<void>;
        /** 杀敌任务上报 */
        killMonster(): Promise<void>;
        /** 杀敌任务上报 */
        killMonsterEx(x: { count: number; coin: number }): Promise<void>;
    };
    /** 转盘模块 */
    turntable: {
        /** 转 */
        roll(x: { count: number }): Promise<{
            id: number[];
            reward: Item[];
        }>;
        videoAddItem(): Promise<void>;
    };
    /** 背包模块 */
    knapsack: {
        /** 开箱子 */
        openChest(x: { id: number; chestCount: number; itemId: number }): Promise<Item[]>;
    };
    /** 石头模块 */
    stone: {
        /** 修改自动设置 */
        changeAutoSetting(x: { setting: StoneAutoSetting }): Promise<void>;
        /** 阶段升级 */
        upgradeStage(): Promise<void>;
        /** 升级 */
        upgrade(): Promise<void>;
        /** 升级加速（减少时间） */
        accelerate(x: { kind: number; count: number }): Promise<void>;
        /** 抽卡 */
        drawCard(x: { auto: boolean; uniqueId: number }): Promise<
            {
                /** 获得的装备 */
                equipment: PlayerEquipment;
                /** 分解出来的物品和其他奖励物品 */
                reward: Item[];
                /** 分解得到的经验值 */
                exp: number;
                /** 是否被自动售出了 */
                sell: boolean;
            }[]
        >;
        /** 抽卡 */
        drawCard2(x: { auto: boolean }): Promise<
            {
                /** 获得的装备 */
                equipment: PlayerEquipment;
                /** 分解出来的物品和其他奖励物品 */
                reward: Item[];
                /** 分解得到的经验值 */
                exp: number;
                /** 是否被自动售出了 */
                sell: boolean;
            }[]
        >;
        /** 召唤装备怪 */
        summon(x: { count: number }): Promise<EquipmentMonster[]>;
    };
    /** 玩家装备模块 */
    playerEquipment: {
        /** 替换装备 */
        replace(x: { tempIndex: number; sell: boolean }): Promise<{
            /** 分解出来的物品和其他奖励物品 */
            reward: Item[];
            /** 分解得到的经验值 */
            exp: number;
        }>;
        /** 出售临时装备 */
        sell(x: { tempIndex: number }): Promise<{
            /** 分解出来的物品和其他奖励物品 */
            reward: Item[];
            /** 分解得到的经验值 */
            exp: number;
        }>;
        /** 出售所有临时装备 */
        sellAll(): Promise<{
            /** 分解出来的物品和其他奖励物品 */
            reward: Item[];
            /** 分解得到的经验值 */
            exp: number;
        }>;
        /**强化塔位 */
        strengthenTower(x: { index: number }): Promise<void>;
        strengthenAllTower(): Promise<void>;
        /**洗练塔位 */
        towerWash(x: { index: number }): Promise<void>;
        /**锁定词条 */
        lockProperty(x: { index: number; number: number }): Promise<void>;
        /** 激活塔位加成 */
        activateTowerPlace(): Promise<void>;
        /** 替换上阵的塔 */
        replaceTower(x: { originIndex: number; replacePart: number }): Promise<void>;
        /** 互换上阵塔的位置 */
        changeTowerPosition(x: { fromIndex: number; toIndex: number }): Promise<void>;
        /** 激活图鉴 */
        activateColletion(x: { equipmentId: number }): Promise<Item[]>;
        /** 选择天赋 */
        selectTalent(x: { part: number; index: number }): Promise<void>;
        /**升级天赋 */
        upgradeTalent(x: { part: number; index: number }): Promise<void>;
    };
    /** 玩家模块 */
    player: {
        /** 设置名字 */
        changeRoleName(x: { name: string }): Promise<void>;
        /** 设置头像 */
        changeRoleIcon(x: { icon: number }): Promise<void>;
        /** 领取功能解锁奖励 */
        // obtainSystemReward(x: { id: number }): Promise<Item[]>;
        /** 领取任务奖励 */
        obtainMissionReward(x: { id: number }): Promise<Item[]>;
        upgradeRank(): Promise<void>;
        upgradeLevel(): Promise<void>;
    };
    /** 技能模块 */
    playerSkill: {
        /** 设置方案 */
        setFormation(x: { key: number; formation: number[] }): Promise<void>;
        /** 切换方案 */
        changeFormation(x: { key: number }): Promise<void>;
        /** 升级技能 */
        upgradeSkill(x: { id: number }): Promise<void>;
        /** 升级全部技能 */
        upgradeAllSkill(): Promise<void>;
    };
    /** 同伴模块 */
    playerPet: {
        /** 设置方案 */
        setFormation(x: { key: number; formation: number[] }): Promise<void>;
        /** 切换方案 */
        changeFormation(x: { key: number }): Promise<void>;
        /** 升级技能 */
        upgradePet(x: { id: number }): Promise<void>;
        /** 升级全部技能 */
        upgradeAllPet(): Promise<void>;
    };
    /** 化石模块 */
    fossil: {
        /** 设置命格 */
        setFormation(x: { formation: number[] }): Promise<void>;
        /** 设置命星 */
        setStar(x: { id: number }): Promise<void>;
        /** 出售物品 */
        sellItem(x: { item: Item }): Promise<Item[]>;
    };
    /**科技树模块 */
    technology: {
        /**升级 */
        updateTech(): Promise<void>;
        /**加速 */
        // speedUp(x: { video: boolean; count: number }): Promise<void>;
    };
    /**庄园模块 */
    manor: {
        removeMapItem(x: { id: number; index: number }): Promise<void>;
        setMap(x: { id: number; x: number; y: number }): Promise<void>;
    };
    /**伤害挑战模块 */
    damageChallenge: {
        report(x: { count: number; kind: number }): Promise<void>;
        getReward(x: { ids: number[] }): Promise<Item[]>;
    };
    /**转职模块 */
    career: {
        reset(): Promise<void>;
        studyTalent(x: { free: boolean }): Promise<number>;
        transfer(x: { id: number }): Promise<void>;
    };
    /** 视频团购模块 */
    playerVideoGroupPurchase: {
        /** 看完视频上报 */
        reportVideo(): Promise<void>;
        /** 发起团购 */
        launchGroupPurchase(): Promise<void>;
        /** 是否可以加入此团购 */
        isCanJoinGroupPurchase(x: { uniqueId: number }): Promise<boolean>;
        /** 加入团购 */
        joinGroupPurchase(x: { uniqueId: number }): Promise<void>;
        /** 获取最近团购数据 */
        recentVideoGroupPurchase(): Promise<{
            [unique: number]: VideoGroupPurchase;
        }>;
    };
    /**精灵 */
    sprite: {
        /**升级精灵 */
        upgradeSprite(x: { id: number; count: number }): Promise<void>;
        /**升阶精灵 */
        uprankSprite(x: { id: number }): Promise<void>;
        /**升级赋能 */
        upgradeSpritePower(x: { id: number }): Promise<number>;
        /**召唤 */
        drawCard(x: { id: number; count: number; free: boolean }): Promise<Item[]>;
        /**上阵 */
        setFormation(x: { formation: number[] }): Promise<void>;
    };
    /** 无尽模式 */
    infinite: {
        /** 更新记录 */
        updateRecord(x: { lv: number }): Promise<void>;
        /** 获取今日奖励 */
        obtainReward(): Promise<Item[]>;
    };

    /**宴会 */
    banquet: {
        /**活动物品兑换积分 */
        exchangePoint(x: { id: number; count: number }): Promise<Item[]>;
        /**领取积分奖励 */
        obtainLevelReward(x: { id: number }): Promise<Item[]>;
        /**购买礼包 */
        buyPack(x: { id: number }): Promise<Item[]>;
        /**购买团购 */
        buyGroup(x: { id: number }): Promise<Item[]>;
        /**领取任务奖励 */
        obtainMissionReward(x: { id: number }): Promise<Item[]>;
        /**购买商店物品 */
        buyShopItem(x: { tid: number; count: number }): Promise<Item[]>;
    };

    rogue: {
        /** 升级技能 */
        upgradeSkillLv(x: { id: number }): Promise<void>;
        /** 升级神通技能 */
        upgradeExSkillLv(x: { id: number }): Promise<void>;
        /** 选择神通技能 */
        changeExSkill(x: { id: number[] }): Promise<void>;
    };

    skin: {
        /** 选择皮肤 */
        changeSkin(x: { id: number }): Promise<void>;
    };

    mount: {
        /** 选择坐骑 */
        changeMount(x: { id: number }): Promise<void>;
    };

    /** 体力 */
    power: {
        /** 视频补充体力 */
        videoAddPower(): Promise<void>;
        /** 钻石购买体力 */
        diamondAddPower(x: { count: number }): Promise<void>;
    };
    /** 商场 */
    mall: {
        buy(x: { id: number }): Promise<Item[]>;
    };
};
