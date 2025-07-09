import { autowired, message, registerClass } from "../../../framework/Decorator";
import UIButton from "../../../framework/ui/UIButton";
import UILabel from "../../../framework/ui/UILabel";
import UIScrollList from "../../../framework/ui/UIScrollList";
import UIWindow from "../../../framework/ui/UIWindow";
import { WindowOpenAnimationEnum, WindowOpenOption } from "../../../framework/ui/GWindow";
import Item from "../../entity/Item";
import EventName from "../../event/EventName";
import ListItemMissionItem from "./ListItemMissionItem";
import WindowChestReward from "./WindowChestReward";
import UIList from "../../../framework/ui/UIList";
import ListItemDailyChest from "./ListItemDailyChest";

const { ccclass, property } = cc._decorator;
@registerClass("WindowMission")
@ccclass
export default class WindowMission extends UIWindow {
    static defaultOpentOption: Partial<WindowOpenOption> = {
        animation: WindowOpenAnimationEnum.default,
    };
    _windowParam: any;
    _returnValue: any;
    /**目标进度条 */
    @autowired(cc.ProgressBar) progress: cc.ProgressBar = null;
    /**目标进度 */
    @autowired(UILabel) progressLabel: UILabel = null;
    @autowired(UILabel) dailyProgressLabel: UILabel = null;
    /**宝箱 */
    @autowired(UIButton) chest: UIButton = null;
    /**任务列表 */
    @autowired(UIScrollList) missionList: UIScrollList<ListItemMissionItem> = null;
    @autowired(UIButton) closeBtn: UIButton = null;
    /**成就 */
    @autowired(UIButton) achieveBtn: UIButton = null;
    /**日常 */
    @autowired(UIButton) dailyBtn: UIButton = null;
    /**日常任务进度条 */

    @autowired(cc.ProgressBar) dailyProgress: cc.ProgressBar = null;
    /**日常任务宝箱 */
    @autowired(UIButton) dailyChest: UIButton = null;
    /** 日常listitem*/
    @autowired(UIList) dChest: UIList<ListItemDailyChest> = null;
    protected onInited(): void {
        this.closeBtn.onClick = () => {
            this.close();
        };
        this.windowInit();
        this.refreshMission();
    }
    @message([EventName.stateKey.mainMissionTask])
    /**初始化界面 */
    windowInit() {
        if (GModel.mission.taskInfo().progress >= GModel.mission.taskInfo().require) {
            this.chest.onClick = async () => {
                const reward = await GModel.mission.obtainTaskReward();
                reward.forEach((t) => {
                    GTip.showRewardItem(t);
                    GTip.showFlyReward(this.chest.node.convertToWorldSpaceAR(cc.v2()), t);
                });

                this.chest.node.getComponent(cc.Animation).setCurrentTime(0, "WindowMissionChest_Ani");
                this.chest.node.getComponent(cc.Animation).stop();
            };
        } else {
            this.chest.onClick = () => {
                GWindow.open(WindowChestReward, { reward: GModel.mission.getTaskreward() });
            };
        }
        this.progressLabel.setText([
            "_rs" + GModel.mission.taskInfo().progress + "/" + GModel.mission.taskInfo().require,
        ]);

        this.progress.progress = GModel.mission.taskInfo().progress / GModel.mission.taskInfo().require;
        GModel.mission.taskInfo().progress >= GModel.mission.taskInfo().require &&
            this.chest.node.getComponent(cc.Animation).play();

        /**日常和成就切换 */
        this.dailyBtn.onClick = () => {
            this.progress.node.active = false;
            this.chest.node.active = false;
            this.dailyChest.node.active = true;
            this.dailyProgress.node.active = true;
            this.dChest.node.active = true;
        };

        this.achieveBtn.onClick = () => {
            this.progress.node.active = true;
            this.chest.node.active = true;
            this.dailyChest.node.active = false;
            this.dailyProgress.node.active = false;
            this.dChest.node.active = false;
        };
        //改
        if (this.dailyChest) {
            const state: ListItemDailyChest["state"][] = [];
            for (let i = 0; i < 5; i++) {
                const isGray = true;
                state.push({ isGray });
            }
            this.dChest.setState(state);
        }
    }
    @message([EventName.stateKey.mainMission])
    /**刷新任务列表 */
    refreshMission() {
        let state = GModel.mission.mainMissionList().map((t) => {
            return { mission: t };
        });
        this.missionList.setState(state);
    }
}
