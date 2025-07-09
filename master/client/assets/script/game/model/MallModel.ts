export class MallModel {
    /** 剩余广告次数 */
    remainVideo(id: number) {
        const tbl = GTable.getById("MallTbl", id);
        if (tbl.kind === 1) {
            return tbl.video - GState.data.mallVideo;
        } else {
            return 0;
        }
    }
    /** 购买商城物品 */
    async buy(id: number) {
        const tbl = GTable.getById("MallTbl", id);
        if (tbl.kind === 1) {
            await GSDK.showVideo("mall_buy");
        }
        return await GApi.mall.buy({ id });
    }
}
