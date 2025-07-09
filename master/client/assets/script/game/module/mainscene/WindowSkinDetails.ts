import { autowired, message, registerClass } from "../../../framework/Decorator";
import { WindowOpenAnimationEnum, WindowOpenOption } from "../../../framework/ui/GWindow";
import UIButton from "../../../framework/ui/UIButton";
import UILabel from "../../../framework/ui/UILabel";
import UIList from "../../../framework/ui/UIList";
import UISpine from "../../../framework/ui/UISpine";
import UIWindow from "../../../framework/ui/UIWindow";
import EventName from "../../event/EventName";
import ListItemPlayer from "../battle/core/ListItemPlayer";

const { ccclass, property } = cc._decorator;
@registerClass("WindowSkinDetails")
@ccclass
export default class WindowSkinDetails extends UIWindow {
    static defaultOpentOption: Partial<WindowOpenOption> = {
        animation: WindowOpenAnimationEnum.default,
    };
    _windowParam: { mountId?: number; skinId?: number };
    _returnValue: any;
    @autowired(UIButton) closeBtn: UIButton = null;
    /**英雄 */
    @autowired(UISpine) heroSpine: UISpine = null;
    /**坐骑 */
    @autowired(UISpine) mountSpine: UISpine = null;
    @autowired(UILabel) name1: UILabel = null;
    @autowired(UILabel) desc: UILabel = null;
    @autowired(UILabel) progerty1: UILabel = null;
    @autowired(UILabel) progerty2: UILabel = null;
    @autowired(UIButton) useBtn: UIButton = null;
    @autowired(UIList) player: UIList<ListItemPlayer> = null;

    protected onInited(): void {
        if (this._windowParam.skinId) {
            let tbl: PlayerSkinTbl = GTable.getById("PlayerSkinTbl", this._windowParam.skinId);
            this.name1.setText([tbl.skillName]);
            this.desc.setText([tbl.skillDescription]);
            this.progerty1.setText(...this.getProgerty(true).p1);
            this.progerty2.setText(...this.getProgerty(true).p2);
            this.useBtn.node.active =
                GModel.mountAndSkin.hasSkin(this._windowParam.skinId) &&
                !(GModel.mountAndSkin.currentSkin() == this._windowParam.skinId);
            this.useBtn.onClick = () => {
                GModel.mountAndSkin.changeSkin(this._windowParam.skinId);
                this.close();
            };
        } else {
            let tbl: PlayerMountTbl = GTable.getById("PlayerMountTbl", this._windowParam.mountId);
            this.name1.setText([tbl.skillName]);
            this.desc.setText([tbl.skillDescription]);
            this.progerty1.setText(...this.getProgerty(false).p1);
            this.progerty2.setText(...this.getProgerty(false).p2);
            this.useBtn.node.active =
                GModel.mountAndSkin.hasMount(this._windowParam.mountId) &&
                !(GModel.mountAndSkin.currentMount() == this._windowParam.mountId);
            this.useBtn.onClick = () => {
                GModel.mountAndSkin.changeMount(this._windowParam.mountId);
                this.close();
            };
        }

        this.closeBtn.setTransition(false);
        this.closeBtn.onClick = () => {
            this.close();
        };
        this.refreshPlayer();
    }

    @message([EventName.stateKey.skinCurrent, EventName.stateKey.mountCurrent, EventName.stateKey.fossilData])
    refreshPlayer() {
        let tbl1: PlayerSkinTbl = GTable.getById("PlayerSkinTbl", this._windowParam.skinId);
        let tbl2: PlayerMountTbl = GTable.getById("PlayerMountTbl", this._windowParam.mountId);
        if (tbl1) {
            this.player.setState([{ skinId: tbl1.id }]);
        } else if (tbl2) {
            this.player.setState([{ mountId: tbl2.id }]);
        }
    }
    getProgerty(isSkin) {
        let tbl: PlayerSkinTbl | PlayerMountTbl = null;
        let arr1: string[][] = [];
        let arr2: string[][] = [];

        if (isSkin) {
            tbl = GTable.getById("PlayerSkinTbl", this._windowParam.skinId);
        } else {
            tbl = GTable.getById("PlayerMountTbl", this._windowParam.mountId);
        }

        arr1.push(["_rs技能加成："]);
        tbl.formateProperty.forEach((p, index) => {
            arr1.push([GIndex.battle.propertyText(p[0])]);
            let m = tbl.formateProperty.length - 1 == index ? "。" : "，";
            arr1.push(["_rs+" + GIndex.battle.propertyShowMethod(p[0])(Number(p[1])) + m]);
        });

        arr2.push(["_rs\n拥有效果："]);
        tbl.property.forEach((p, index) => {
            arr2.push([GIndex.battle.propertyText(p[0])]);
            let m = tbl.property.length - 1 == index ? "。" : "，";
            arr2.push(["_rs+" + GIndex.battle.propertyShowMethod(p[0])(Number(p[1])) + m]);
        });

        return { p1: arr1, p2: arr2 };
    }
}
