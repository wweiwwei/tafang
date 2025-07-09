import { GameDate } from "../../framework/date/GameDate";
import GiftPack from "../entity/GiftPack";
import WindowGift from "../module/mainscene/WindowGift";

export default class GiftPackModel {
    /**
     * 关卡触发， kind = 1, param[0] = mapIndex, param[1] = originStageIndex, param[2] = currentStageIndex
     * 建筑阶数， kind= 2，param[0] = facility.id, param[1] = facility.rank
     */
    async packTrigger(kind: number, param: number[]) {
        // console.log(param);

        let tbl = GTable.getList("PackRuleTbl").filter((t) => t.kind === kind);
        if (kind == 1) {
            let stage = tbl[0].trigger.find((t) => t[0] === param[0])[1];
            // console.log(Math.floor(param[1] / stage) !== Math.floor(param[2] / stage));
            if (Math.floor(param[1] / stage) !== Math.floor(param[2] / stage)) {
                await GApi.charge.activePack({ id: tbl[0].id });
                GWindow.open(WindowGift, { id: tbl[0].id });
            }
        } else {
            let finalTbl = tbl.find((t) => t.trigger[0][0] === param[0]);
            if (finalTbl && param[1] > finalTbl.trigger[0][1]) {
                await GApi.charge.activePack({ id: finalTbl.id });
                GWindow.open(WindowGift, { id: finalTbl.id });
            }
        }
    }

    /** 获取当前激活的礼包列表 */
    getPackList(): GiftPack[] {
        let list = Object.keys(GState.data.giftPack).map((id) => {
            return GState.data.giftPack[id];
        });
        let tbl = GTable.getList("PackRuleTbl");
        return list.filter((p) => {
            let pt = tbl.find((t) => t.id === p.id);
            let limit = pt.limit === -1 ? true : p.hasShow <= pt.limit;
            let duration = pt.duration === -1 ? true : GameDate.now() < p.endTime;
            return !p.hasBuy && limit && duration;
        });
    }
}
