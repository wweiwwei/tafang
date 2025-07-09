import { autowired, registerClass } from "../../../framework/Decorator";
import { WindowOpenAnimationEnum, WindowOpenOption } from "../../../framework/ui/GWindow";
import UIButton from "../../../framework/ui/UIButton";
import UIImage from "../../../framework/ui/UIImage";
import UILabel from "../../../framework/ui/UILabel";
import UIList from "../../../framework/ui/UIList";
import UIScrollList from "../../../framework/ui/UIScrollList";
import UIWindow from "../../../framework/ui/UIWindow";
import Item from "../../entity/Item";
import ListItemItem from "../common/ListItemItem";

const { ccclass, property } = cc._decorator;
@registerClass("WindowOfflineReward")
@ccclass
export default class WindowOfflineReward extends UIWindow {
    static defaultOpentOption: Partial<WindowOpenOption> = {
        animation: WindowOpenAnimationEnum.default,
    };
    @autowired(UILabel) time: UILabel = null;
    @autowired(UILabel) stage: UILabel = null;
    @autowired(UILabel) stageChange: UILabel = null;
    @autowired(UIImage) mapImg: UIImage = null;
    @autowired(UIButton) closeBtn: UIButton = null;
    @autowired(UIScrollList) rewardList: UIScrollList<ListItemItem> = null;
    _windowParam: {
        offlineTime: number;
        mapIndex: number;
        fromStageIndex: number;
        toStageIndex: number;
        reward: Item[];
        survivor: number;
    };
    _returnValue: any;
    private mapImgCopy: UIImage = null;
    protected onInited(): void {
        let tbl = GTable.getList("StageMapTbl");
        let current = GModel.stage.getStageAfkMap();
        this.mapImgCopy = cc.instantiate(this.mapImg.node).getComponent(UIImage);
        this.mapImgCopy.node.parent = this.mapImg.node.parent;
        this.mapImgCopy.node.zIndex = -1;
        this.mapImgCopy.node.x = this.mapImg.node.x + 226;
        const addTween = (node: cc.Node) => {
            cc.tween(node)
                .repeatForever(
                    cc
                        .tween(node)
                        .by(2, { x: -226 })
                        .call(() => {
                            node.x += 226;
                        })
                )
                .start();
        };
        addTween(this.mapImg.node);
        addTween(this.mapImgCopy.node);
        this.mapImg.imgName = "loop_" + tbl[current - 1].img;
        this.mapImgCopy.imgName = "loop_" + tbl[current - 1].img;
        this.time.setText(["_rs" + GUtils.date.formatRemainTime(this._windowParam.offlineTime, "hh:mm:ss")]);
        this.stage.setText([GLang.code.ui.stage_number, "_rs" + this._windowParam.toStageIndex]);
        this.stageChange.setText([
            GLang.code.ui.offline_stage_change,
            "_rs" + this._windowParam.fromStageIndex,
            "_rs" + this._windowParam.toStageIndex,
        ]);
        this.rewardList.setState(
            this._windowParam.reward.map((re) => {
                return { item: re, status: 0 };
            })
        );
        this.closeBtn.onClick = () => {
            this.close();
        };
    }
}
