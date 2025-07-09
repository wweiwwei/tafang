import Item from "./Item";

export class Technology {
    /** id */
    id: number;
    /**等级 */
    level: number;

    getTbl() {
        return GTable.getById("TechTreeTbl", this.id);
    }
    /**是否最大等级 */
    isMaxLevel() {
        return this.level >= this.getTbl().maxLevel;
    }
    /**下一等级消耗 */
    uppdateCost(): Item[] {
        const env = [{ lv: this.level }];
        return this.getTbl().cost.map((list) => {
            return new Item(Number(list[0]), AstUtil.eval(list[1], env));
        });
    }
    /**是否可解锁 */
    // canUnlock() {
    //     return (
    //         this.getTbl().pre.every((id) => GState.data.techTree[id].level > 0) &&
    //         GModel.player.level() >= this.getTbl().unlock
    //     );
    // }

    /**获取属性字段 */
    getProperty(): { property: string; value: number }[] {
        const env = [{ lv: this.level }];
        return this.getTbl().property.map((list) => {
            return { property: list[0], value: AstUtil.eval(list[1], env) };
        });
    }

    /** 获取科技描述，结果直接setText就可以 */
    getTreeNodeDescribe(): string[] {
        const env = [{ lv: this.level }];
        const tbl = this.getTbl();
        const param = tbl.descriptionParam.map((x) => "_rs" + AstUtil.eval(x, env));
        return [tbl.description, ...param];
    }

    /** 下一级的描述 */
    getNextLevelDescribe(): string[] {
        const env = [{ lv: this.level + 1 }];
        const tbl = this.getTbl();
        const param = tbl.descriptionParam.map((x) => "_rs" + AstUtil.eval(x, env));
        return [tbl.description, ...param];
    }

    /**时间 */
    getUpdateTime(): string {
        return "_rs10:10:10";
    }

    /**可升级 */
    canUpdate() {
        return (
            GModel.knapsack.checkStorage(this.uppdateCost(), false) &&
            !this.isMaxLevel() &&
            GState.data.techData.nextTech === this.id
        );
    }
}
