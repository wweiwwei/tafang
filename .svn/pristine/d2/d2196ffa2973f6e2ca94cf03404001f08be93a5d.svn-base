export class CareerTalent {
    /** id */
    id: number;
    /**等级 */
    level: number;
    /**经验 */
    exp: number;

    getTbl() {
        return GTable.getById("JobTalentTbl", this.id);
    }
    /**是否最大等级 */
    isMaxLevel() {
        return this.level >= this.getTbl().limit;
    }
    /**下一等级消耗 */
    uppdateCost(): number {
        return GTable.getList("JobTalentLevelTbl").find((t) => t.level === this.level).require;
    }

    /**获取属性字段 */
    getProperty(): { property: string; value: number }[] {
        const env = [{ lv: this.level }];
        return this.getTbl().property.map((list) => {
            return { property: list[0], value: AstUtil.eval(list[1], env) };
        });
    }
}
