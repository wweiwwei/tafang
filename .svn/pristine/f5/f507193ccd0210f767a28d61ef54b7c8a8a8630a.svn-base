import { autowired, message, registerClass } from "../../../framework/Decorator";
import { WindowOpenAnimationEnum, WindowOpenOption } from "../../../framework/ui/GWindow";
import UIButton from "../../../framework/ui/UIButton";
import UIImage from "../../../framework/ui/UIImage";
import UILabel from "../../../framework/ui/UILabel";
import UIWindow from "../../../framework/ui/UIWindow";
import EventName from "../../event/EventName";
import WindowCommonConfirm from "../common/WindowCommonConfirm";
import WindowBuyStaff from "./WindowBuyStaff";
import WindowFireBallDescription from "./WindowFireBallDescription";

const { ccclass, property } = cc._decorator;
@registerClass("WindowFireBall")
@ccclass
export default class WindowFireBall extends UIWindow {
    static defaultOpentOption: Partial<WindowOpenOption> = {
        animation: WindowOpenAnimationEnum.default,
    };
    @autowired(UILabel) time: UILabel = null;
    @autowired(UIButton) closeBtn: UIButton = null;
    @autowired(UIButton) first: UIButton = null;
    @autowired(UIButton) second: UIButton = null;
    @autowired(UIButton) third: UIButton = null;
    @autowired(UIButton) add1: UIButton = null;
    @autowired(UIButton) add2: UIButton = null;
    @autowired(UIButton) add3: UIButton = null;
    @autowired(UIButton) confirm1: UIButton = null;
    @autowired(UIButton) confirm2: UIButton = null;
    @autowired(UIButton) confirm3: UIButton = null;
    @autowired(UIButton) exclamation1: UIButton = null;
    @autowired(UIButton) exclamation2: UIButton = null;
    @autowired(UIButton) exclamation3: UIButton = null;
    _windowParam: any;
    _returnValue: any;
    private index = 0;
    protected onInited(): void {
        let tbl = GTable.getList("MagicStaffTbl");
        let curStaff = tbl.findIndex((i) => i.id === GModel.battle.currentMagicStaffId());
        curStaff !== -1 && (this.index = curStaff);
        this.timeInit();
        this.schedule(this.timeInit, 1);
        this.timeInit();
        this.staffInit();
    }
    timeInit() {
        this.time.setText(["_rs" + GModel.battle.getRemainTime()]);
    }
    @message([EventName.stateKey.storage])
    staffInit() {
        let tbl = GTable.getList("MagicStaffTbl");
        let arr = [this.first, this.second, this.third];
        let addarr = [this.add1, this.add2, this.add3];
        let confirmarr = [this.confirm1, this.confirm2, this.confirm3];
        let exclamations = [this.exclamation1, this.exclamation2, this.exclamation3];
        this.closeBtn.onClick = () => {
            this.close();
        };
        exclamations.forEach((v, i) => {
            v.onClick = () => {
                GWindow.open(WindowFireBallDescription, { id: tbl[i].id });
            };
        });
        arr.forEach((v, i) => {
            let systemId = tbl[i].systemId;
            let systbl = GTable.getById("SystemUnlockTbl", systemId);
            let locked = v.node.getChildByName("locked");
            locked.active = !GModel.player.checkSystemUnlock(systemId, false);
            locked
                .getChildByName("label")
                .getComponent(UILabel)
                .setText([
                    GLang.code.ui.map_condition,
                    GTable.getList("StageMapTbl").find((t) => t.mapIndex === systbl.condition[1]).name,
                    "_rs" + systbl.condition[2],
                ]);
            v.text.node.active = GModel.player.checkSystemUnlock(systemId, false);
            v.text.setText(["_rsx" + GUtils.ui.getNumberString(GModel.knapsack.getStorageById(tbl[i].id), 1)]);
            v.bg.node.active = this.index === i;
            confirmarr[i].node.active = this.index === i;
            v.onClick = () => {
                if (GModel.player.checkSystemUnlock(systemId, true)) {
                    this.index = i;
                    this.staffInit();
                }
            };
        });
        addarr.forEach((v, i) => {
            let systemId = tbl[i].systemId;
            v.node.active = GModel.player.checkSystemUnlock(systemId, false);
            v.onClick = () => {
                this.index = i;
                this.staffInit();
                GWindow.open(WindowBuyStaff, { id: tbl[i].id });
            };
        });
        confirmarr.forEach((v, i) => {
            v.onClick = async () => {
                if (GModel.battle.currentMagicStaffId() === tbl[i].id || GModel.battle.getRemainTime() === "00:00:00") {
                    await GModel.battle.useMagicStaff(tbl[i].id, 1);
                } else {
                    const confirm = await GWindow.open(WindowCommonConfirm, { tip: [GLang.code.ui.staff_change_tip] });
                    if (confirm) {
                        await GModel.battle.useMagicStaff(tbl[i].id, 1);
                    }
                }
                this.timeInit();
            };
        });
    }
    protected onRecycle(): void {
        this.unscheduleAllCallbacks();
    }
}
