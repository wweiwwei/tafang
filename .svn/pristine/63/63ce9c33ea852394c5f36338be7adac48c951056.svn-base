import { BattleSkillConfigGraph } from "../../battleLogic/Skill/BattleSkillConfigGraph";

export default class BattleIndex {
    private graphCache: Map<number, BattleSkillConfigGraph> = new Map<number, BattleSkillConfigGraph>();

    getSkillGraphById(id: number): BattleSkillConfigGraph {
        if (!this.graphCache.has(id)) {
            this.graphCache.set(id, new BattleSkillConfigGraph(id));
        }
        return this.graphCache.get(id);
    }

    private propertyTblMap: Map<string, BattlePropertyTbl> = new Map<string, BattlePropertyTbl>();
    /** 属性key列表 */
    keyList: string[] = [];
    constructor() {
        GTable.getList("BattlePropertyTbl").forEach((t) => {
            this.propertyTblMap.set(t.key, t);
        });
        this.keyList = GTable.getList("BattlePropertyTbl").map((tbl) => tbl.key);
    }
    /** 属性文本 */
    propertyText(p: string) {
        const tbl = this.propertyTblMap.get(p);
        return tbl ? tbl.displayName : "";
    }
    /** 属性描述 */
    propertyDesc(p: string) {
        const tbl = this.propertyTblMap.get(p);
        return tbl ? tbl.displayDesc : "";
    }
    private _propertyShowMethod = {
        1: (v: number) => GUtils.ui.getNumberString(v, 1),
        2: (v: number) => (v / 100).toString() + "%",
    };
    /**
     * 属性显示方法
     * */
    propertyShowMethod(p: string): (v: number) => string {
        const tbl = this.propertyTblMap.get(p);
        return tbl ? this._propertyShowMethod[tbl.displayMethod] : this._propertyShowMethod[1];
    }
    /**
     * 属性默认值
     * */
    battleDefault(p: string) {
        const tbl = this.propertyTblMap.get(p);
        return tbl ? tbl.defaultValue : 0;
    }

    /**
     * 属性战斗力
     */
    battlePoint(p: string) {
        const tbl = this.propertyTblMap.get(p);
        return tbl ? tbl.battlePoint : 0;
    }
}
