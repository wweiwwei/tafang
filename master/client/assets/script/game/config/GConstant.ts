import { EnumFacilityType } from "./GEnum";

export default class Constant {
    /** 设计分辨率 */
    designSize = cc.size(750, 1334);

    localTablePort = "16691";

    /** 英雄类型图标名称 */
    getHeroKindIcon(kind: string) {
        return "hero_kind_" + kind;
    }

    getRogueEquipmentQualityBg(quality: number) {
        return "battle_select_bg_quality" + quality;
    }

    /** 月卡id */
    get monthCardId() {
        return GTable.getList("ChargeTbl").find((t) => t.kind === 4).id;
    }
    /** 永久卡id */
    get permanentId() {
        return GTable.getList("ChargeTbl").find((t) => t.kind === 5).id;
    }
    /** 免广告id */
    get clearAdId() {
        return GTable.getList("ChargeTbl").find((t) => t.kind === 3).id;
    }

    /** 打装备场景 */
    equipmentScene = {
        /** 打怪场景 */
        mapName: "map1",
        /** 主角初始位置 */
        playerPos: { x: -5, y: 0 },
        /** 玩家射程 */
        playerRange: 100,
        /* 每帧速度 */
        monsterSpeed: 0.4,
        /** 子弹缩放 */
        bulletScale: 0.5,
        /** 子弹与怪物小于该距离认为已命中 */
        bulletHitDistance: 10,
        /** 子弹速度 */
        bulletSpeed: 10,
        /** 玩家移动速度 */
        playerMoveSpeed: 5,
        /** 子弹旋转速度 */
        bulletRotateSpeed: -3,
        // /** 怪物移动初始坐标范围 */
        // monsterInitPos: { x: [-200, 200], y: [100, 300] },
        // /** 怪物移动坐标边界 */
        // monsterBorder: { x: [-300, 300], y: [80, 400] },
    };

    /** 战斗常数 */
    battle = {
        /** 塔防模式 */
        tdMode: false,
        /** 特效表现 */
        effect: {
            /** 主技能特效位置偏移量 */
            maxSkillOffset: [0, 40],
            /** 子弹特效位置偏移量 */
            bulletOffset: [0, 50],
        },
        slowMove: 125,
        fastMove: 250,
        cameraFixX: -150,
        carPosition: [-230, -135],
        /** 当怪物数量超过多少比例时boss的动画发生变化 */
        bossSpineChange: [0.4, 0.8],
        /** boss对话存在时间 */
        bossDialogueTime: 3,
        /** boss时间限制（秒） */
        bossTime: 120,
        /** boss金币掉落 */
        bossCoinDrop: 100,
        /** 怪物基础金币掉落 */
        baseCoinDrop: (wave: number) => {
            return 2 + wave / 25;
        },
        /** 技能价格增长与基础 */
        skillPrice: [5, 20],
        /** 装备价格增长与基础 */
        equipmentPrice: [25, 50],
        /** 每多少波可以选一次祝福 */
        blessWave: 5,
        /** 每次受击显示多久的血条，单位帧，每秒为60帧，注意该值受到倍速影响 */
        lifeShowTick: 30,
        /** 怪物超过限制多少帧后失败，每秒为60帧，注意该值受到倍速影响  */
        failTick: 600,
        pvp: {
            /** pvp双方跑步进场距离 */
            pvpEnterDistance: 400,
            /** pvp进攻方英雄初始位置 */
            attackTeamPosition: [[], [-75, -125], [-130, 100], [-220, -65], [-165, -115], [-280, -160]],
            /** pvp防守方英雄初始位置 */
            defendTeamPosition: [[], [75, -125], [130, 100], [220, -65], [165, -115], [280, -160]],
        },
        /** 怪物到达城墙的点 */
        monsterReachPoint: -500,
        /** 塔防模式 城墙位置 */
        wallPos: { x: 0, y: -320 },
        /** 冲刺特效出现速度 */
        rushSpeed: 200,
        /** 各路怪物起始位置 */
        roadBegin: [
            { x: -440, y: 500 },
            { x: 440, y: 500 },
            { x: 0, y: 600 },
            { x: -440, y: -500 },
            { x: 440, y: -500 },
        ],
        /** 玩家中心圆圈出怪半径，怪会随机刷在圆周上 */
        monsterCircleRadius: {
            101: 500,
            102: 600,
            103: 700,
            104: 800,
            105: 650,
        },
        /** 矩形怪物刷新，可以配置一个矩形中心和矩形得高和宽 */
        /**地图大小是2800 * 4000 */
        monsterArea: {
            201: { x: 0, y: 800, height: 600, width: 2000 },
            202: { x: 0, y: -1200, height: 600, width: 2000 },
            203: { x: -400, y: 200, height: 500, width: 300 },
            204: { x: -400, y: 200, height: 500, width: 300 },
            205: { x: -400, y: 200, height: 500, width: 300 },
        },
        /** 玩家中心圆圈出怪半径，怪会均匀刷在圆周上 */
        monsterCircleRadiusFix: {
            301: 500,
            302: 600,
            303: 700,
            304: 800,
            305: 650,
        },
        /** 每一帧时间（秒） */
        logicTickSecond: 0.0167,
        /** 每一帧时间（毫秒） */
        logicTick: 16.7,
        /** 逻辑帧频率 */
        logicTickRate: 60,
        /** 动画名 */
        animationType: {
            /** 闲置状态 */
            idle: "idle",
            /** 移动状态 */
            walk: "walk",
            /** 跑步状态 */
            run: "run",
        },
        /** 战斗物体类型 */
        battleObjectType: {
            /** 玩家同伴 */
            pet: "pet",
            /** 玩家 */
            hero: "hero",
            /** 怪物 */
            monster: "monster",
            /** 城墙 */
            wall: "wall",
        },
        /** 异常状态 */
        abnormalStateType: {
            /** 眩晕 */
            stupor: "stupor",
            /** 缴械 */
            disarm: "disarm",
            /** 恐惧 */
            fear: "fear",
            /** 沉默 */
            silence: "silence",
            /** 嘲讽 */
            sneer: "sneer",
        },
        /** 战斗文本图片名 */
        damageText: {
            combo(v: string) {
                return "battle_text_d_" + v;
            },
            toDefend(v: string) {
                return "battle_text_a_" + v;
            },
            toAttack(v: string) {
                return "battle_text_b_" + v;
            },
            crit(v: string) {
                return "battle_text_l_" + v;
            },
            skill1(v: string) {
                return "battle_text_m_" + v;
            },
            skill2(v: string) {
                return "battle_text_n_" + v;
            },
            skill3(v: string) {
                return "battle_text_o_" + v;
            },
            dodge(v: string) {
                return "battle_text_d_" + v;
            },
            lifeRemove(v: string) {
                return "battle_text_g_" + v;
            },
            attackBuff(v: string) {
                return "battle_text_c_" + v;
            },
            attackDebuff(v: string) {
                return "battle_text_f_" + v;
            },
            defenseDeBuff(v: string) {
                return "battle_text_e_" + v;
            },
            attackAbnormalState(v: string) {
                return "battle_text_f_" + v;
            },
            defenseAbnormalState(v: string) {
                return "battle_text_e_" + v;
            },
            heal(v: string) {
                return "battle_text_c_" + v;
            },
        },
    };

