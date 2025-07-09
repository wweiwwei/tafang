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
import ListItemSelectProp from "../mainscene/ListItemSelectProp";
import WindowConfirmReplace from "../mainscene/WindowConfirmReplace";
import ListItemPropItem from "./ListItemPropItem";
import WindowDecomposeTips from "./WindowDecomposeTips";

const { ccclass, property } = cc._decorator;
@registerClass("WindowSelectProp", { preloadPrefab: ["ListItemSelectProp", "ListItemPropItem"] })
@ccclass
export default class WindowSelectProp extends UIWindow {
    static defaultOpentOption: Partial<WindowOpenOption> = {
        animation: WindowOpenAnimationEnum.no,
    };
    /**last部件内容 */
    @autowired(UIList) lastUIList: UIList<ListItemPropItem> = null;
    /**new部件内容 */
    @autowired(UIList) newUIList: UIList<ListItemPropItem> = null;
    /**关闭按钮 */
    @autowired(UIButton) closeBtn: UIButton = null;
    /**分解 */
    @autowired(UIButton) sellBtn: UIButton = null;
    /**替换 */
    @autowired(UIButton) replaceBtn: UIButton = null;
    /**last节点 */
    @autowired(cc.Node) lastRootNode: cc.Node = null;
    /**new节点 */
    @autowired(cc.Node) newRootNode: cc.Node = null;

    /**last name */
    @autowired(UILabel) lastName: UILabel = null;
    /**new name */
    @autowired(UILabel) newName: UILabel = null;
    /**last 等级 */
    @autowired(UILabel) lastLevel: UILabel = null;
    /**new 等级 */
    @autowired(UILabel) newLevel: UILabel = null;
    /**last 战力 */
    @autowired(UILabel) lastPower: UILabel = null;
    /**new 战力 */
    @autowired(UILabel) newPower: UILabel = null;
    /**new 战力 */
    @autowired(UIImage) newIcon: UIImage = null;

    /**last_left_label */
    @autowired(UIList) lastLeftLabelRoot: UIList<ListItemSelectProp> = null;
    /**last_right_label */
    @autowired(UIList) lastRightLabelRoot: UIList<ListItemSelectProp> = null;

    /**new_left_label */
    @autowired(UIList) newLeftLabelRoot: UIList<ListItemSelectProp> = null;
    /**new_right_label */
    @autowired(UIList) newRightLabelRoot: UIList<ListItemSelectProp> = null;
    /**替换后自动分解 */
    @autowired(UIButton) autoSellBtn: UIButton = null;

    @autowired(UILabel) lastBoxName: UILabel = null;
    @autowired(UILabel) lastBoxLv: UILabel = null;
    @autowired(UILabel) lastBoxTips: UILabel = null;

    @autowired(UILabel) newBoxName: UILabel = null;
    @autowired(UILabel) newBoxLv: UILabel = null;
    @autowired(UILabel) newBoxTips: UILabel = null;
    /** 左侧选择列表 */
    @autowired(UIList) leftList: UIList<ListItemPropItem> = null;

    private tempIndex: number = 0;

    _windowParam: any;
    _returnValue: any;

    even() {
        this.autoSellBtn.onClick = () => {
            this.onAutoSell();
        };

        this.closeBtn.setTransition(false);
        this.closeBtn.onClick = () => {
            this.close();
        };

        this.sellBtn.onClick = async () => {
            this.onSellBtn();
        };
        this.replaceBtn.onClick = () => {
            this.onReplaceBtn();
        };
    }

    protected onInited(): void {
        GModel.weakGuide.changeEquipmentWindowOpen();
        this.ISAutoSell = GModel.localStorage.autoSell;
        this.autoSellBtn.bg.node.active = this.ISAutoSell;
        this.even();
        this.initUi();
    }
    @message([EventName.stateKey.tempEquipment, EventName.stateKey.playerEquipment])
    initUi() {
        if (GModel.playerEquipment.temp().length === 0) return;
        const temp = GModel.playerEquipment.temp();
        if (this.tempIndex >= temp.length) {
            this.tempIndex = 0;
        }
        this.leftList.setState(
            temp.map((e, i) => {
                return {
                    playerEquipment: e,
                    showQuality: true,
                    clickCB: () => {
                        this.tempIndex = i;
                        this.initUi();
                    },
                };
            })
        );
        this.showEquipment();
        this.shwoTemp();
    }

    private getPart() {
        const temp = GModel.playerEquipment.temp();
        return temp[this.tempIndex].tbl().part;
    }

