import { autowired, message, registerClass } from "../../../framework/Decorator";
import { GameDate } from "../../../framework/date/GameDate";
import UIButton from "../../../framework/ui/UIButton";
import UIImage from "../../../framework/ui/UIImage";
import UILabel from "../../../framework/ui/UILabel";
import UIListItem from "../../../framework/ui/UIListItem";
import { Technology } from "../../entity/Technology";
import EventName from "../../event/EventName";
import WindowGongFaDetail from "./WindowGongFaDetail";
import WindowTreeNodeInfo from "./WindowTreeNodeInfo";

const { ccclass, property } = cc._decorator;
@registerClass("ListItemTree")
@ccclass
export default class ListItemTree extends UIListItem {
    @autowired(cc.Node) tips: cc.Node = null;
    @autowired(UIImage) icon: UIImage = null;
    @autowired(UILabel) nameLabel: UILabel = null;
    @autowired(UILabel) lv: UILabel = null;
    @autowired(UIButton) itemBtn: UIButton = null;
    @autowired(UIButton) detail: UIButton = null;
    /**最高等级图标*/
    @autowired(cc.Node) max: cc.Node = null;

    state: {
        id: number;
        isHideUpLvTime?: boolean;
        cb?: () => void;
    };
    setState(state: this["state"]): void {
        this.state = state;
        this.max.active = false;
        this.tips.active = false;
        this.lv.node.active = false;
        let tbl = GTable.getById("TechTreeTbl", this.state.id);
        let technology = GState.data.techTree[this.state.id];
        let index = tbl.levelRange.findIndex((t) => technology.level <= t);
        // this.itemBtn.bg.imgName = GConstant.itemQualityBg[tbl.quality[index] - 1];
        if (this.state.cb != null) this.itemBtn.onClick = this.state.cb;
        this.icon.imgName = tbl.img;
        this.nameLabel.setText([tbl.name]);
        this.detail.onClick = () => {
            // GWindow.open(WindowTreeNodeInfo, { id: this.state.id });
        };
        this.itemBtn.onClick = () => {
            let technology = GState.data.techTree[state.id];
            // technology
            //     .getProperty()
            //     .map((d) => [
            //         [GIndex.battle.propertyText(d.property)],
            //         ["_rs+" + GIndex.battle.propertyShowMethod(d.property)(d.value)],
            //     ])
            let desc1 = technology.getTreeNodeDescribe();
            let desc2 = technology.getNextLevelDescribe();
            GWindow.open(WindowGongFaDetail, {
                iconImg: technology.getTbl().img,
                name: technology.getTbl().name,
                typeText: "心法",
                maxLv: technology.isMaxLevel(),
                text1: desc1,
                text2: desc2,
                lv: technology.level,
            });
        };
        this.refItem();
    }

    @message([EventName.stateKey.techData, EventName.stateKey.techTree])
    refItem() {
        let technology = GState.data.techTree[this.state.id];
        this.itemBtn.setGrey(technology.level <= 0);

        // console.log("technology.isMaxLevel() =", technology.isMaxLevel());
        let isMaxLv = technology.isMaxLevel();

        this.tips.active = technology.canUpdate();
        this.itemBtn.bg.imgName = technology.canUpdate() ? "gongfa_xinfaItem1" : "gongfa_xinfaItem2";
        this.max.active = isMaxLv;
        this.lv.node.active = !isMaxLv;
        this.lv.setText(["_rs" + technology.level + "级"]);
    }

    playAni() {
        this.node.getChildByName("UpgradeEquipment_Effect").getComponent(cc.Animation).play();
    }
}
