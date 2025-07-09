import { autowired, registerClass } from "../../../framework/Decorator";
import UIButton from "../../../framework/ui/UIButton";
import UIScrollList from "../../../framework/ui/UIScrollList";
import UIWindow from "../../../framework/ui/UIWindow";

const { ccclass, property, menu } = cc._decorator;

@ccclass
@registerClass("WindowCardPoolGather") //卡池集合
export default class WindowCardPoolGather extends UIWindow {
    // static defaultOpentOption: Partial<WindowOpenOption> = {
    //     animation: WindowOpenAnimationEnum.default,
    // };
    _windowParam: any;
    _returnValue: any;
    // @autowired(UILabel) progressBarLabel: UILabel = null;
    // @autowired(cc.ProgressBar) progressBar: cc.ProgressBar = null;

    // @autowired(UIButton) leftBtn: UIButton = null;
    // @autowired(UIButton) rightBtn: UIButton = null;

    @autowired(UIScrollList) gatherList: UIScrollList<ListItemHeroItemClone> = null;
    @autowired(UIButton) closeBtn: UIButton = null;

    protected onInited(): void {
        this.closeBtn.onClick = () => {
            this.close();
        };
        this.refreshList();
    }

    /**卡池集合 */
    refreshList() {
        let tbl = GTable.getList("CardPoolRewardTbl");
        tbl = tbl.filter((info) => {
            return info.cardPool === 1;
        });
        let state: {
            id: number;
            type: "gather" | "card" | "switchWish" | "wish" | "homeWish";
            cb: Function;
        }[] = [];
        state = tbl.map((t) => {
            return {
                id: t.rewardId,
                type: "gather",
                cb: (rewardId: number) => {
                    this.onShowDetail(rewardId);
                },
            };
        });
        this.gatherList.setState(state);
    }

    onShowDetail(id: number) {
        //todo展示详细
    }
}
