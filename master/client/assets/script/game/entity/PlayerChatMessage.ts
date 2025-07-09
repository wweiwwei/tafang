export type PlayerChatMessage = {
    /** 信息的唯一id */
    uuid: string;
    /** 信息 */
    msg: string;
    /** 时间戳 */
    ts: number;
    /** 角色id，注意可能会用一些特殊的角色id代表特殊信息，例如-100为管理员公告信息 */
    roleId: number;
};
