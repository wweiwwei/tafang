import { autowired, registerClass } from "../../../framework/Decorator";
import UIButton from "../../../framework/ui/UIButton";
import UIImage from "../../../framework/ui/UIImage";
import UILabel from "../../../framework/ui/UILabel";
import UIListItem from "../../../framework/ui/UIListItem";
import Item from "../../entity/Item";
import WindowCongratulation from "../common/WindowCongratulation";
import WindowRule from "./WindowRule";
const { ccclass, property } = cc._decorator;
@registerClass("ListItemBoxItem")
@ccclass
export default class ListItemBoxItem extends UIListItem {
    @autowired(UIImage) bg: UIImage = null;
    @autowired(UIImage) icon: UIImage = null;
    @autowired(UIImage) oneBtnTips: UIImage = null;
    @autowired(UIImage) theBtnTips: UIImage = null;
    @autowired(UIButton) rule: UIButton = null;
    @autowired(UIButton) adBtn: UIButton = null;
    @autowired(UIButton) oneBtn: UIButton = null;
    @autowired(UIButton) theBtn: UIButton = null;
    @autowired(UILabel) tips1: UILabel = null;
    @autowired(UILabel) tips2: UILabel = null;
    @autowired(UILabel) typeName: UILabel = null;

    state: {
        id: number;
        index: number;
    };

    setState(state: this["state"]): void {
        this.oneBtnTips.node.active = false;
        this.theBtnTips.node.active = false;

        let data = GModel.sprite.getPoolInfoById(state.id);
        let tbl = data.getTbl();
        this.rule.onClick = () => {
            GWindow.open(WindowRule, { info: { title: tbl.title, RichText: tbl.rule } });
        };

        this.bg.imgName = state.index == 0 ? "shop_treasure1" : "shop_treasure2";
        this.icon.imgName = state.index == 0 ? "common_box1" : "common_box2";
        this.typeName.setText([state.index == 0 ? "_rs普通锦盒" : "_rs高级锦盒"]);
        this.tips1.setText(["_rs获得各种奖励"]);
        this.tips2.setText(["_rs(铜钱/装备/装备碎片等"]);

        this.oneBtn.bg.imgName = Item.getImg(new Item(tbl.singlePrice[0], 0));
        this.theBtn.bg.imgName = Item.getImg(new Item(tbl.tenPrice[0], 0));
        this.oneBtn.text.setText(["_rs" + tbl.singlePrice[1]]);
        this.theBtn.text.setText(["_rs" + tbl.tenPrice[1]]);

        this.adBtn.node.active = tbl.video != 0;
        this.adBtn.text.setText(["_rs(" + data.getTodayVideoRemain() + "/" + tbl.video + ")"]);

        this.adBtn.onClick = async () => {
            await GSDK.showVideo("advertisement_war");
            let items = await GModel.sprite.call(state.id, 1, true);
            if (items.length > 0) GWindow.open(WindowCongratulation, { items: items });
        };

        this.oneBtn.onClick = async () => {
            let items = await GModel.sprite.call(state.id, 1, false);
            if (items.length > 0) GWindow.open(WindowCongratulation, { items: items });
        };

        this.theBtn.onClick = async () => {
            let items = await GModel.sprite.call(state.id, 10, false);
            if (items.length > 0) GWindow.open(WindowCongratulation, { items: items });
        };
    }
}
