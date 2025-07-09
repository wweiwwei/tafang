import { autowired, message, registerClass } from "../../../framework/Decorator";
import { WindowOpenAnimationEnum, WindowOpenOption } from "../../../framework/ui/GWindow";
import UIButton from "../../../framework/ui/UIButton";
import UIImage from "../../../framework/ui/UIImage";
import UILabel from "../../../framework/ui/UILabel";
import UIList from "../../../framework/ui/UIList";
import UIScrollList from "../../../framework/ui/UIScrollList";
import UIWindow from "../../../framework/ui/UIWindow";
import { PlayerEquipment } from "../../entity/PlayerEquipment";
import EventName from "../../event/EventName";
import ListItemEquipTalent from "../common/ListItemEquipTalent";
import WindowPropGoWar from "../mainscene/WindowPropGoWar";
import WindowPropSwitemDetails from "../mainscene/WindowPropSwitemDetails";
import ListItemPropItem from "../mainsceneNew/ListItemPropItem";
import ListItemPropDetailsProperty from "./ListItemPropDetailsProperty";
import WindowPropHandbook from "./WindowPropHandbook";

const { ccclass, property } = cc._decorator;
@registerClass("WindowPropDetails", {
    preloadPrefab: ["ListItemPropDetailsProperty", "ListItemPropItem", "ListItemEquipTalent"],
})
@ccclass
export default class WindowPropDetails extends UIWindow {
    static defaultOpentOption: Partial<WindowOpenOption> = {
        animation: WindowOpenAnimationEnum.default,
    };

    /**last部件内容 */
    @autowired(UIList) uiList: UIList<ListItemPropItem> = null;
    /**关闭按钮 */
    @autowired(UIButton) closeBtn: UIButton = null;
    /**更换天赋 */
    @autowired(UIButton) replaceTalent: UIButton = null;
    /**出战 */
    @autowired(UIButton) fightView: UIButton = null;
    /**标题 */
    @autowired(UILabel) title: UILabel = null;
    /**标题+ 属性*/
    @autowired(UILabel) titleAddText: UILabel = null;

    /**类型 */
    @autowired(UILabel) typeText: UILabel = null;
    @autowired(UILabel) level: UILabel = null;
    @autowired(UILabel) notalent: UILabel = null;

    /**属性1 */
    @autowired(UILabel) box1Lab1: UILabel = null;
    /**属性2 */
    @autowired(UILabel) box1Lab2: UILabel = null;
    /**属性3 */
    @autowired(UILabel) box1Lab3: UILabel = null;
    /**属性4 */
    @autowired(UILabel) box1Lab4: UILabel = null;
    /**属性5 */
    @autowired(UILabel) box1Lab5: UILabel = null;
    /**属性6 */
    @autowired(UILabel) box1Lab6: UILabel = null;

    /**属性1 */
    @autowired(UILabel) box2Lab1: UILabel = null;
    /**属性2 */
    @autowired(UILabel) box2Lab2: UILabel = null;
    /**属性3 */
    @autowired(UILabel) box2Lab3: UILabel = null;
    /**属性4 */
    @autowired(UILabel) box2Lab4: UILabel = null;
    /**属性5 */
    @autowired(UILabel) box2Lab5: UILabel = null;
    /**属性6 */
    @autowired(UILabel) box2Lab6: UILabel = null;

    /**技能名称 */
    @autowired(UIList) skills: UIList<ListItemEquipTalent> = null;

    /**图鉴提示 */
    @autowired(UIImage) handbookTips: UIImage = null;
    @autowired(UIImage) tip: UIImage = null;

    @autowired(UIList) propertyList1: UIList<ListItemPropDetailsProperty> = null;
    @autowired(UIList) propertyList2: UIList<ListItemPropDetailsProperty> = null;

    /**左边 */
    @autowired(UIButton) leftBtn: UIButton = null;
    @autowired(UIButton) rightBtn: UIButton = null;

    private playerEquipment: PlayerEquipment = null;

    _windowParam: {
        /** 装备下标 */
        part: number;
    };
    _returnValue: any;

    protected onInited(): void {
        this.playerEquipment = GModel.playerEquipment.equipment()[this._windowParam.part];
        this.even();
        this.showEquipment();
        this.refBtn();
        this.initBox();
        this.showHandbookTips();
        this.initSX();
    }

    initSX() {
        let towerProperty = GModel.playerEquipment.towerProperty(this._windowParam.part);

        let arr2 = towerProperty.filter(
            (d) => d.property != "normalAttackInterval" && d.property != "normalAttackRange" && d.property != "extend"
        );

        let map = new Map();
        towerProperty.forEach((d) => {
            map.set(d.property, d);
        });

        let a1 = map.get("normalAttackRange");
        this.box1Lab1.setText([GIndex.battle.propertyText(a1.property)]);
        this.box1Lab2.setText(["_rs" + a1.value]);
        let a2 = map.get("normalAttackInterval");
        this.box1Lab3.setText(["ui/property_normalAttackInterval"]);
        this.box1Lab4.setText(["_rs" + a2.value]);
        let a3 = map.get("extend");
        this.box1Lab5.setText(["ui/property_extend"]);
        this.box1Lab6.setText(["_rs" + a3.value]);
        // console.log(arr2);

        this.propertyList1.setState(
            arr2.slice(0, 3).map((d, index) => {
                // console.log("aaa =", GIndex.battle.propertyText(d.property));
                return {
                    text1: GIndex.battle.propertyText(d.property),
                    text2: "_rs:" + (d.value ? d.value : "0"),
                    text3: "_rs",
                    //  + (d.placeValue ? d.placeValue + "" : "0"),
                };
            })
        );

        this.propertyList2.setState(
            arr2.slice(3).map((d, index) => {
                // console.log("aaa =", GIndex.battle.propertyText(d.property));
                return {
                    text1: GIndex.battle.propertyText(d.property),
                    text2: "_rs:" + (d.value ? d.value : "0"),
                    text3: "_rs",
                    // + (d.placeValue ? d.placeValue + "" : "0"),
                    des: GIndex.battle.propertyDesc(d.property),
                };
            })
        );
    }

