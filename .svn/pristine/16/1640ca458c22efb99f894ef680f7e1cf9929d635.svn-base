export default class RankingModel {
    /** 船长室等级排行榜 */
    // async captainRanking() {
    //     const list = await GApi.ranking.captainRanking();
    //     const info = await GModel.friend.getRoleInfo(list.map((e) => e.roleId));
    //     return list.map((e, i) => {
    //         return {
    //             ...e,
    //             info: info[i],
    //         };
    //     });
    // }
    /** 爬塔等级排行榜 */
    async towerRanking() {
        const list = await GApi.ranking.towerRanking();
        const info = await GModel.friend.getRoleInfo(list.map((e) => e.roleId));
        return list.map((e, i) => {
            return {
                ...e,
                info: info[i],
            };
        });
    }

    /** 关卡排行榜 */
    async stageRanking() {
        const list = await GApi.ranking.stageRanking();
        const info = await GModel.friend.getRoleInfo(list.map((e) => e.roleId));
        return list.map((e, i) => {
            return {
                ...e,
                info: info[i],
            };
        });
    }
    // /** 抽卡排行榜 */
    // async cardPoolRanking() {
    //     const list = await GApi.ranking.cardPoolRanking();
    //     const info = await GModel.friend.getRoleInfo(list.map((e) => e.roleId));
    //     return list.map((e, i) => {
    //         return {
    //             ...e,
    //             info: info[i],
    //         };
    //     });
    // }
    // /** 装备抽卡排行榜 */
    // async equipmentCardPoolRanking() {
    //     const list = await GApi.ranking.equipmentCardPoolRanking();
    //     const info = await GModel.friend.getRoleInfo(list.map((e) => e.roleId));
    //     return list.map((e, i) => {
    //         return {
    //             ...e,
    //             info: info[i],
    //         };
    //     });
    // }

    /** 竞技场排行 */
    arenaRanking() {
        return GModel.arena.top();
    }

    async rankingByIndex(index: number) {
        const list = await GApi.ranking.rankingByIndex({ index });
        const info = await GModel.friend.getRoleInfo(list.map((e) => e.roleId));
        return list.map((e, i) => {
            return {
                ...e,
                info: info[i],
            };
        });
    }
}
