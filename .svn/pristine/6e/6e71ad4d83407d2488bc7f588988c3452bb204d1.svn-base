import { autowired, message, registerClass } from "../../../framework/Decorator";
import ResourceLoader from "../../../framework/ResourceLoader";
import { GameDate } from "../../../framework/date/GameDate";
import { WindowOpenAnimationEnum, WindowOpenOption } from "../../../framework/ui/GWindow";
import UIButton from "../../../framework/ui/UIButton";
import UIImage from "../../../framework/ui/UIImage";
import UILabel from "../../../framework/ui/UILabel";
import UIList from "../../../framework/ui/UIList";
import UIWindow from "../../../framework/ui/UIWindow";
import warOrder from "../../entity/WarOrder";
import EventName from "../../event/EventName";
import { ChargeModel } from "../../model/ChargeModel";
import ListItemBottomMenu from "../common/ListItemBottomMenu";
import ListItemWar from "./ListItemWar";

const { ccclass, property } = cc._decorator;
@registerClass("WindowWar", {
    preloadPrefab: ["ListItemWar", "ListItemItem"],
})
@ccclass
export default class WindowWar extends UIWindow {
    static defaultOpentOption: Partial<WindowOpenOption> = {
        animation: WindowOpenAnimationEnum.default,
        hideMainScene: true,
    };

    _windowParam: any;
    _returnValue: any;
    @autowired(cc.ScrollView) scrollView: cc.ScrollView = null;
    /**listItem 根 */
    @autowired(UIList) itemRoot: UIList<ListItemWar> = null;

    /**进度间隔 */
    @autowired(cc.Node) progressBarInterval: cc.Node = null;
    /**进度 */
    @autowired(cc.ProgressBar) progressBar: cc.ProgressBar = null;
    @autowired(UIButton) closeBtn: UIButton = null;
    /**预览节点 */
    @autowired(UIList) weekShowItem: UIList<ListItemWar> = null;

    /**左边免费提示 */
    @autowired(UILabel) freeWarLabel: UILabel = null;
    /**右边提示 */
    @autowired(UILabel) warLabel: UILabel = null;
    /**免费提示 */
    @autowired(UILabel) title: UILabel = null;
    /**购买战令价格 */
    @autowired(UIButton) warBuy: UIButton = null;

    /**切换菜单 */
    @autowired(UIList) bottomMenu: UIList<ListItemBottomMenu> = null;

    private warTbl: WarOrderTbl = null;
    private itemInterval: number = 0;
    private itemHeight: number = 120;
    private maxDay: number = 0;
    private warRewardTbl: WarOrderRewardTbl[] = [];
    /**战令id */
    private warId: number = 0;
    private checkIsGet: Map<number, boolean> = new Map();

    refWarItem() {
        let state = this.warRewardTbl.map((t) => {
            return { tbl: t };
        });
        this.itemRoot.setState(state);
    }

    protected onInited(): void {
        this.schedule(this.refresh, 1);
        this.itemInterval = this.itemRoot.node.getComponent(cc.Layout).spacingY;
        this.warBuy.node.active = false;
        this.warBuy.onClick = () => {
            GModel.charge.pay(this.warId, "");
        };
        this.warId = this.getWarMenu()[0].id;

        this.warBuy.node.active =
            GTable.getById("WarOrderTbl", this.warId).orderKind != 1 &&
            GModel.warOrder.getWarOrderById(this.warId) &&
            !GModel.warOrder.getWarOrderById(this.warId).hasBuy;
        if (this.warBuy.node.active) {
            this.warBuy.text.setText([GLang.code.ui.windowWar_buyWar, GModel.charge.getItemPriceText(this.warId)]);
        }

        this.warTbl = GTable.getById("WarOrderTbl", this.warId);
        this.warRewardTbl = GTable.getList("WarOrderRewardTbl").filter((t) => {
            return t.warOrderId == this.warId;
        });
        this.maxDay = this.warRewardTbl.filter((t) => {
            return t.warOrderId == this.warId;
        }).length;

        this.closeBtn.onClick = () => {
            this.close();
        };
        this.updateProgressUi();

        this.refWarItem();

        this.initMenu();
        this.checkIsGetFunc();
        this.eventScrollView();

        let t = GTable.getById("WarOrderTbl", this.warId);
        this.freeWarLabel.setText([GTable.getById("WarOrderTbl", t.id).freeText]);
        this.warLabel.setText([GTable.getById("WarOrderTbl", t.id).chargeText]);
        this.title.setText([GTable.getById("WarOrderTbl", t.id).titleText]);

        this.scrollView.node.on("scrolling", this.eventScrollView, this);
    }