    @message([EventName.stateKey.equipmentCollection, EventName.stateKey.towerTalent])
    showHandbookTips() {
        let data = GModel.defendTower.getColletionData(this._windowParam.part).find((d) => d.state == "canActive");
        this.handbookTips.node.active = data
            ? GModel.player.checkSystemUnlock(GIndex.id.systemId.handbook, false)
            : false;
        this.tip.node.active = GModel.defendTower
            .getTowerTalentData(this._windowParam.part)
            .some((d) => d.state === "canActive" || d.state === "canUpgrade");
    }

    @message([EventName.stateKey.towerTalent])
    initBox() {
        let list = GModel.defendTower.getTowerTalentData(this._windowParam.part);
        let arr = list.filter((d) => d.state == "hasActive" || d.state === "canUpgrade");
        this.notalent.node.active = arr.length <= 0;
        this.skills.setState(
            arr.map((t) => {
                return { talentId: t.talentId };
            })
        );
    }

    analysis(...str: string[][]) {
        return str
            .map((keys) => keys.join("[sp]"))
            .join("[key]")
            .split("[key]")
            .map((k) => GLang.getText(k))
            .join("");
    }

    even() {
        this.closeBtn.onClick = () => {
            this.close();
        };
        this.closeBtn.setTransition(false);
        this.replaceTalent.onClick = () => {
            this.onReplaceTalent();
        };
        this.fightView.onClick = () => {
            this.onFightView();
        };

        this.leftBtn.onClick = () => {
            this.onLeft();
        };
        this.rightBtn.onClick = () => {
            this.onRight();
        };
    }

    onLeft() {
        let arr = GModel.playerEquipment.equipment().filter((d) => {
            if (d) return d;
        });
        this._windowParam.part--;
        if (this._windowParam.part < 0) {
            if (arr.length > 1 && arr[arr.length - 1]) this._windowParam.part = arr[arr.length - 1].tbl().part;
            else this._windowParam.part = arr[0].tbl().part;
        }
        this.playerEquipment = GModel.playerEquipment.equipment()[this._windowParam.part];
        if (!this.playerEquipment) {
            this.onLeft();
            return;
        }

        this.showEquipment();
        this.refBtn();
        this.initBox();
        this.showHandbookTips();
        this.initSX();
    }

    onRight() {
        let arr = GModel.playerEquipment.equipment();
        this._windowParam.part++;
        if (this._windowParam.part >= arr.length) {
            this._windowParam.part = arr[0].tbl().part;
        }
        this.playerEquipment = GModel.playerEquipment.equipment()[this._windowParam.part];
        if (!this.playerEquipment) {
            this.onRight();
            return;
        }

        this.showEquipment();
        this.refBtn();
        this.initBox();
        this.showHandbookTips();
        this.initSX();
    }

    /**展示新装备 */
    @message([EventName.refreshEquipmentInfo, EventName.stateKey.playerEquipment])
    showEquipment() {
        let part = this.playerEquipment.tbl().part;
        let e: PlayerEquipment = GModel.playerEquipment.equipment()[part];

        this.uiList.setState([
            {
                playerEquipment: e,
                clickCB: () => {
                    if (GModel.player.checkSystemUnlock(GIndex.id.systemId.handbook, true))
                        GWindow.open(WindowPropHandbook, { part: this._windowParam.part });
                },
                showQuality: true,
            },
        ]);
        this.title.setText(["_rs["], ["ui/quality_label_" + e.tbl().quality], ["_rs]"], [e.tbl().name]);
        this.title.node.color = GConstant.equipQuality[e.tbl().quality];
        this.titleAddText.setText(["_rs+" + GModel.playerEquipment.getTowerPlace()[this._windowParam.part].level]);
        this.titleAddText.node.color = this.title.node.color;
        this.level.setText(["_rslv." + this.playerEquipment.level]);

        this.typeText.setText([e.tbl().type]);
    }

    refBtn() {
        if (GModel.defendTower.getTowerFormation().includes(this._windowParam.part)) {
            this.fightView.text.setText(["_rs已出战"]);
        } else {
            this.fightView.text.setText(["_rs出战"]);
        }
    }

    onReplaceTalent() {
        GWindow.open(WindowPropSwitemDetails, { part: this._windowParam.part });
    }

    onFightView() {
        if (GModel.defendTower.getTowerFormation().includes(this._windowParam.part)) {
            GTip.showTip([GLang.code.ui.fightViewTips]);
            return;
        }
        GWindow.open(WindowPropGoWar, { part: this._windowParam.part });
    }
}
