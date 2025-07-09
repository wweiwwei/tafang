import { autowired, message, registerClass } from "../../../framework/Decorator";
import UIButton from "../../../framework/ui/UIButton";
import UIImage from "../../../framework/ui/UIImage";
import UILabel from "../../../framework/ui/UILabel";
import UIListItem from "../../../framework/ui/UIListItem";
import { EnumFacilityProperty } from "../../config/GEnum";
import Item from "../../entity/Item";
import Survivor from "../../entity/Survivor";
import EventName from "../../event/EventName";

const { ccclass, property } = cc._decorator;

const stateIcon = {
    sleep: "survivor_bubble_sleep",
    eat: "survivor_bubble_eat",
    sick: "survivor_bubble_sick",
    hungry: "survivor_bubble_hungry",
    fatigue: "survivor_bubble_fatigue",
    heal: "survivor_bubble_heal",
};

@registerClass("ListItemSurvivor")
@ccclass
export default class ListItemSurvivor extends UIListItem {
    @autowired(cc.Animation) roleAnimation: cc.Animation = null;
    @autowired(cc.Node) barContainer: cc.Node = null;
    @autowired(cc.ProgressBar) satietyBar: cc.ProgressBar = null;
    @autowired(cc.ProgressBar) fatigueBar: cc.ProgressBar = null;
    @autowired(cc.ProgressBar) illnessBar: cc.ProgressBar = null;
    @autowired(cc.Node) show: cc.Node = null;
    @autowired(UIImage) produce: UIImage = null;
    @autowired(UILabel) count: UILabel = null;
    @autowired(cc.Node) bubble: cc.Node = null;
    @autowired(UIImage) bubbleState: UIImage = null;
    @autowired(cc.ProgressBar) bubbleBar: cc.ProgressBar = null;

    state: {
        /** 幸存者数据 */
        data: Survivor;
        /** 层级父节点 */
        layer: {
            [layer: number]: cc.Node;
        };
    };

    setState(state: this["state"]): void {
        this.state = state;
        this.show.active = false;
        this.syncState();
        this.roleAnimation.getComponent(UIButton).setTransition(false);
        this.roleAnimation.getComponent(UIButton).onClick = () => {
            this.roleAnimation.node.on(cc.Node.EventType.TOUCH_END, () => {
                const targetId = this.state.data.fsm.getTargetBuildingId();
                const targetBuildName =
                    targetId === -1 ? "无" : GLang.getText(GTable.getById("FacilityTbl", targetId).name);
                const dormName = GLang.getText(GTable.getById("FacilityTbl", this.state.data.info.dormId).name);
                const s = `
幸存者uid:${this.state.data.info.uniqueId}
所属宿舍：${dormName}
饱食度：${this.state.data.info.satiety}
疲劳度：${this.state.data.info.fatigue}
疾病度：${this.state.data.info.illness}
状态:${this.state.data.fsm.state}
目的地：${targetBuildName}
当前区域：${this.state.data.area}`;
                console.log(s);
                console.log(JSON.parse(JSON.stringify(this.state.data)));
            });
        };
    }
    @message([EventName.showProduce])
    showProduce(uniqueId: number) {
        if (!this.state) return;
        if (this.state.data.info.uniqueId !== uniqueId) return;
        let facility = GModel.facility.getFacilityById(this.state.data.info.buildId);
        this.produce.imgName = Item.getImg(facility.produce());
        this.count.setText(["_rs+" + facility.produce().count]);
        this.doTween();
    }
    @message([EventName.showEat])
    showEat(uniqueId: number) {
        if (!this.state) return;
        if (this.state.data.info.uniqueId !== uniqueId) return;
        let facility = GModel.facility.getFacilityById(GConstant.build.ID_BUILD_CANTEEN);
        this.produce.imgName = GConstant.facilityLvReward[EnumFacilityProperty.satietyRecover].imgName;
        this.count.setText(["_rs+" + facility.satietyRecover()]);
        this.doTween();
    }
    @message([EventName.showSleep])
    showSleep(uniqueId: number) {
        if (!this.state) return;
        if (this.state.data.info.uniqueId !== uniqueId) return;
        let facility = GModel.facility.getFacilityById(this.state.data.info.dormId);
        this.produce.imgName = GConstant.facilityLvReward[EnumFacilityProperty.fatigueRecover].imgName;
        this.count.setText(["_rs+" + facility.fatigueRecover()]);
        this.doTween();
    }
    @message([EventName.showHeal])
    showHeal(uniqueId: number) {
        if (!this.state) return;
        if (this.state.data.info.uniqueId !== uniqueId) return;
        let facility = GModel.facility.getFacilityById(GConstant.build.ID_BUILD_HOSPITAL);
        this.produce.imgName = GConstant.facilityLvReward[EnumFacilityProperty.illnessRecover].imgName;
        this.count.setText(["_rs+" + facility.illnessRecover()]);
        this.doTween();
    }
    doTween() {
        this.show.active = true;
        cc.tween(this.show)
            .parallel(
                cc
                    .tween()
                    .to(0.2, { opacity: 255 })
                    .delay(0.6)
                    .to(0.2, { opacity: 0 })
                    .call(() => {
                        this.show.active = false;
                    }),
                cc.tween().by(0.2, { y: 10 })
            )
            .start();
    }
    tick() {
        this.syncState();
    }

