import { autowired, message, registerClass } from "../../../framework/Decorator";
import UIButton from "../../../framework/ui/UIButton";
import UIImage from "../../../framework/ui/UIImage";
import UILabel from "../../../framework/ui/UILabel";
import UIListItem from "../../../framework/ui/UIListItem";
import { EnumFacilityType } from "../../config/GEnum";
import Item from "../../entity/Item";
import EventName from "../../event/EventName";
const { ccclass, property } = cc._decorator;

@registerClass("ListItemBubble")
@ccclass
export default class ListItemBubble extends UIListItem {
    @autowired(UIButton) bubble: UIButton = null;
    @autowired(UIImage) product: UIImage = null;
    @autowired(UILabel) count: UILabel = null;
    @autowired(UIImage) unlockable: UIImage = null;
    @autowired(UIImage) appointHint: UIImage = null;

    state: {
        id: number;
        position: cc.Vec2;
    };

    protected onInited(): void {}
    setState(state: this["state"]): void {
        this.state = state;
        this.bubble.node.active = false;
        this.unlockable.node.active = false;
        this.refresh();
    }
    tipInit() {
        this.bubble.node.active = false;
        this.unlockable.node.active = true;
        if (!this.unlockable.node.getComponent(cc.Animation).getAnimationState("ListItemBubbleUnlock_Ani").isPlaying) {
            this.unlockable.node.getComponent(cc.Animation).play();
        }
    }
    bubbleInit() {
        this.bubble.node.active = true;
        this.unlockable.node.active = false;
        if (!this.bubble.node.getComponent(cc.Animation).getAnimationState("bubble_breathe").isPlaying) {
            this.bubble.node.getComponent(cc.Animation).play();
        }
        const facility = GModel.facility.getFacilityById(this.state.id);
        this.product.imgName = Item.getImg(facility.produce());
        const green =
            facility.getKind() === EnumFacilityType.material && facility.id !== GConstant.build.ID_BUILD_WATER;
        this.bubble.getComponent(UIImage).imgName = green ? "facility_bubble_bg" : "facility_bubble_bg2";
        if (green) {
            this.bubble.onClick = async () => {
                const f = GModel.facility.getFacilityById(this.state.id);
                if (f.getKind() !== EnumFacilityType.material) return;
                const storage = GModel.facility.getFacilityStorageById(this.state.id);
                if (storage === 0) return;
                const rewards = await GModel.facility.harvest(this.state.id);
                if (Array.isArray(rewards)) {
                    rewards.forEach((item) => {
                        const beginWorldPosition = this.node.convertToWorldSpaceAR(cc.v2(0, 0));
                        GTip.showFlyReward(beginWorldPosition, item);
                    });
                } else {
                    const beginWorldPosition = this.node.convertToWorldSpaceAR(cc.v2(0, 0));
                    GTip.showFlyReward(beginWorldPosition, rewards);
                }
            };
        } else {
            this.bubble.onClick = () => {};
        }
        if (facility.id === GConstant.build.ID_BUILD_CANTEEN) {
            this.refreshFood();
        } else if (facility.id === GConstant.build.ID_BUILD_GREENHOUSE) {
            this.refreshGreenHouse();
        } else {
            const storage = GModel.facility.getFacilityStorageById(this.state.id);
            this.count.setText(["_rs" + (storage > 0 ? GUtils.ui.getNumberString(storage, 0) : "")]);
        }
    }

    // 食堂特殊处理
    @message([EventName.refreshFood])
    refreshFood() {
        if (this.state.id !== GConstant.build.ID_BUILD_CANTEEN) return;
        const facility = GModel.facility.getFacilityById(this.state.id);
        const storage = GModel.survivor.foodRemain();
        this.count.setText(["_rs" + GUtils.ui.getNumberString(storage, 0) + "/" + facility.mealLimit()]);
    }

    // 温室特殊处理
    @message([EventName.stateKey.storage])
    refreshGreenHouse() {
        if (this.state.id !== GConstant.build.ID_BUILD_GREENHOUSE) return;
        const storage = GModel.knapsack.getStorageById(GConstant.foodIngredientsId);
        this.count.setText(["_rs" + (storage > 0 ? GUtils.ui.getNumberString(storage, 0) : "")]);
    }

    @message([EventName.stateKey.facilityStorage, EventName.stateKey.facility])
    refresh() {
        const facility = GModel.facility.getFacilityById(this.state.id);
        this.node.setPosition(this.state.position);
        if (facility.produce()) {
            if (facility.isFacilityUnlockable(false) && !facility.unlock) {
                this.tipInit();
            }
            if (facility.unlock) this.bubbleInit();
        } else {
            if (facility.isFacilityUnlockable(false) && !facility.unlock) this.tipInit();
        }
        if (
            facility.unlock &&
            facility.getTbl().enableHero > 0 &&
            GModel.player.checkSystemUnlock(GConstant.systemId.facilityAppointHero, false, facility.rank) &&
            facility.hero === -1
        ) {
            this.appointHint.node.active = true;
            if (facility.id === 10018) this.appointHint.node.setPosition(-130, this.appointHint.node.position.y);
        } else {
            this.appointHint.node.active = false;
        }
    }
}
