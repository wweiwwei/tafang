export class PlayerSkill {
    /** id */
    id: number;
    /**等级 */
    level: number;
    /**库存 */
    exp: number;

    getTbl() {
        return GTable.getById("PlayerSkillTbl", this.id);
    }
    /**是否最大等级 */
    isMaxLevel(): boolean {
        return this.level > GTable.getList("PlayerSkillLevelTbl").length;
    }
    /**下一等级消耗 */
    nextLevelCost(): number {
        if (this.level > 0) {
            const quality = this.getTbl().quality;
            return GTable.getList("PlayerSkillLevelTbl").find((t) => t.level == this.level).require[quality - 1];
        } else return 1;
    }
    /**可否升级 */
    canUpgrade(): boolean {
        return !this.isMaxLevel() && this.exp >= this.nextLevelCost();
    }
}
