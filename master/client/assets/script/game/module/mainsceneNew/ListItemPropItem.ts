import { autowired, registerClass } from "../../../framework/Decorator";
import ResourceLoader from "../../../framework/ResourceLoader";
import UIButton from "../../../framework/ui/UIButton";
import UIImage from "../../../framework/ui/UIImage";
import UILabel from "../../../framework/ui/UILabel";
import UIListItem from "../../../framework/ui/UIListItem";
import UISpine from "../../../framework/ui/UISpine";
import { PlayerEquipment } from "../../entity/PlayerEquipment";
import ListItemBattleTempMoveObject from "../battle/ListItemBattleTempMoveObject";
import BattleSceneControl from "../battle/battleScene/BattleSceneControl";
const { ccclass, property } = cc._decorator;
@registerClass("ListItemPropItem")
@ccclass
export default class ListItemPropItem extends UIListItem {
    /**触碰区域 */
    @autowired(UIButton) touchNode: UIButton = null;
    /**图标 */
    @autowired(UIImage) icon: UIImage = null;
    /**等级 */
    @autowired(UILabel) lv: UILabel = null;
    /**上升 */
    @autowired(UIImage) up: UIImage = null;
    /**名字 */
    @autowired(UILabel) bottonName: UILabel = null;
    /**等级 */
    @autowired(UILabel) level: UILabel = null;
    /**选中 */
    @autowired(UIImage) correct: UIImage = null;
    /**部位名称 */
    @autowired(UILabel) region: UILabel = null;

    /**上阵 */
    @autowired(UIImage) goBattle: UIImage = null;

    /**星星 */
    @autowired(cc.Node) star: cc.Node = null;
    /**小品质 */
    @autowired(UIImage) quality: UIImage = null;
    @autowired(UIImage) light: UIImage = null;
    /**提示 */
    @autowired(UIImage) redTips: UIImage = null;
    /**剪影 */
    @autowired(UIImage) cut: UIImage = null;
    /**类型 */
    @autowired(UILabel) towerType: UILabel = null;

    state: {
        playerEquipment: PlayerEquipment;
        clickCB?: Function;
        tempIndex?: number;
        /**是否对比装备 */
        isContrast?: boolean;
        /**底部名称 */
        showBottonName?: boolean;
        /**底部等级 */
        showBottonLevel?: boolean;
        /**显示灯泡上阵 */
        showGoBattle?: boolean;
        /**显示星星 */
        showStar?: number;
        /**缩放大小 */
        setScale?: number;
        /**显示品质 */
        showQuality?: boolean;
        /**显示品质灯光 */
        showLight?: boolean;
        /**显示提示 */
        showRedTips?: boolean;
        /** 主界面拖动模式 */
        dragMode?: {
            /** 装备部位 */
            part: number;
        };
    };

    private playerEquipment: PlayerEquipment = null;

    even() {
        this.touchNode.setEnable(this.state.clickCB ? true : false);
        this.touchNode.onClick = () => {
            if (this.state.clickCB) this.state.clickCB(this.state.tempIndex);
        };
        if (this.state.dragMode) {
            this.touchNode.setEnable(false);
            this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
            this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
            this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
            this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
        }
    }

    //#region 拖动逻辑
    private tempTower: ListItemBattleTempMoveObject;
    protected onRecycle(): void {
        this.clearTemp();
    }
    onTouchStart(event: cc.Event.EventTouch): void {
        GModel.weakGuide.sceneClick();
        if (!this.playerEquipment) return;
        const tempTower = ResourceLoader.getNodeSyncWithPreload(ListItemBattleTempMoveObject);
        tempTower.node.parent = cc.find("Canvas/tip");
        tempTower.node.setPosition(tempTower.node.parent.convertToNodeSpaceAR(event.getLocation()));
        tempTower.setState({
            index: -1,
            partMode: true,
            part: this.state.dragMode.part,
            range: true,
        });
        this.tempTower = tempTower;
        for (let index = 0; index < tempTower.node.children.length; index++) {
            const element = tempTower.node.children[index];
            console.log("element =", element.scale);
        }
    }
    onTouchMove(event: cc.Event.EventTouch): void {
        if (this.tempTower) {
            const delta = event.getDelta();
            this.tempTower.node.position = this.tempTower.node.position.add(cc.v3(delta.x, delta.y));
        }
    }
    onTouchEnd(event: cc.Event.EventTouch): void {
        const start = event.getStartLocation();
        const end = event.getLocation();
        const offset = end.sub(start).mag();
        if (offset < 10) {
            // 点击按钮
            if (GModel.guide.dragGuide) {
                this.clearTemp();
                return;
            } else {
                if (
                    GWindow.buttonBlock &&
                    GWindow.guideBtnPath !==
                        "Canvas/window/WindowMainSceneUI/bottom/equipment/id_formation/ListItemPropItem"
                ) {
                    // 防止引导卡住
                    this.clearTemp();
                    return;
                }
                if (this.state.clickCB) this.state.clickCB(this.state.tempIndex);
                this.clearTemp();
                return;
            }
        }
        // 判断塔上阵
        if (!this.tempTower) return;
        const screenPos = event.getLocation();
        const [index, relatePos] = BattleSceneControl.s_instance.posToIndex(screenPos);
        const part = this.state.dragMode.part;
        const originIndex = GModel.defendTower.getTowerFormation().indexOf(part);
        if (index >= 0 && index !== originIndex) {
            if (originIndex >= 0) {
                // 原本已上场，交换位置
                GModel.defendTower.changeTowerPosition(originIndex, index);
            } else {
                // 原本未上场，将塔上场
                GModel.defendTower.replaceTower(index, part);
            }
        }
        this.clearTemp();
    }
    private clearTemp() {
        if (this.tempTower) {
            this.tempTower.recycle();
        }
        this.tempTower = null;
    }
    //#endregion 拖动逻辑

