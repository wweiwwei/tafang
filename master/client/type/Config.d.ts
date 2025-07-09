declare type CurrencyCode = "cny" | "usd";

/** 玩家信息 */
declare type PlayerInfo = {
    /** 玩家id */
    playerId: number;
    /** 玩家类型（是否gm,封号等） */
    playerGroup: number;
    /** 玩家名 */
    playerName: string;
    /** 玩家头像 */
    playerIcon: number;
    /** 头像框 */
    headFrame: number;
    /** 创建帐号时间 */
    createTime: number;
    /** 是否第一次登录 */
    newPlayer: boolean;
    // /** 服务器列表 */
    // serverList: {
    //     /** 服务器名 */
    //     serverName: string;
    //     /** 服务器状态 */
    //     serverState: number;
    //     /** 服务器id */
    //     serverCode: string;
    // }[];
    /** session */
    sessionKey: string;
    /** 最近登录的服务器 */
    recentServer: string;
};

/** 包信息 */
declare type PackageInfo = {
    /** 包信息 */
    packageInfo: {
        /** 是否开启cdkey */
        cdkey: boolean;
        /** 是否显示隐私协议 */
        privacy: boolean;
        /** 版号信息 */
        qualification: string;
        /** 是否展示群号 */
        showQQ: boolean;
        /** 官方群号 */
        qq: string;
        /** 支付开关 */
        pay: boolean;
        /** 是否可用多语言切换 */
        multiLanguage: boolean;
        /** 设置界面换服按钮是否可见 */
        switchServer: boolean;
    };
    /** 服务器版本信息 */
    remoteVersion: {
        /** 玩家分区 */
        area: string;
        /** 游戏资源版本 */
        gameResVersion: string;
        /** 表版本 */
        tableVersion: string;
        /** 表版本地址 */
        tableUrl: string;
        /** 预览版本/提审版本 */
        previewVersion: string;
        // /** 多语言版本 */
        // langVersion: string;
        // /** 多语言表地址 */
        // langTableUrl: string;
    };
    /** 全局设置 */
    config: {};
    /** 该配置生成的时间戳 */
    stamp: number;
};

/** 获取一个类型的所有values */
declare type ValueOf<T> = T[keyof T];
