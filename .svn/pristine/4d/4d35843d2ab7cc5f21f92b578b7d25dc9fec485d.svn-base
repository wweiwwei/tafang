import { autowired, registerClass } from "../../../framework/Decorator";
import UIButton from "../../../framework/ui/UIButton";
import UIImage from "../../../framework/ui/UIImage";
import UIListItem from "../../../framework/ui/UIListItem";
import Item from "../../entity/Item";

const { ccclass, property } = cc._decorator;
@registerClass("ListItemManorBuilding")
@ccclass
export default class ListItemManorBuilding extends UIListItem {
    @autowired(cc.Node) arrow: cc.Node = null;
    @autowired(UIImage) img: UIImage = null;
    @autowired(UIImage) btn: UIImage = null;
    @autowired(UIImage) bg: UIImage = null;
    @autowired(UIButton) cancel: UIButton = null;
    @autowired(UIButton) confirm: UIButton = null;
    @autowired(UIButton) remove: UIButton = null;
    state: {
        id: number;
        status: "base" | "addPlant" | "build" | "edit";
        remove?: () => void;
        confirm?: () => void;
        cancel?: () => void;
    };
    private arrows: cc.Node[] = [];
    setState(state: this["state"]): void {
        this.state = state;
        this.cancel.onClick = this.state.cancel;
        let facilityTbl = GTable.getById("ManorFacilityTbl", this.state.id);
        let decorationTbl = GTable.getById("ManorDecorationTbl", this.state.id);
        let area: number[] = [];
        let scale: number = 0;
        this.arrows = this.arrow.children;
        if (facilityTbl) {
            area = facilityTbl.area;
            scale = facilityTbl.scale;
            this.remove.node.active = false;
            this.img.imgName = facilityTbl.img;
        } else {
            let decoration = new Item(this.state.id, 1);
            area = decorationTbl.area;
            scale = decorationTbl.scale;
            this.remove.node.active = this.state.status === "edit";
            this.img.imgName = Item.getImg(decoration);
            this.remove.onClick = this.state.remove;
        }
        this.node.setContentSize(this.img.node.getContentSize());
        this.confirm.onClick = this.state.confirm;
        let width = GModel.manor.gridBlock * area[0];
        let height = GModel.manor.gridBlock * area[1];
        this.arrows[0].setPosition(-width / 2, -height / 2);
        this.arrows[1].setPosition(width / 2, -height / 2);
        this.arrows[2].setPosition(-width / 2, height / 2);
        this.arrows[3].setPosition(width / 2, height / 2);
        this.bg.node.scale = scale;
        this.arrow.active = this.state.status !== "base" && this.state.status !== "addPlant";
        this.bg.node.active = this.state.status !== "base" && this.state.status !== "addPlant";
        this.btn.node.active = this.state.status === "build";
    }
    syncPos() {
        const pos = this.node.getPosition();
        const centerPos = GModel.manor.gamePosToBlockPos(pos);
        const leftBottomPos = GModel.manor.centerToLeftBottom(this.state.id, centerPos);
        const setable = GModel.manor.checkBuildable(this.state.id, leftBottomPos.x, leftBottomPos.y);
        if (setable === "ok") {
            const centerPos = GModel.manor.leftBottomToCenter(this.state.id, leftBottomPos);
            const pos = GModel.manor.blockPosToGamePos(centerPos);
            this.node.setPosition(pos.x, pos.y);
        }
    }
    async setNode(pos: { x: number; y: number }) {
        await GModel.manor.setMap(this.state.id, pos.x, pos.y);
    }
    /** 确认移动 */
    async onConfirm() {
        const pos = this.node.getPosition();
        const centerPos = GModel.manor.gamePosToBlockPos(pos);
        const leftBottomPos = GModel.manor.centerToLeftBottom(this.state.id, centerPos);
        const state = GModel.manor.checkBuildable(this.state.id, leftBottomPos.x, leftBottomPos.y);
        if (state === "ok") {
            this.setNode(leftBottomPos);
            return true;
        } else if (state === "hasOtherBuilding") {
            GTip.showTip(["_rs有其他建筑"]);
        } else if (state === "overEdge") {
            GTip.showTip(["_rs超出可建造区域"]);
        }
        return false;
    }
}
