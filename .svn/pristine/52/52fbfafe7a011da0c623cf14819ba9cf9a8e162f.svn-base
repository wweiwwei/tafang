import { autowired, message, registerClass } from "../../../framework/Decorator";
import UIButton from "../../../framework/ui/UIButton";
import UIImage from "../../../framework/ui/UIImage";
import UILabel from "../../../framework/ui/UILabel";
import UIList from "../../../framework/ui/UIList";
import UIListItem from "../../../framework/ui/UIListItem";
import UISpine from "../../../framework/ui/UISpine";
import { FriendInfo } from "../../entity/FriendInfo";
import Item from "../../entity/Item";
import Mission from "../../entity/Mission";
import EventName from "../../event/EventName";
import ListItemItem from "../common/ListItemItem";
import WindowCongratulation from "../common/WindowCongratulation";
import WindowBanquet from "./WindowBanquet";
import WindowBanquetMission from "./WindowBanquetMission";

const { ccclass } = cc._decorator;
@registerClass("ListItemBanquetMission")
@ccclass
export default class ListItemBanquetMission extends UIListItem {
    /**奖励 */
    @autowired(UIList) uiList: UIList<ListItemItem> = null;
    @autowired(cc.ProgressBar) progress: cc.ProgressBar = null;
    /**完成图标 */
    @autowired(UILabel) progressLab: UILabel = null;
    /**任务名称 */
    @autowired(UILabel) nameLab: UILabel = null;
    /**完成图标 */
    @autowired(UIImage) wcIcon: UIImage = null;
    /**前往按钮 */
    @autowired(UIButton) qwBtn: UIButton = null;

    private mission: Mission = null;
    state: {
        id: number;
        // closeBtn: Function;
    };
    setState(state: this["state"]): void {
        this.state = state;
        let tbl = GTable.getById("BanquetMissionTbl", this.state.id);
        this.mission = GModel.banquet.getMissionList(tbl.day).find((m) => {
            if (m.id == tbl.id) return m;
        });

        this.refMission();

        let a = Item.fromItemArray(tbl.reward).map((a) => {
            return { item: a, status: 0 };
        });
        this.uiList.setState(a);
    }

    @message([EventName.stateKey.banquetMission])
    refMission() {
        this.nameLab.setText(...this.mission.getDescription());

        this.progress.progress = this.mission.progress / this.mission.getRequire();
        this.progressLab.setText(["_rs" + this.mission.progress + "/" + this.mission.getRequire()]);

        if (this.mission.progress >= this.mission.getRequire()) {
            this.qwBtn.text.setText([GLang.code.ui.banquet_lq]);
            this.qwBtn.onClick = async () => {
                if (this.mission.getState() == "complete") {
                    let reward = await GModel.banquet.obtainMissionReward(this.mission.id);
                    if (reward.length > 0) GWindow.open(WindowCongratulation, { items: reward });
                }
            };
        } else {
            this.qwBtn.text.setText(["_rs前往"]);
            this.qwBtn.onClick = () => {
                this.mission.goto();
                // if (state.closeBtn) state.closeBtn();
                GWindow.close(WindowBanquetMission);
                GWindow.close(WindowBanquet);
            };
        }

        if (this.mission.getState() == "complete") {
            this.qwBtn.node.active = false;
            this.uiList.node.active = false;
            this.wcIcon.node.active = true;
        } else {
            this.qwBtn.node.active = true;
            this.uiList.node.active = true;
            this.wcIcon.node.active = false;
        }
    }
}
