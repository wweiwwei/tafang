import { autowired, registerClass } from "../../../framework/Decorator";
import UIComponent from "../../../framework/ui/UIComponent";
import UIImage from "../../../framework/ui/UIImage";
import UILabel from "../../../framework/ui/UILabel";
import UIListItem from "../../../framework/ui/UIListItem";
import Facility from "../../entity/Facility";
import Item from "../../entity/Item";

const { ccclass, property } = cc._decorator;

@registerClass("ListItemBuildThumb")
@ccclass
export default class ListItemBuildThumb extends UIListItem {
    @autowired(UIImage) img: UIImage = null;
    @autowired(cc.Node) count: cc.Node = null;
    @autowired(UILabel) require: UILabel = null;
    @autowired(UILabel) rank: UILabel = null;
    @autowired(UILabel) buildName: UILabel = null;
    static _poolSize: number = 10;
    private __state: this["state"] = null;
    state: {
        checkBuildId: number;
        status: number;
    };
    setState(state: this["state"]): void {
        this.__state = state;
        this.initBuildThumb();
    }
    initBuildThumb() {
        let thumb_new = this.node.getChildByName("thumb_new");
        let thumb_up = this.node.getChildByName("thumb_up");
        let thumb_check = this.node.getChildByName("thumb_check");
        let thumb_product = this.node.getChildByName("thumb_product").getComponent(UIImage);
        thumb_new.active = false;
        thumb_up.active = false;
        thumb_check.active = false;
        this.count.active = false;
        // thumb_product.node.active = false;\
        let captain = GModel.facility.getFacilityById(GConstant.captainId);
        let allFaci: Facility[] = GModel.facility.getAllFacility();
        let checkFaci: Facility[] = allFaci.filter((faci) => faci.id == this.__state.checkBuildId);
        let checkFacli: Facility = checkFaci[0];
        let productItem = checkFacli.produce();
        this.img.imgName = checkFacli.getTbl().image2;
        thumb_new.active = !checkFacli.unlock;
        this.buildName.setText([checkFacli.getTbl().name]);
        if (this.__state.status === 0) {
            this.buildName.node.setPosition(this.count.getPosition());
            thumb_product.imgName = checkFacli.produce() ? Item.getImg(productItem) : "";
        } else {
            thumb_up.active = checkFacli.unlock && checkFacli.canUprank();
            thumb_check.active = checkFacli.unlock && checkFacli.rank === captain.rank && checkFacli.isLvLimit();
            this.count.active = checkFacli.unlock;
            this.rank.setText(["_rs" + checkFacli.lv]);
            this.rank.node.color =
                checkFacli.lv === GConfig.facility.rankLevelLimit[captain.rank]
                    ? cc.color(255, 255, 255, 255)
                    : GConstant.costLabelColor.red;
            this.require.setText(["_rs/" + GConfig.facility.rankLevelLimit[captain.rank]]);
        }
    }
}
