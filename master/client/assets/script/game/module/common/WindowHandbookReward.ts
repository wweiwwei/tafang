import { autowired, message, registerClass } from "../../../framework/Decorator";
import UIButton from "../../../framework/ui/UIButton";
import UIScrollList from "../../../framework/ui/UIScrollList";
import UIWindow from "../../../framework/ui/UIWindow";
import Item from "../../entity/Item";
import EventName from "../../event/EventName";
import ListItemHandbookReward from "./ListItemHandbookReward";

const { ccclass, property } = cc._decorator;

@registerClass("WindowHandbookReward")
@ccclass
export default class WindowHandbookReward extends UIWindow {
    _windowParam: { status: number; handbookPage?: number }; // 1-图鉴奖励
    _returnValue: any;
    @autowired(UIScrollList) rewardList: UIScrollList<ListItemHandbookReward> = null;
    @autowired(UIButton) closeBtn: UIButton = null;
    protected onInited(): void {
        this.closeBtn.onClick = () => {
            this.close();
        };
        this.setState();
    }
    @message([EventName.stateKey.storage, EventName.stateKey.collectionData])
    setState() {
        let page = this._windowParam.handbookPage;
        const tbl = GTable.getList("HeroCollectionLevelRewardTbl").filter((t) => t.page === page);
        const collectionLevelInfo = GModel.collection.getCollectionLevelInfo(page);
        const state = tbl.map((t) => {
            const { id, level, page } = t;
            const reward = t.reward.map((v) => ({ item: new Item(v[0], v[1]), status: 1 }));
            let btnStatus: string = "";
            if (collectionLevelInfo.levelRewardHasGet.includes(level)) {
                btnStatus = "get2";
            } else {
                btnStatus = collectionLevelInfo.level < level ? "noAchieve" : "get";
            }
            return {
                btnStatus,
                id,
                level,
                page,
                reward,
            };
        });
        this.rewardList.setState(state);
    }
}