    syncState() {
        const parent = this.state.layer[this.state.data.layer];
        if (this.node.parent !== parent) {
            this.node.parent = parent;
        }
        this.node.setPosition(this.state.data.position[0], this.state.data.position[1]);
        const ani = this.state.data.getAnimationName();
        switch (ani) {
            case "idle":
                this.playIdle();
                break;
            case "walk":
                this.playWalk();
                break;
            case "run":
                this.playRun();
                break;
        }
        this.state.data.direction === "left" ? this.turnLeft() : this.turnRight();
        this.node.active = this.state.data.show;
        const { state, progress } = this.state.data.fsm.getBubbleState();
        if (state === "") {
            this.bubble.active = false;
        } else {
            this.bubble.active = true;
            this.bubbleBar.progress = progress;
            if (state === "work") {
                const f = GModel.facility.getFacilityById(this.state.data.info.buildId);
                const itemId = f.getTbl().produceId;
                const img = GTable.getById("ItemTbl", itemId).img;
                this.bubbleState.imgName = img;
            } else {
                this.bubbleState.imgName = stateIcon[state];
            }
        }
        if (GTest.sDebug) {
            this.barContainer.active = true;
            this.roleAnimation.getComponent(UIButton).interactable = true;
            this.illnessBar.progress = this.state.data.info.illness / 100;
            this.fatigueBar.progress = this.state.data.info.fatigue / 200;
            this.satietyBar.progress = this.state.data.info.satiety / 200;
        } else {
            this.roleAnimation.getComponent(UIButton).interactable = false;
            this.barContainer.active = false;
        }
    }

    onInjected() {
        this.playIdle();
    }

    playIdle() {
        if (this.roleAnimation.currentClip && this.roleAnimation.currentClip.name === "survivor_idle") {
            return;
        }
        this.roleAnimation.play("survivor_idle");
    }

    playWalk() {
        if (this.roleAnimation.currentClip && this.roleAnimation.currentClip.name === "survivor_walk") {
            return;
        }
        this.roleAnimation.play("survivor_walk");
    }

    playRun() {
        if (this.roleAnimation.currentClip && this.roleAnimation.currentClip.name === "survivor_run") {
            return;
        }
        this.roleAnimation.play("survivor_run");
    }

    turnLeft() {
        if (this.roleAnimation.node.scaleX > 0) {
            this.roleAnimation.node.scaleX = -this.roleAnimation.node.scaleX;
        }
    }

    turnRight() {
        if (this.roleAnimation.node.scaleX < 0) {
            this.roleAnimation.node.scaleX = -this.roleAnimation.node.scaleX;
        }
    }
}
