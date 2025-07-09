import Item from "./Item";

export default class MainStage {
    /** 地图序号 */
    mapIndex: number;

    /** 关卡序号 */
    stageIndex: number;

    /** 声望 */
    reputation: number;

    /** 是否通关了当前地图 */
    clear: boolean;

    static empty(mapIndex: number): MainStage {
        const stage = new MainStage();
        stage.mapIndex = mapIndex;
        stage.stageIndex = 0;
        stage.reputation = 0;
        return stage;
    }

    private maxStageIndex() {
        return GUtils.array
            .chain(GTable.getList("StageTbl"))
            .filter((t) => t.mapIndex === this.mapIndex)
            .map((t) => t.stageIndex[1])
            .max();
    }

    /** 获取多少关以后的数据 */
    getNextStage(offset: number) {
        const res = GUtils.ts.shallowCopy(this);
        const maxStageIndex = this.maxStageIndex();
        res.stageIndex = this.stageIndex + offset;
        if (res.stageIndex > maxStageIndex) {
            res.stageIndex = maxStageIndex;
            res.clear = true;
        }
        res.reputation = this.reputation;
        return res;
    }

    /** 关卡表格 */
    getTbl(): StageTbl {
        return GTable.getList("StageTbl").find((t) => t.mapIndex === this.mapIndex && this.stageIndex === t.stageIndex);
    }
    /** 关卡地图表格 */
    getMapTbl(): StageMapTbl {
        return GTable.getList("StageMapTbl").find((t) => t.mapIndex === this.mapIndex);
    }

    getWaveIndexByStageIndex(stageIndex: number) {
        const tbl = GTable.getList("StageTbl").find((t) => t.mapIndex === this.mapIndex && stageIndex === t.stageIndex);
        return tbl.guard;
    }

    /** 关卡战力 */
    getBattlePoint() {
        return 99999;
    }

    private env() {
        return [{ lv: this.stageIndex }];
    }

    /** 挂机宝箱可能获得的奖励列表 */
    afkReward(): Item[] {
        const tbl = this.getTbl();
        return tbl.afkReward.map((arr) => {
            const [_, id, count] = arr;
            return new Item(Number(id), AstUtil.eval(count, this.env()));
        });
    }

    /** 首次通关奖励 */
    firstClearReward(): Item[] {
        const tbl = this.getTbl();
        const list = tbl.firstReward.map((arr) => {
            const [id, count] = arr;
            return new Item(Number(id), AstUtil.eval(count, this.env()));
        });
        const special = tbl.specialReward
            .filter((v) => this.stageIndex % Number(v[0]) === 0)
            .map((arr) => {
                const [_, id, count] = arr;
                return new Item(Number(id), AstUtil.eval(count, this.env()));
            });
        return list.concat(special);
    }

    /** 声望等级 */
    reputationLevel(): number {
        let l = 0;
        GConfig.stage.reputationLevelRequire.forEach((eq, i) => {
            if (this.reputation >= eq) l = i;
        });
        return l;
    }

    /** 本地图剩余声望 */
    reputationRemain(): number {
        const shopList = GTable.getList("StageReputationShopTbl").filter((t) => t.mapIndex === this.mapIndex);
        const hasBuy = GState.data.stageShopHasBuy;
        const hasUse = shopList
            .map((t) => {
                if (hasBuy[t.id]) {
                    return t.reputation * hasBuy[t.id];
                } else {
                    return 0;
                }
            })
            .reduce((a, b) => a + b, 0);
        return this.reputation - hasUse;
    }
}
