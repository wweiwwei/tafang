import { autowired, message, registerClass } from "../../../framework/Decorator";
import { GameDate } from "../../../framework/date/GameDate";
import UIButton from "../../../framework/ui/UIButton";
import UIImage from "../../../framework/ui/UIImage";
import UILabel from "../../../framework/ui/UILabel";
import UIList from "../../../framework/ui/UIList";
import UIListItem from "../../../framework/ui/UIListItem";
import UISpine from "../../../framework/ui/UISpine";
import Item from "../../entity/Item";
import EventName from "../../event/EventName";

const { ccclass } = cc._decorator;
@registerClass("ListItemBanquetGroup")
@ccclass
export default class ListItemBanquetGroup extends UIListItem {
    @autowired(cc.Node) item1: cc.Node = null;
    @autowired(cc.Node) item2: cc.Node = null;
    /**秒杀折扣 */
    @autowired(UILabel) discount: UILabel = null;
    /**开启时间 */
    @autowired(UILabel) time: UILabel = null;
    /**获得 */
    @autowired(UIImage) rewardIcon: UIImage = null;
    /**获得数量 */
    @autowired(UILabel) getCount: UILabel = null;
    /**是否拥有 */
    @autowired(UIImage) isHaveNode: UIImage = null;
    /**是否开启 */
    @autowired(UIImage) isOpenNode: UIImage = null;

    /**消耗数 */
    @autowired(UIButton) buyBtn: UIButton = null;
    /**消耗 */
    @autowired(UIImage) consumeIcon: UIImage = null;
    /**消耗数 */
    @autowired(UILabel) consumeLab: UILabel = null;
    /**秒杀提示 */
    @autowired(UILabel) tipsText: UILabel = null;

    /**秒杀或抢 */
    @autowired(UILabel) title2: UILabel = null;
    /**秒杀 */
    @autowired(UILabel) discount2: UILabel = null;
    /**获得 */
    @autowired(UIImage) rewardIcon2: UIImage = null;
    /**获得数量 */
    @autowired(UILabel) getCount2: UILabel = null;
    /**是否拥有 */
    @autowired(UIImage) isHaveNode2: UIImage = null;
    /**是否开启 */
    @autowired(UIImage) isOpenNode2: UIImage = null;
    /**tips */
    @autowired(UILabel) label1: UILabel = null;
    /**tips */
    @autowired(UILabel) label2: UILabel = null;
    /**tips */
    @autowired(UILabel) label3: UILabel = null;
    /**消耗 */
    @autowired(UIImage) consumeIcon2: UIImage = null;
    /**消耗数 */
    @autowired(UILabel) consumeLab2: UILabel = null;
    /**未开启 */
    @autowired(UIImage) noOpen2: UIImage = null;

    /**主页时间 */
    @autowired(UILabel) time2: UILabel = null;

    private tbl: BanquetGroupTbl = null;

    state: {
        /**类型 0主页面 1团购页面 */
        type: number;
        id: number;
    };

    setState(state: this["state"]): void {
        this.state = state;
        this.tbl = GTable.getById("BanquetGroupTbl", this.state.id);
        this.event();
        if (state.type == 0) this.initItem2Ui();
        else this.initItem1Ui();
    }

    event() {
        this.buyBtn.onClick = () => {
            GModel.banquet.buyGroup(this.tbl.id);
        };
    }

    /**团购页面用 */
    initItem1Ui() {
        this.item1.active = true;
        this.item2.active = false;
        this.discount.setText(["_rs" + this.tbl.discount]);

        let d = new Date(this.tbl.startTime);
        this.time.setText(["_rs" + d.getHours() + ":" + d.getMinutes()]);

        let rItem = new Item(this.tbl.reward[0], this.tbl.reward[1]);
        this.rewardIcon.imgName = Item.getImg(rItem);
        this.getCount.setText(["_rsX" + rItem.count]);

        this.Event1Ui();

        let cItem = new Item(this.tbl.cost[0], this.tbl.cost[1]);
        this.consumeIcon.imgName = Item.getImg(cItem);
        this.consumeLab.setText(["_rs" + cItem.count]);
        if (this.tbl.kind == 0) {
            this.tipsText.setText(["_rs团购"]);
        } else {
            this.tipsText.setText(["_rs秒杀"]);
        }
    }

    // @message([EventName.stateKey.achievement])
    Event1Ui() {
        this.isHaveNode.node.active = false;
        this.isOpenNode.node.active = false;
    }

    initItem2Ui() {
        this.item1.active = false;
        this.item2.active = true;
        if (this.tbl.kind == 0) {
            this.title2.setText(["_rs团购"]);
        } else {
            this.title2.setText(["_rs秒杀"]);
        }
        this.discount2.setText([GLang.code.ui.career_level1, "_rs" + this.tbl.discount]);

        let rItem = new Item(this.tbl.reward[0], this.tbl.reward[1]);
        this.rewardIcon2.imgName = Item.getImg(rItem);
        this.getCount2.setText(["_rs" + rItem.count]);

        this.Event1Ui();

        let cItem = new Item(this.tbl.cost[0], this.tbl.cost[1]);
        this.consumeIcon2.imgName = Item.getImg(cItem);
        this.consumeLab2.setText(["_rs" + cItem.count]);
        let d = this.tbl.startTime;
        let d2 = this.tbl.endTime;
        this.schedule(() => {
            this.time2.setText([GLang.code.ui.career_level1, "_rs" + GUtils.date.formatRemainTime(d2 - d, "hh:mm:ss")]);
        }, 1);

        this.Event2Ui();
        this.noOpen2.node.active = GameDate.now() > d && GameDate.now() < d2;
    }
    // @message([EventName.stateKey.achievement])
    Event2Ui() {
        this.isHaveNode2.node.active = false;
        this.isOpenNode2.node.active = false;
    }
}
