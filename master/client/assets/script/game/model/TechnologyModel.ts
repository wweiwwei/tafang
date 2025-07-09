import { Technology } from "../entity/Technology";

export default class TechnologyModel {
    /** 科技等级 */
    getTechLv(id: number) {
        return GState.data.techTree[id].level;
    }
    /**获取科技列表 */
    getList(): Technology[] {
        return Object.keys(GState.data.techTree).map((key) => GState.data.techTree[key]);
    }
    /**科技属性 */
    getPropertyDescription(): { property: string; value: string }[] {
        let objarr: { property: string; value: string }[] = [];
        this.getList().map((t) => {
            t.getProperty().forEach((p) => {
                let obj = objarr.find((o) => o.property === p.property);
                if (obj) obj.value = GIndex.battle.propertyShowMethod(p.property)(obj.value.replace("%", "") + p.value);
                else {
                    obj = { property: p.property, value: GIndex.battle.propertyShowMethod(p.property)(p.value) };
                    objarr.push(obj);
                }
            });
        });
        return objarr;
    }
    /**升级科技 */
    upDateTech() {
        if (this.getNextTech().canUpdate()) return GApi.technology.updateTech();
    }
    /**加速研究 */
    // speedUp(video: boolean, count: number) {
    //     return GApi.technology.speedUp({ video, count });
    // }
    /**下一个升级的科技 */
    getNextTech() {
        return GState.data.techTree[GState.data.techData.nextTech];
    }
}
