export class Pet {
    /** id */
    id: number;
    /**等级 */
    level: number;
    /**库存 */
    exp: number;

    getTbl() {
        return GTable.getById("PetTbl", this.id);
    }
    /**是否最大等级 */
    isMaxLevel() {
        return this.level > GTable.getList("PetLevelTbl").length;
    }
    /**下一等级消耗 */
    nextLevelCost(): number {
        if (this.level > 0) {
            const quality = this.getTbl().quality;
            return GTable.getList("PetLevelTbl").find((t) => t.level == this.level).require[quality - 1];
        } else return 1;
    }
    /**可否升级 */
    canUpgrade() {
        return !this.isMaxLevel() && this.exp >= this.nextLevelCost();
    }
}