    /**展示装备 */
    showEquipment() {
        let e: PlayerEquipment = GModel.playerEquipment.equipment()[this.getPart()];

        if (!e) {
            this.leftList.node.y = -20;
            this.lastRootNode.active = false;
            this.sellBtn.node.active = false;
            this.autoSellBtn.node.parent.active = false;
            this.replaceBtn.text.setText(["_rs装备"]);
            return;
        } else {
            this.leftList.node.y = 0;
            this.autoSellBtn.node.parent.active = true;
            this.sellBtn.node.active = true;
            this.replaceBtn.text.setText(["_rs替换"]);
            this.lastRootNode.active = true;
        }

        this.lastUIList.setState([
            {
                playerEquipment: e,
                showQuality: true,
                // showBottonName: true,
            },
        ]);
        this.lastName.setText(["_rs["], ["ui/quality_label_" + e.tbl().quality], ["_rs]"], [e.tbl().name]);
        this.lastName.node.color = GConstant.equipQuality[e.tbl().quality];

        this.lastLevel.setText(["_rslv." + e.level]);
        this.lastPower.setText([GLang.code.ui.hero_power], ["_rs:" + e.bp()]);

        let state1 = e.propertyString().base.map((element, index) => {
            return { left: GIndex.battle.propertyText(element.property), right: "_rs" + element.value };
        });
        this.lastLeftLabelRoot.setState(state1);

        let state2 = e.propertyString().stat.map((element, index) => {
            return {
                left: GIndex.battle.propertyText(element.property),
                right: "_rs" + element.value,
                tips: GIndex.battle.propertyDesc(element.property),
            };
        });
        this.lastRightLabelRoot.setState(state2);

        let tbl = GTable.getById(
            "PlayerSkillTalentTbl",
            GModel.playerEquipment.equipment()[this.getPart()].tbl().skillTalent
        );
        this.lastBoxName.setText(["_rs天赋技能:"], [tbl.name]);
        this.lastBoxTips.setText([tbl.description]);
    }

    /**展示临时装备 */
    shwoTemp() {
        let e = GModel.playerEquipment.temp()[this.tempIndex];

        let lastPE = GModel.playerEquipment.equipment()[this.getPart()];
        this.newUIList.setState([
            {
                playerEquipment: e,
                showQuality: true,
                // showBottonName: true,
            },
        ]);
        this.newName.setText(["_rs["], ["ui/quality_label_" + e.tbl().quality], ["_rs]"], [e.tbl().name]);
        this.newName.node.color = GConstant.equipQuality[e.tbl().quality];

        this.newLevel.setText(["_rslv." + e.level]);
        this.newPower.setText([GLang.code.ui.hero_power], ["_rs:" + e.bp()]);
        this.newIcon.imgName = "";
        if (lastPE) {
            this.newIcon.imgName =
                lastPE.bp() === e.bp() ? "" : lastPE.bp() > e.bp() ? "new_common_down" : "new_common_up";
        }

        let state1 = e.propertyString().base.map((element, index) => {
            let imgName = "";
            if (lastPE) {
                let a = lastPE.propertyString().base.find((d) => d.property == element.property);
                if (a) {
                    if (Number(element.value) == Number(a.value)) {
                        imgName = "";
                    } else {
                        let b = Number(element.value) > Number(a.value);
                        imgName = b ? "new_common_up" : "new_common_down";
                    }
                } else {
                    imgName = "new_common_new";
                }
            }
            return {
                left: GIndex.battle.propertyText(element.property),
                right: "_rs" + element.value,
                iconStr: imgName,
            };
        });
        this.newLeftLabelRoot.setState(state1);

        let state2 = e.propertyString().stat.map((element, index) => {
            let imgName = "";
            if (lastPE) {
                let a = lastPE.propertyString().stat.find((d) => d.property == element.property);
                if (a) {
                    if (Number(element.value) == Number(a.value)) {
                        imgName = "";
                    } else {
                        let b = Number(element.value) > Number(a.value);
                        imgName = b ? "new_common_up" : "new_common_down";
                    }
                } else {
                    imgName = "new_common_new";
                }
            } else {
                imgName = "new_common_new";
            }
            return {
                left: GIndex.battle.propertyText(element.property),
                right: "_rs" + element.value,
                iconStr: imgName,
                tips: GIndex.battle.propertyDesc(element.property),
            };
        });
        this.newRightLabelRoot.setState(state2);

        let tbl = GTable.getById("PlayerSkillTalentTbl", e.tbl().skillTalent);
        this.newBoxName.setText(["_rs天赋技能:"], [tbl.name]);
        this.newBoxTips.setText([tbl.description]);
    }

    private ISAutoSell: boolean = false;
    //切换自动分解
    onAutoSell() {
        this.ISAutoSell = !this.ISAutoSell;
        GModel.localStorage.autoSell = this.ISAutoSell;
        this.autoSellBtn.bg.node.active = this.ISAutoSell;
    }

    async onSellBtn() {
        const now = GModel.playerEquipment.equipment()[this.getPart()];
        const next = GModel.playerEquipment.temp()[this.tempIndex];
        if (now && next.bp() > now.bp()) {
            const data = await GWindow.open(WindowConfirmReplace, { tips: GLang.code.ui.confirm_decompose1 });
            if (data) {
                if (!data.change) return;
            }
        }
        await GModel.playerEquipment.sell(this.tempIndex);
        this.actionEnd();
    }

    async onReplaceBtn() {
        if (this.ISAutoSell) {
            const now = GModel.playerEquipment.equipment()[this.getPart()];
            const next = GModel.playerEquipment.temp()[this.tempIndex];
            if (now && next.bp() < now.bp()) {
                const data = await GWindow.open(WindowConfirmReplace, { tips: GLang.code.ui.confirm_decompose });
                if (!data.change) {
                    return;
                }
            }
        }
        const next = GModel.playerEquipment.temp()[this.tempIndex];
        await GModel.playerEquipment.replace(this.tempIndex, this.ISAutoSell, this.getPart());
        if (!next) {
            this.actionEnd();
            return;
        }

        if (this.ISAutoSell) {
            this.actionEnd();
        }
    }

    /** 玩家动作结束，如果临时装备都没了，关闭窗口，否则刷新窗口 */
    actionEnd() {
        if (GModel.playerEquipment.temp().length === 0) {
            this.close();
        } else {
            this.initUi();
        }
    }
}