    formationLimit = {
        tank: [0],
        warrior: [2, 0],
        air: [1],
        wizard: [4, 3],
        archer: [4, 3],
        bard: [3, 2, 4],
        cleric: [3, 2, 4],
    };
    /**装备品质颜色 */
    equipQuality = [
        cc.color().fromHEX("#FFFFFF"),
        cc.color().fromHEX("#80A577"),
        cc.color().fromHEX("#4F98B9"),
        cc.color().fromHEX("#AF75B2"),
        cc.color().fromHEX("#E19355"),
        cc.color().fromHEX("#DF5760"),
        cc.color().fromHEX("#FAE568"),
        cc.color().fromHEX("#46DDD6"),
        cc.color().fromHEX("#F2AEE6"),
    ];
    quality = [
        "main_scene2_quality1",
        "main_scene2_quality6",
        "main_scene2_quality4",
        "main_scene2_quality5",
        "main_scene2_quality2",
    ];
    //蓝紫红金
    itemColor = [cc.color(64, 255, 90, 255), cc.color(67, 254, 244, 255), cc.color(255, 66, 66, 255)];
    colorLabel = [GLang.code.ui.green, GLang.code.ui.blue, GLang.code.ui.red];
    heroQuality = ["item_hero_green", "item_hero_blue", "item_hero_purples", "item_hero_orange", "item_hero_red"];
    heroGreyBg = "item_hero_grey";
    itemGreyBg = "item_bg_gray";
    heroNameQuality = [
        cc.color(133, 204, 73, 255),
        cc.color(80, 180, 255, 255),
        cc.color(165, 89, 255, 255),
        cc.color(255, 158, 53, 255),
        cc.color(254, 90, 88, 255),
    ];
    waystoimprove = [
        {
            label: "recruit_hero",
            img: "battlescene_recruit_hero",
        },
        {
            label: "cultivate_hero",
            img: "battlescene_cultivate_hero",
        },
        // {
        //     label: "cultivate_car",
        //     img: "battlescene_cultivate_car",
        // },
        // {
        //     label: "recruit_car",
        //     img: "battlescene_recruit_car",
        // },
        {
            label: "cultivate_equipment",
            img: "battlescene_cultivate_equipment",
        },
    ];