    @message([EventName.stateKey.warOrder])
    refresh() {
        this.warBuy.node.active =
            GTable.getById("WarOrderTbl", this.warId).orderKind != 1 &&
            GModel.warOrder.getWarOrderById(this.warId) &&
            !GModel.warOrder.getWarOrderById(this.warId).hasBuy;
        if (this.warBuy.node.active) {
            this.warBuy.text.setText([GLang.code.ui.windowWar_buyWar, GModel.charge.getItemPriceText(this.warId)]);
        }
        this.refWarItem();
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
            for (let i = 0; i < warRewardTbl.length; i++) {
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
                    } else if (
                        t.WarOrderType > 1 &&
                        element[index - 1] &&
                        GModel.warOrder.getWarOrderById(element[index - 1].id).hasBuy &&
                        isGetAllWar(element[index - 1].id)
                    ) {
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
            } else {
                for (let i = 0; i < warRewardTbl.length; i++) {
                    const element = warRewardTbl[i];
                    if (warOrder.progress >= element.require) {
                        if (GModel.warOrder.getWarOrderById(element.warOrderId).hasBuy) {
                            //开通战令
                            if (!warOrder.freeHasGet.includes(element.id) || !warOrder.hasGet.includes(element.id)) {
                                this.checkIsGet.set(tbl.id, true);
                                break;
                            }
                        } else {
                            //未开通战令
                            if (!warOrder.freeHasGet.includes(element.id)) {
                                this.checkIsGet.set(tbl.id, true);
                                break;
                            }
                        }
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
                        this.refresh();
                        this.checkIsGetFunc();
                        this.initMenu();
                        this.eventScrollView();
                        this.freeWarLabel.setText([GTable.getById("WarOrderTbl", t.id).freeText]);
                        this.warLabel.setText([GTable.getById("WarOrderTbl", t.id).chargeText]);
                        this.title.setText([GTable.getById("WarOrderTbl", t.id).titleText]);
                    },
                    currentWarId: this.warId,
                },
            });
        });

        this.bottomMenu.setState(state);
    }

    updateProgressUi() {
        // return;
        this.progressBarInterval.parent.children.forEach((node, i) => {
            node.active = false;
        });

        let sum = this.itemHeight * this.maxDay + this.itemInterval * this.maxDay; //总高度
        this.progressBar.node.width = sum - this.itemInterval;
        this.progressBar.totalLength = sum - this.itemInterval;
        let progress: number = GModel.warOrder.getWarOrderById(this.warId).progress; //当前进度
        let warMaxRequire = this.warRewardTbl[this.warRewardTbl.length - 1].require; //最大需求
        this.progressBar.progress =
            progress == 0 ? 0 : progress / warMaxRequire - progress / warMaxRequire / progress / 2;
        for (let i = 0; i < this.maxDay; i++) {
            let node: cc.Node = this.progressBarInterval;
            if (!this.progressBarInterval.parent.children[i]) {
                node = cc.instantiate(this.progressBarInterval);
                node.setParent(this.progressBarInterval.parent);
            } else {
                node = this.progressBarInterval.parent.children[i];
            }
            node.getChildByName("label")
                .getComponent(UILabel)
                .setText([this.warTbl.text, "_rs" + this.warRewardTbl[i].require]);
            node.x = i * this.itemHeight + i * this.itemInterval;
            node.getComponent(UIImage).imgName = "";
            node.getComponent(UIImage).imgName =
                progress >= this.warRewardTbl[i].require ? "war_order_dc1" : "war_order_dc2";
            node.active = true;
        }
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
