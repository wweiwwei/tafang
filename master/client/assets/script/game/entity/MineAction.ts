import Item from "./Item";

export type MineAction =
    | MineActionMinerChangeDirection
    | MineActionMinerMove
    | MineActionMinerHitBrick
    | MineActionBrickDamage
    | MineActionShowBrickReward
    | MineActionShowDiamondWindow
    | MineActionDelay
    | MineActionFloorChange
    | MineActionShowBoss
    | MineActionBattle;

type MineActionMinerChangeDirection = {
    action: "minerChangeDirection";
    /** 面向左或者面向右 */
    data: { direction: "left" | "right" };
};

type MineActionMinerMove = {
    action: "minerMove";
    /** 矿工移动 */
    data: { x: number; y: number };
};

type MineActionMinerHitBrick = {
    action: "minerHitBrick";
    /** 矿工击打砖块 */
    data: { uniqueId: number };
};

type MineActionBrickDamage = {
    action: "brickDamage";
    /** 砖块受到伤害，life指剩余生命值 */
    data: { uniqueId: number; life: number };
};

type MineActionShowBrickReward = {
    action: "showBrickReward";
    /** 显示砖块奖励 */
    data: { uniqueId: number; reward: Item[] };
};

type MineActionShowDiamondWindow = {
    action: "showDiamondWindow";
    /** 显示钻石窗口 */
    data: { count: number };
};

type MineActionDelay = {
    action: "delay";
    /** 延迟，单位毫秒 */
    data: { time: number };
};

type MineActionFloorChange = {
    action: "floorChange";
    /** 楼层变化，整个地图需要向上滚 */
    data: { floor: number };
};

type MineActionShowBoss = {
    action: "showBoss";
    /** 显示boss */
    data: { bossId: number };
};

type MineActionBattle = {
    action: "battle";
    /** 战斗 */
    data: { uniqueId: number };
};