    qualityText(quality: number) {
        return `ui/quality_name_${quality}`;
    }
    equipment = ["table_equipment/weapon", "table_equipment/helmet", "table_equipment/armor", "table_equipment/shoes"];
    starimg = ["hero_star_0", "hero_star_1", "hero_star_2", "hero_star_3", "hero_star_4", "hero_star_5"];
    costLabelColor = {
        white: cc.color(255, 255, 255, 255),
        red: cc.color(192, 68, 70, 255),
        green: cc.color(80, 237, 109, 255),
    };

    survivor = {
        TIME_STATE_WORK: 3,
        TIME_STATE_CANTEEN: 2,
        TIME_STATE_SLEEP: 1,
        /** 时间分类 1睡觉 2吃饭 3工作 */
        time: {
            0: 1,
            1: 1,
            2: 1,
            3: 1,
            4: 1,
            5: 1,
            6: 3,
            7: 3,
            8: 3,
            9: 3,
            10: 3,
            11: 3,
            12: 2,
            13: 2,
            14: 2,
            15: 3,
            16: 3,
            17: 3,
            18: 3,
            19: 3,
            20: 3,
            21: 2,
            22: 2,
            23: 2,
        },

        getThisDaySecond: (now: number) => {
            return (now % (1000 * 30 * 24)) / 1000;
        },
        getGameHour: (now: number) => {
            return Math.floor((now % (1000 * 30 * 24)) / (1000 * 30));
        },

        getHourCount: (now: number) => {
            return Math.floor(now / (1000 * 30));
        },
    };

    build = {
        ID_BUILD_CAPTAIN: 10001,
        ID_BUILD_WATER: 10002,
        ID_BUILD_WOOD: 10003,
        ID_BUILD_CUPRUM: 10004,
        ID_BUILD_FABRIC: 10005,
        ID_BUILD_LEATHER: 10006,
        ID_BUILD_KONGFU: 10007,
        ID_BUILD_CANTEEN: 10008,
        ID_BUILD_GREENHOUSE: 10009,
        ID_BUILD_HOSPITAL: 10010,
        ID_BUILD_DORM01: 10011,
        ID_BUILD_DORM02: 10012,
        ID_BUILD_DORM03: 10013,
        ID_BUILD_DORM04: 10014,
        ID_BUILD_INTELLIGENCE: 10015,
        ID_BUILD_ATHLETICS: 10016,
        ID_BUILD_TIANTI: 10017,
        ID_BUILD_BOX: 10018,
        ID_BUILD_STORE: 10019,
    };
    propertyList = {
        /**攻击 */
        attack: "attack",
        /** 防御 */
        armor: "armor",
        /** 最大生命值 */
        maxHp: "maxHp",
        /** 命中 */
        hit: "hit",
        /** 闪避 */
        dodge: "dodge",
        /** 暴击率 */
        critical: "critical",
        /** 反暴击 */
        criticalImmune: "criticalImmune",
        /** 增伤 */
        damage: "damage",
        /** 减伤 */
        defence: "defence",
    };

    kindBg = ["common_tbg", "common_fbg", "common_sbg"];
    kindIcon = ["common_tIcon", "common_fIcon", "common_sIcon"];

