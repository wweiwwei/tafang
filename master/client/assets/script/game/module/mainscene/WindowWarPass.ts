import { autowired, message, registerClass } from "../../../framework/Decorator";
import ResourceLoader from "../../../framework/ResourceLoader";
import { GameDate } from "../../../framework/date/GameDate";
import { WindowOpenAnimationEnum, WindowOpenOption } from "../../../framework/ui/GWindow";
import UIButton from "../../../framework/ui/UIButton";
import UIImage from "../../../framework/ui/UIImage";
import UILabel from "../../../framework/ui/UILabel";
import UIList from "../../../framework/ui/UIList";
import UIWindow from "../../../framework/ui/UIWindow";
import ListItemBottomMenu from "../common/ListItemBottomMenu";
import ListItemWarPass from "./ListItemWarPass";
import EventName from "../../event/EventName";
import ListItemWarOrderDay from "./ListItemWarOrderDay";

const { ccclass, property } = cc._decorator;
@registerClass("WindowWarPass", {
    preloadPrefab: ["ListItemWarPass", "ListItemItem"],
})
@ccclass
export default class WindowWarPass extends UIWindow {
    static defaultOpentOption: Partial<WindowOpenOption> = {
        animation: WindowOpenAnimationEnum.default,
        hideMainScene: false,
    };

    _windowParam: any;
    _returnValue: any;

    /**修改后 */
    @autowired(UIList) itemRoot: UIList<ListItemWarPass> = null;
    @autowired(UIButton) closeBtn: UIButton = null;
    @autowired(cc.ScrollView) scrollView: cc.ScrollView = null;
    @autowired(UIList) weekShowItem: UIList<ListItemWarPass> = null;
    // /**进度间隔 */
    // @autowired(cc.Node) progressBarInterval: cc.Node = null;
    /**进度 */
    @autowired(cc.ProgressBar) progressBar: cc.ProgressBar = null;
    /**免费奖励 */
    @autowired(UILabel) freeWarLabel: UILabel = null;
    /**广告奖励 */
    @autowired(UILabel) warLabel: UILabel = null;
    /**切换菜单 */
    @autowired(UIList) bottomMenu: UIList<ListItemBottomMenu> = null;
    //日期
    @autowired(UIList) root: UIList<ListItemWarOrderDay> = null;
    @autowired(UIList) weekItem: UIList<ListItemWarPass> = null;

    private warTbl: WarOrderTbl = null;
    private itemInterval: number = 0;
    private maxDay: number = 0;
    private itemHeight: number = 120;
    private warRewardTbl: WarOrderRewardTbl[] = [];
    /**战令id */
    private warId: number = 0;
    private checkIsGet: Map<number, boolean> = new Map();

    refWarPassItem() {
        let state = this.warRewardTbl.map((t) => {
            return { tbl: t };
        });
        this.itemRoot.setState(state);
    }

    protected onInited(): void {
        this.schedule(this.refWarPassItem, 1);
        this.closeBtn.onClick = () => {
            this.close();
        };
        this.warId = this.getWarMenu()[1].id;

        this.warTbl = GTable.getById("WarOrderTbl", this.warId);
        this.warRewardTbl = GTable.getList("WarOrderRewardTbl").filter((t) => {
            return t.warOrderId == this.warId;
        });
        this.maxDay = this.warRewardTbl.filter((t) => {
            return t.warOrderId == this.warId;
        }).length;

        this.updateProgressUi();
    }

    // updateProgressUi() {
    //     this.progressBarInterval.parent.children.forEach((node, i) => {
    //         node.active = false;
    //     });

