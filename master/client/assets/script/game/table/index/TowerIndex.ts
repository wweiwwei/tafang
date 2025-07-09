export default class TowerIndex {
    private dataMap: Map<number, Map<number, Map<number, number>>> = new Map();

    constructor() {
        GTable.getList("PlayerSkillTalentTbl").forEach((t) => {
            if (!this.dataMap.has(t.part)) {
                this.dataMap.set(t.part, new Map());
            }
            const m1 = this.dataMap.get(t.part);
            if (!m1.has(t.index)) {
                m1.set(t.index, new Map());
            }
            const m2 = m1.get(t.index);
            m2.set(t.rank, t.id);
        });
    }
    getPlayerSkillTalentIdByPartIndexRank(part: number, index: number, rank: number) {
        const m1 = this.dataMap.get(part);
        if (!m1) return -1;
        const m2 = m1.get(index);
        if (!m2) return -1;
        const res = m2.get(rank);
        return res || -1;
    }
}