    /**建筑等级提升奖励图片 */
    facilityLvReward = {
        1: { imgName: "building_increase_production", property: "ui/building_increase_production" },
        2: { imgName: "building_add_employee", property: "ui/facility_worker" },
        3: { imgName: "building_add__fatigue", property: "ui/facility_fatigue" },
        4: { imgName: "building_add_employee", property: "ui/facility_bed" },
        5: { imgName: "building_add__health", property: "ui/facility_health" },
        6: { imgName: "building_add__satiety", property: "ui/building_recovery_satiety" },
        7: { imgName: "item_food02", property: "ui/facility_food" },
        8: { imgName: "building_add_employee", property: "ui/facility_Dining" },
        9: { imgName: "building_add_employee", property: "ui/facility_patient" },
    };
    facility_icon = {
        1: "building_produce",
        2: "",
        3: "building__dormitory",
        4: "building_restaurant",
        5: "building__hospital",
        6: "building_captain",
        7: "building_produce",
    };
    rankImg = ["pata_xunzhang1", "pata_xunzhang2", "pata_xunzhang3"];
    rankBg = {
        others: "arena_players",
        self: "arena_self",
    };
    turntableBg = {
        chosen: "turntable_chosen",
        unchosen: "turntable_unchosen",
    };
    friendChosen = {
        chosen: "common_menubg1",
        unchosen: "common_menubg2",
    };
    playerChosenImg = {
        chosen: "new_common_loding_bg4",
        unchosen: "new_common_loding_bg3",
    };
    gridColor = {
        normal: new cc.Color().fromHEX("#9EE49A"),
        green: new cc.Color().fromHEX("#46D543"),
        red: new cc.Color().fromHEX("#FF0000"),
    };
    manorGrid = {
        horizental: 21,
        vertical: 30,
    };
    towerQualityBg = [
        "common_item_bg_gray",
        "common_item_bg_green",
        "common_item_bg_blue",
        "common_item_bg_purple",
        "common_item_bg_orange",
        "common_item_bg_red",
        "common_item_bg_gold",
        "common_item_bg_cyan",
        "common_item_bg_coloured",
    ];
    towerLightBg = [
        "mainscene_gray",
        "mainscene_green",
        "mainscene_blue",
        "mainscene_purple",
        "mainscene_orange",
        "mainscene_red",
        "mainscene_gold",
        "mainscene_cyan",
        "mainscene_iridescent",
    ];
    towerCut = [
        "shadow_oven",
        "shadow_standing_air_conditioner",
        "shadow_Electric_swatter",
        "shadow_aloe-vera",
        "shadow_garbage_can",
        "shadow_desk-lamp",
        "shadow_knife_holder",
        "shadow_fan",
        "shadow_soundspeaker",
        "shadow_bookshelves",
    ];
    missionState = [GLang.code.ui.mission_completed, GLang.code.ui.mission_not_complete, GLang.code.ui.alreadyGet];
    itemQualityBg = [
        "item_bg_white",
        "item_bg_green",
        "item_bg_blue",
        "item_bg_purple",
        "item_bg_orange",
        "item_bg_red",
        "item_bg_gold",
    ];
    equipmentQuality = [
        "equipment_detailbg_white",
        "equipment_detailbg_green",
        "equipment_detailbg_blue",
        "equipment_detailbg_purple",
        "equipment_detailbg_orange",
        "equipment_detailbg_red",
        "equipment_detailbg_gold",
    ];
    qualityName = ["普通", "精良", "稀有", "卓越", "传说"];
    partName = ["武器", "戒指", "上衣", "配饰", "下衣", "鞋子"];
    towerPropertyQuality = [
        "tower_place_quality_0",
        "tower_place_quality_1",
        "tower_place_quality_2",
        "tower_place_quality_3",
        "tower_place_quality_4",
        "tower_place_quality_5",
        "tower_place_quality_6",
        "tower_place_quality_7",
        "tower_place_quality_8",
    ];
    menuColor = [cc.color().fromHEX("#403937"), cc.color().fromHEX("#EBE8DC")];
    qualityColor = [
        cc.color().fromHEX("#FFFFFF"),
        cc.color().fromHEX("#ade386"),
        cc.color().fromHEX("#8ad6fd"),
        cc.color().fromHEX("#c7a6f5"),
        cc.color().fromHEX("#ffa772"),
        cc.color().fromHEX("#ff9393"),
        cc.color().fromHEX("#ffd673"),
        cc.color().fromHEX("#ffd673"),
        cc.color().fromHEX("#ffd673"),
    ];
    qualityLabel = [
        GLang.code.ui.quality_label_0,
        GLang.code.ui.quality_label_1,
        GLang.code.ui.quality_label_2,
        GLang.code.ui.quality_label_3,
        GLang.code.ui.quality_label_4,
        GLang.code.ui.quality_label_5,
        GLang.code.ui.quality_label_6,
        GLang.code.ui.quality_label_7,
        GLang.code.ui.quality_label_8,
    ];
    equipmentKind = [
        GLang.code.ui.equipment_kind_0,
        GLang.code.ui.equipment_kind_1,
        GLang.code.ui.equipment_kind_2,
        GLang.code.ui.equipment_kind_3,
        GLang.code.ui.equipment_kind_4,
        GLang.code.ui.equipment_kind_5,
        GLang.code.ui.equipment_kind_6,
        GLang.code.ui.equipment_kind_7,
    ];
    playerTitleColor = {
        1: cc.color().fromHEX("#FFFFFF"),
        2: cc.color().fromHEX("#8fffaf"),
        3: cc.color().fromHEX("#83b8ff"),
        4: cc.color().fromHEX("#fbb4ff"),
        5: cc.color().fromHEX("#ffb17f"),
        6: cc.color().fromHEX("#ff9189"),
        7: cc.color().fromHEX("#ffe763"),
        8: cc.color().fromHEX("#ff9cdb"),
        9: cc.color().fromHEX("#8bfff9"),
        10: cc.color().fromHEX("#FFFFFF"),
    };
}

window["GConstant"] = new Constant();
declare global {
    /** 常量 */
    const GConstant: Constant;
}