    //     let sum = this.itemHeight * this.maxDay + this.itemInterval * this.maxDay; //总高度
    //     this.progressBar.node.width = sum - this.itemInterval;
    //     this.progressBar.totalLength = sum - this.itemInterval;
    //     let progress: number = GModel.warOrder.getWarOrderById(this.warId).progress; //当前进度
    //     let warMaxRequire = this.warRewardTbl[this.warRewardTbl.length - 1].require; //最大需求
    //     this.progressBar.progress =
    //         progress == 0 ? 0 : progress / warMaxRequire - progress / warMaxRequire / progress / 2;
    //     for (let i = 0; i < this.maxDay; i++) {
    //         let node: cc.Node = this.progressBarInterval;
    //         if (!this.progressBarInterval.parent.children[i]) {
    //             node = cc.instantiate(this.progressBarInterval);
    //             node.setParent(this.progressBarInterval.parent);
    //         } else {
    //             node = this.progressBarInterval.parent.children[i];
    //         }
    //         node.getChildByName("label")
    //             .getComponent(UILabel)
    //             .setText(["_rs" + this.warRewardTbl[i].require]);
    //         node.x = i * this.itemHeight + i * this.itemInterval;
    //         node.getComponent(UIImage).imgName = "";
    //         node.getComponent(UIImage).imgName =
    //             progress >= this.warRewardTbl[i].require ? "common_timecircle" : "common_timecircle";
    //         if (progress >= this.warRewardTbl[i].require) {
    //             while (progress > 0) {
    //                 GUtils.ui.setAllChildSpNormal(this.progressBarInterval);
    //                 progress--;
    //             }
    //         } else {
    //             GUtils.ui.setAllChildSpGray(this.progressBarInterval);
    //         }
    //         node.active = true;
    //     }
    // }

    updateProgressUi() {
        // this.progressBarInterval.parent.children.forEach((node, i) => {
        //     node.active = false;
        // });
        let sum = this.itemHeight * this.maxDay + this.itemInterval * this.maxDay; //总高度
        this.progressBar.node.width = sum - this.itemInterval;
        this.progressBar.totalLength = sum - this.itemInterval;
        let progress: number = GModel.warOrder.getWarOrderById(this.warId).progress; //当前进度
        let warMaxRequire = this.warRewardTbl[this.warRewardTbl.length - 1].require; //最大需求
        this.progressBar.progress =
            progress == 0 ? 0 : progress / warMaxRequire - progress / warMaxRequire / progress / 2;
        const state: ListItemWarOrderDay["state"][] = [];
        for (let i = 0; i < this.maxDay; i++) {
            const day = this.warRewardTbl[i].require;
            const isGray = progress < this.warRewardTbl[i].require;
            state.push({
                day,
                isGray,
            });
        }
        this.root.setState(state);
    }

    getWarMenu() {
        let menuArr = [];
        let isGetAllWar = (id: number) => {
            let warOrder = GModel.warOrder.getWarOrderById(id);
            if (!warOrder) return;
            let warRewardTbl = GTable.getList("WarOrderRewardTbl").filter((t) => {
                return t.warOrderId == id;
            });
            let getArr = [];
            for (let i: number = 0; i < warRewardTbl.length; i++) {
                const element = warRewardTbl[i];
                if (warOrder.freeHasGet.includes(element.id) && warOrder.hasGet.includes(element.id)) {
                    getArr.push(true);
                } else {
                    getArr.push(false);
                }
            }
            return getArr.every((a) => a == true);
        };

        let warOrderTypeMap: Map<number, Array<WarOrderTbl>> = new Map();
        GTable.getList("WarOrderTbl").filter((t) => {
            if (!warOrderTypeMap.get(t.kind)) {
                warOrderTypeMap.set(t.kind, new Array());
            }
            warOrderTypeMap.get(t.kind).push(t);
        });

        warOrderTypeMap.forEach((element) => {
            element.forEach((t, index) => {
                {
                    if ((t.orderKind != 1 && !isGetAllWar(t.id) && t.WarOrderType == 1) || t.orderKind == 1) {
                        menuArr.push(t);
                    } else if (t.WarOrderType > 1 && element[index - 1] && isGetAllWar(element[index - 1].id)) {
                        menuArr.push(t);
                    }
                }
            });
        });
        return menuArr;
    }

