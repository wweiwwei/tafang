export type CardInfo = {
    /** 物品类型 */
    itemType: "hero" | "equipment" | "item";

    /** 物品id */
    id: number;

    /** 数量 */
    count: number;

    /** 等级 */
    level: number;

    /** 阶数 */
    rank: number;

    /**
     * 碎片id，
     * 如果抽到的是英雄，拥有该英雄的情况下会被转换为碎片，
     * 如果没有转换碎片，则该属性为-1
     * */
    fragId: number;

    /** 碎片数量 */
    fragCount: number;
};
