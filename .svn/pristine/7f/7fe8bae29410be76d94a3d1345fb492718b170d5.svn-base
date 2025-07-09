import BattleFactory from "../battleLogic/Utils/BattleFactory";
import Item from "../entity/Item";

export class CollectionModel {
    // =================== 羁绊 ==========================

    /** 获取羁绊的Buff，传入想要获取的羁绊等级 */
    getRelationBuff(
        id: number,
        lv: number
    ): {
        addMap: { [property: string]: number };
        mulMap: { [property: string]: number };
    } {
        const tbl = GTable.getById("RelationBuffTbl", id);
        const env = [{ star: lv, rank: lv, lv }];
        if (lv === 0) return { addMap: {}, mulMap: {} };
        const addMap: { [property: string]: number } = {};
        const mulMap: { [property: string]: number } = {};
        [tbl.buff1, tbl.buff2, tbl.buff3, tbl.buff4].forEach((buff) => {
            if (buff.length > 0) {
                const [property, value] = buff;
                if (value.endsWith("%")) {
                    const v = Number(value.replace("%", ""));
                    mulMap[property] = (mulMap[property] || 0) + v;
                } else {
                    const v = AstUtil.eval(value, env);
                    addMap[property] = (addMap[property] || 0) + v;
                }
            }
        });
        return { addMap, mulMap };
    }

    /** 获取羁绊的Buff字符串，传入想要获取的羁绊等级 */
    getRelationBuffString(id: number, lv: number): { property: string; value: string }[] {
        const { addMap, mulMap } = this.getRelationBuff(id, lv);
        const res: { property: string; value: string }[] = [];
        for (const property in addMap) {
            res.push({ property, value: GIndex.battle.propertyShowMethod(property)(Math.round(addMap[property])) });
        }
        for (const property in mulMap) {
            res.push({ property, value: Math.round(mulMap[property]) + "%" });
        }
        return res;
    }

    /** 获取羁绊的等级 */
    getRelationLevel(id: number) {
        return GState.data.relation[id];
    }

    /** 激活/提升羁绊的等级 */
    activateRelation(id: number): Promise<void> {
        return GApi.collection.activateRelation({ id });
    }

    // ======================= 图鉴 ========================

    /**
     * 获取图鉴的等级信息
     * @param page 分页
     * */
    getCollectionLevelInfo(page: number): {
        /** 当前等级 */
        level: number;
        /** 当前经验 */
        exp: number;
        /** 下一等级需要的经验，如果图鉴已经满级，这个值是-1 */
        nextLevel: number;
        /** 已经领取的等级奖励，数组中是等级，例如[3,6]代表3级和6级的等级奖励已经被领取 */
        levelRewardHasGet: number[];
    } {
        return GState.data.collectionData.info[page];
    }

    /**
     * 获取图鉴积分领取进度
     * @param id 英雄id/装备id/战车部件id
     * */
    getCollectionHasGet(id: number) {
        return GState.data.collectionData.hasGet[id];
    }

    /**
     * 获取图鉴当前等级Buff
     * @param page 分页
     * */
    getCollectionCurLevelBuff(page: number): { property: string; value: number }[] {
        const level = this.getCollectionLevelInfo(page).level;
        const list = GTable.getList("HeroCollectionTbl").filter((t) => t.level === level && t.page === page);
        const map = GUtils.array
            .chain(list)
            .flatMap((t) => [t.buff1, t.buff2, t.buff3, t.buff4].filter((t) => t.length > 0));
        const res: { property: string; value: number }[] = [];
        map.forEach((v, k) => {
            res.push({ property: v[0], value: Number(v[1]) });
        });
        return res;
    }

    /**
     * 获取图鉴下一等级Buff
     * @param page 分页
     * */
    getCollectionNextLevelBuff(page: number): { property: string; value: number }[] {
        const level = this.getCollectionLevelInfo(page).level + 1;
        const list = GTable.getList("HeroCollectionTbl").filter((t) => t.level === level && t.page === page);
        if (list) {
            const map = GUtils.array
                .chain(list)
                .flatMap((t) => [t.buff1, t.buff2, t.buff3, t.buff4].filter((t) => t.length > 0));
            const res: { property: string; value: number }[] = [];
            map.forEach((v, k) => {
                res.push({ property: v[0], value: Number(v[1]) });
            });
            return res;
        } else {
            return [];
        }
    }

    /**
     * 获取图鉴下一等级Buff的字符串显示
     * @param page 分页
     * */
    getCollectionNextLevelBuffString(page: number): { property: string; value: string }[] {
        return this.getCollectionNextLevelBuff(page).map((t) => {
            return { property: t.property, value: GIndex.battle.propertyShowMethod(t.property)(t.value) };
        });
    }

    /** 获取加算和乘算的buff，乘法以百分比加成存在 */
    getCollectionBuffMap(page: number): {
        addMap: { [property: string]: number };
        mulMap: { [property: string]: number };
    } {
        return BattleFactory.getCollectionBuffMap(GState.data, page);
    }

    /**
     * 获取图鉴累计Buff
     * @param page 分页
     * */
    getCollectionBuff(page: number): { property: string; value: number }[] {
        const level = this.getCollectionLevelInfo(page).level;
        const list = GTable.getList("HeroCollectionTbl").filter((t) => t.level <= level && t.page === page);
        const map = GUtils.array
            .chain(list)
            .flatMap((t) => [t.buff1, t.buff2, t.buff3, t.buff4].filter((t) => t.length > 0))
            .groupToMap((t) => t[0]);
        const res: { property: string; value: number }[] = [];
        map.forEach((v, k) => {
            const value = v.map((t) => Number(t[1])).reduce((a, b) => a + b, 0);
            res.push({ property: k, value });
        });
        return res;
    }

    /**
     * 获取图鉴累计Buff的字符串显示
     * @param page 分页
     * */
    getCollectionBuffString(page: number): { property: string; value: string }[] {
        return this.getCollectionBuff(page).map((t) => {
            return { property: t.property, value: GIndex.battle.propertyShowMethod(t.property)(t.value) };
        });
    }

    /** 领取图鉴积分，id为英雄id/装备id/战车部件id */
    obtainPoint(id: number): Promise<void> {
        return GApi.collection.obtainPoint({ id });
    }

    /** 领取等级奖励 */
    obtainLevelReward(page: number, level: number): Promise<Item[]> {
        return GApi.collection.obtainLevelReward({ page, level });
    }
    /**是否能领取 */
    canObtain(): boolean {
        let hero = GModel.hero.getAllHero();
        return hero.some((h) => h.star > this.getCollectionHasGet(h.id));
    }
    /**是否能升级 */
    canUpgrade(): boolean {
        let collectionLevelInfo = GModel.collection.getCollectionLevelInfo(0);
        let arr = GTable.getList("HeroCollectionLevelRewardTbl")
            .filter((t) => t.level <= collectionLevelInfo.level)
            .map((t) => collectionLevelInfo.levelRewardHasGet.some((l) => l === t.level));
        return arr.some((a) => !a);
    }
}
