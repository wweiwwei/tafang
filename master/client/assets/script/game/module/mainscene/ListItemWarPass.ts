import { autowired, registerClass } from "../../../framework/Decorator";
import UIButton from "../../../framework/ui/UIButton";
import UIImage from "../../../framework/ui/UIImage";
import UILabel from "../../../framework/ui/UILabel";
import UIList from "../../../framework/ui/UIList";
import UIListItem from "../../../framework/ui/UIListItem";
import Item from "../../entity/Item";
import warOrder from "../../entity/WarOrder";
import ListItemItem from "../common/ListItemItem";
import WindowCongratulation from "../common/WindowCongratulation";
import WindowWarPass from "./WindowWarPass";

const { ccclass, property } = cc._decorator;
@registerClass("ListItemWarPass")
@ccclass
export default class ListItemWarPass extends UIListItem {
    /**奖励1 */
    @autowired(UIList) uiList1: UIList<ListItemItem> = null;
    /**奖励2 */
    @autowired(UIList) uiList2: UIList<ListItemItem> = null;
    /**领取 */
    @autowired(UIButton) get: UIButton = null;
    /**视频领取 */
    @autowired(UIButton) videoGet: UIButton = null;
    /**领取遮罩 */
    @autowired(UIImage) bg: UIImage = null;
    /**高光 */
    @autowired(UIImage) hight: UIImage = null;
    /**标记 */
    @autowired(UIButton) tag: UIButton = null;
    /**下划线 */
    @autowired(UIImage) linedown: UIImage = null;

    private warOrder: warOrder = null;
    private id: number = 0;
    private warOrderId: number = 0;
    private req: number = 0;

    state: {
        tbl: WarOrderRewardTbl;
        // cb: Function;
        tagInfo?: { dayStr: string[]; tagImg: string };
    };

    refUi() {
        this.warOrder = GModel.warOrder.getWarOrderById(this.warOrderId);
        this.videoGet.node.active =
            this.warOrder.getTbl().orderKind == 1 &&
            !this.warOrder.hasGet.includes(this.id) &&
            this.warOrder.progress >= this.state.tbl.require;

        this.get.node.active =
            this.warOrder.getTbl().orderKind != 1 &&
            GModel.warOrder.getWarOrderById(this.warOrderId).hasBuy &&
            !this.warOrder.hasGet.includes(this.id) &&
            this.warOrder.progress >= this.state.tbl.require;

        // this.bg.imgName =
        //     // this.warOrder.progress == this.state.tbl.require ? "war_order_complete" : "war_order_nocomplete";
        //     //this.warOrder.progress == this.state.tbl.require ? "common_get" : "common_geted";
        //     this.warOrder.progress <= this.state.tbl.require ? "common_get" : "common_geted";
        //改
        this.hight.node.active = this.warOrder.progress == this.state.tbl.require;
        if (this.warOrder.progress == this.state.tbl.require && this.videoGet.bg.node.active == true) {
            this.bg.imgName = "common_canget";
            this.linedown.node.active = true;
        }
        if (this.state.tbl.require == 7) {
            this.bg.imgName = "common_canget";
        }
        if (this.warOrder.progress < this.state.tbl.require && this.state.tbl.require % 7 != 0) {
            this.bg.imgName = "common_get";
        }
        this.videoGet.bg.node.active =
            this.warOrder.progress >= this.state.tbl.require &&
            !this.warOrder.freeHasGet.includes(this.id) &&
            this.warOrder.getTbl().orderKind != 1;
        this.get.bg.node.active =
            this.warOrder.progress >= this.state.tbl.require && !this.warOrder.hasGet.includes(this.id);

        this.get.onClick = () => {
            this.getRightAward();
        };
        this.videoGet.onClick = () => {
            this.getRightAward();
        };

        // return;
        let reward1 = this.state.tbl.freeReward
            .map((re) => {
                const env = [{ lv: GModel.stage.getCurrentStage().stageIndex }];
                return new Item(Number(re[0]), AstUtil.eval(re[1], env));
            })
            .map((re) => {
                return {
                    item: re,
                    status: 0,
                    clickCb: () => {
                        this.getLeftAward();
                    },
                    tipsState:
                        this.warOrder.progress >= this.state.tbl.require && !this.warOrder.freeHasGet.includes(this.id),
                    isShowAnswerIcon: this.warOrder.freeHasGet.includes(this.id),
                };
            });
        this.uiList1.setState(reward1);

        let reward2 = this.state.tbl.reward
            .map((re) => {
                const env = [{ lv: GModel.stage.getCurrentStage().stageIndex }];
                return new Item(Number(re[0]), AstUtil.eval(re[1], env));
            })
            .map((re) => {
                if (GModel.warOrder.getWarOrderById(this.warOrderId).hasBuy) {
                    return {
                        item: re,
                        status: 0,
                        tipsState:
                            this.warOrder.progress >= this.state.tbl.require &&
                            !this.warOrder.hasGet.includes(this.id) &&
                            GModel.warOrder.getWarOrderById(this.warOrderId).hasBuy &&
                            this.warOrder.getTbl().orderKind != 1,
                        isShowAnswerIcon: this.warOrder.hasGet.includes(this.id),
                    };
                } else {
                    return {
                        item: re,
                        status: 0,
                        clickCb: () => {
                            GTip.showTip([GLang.code.ui.windwWar_pleaseBuyWar]);
                        },
                        tipsState:
                            this.warOrder.progress >= this.state.tbl.require &&
                            !this.warOrder.hasGet.includes(this.id) &&
                            GModel.warOrder.getWarOrderById(this.warOrderId).hasBuy &&
                            this.warOrder.getTbl().orderKind != 1,
                        isShowAnswerIcon: this.warOrder.hasGet.includes(this.id),
                    };
                }
            });
        this.uiList2.setState(reward2);
    }

    setState(state: this["state"]): void {
        this.state = state;
        this.id = this.state.tbl.id;
        this.warOrderId = this.state.tbl.warOrderId;
        this.refUi();
        this.tag.node.active = state.tagInfo != null;
        if (state.tagInfo) {
            this.tag.text.setText(state.tagInfo.dayStr);
            this.tag.bg.imgName = state.tagInfo.tagImg;
        }
    }

    async getLeftAward() {
        if (this.warOrder.progress < this.state.tbl.require) {
            GTip.showTip([GLang.code.ui.windwWar_notSatisfied]);
            return;
        } else if (this.warOrder.freeHasGet.includes(this.id)) {
            GTip.showTip([GLang.code.ui.windwWar_received]);
            return;
        }
        let reward = await GModel.warOrder.obtain(this.id, true);

        await GWindow.open(WindowCongratulation, { items: reward });
        this.refUi();
        // if (this.state.updateMenu) this.state.updateMenu();
    }

    async getRightAward() {
        if (this.warOrder.progress < this.state.tbl.require) {
            GTip.showTip([GLang.code.ui.windwWar_notSatisfied]);
            return;
        } else if (this.warOrder.hasGet.includes(this.id)) {
            GTip.showTip([GLang.code.ui.windwWar_received]);
            return;
        }
        if (!GModel.warOrder.getWarOrderById(this.warOrderId).hasBuy) {
            GTip.showTip([GLang.code.ui.videoGroup_pay]);
            return;
        }
        if (this.warOrderId == 10001) {
            await GSDK.showVideo("advertisement_war");
        }

        let reward = await GModel.warOrder.obtain(this.id, false);

        await GWindow.open(WindowCongratulation, { items: reward });
        this.refUi();
        // if (this.state.updateMenu) this.state.updateMenu();
    }
}