    init() {
        this.redTips.node.active = this.state.showRedTips;
        this.correct.node.active = false;
        this.up.node.active = this.state.isContrast;
        this.node.scale = this.state.setScale ? this.state.setScale : 1;
        this.quality.node.active = this.state.showQuality;
        this.light.node.active = this.state.showLight;
        this.cut.node.active = this.state.playerEquipment === null;
        this.touchNode.node.active = this.state.playerEquipment !== null;
        // this.touchNode.bg.enabled = !this.state.showQuality;
        this.icon.fixWidth = this.state.showQuality ? 60 : 0;
        this.bottonName.node.parent.active = this.state.showBottonName;
        this.level.node.active = this.state.playerEquipment !== null && this.state.showBottonLevel;
        this.star.active = this.state.showStar ? true : false;
        this.goBattle.node.active = this.state.showGoBattle ? true : false;
        this.region.node.active = false;
    }

    setState(state: this["state"]): void {
        this.state = state;
        this.init();
        this.even();

        this.playerEquipment = state.playerEquipment;

        if (!this.playerEquipment) {
            let tbl = GTable.getList("EquipmentTbl");
            this.cut.imgName = GConstant.towerCut[this.state.tempIndex];
            this.towerType.setText([tbl.find((t) => t.part === this.state.tempIndex).type]);
            this.cut.node.scale = 0.7;
            // this.node.opacity = 0;
            // this.touchNode.bg.imgName = GConstant.towerQualityBg[0];
            // this.lv.setText([""]);
            // this.touchNode.bg.imgName = GConstant.towerQualityBg[0];
            this.quality.imgName = GConstant.towerQualityBg[0];
            this.light.imgName = GConstant.towerLightBg[0];
            return;
        }
        // this.node.opacity = 255;

        let tbl = this.playerEquipment.tbl();

        // this.touchNode.bg.imgName = GConstant.towerQualityBg[tbl.quality];
        this.quality.imgName = GConstant.towerQualityBg[tbl.quality];
        this.light.imgName = GConstant.towerLightBg[tbl.quality];
        let part = this.playerEquipment.tbl().part;
        this.icon.imgName = this.playerEquipment.tbl().img;

        this.bottonName.setText([this.playerEquipment.tbl().name]);
        this.level.setText(["_rslv." + this.playerEquipment.level]);
        this.level.node.color = GConstant.qualityColor[tbl.quality];

        this.lv.setText(["_rslv." + this.playerEquipment.level]);

        this.star.children.map((a, i) => {
            a.active = false;
            if (state.showStar - 1 >= i) {
                a.active = true;
            }
        });

        if (state.isContrast) {
            let lastPlayerEquipment: PlayerEquipment = GModel.playerEquipment.equipment[part];
            if (!lastPlayerEquipment) return;
            if (this.playerEquipment) {
                this.playerEquipment.propertyString().base.forEach((element, index) => {
                    let a = lastPlayerEquipment.propertyString().base.map((d) => {
                        if (d.property == element.property) return d;
                    });

                    if (a[0].property == element.property)
                        if (Number(element.value) > Number(a[0].value)) {
                            this.up.node.active = true;
                            this.up.imgName = "new_common_up";
                        }
                });
            }
        }
    }
}
