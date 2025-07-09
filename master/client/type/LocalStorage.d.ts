declare type localStorageData = {
    /** 上次登录的浏览器账号 */
    browserAccount?: string;
    /** 测试预加载 */
    testPreload?: boolean;
    /** 跳过引导 */
    skipGuide?: boolean;
    /** 快速挖矿模式 */
    mineQuick?: boolean;
    /** 音效 */
    sound?: boolean;
    /** 音乐 */
    music?: boolean;
    /** 登陆时手动选服 */
    loginServerSelect?: boolean;
    /** 解锁所有功能 */
    unlockAllSystem?: boolean;
    /** pvp加速 */
    pvpSpeedUp?: boolean;
    /** 日志级别 */
    logLevel?: number;
    /** 失败自动重开 */
    failReChallenge?: boolean;
    /** 自动下一关 */
    autoNext?: boolean;
    /** 替换装备时自动出售 */
    autoSell?: boolean;
    /** 快速挖矿模式 */
    quick?: boolean;
    /** 同意隐私协议 */
    confirmPrivacy?: boolean;
};
