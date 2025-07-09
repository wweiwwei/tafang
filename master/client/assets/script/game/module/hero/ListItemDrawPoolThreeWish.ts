import { autowired, registerClass } from "../../../framework/Decorator";
import UIButton from "../../../framework/ui/UIButton";
import UIImage from "../../../framework/ui/UIImage";
import UILabel from "../../../framework/ui/UILabel";
import UIListItem from "../../../framework/ui/UIListItem";
import { CardPoolMenuType, CardPoolWishType } from "./WindowCardPool";
import WindowCardPoolWish from "./WindowCardPoolWish";

const { ccclass, property } = cc._decorator;

@registerClass("ListItemDrawPoolThreeWish")
@ccclass
export default class ListItemDrawPoolThreeWish extends UIListItem {
    state: {
        wishInfo: { id: number; hasGet: boolean };
        index: number;
        CardPoolMenuType: CardPoolMenuType;
        CardPoolWishType: CardPoolWishType;
    };
    @autowired(UIButton) bgBtn: UIButton = null;
    @autowired(UIImage) bgImg: UIImage = null;
    @autowired(UIImage) iconImg: UIImage = null;
    @autowired(UILabel) nameLabel: UILabel = null;
    @autowired(cc.Node) addNode: cc.Node = null;

    async setState(state: this["state"]) {
        this.state = state;
        if (!state.wishInfo.hasGet) {
            this.addNode.active = true;
            this.bgBtn.onClick = () => {
                this.onWishBtn();
            };
        } else {
            this.addNode.active = false;
        }

        let CPRTbl: CardPoolRewardTbl = GTable.getById("CardPoolRewardTbl", state.wishInfo.id);
        if (!CPRTbl) return;
        let tbl = GTable.getById("HeroTbl", CPRTbl.rewardId);
        this.nameLabel.setText(["_rs"]);

        if (CPRTbl.wishList == 1) {
            this.bgImg.imgName = "item_hero_red";
        } else {
            this.bgImg.imgName = "item_hero_orange";
        }
        this.iconImg.imgName = tbl.img;
        this.nameLabel.setText([tbl.name]);
    }

    onWishBtn(): void {
        GWindow.open(WindowCardPoolWish, {
            openIndex: this.state.index,
            CardPoolMenuType: this.state.CardPoolMenuType,
            CardPoolWishType: this.state.CardPoolWishType,
        });
    }
}