    @message([EventName.stateKey.warOrder])
    checkIsGetFunc() {
        this.checkIsGet = new Map();
        GTable.getList("WarOrderTbl").forEach((tbl, index) => {
            let warOrder = GModel.warOrder.getWarOrderById(tbl.id);
            let warRewardTbl = GTable.getList("WarOrderRewardTbl").filter((t) => {
                return t.warOrderId == tbl.id;
            });
            if (tbl.orderKind == 1) {
                for (let i = 0; i < warRewardTbl.length; i++) {
                    const element = warRewardTbl[i];
                    if (!warOrder.freeHasGet.includes(element.id) && warOrder.progress >= element.require) {
                        this.checkIsGet.set(tbl.id, true);
                        break;
                    }
                }
            }
        });

        this.initMenu();
    }

    initMenu() {
        let state: {
            id: number;
            cb: () => {};
            selected: boolean;
            /**是否置灰 */
            status: boolean;
            /**显示提示 */
            show: number;
            info?: { img: string; text: string; currentWarId: number; cb: Function };
        }[] = [];
        this.getWarMenu().forEach((t) => {
            state.push({
                id: t.id,
                cb: null,
                selected: false,
                status: false,
                show: this.checkIsGet.get(t.id) ? 1 : 0,
                info: {
                    img: t.img,
                    text: t.menuText,
                    cb: async (warId: number) => {
                        this.warId = warId;
                        this.warTbl = GTable.getById("WarOrderTbl", this.warId);

                        this.warRewardTbl = GTable.getList("WarOrderRewardTbl").filter((t) => {
                            return t.warOrderId == this.warId;
                        });
                        this.maxDay = this.warRewardTbl.length;
                        this.scrollView.scrollToTop();
                        this.updateProgressUi();
                        this.checkIsGetFunc();
                        this.initMenu();
                        this.eventScrollView();
                        this.freeWarLabel.setText([GTable.getById("WarOrderTbl", t.id).freeText]);
                        this.warLabel.setText([GTable.getById("WarOrderTbl", t.id).chargeText]);
                    },
                    currentWarId: this.warId,
                },
            });
        });

        //this.bottomMenu.setState(state);
    }

    eventScrollView() {
        // return;
        let progress: number = GModel.warOrder.getWarOrderById(this.warId).progress;
        let arr = []; //需要做预览处理的节点
        let intervalTip: number = 7; //每间隔几个显示预览
        for (let i = 0; i <= this.warRewardTbl.length; i++) {
            if ((i > 0 && i % intervalTip == 0) || i == this.warRewardTbl.length) {
                let height = i * this.itemHeight + i * this.itemInterval + (this.itemHeight / 2 + 10); //(this.itemHeight / 2 + 10)微调
                if (i == this.warRewardTbl.length) {
                    //最后一个处理
                    height = i * this.itemHeight + i * this.itemInterval - this.itemHeight / 2; //this.itemHeight / 2微调
                }
                arr.push({
                    index: i,
                    height: height,
                });
            }
        }
        let viewHeight = this.itemRoot.node.parent.parent.height;
        let height: number = this.itemRoot.node.parent.y - viewHeight / 2 + viewHeight;

        for (let i = 0; i < arr.length; i++) {
            if (height < arr[i].height) {
                let index = arr[i].index;
                let aTbl = this.warRewardTbl[index - 1];
                this.weekShowItem.node.active = true;
                this.weekShowItem.setState([
                    {
                        tbl: aTbl,
                        tagInfo: {
                            dayStr: [this.warTbl.text, "_rs" + aTbl.require],
                            tagImg: progress >= aTbl.require ? "war_order_dc1" : "war_order_dc2",
                        },
                    },
                ]);
                break;
            } else {
                this.weekShowItem.node.active = false;
            }
        }
    }
}
