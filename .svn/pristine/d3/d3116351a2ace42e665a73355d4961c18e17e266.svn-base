import { autowired, message, registerClass } from "../../../framework/Decorator";
import UIButton from "../../../framework/ui/UIButton";
import UIImage from "../../../framework/ui/UIImage";
import UILabel from "../../../framework/ui/UILabel";
import UIScrollList from "../../../framework/ui/UIScrollList";
import UIWindow from "../../../framework/ui/UIWindow";
import WindowShop from "../common/WindowShop";
import ListItemMap from "./ListItemMap";
import WindowBossInfo from "./WindowBossInfo";
import WindowExploreIncome from "./WindowExploreIncome";
import EventName from "../../event/EventName";
import WindowBattleScene from "./WindowBattleScene";
import WindowMission from "../common/WindowMission";
import { GameDate } from "../../../framework/date/GameDate";

const { ccclass, property } = cc._decorator;

@registerClass("WindowBattleMap", {
    sceneWindow: {
        kind: "battle",
        openIndex: 1,
    },
})
@ccclass
export default class WindowBattleMap extends UIWindow {
    static _poolSize: number = 1;
    _windowParam: any;
    _returnValue: any;
    /**地图容器 */
    @autowired(UIScrollList) mapList: UIScrollList<ListItemMap> = null;
    /**返回按钮 */
    @autowired(UIButton) return: UIButton = null;
    /**折叠按钮 */
    @autowired(UIButton) collaspe: UIButton = null;
    /**折叠按钮箭头 */
    @autowired(UIImage) arrow: UIImage = null;
    /**挂机奖励红点 */
    @autowired(UIImage) chestExclamation: UIImage = null;
    /**挂机奖励按钮 */
    @autowired(UIButton) chest: UIButton = null;
    /**左侧 */
    @autowired(UIButton) missionbtn: UIButton = null;
    /**商店按钮 */
    @autowired(UIButton) shop: UIButton = null;
    /**查看掉落按钮 */
    @autowired(UIButton) dropped: UIButton = null;
    /**前往按钮 */
    @autowired(UIButton) goto: UIButton = null;
    /**地图信息 */
    @autowired(cc.Node) mapinfo: cc.Node = null;
    /**任务红点 */
    @autowired(UIImage) exclamation: UIImage = null;
    /**地图信息背景 */
    @autowired(UIImage) infobg: UIImage = null;
    /**地图信息内容 */
    @autowired(UIImage) info: UIImage = null;
    /**挂机时间 */
    @autowired(UILabel) time: UILabel = null;
    /**进度条 */
    @autowired(cc.ProgressBar) explore: cc.ProgressBar = null;
    /**当前选中地图名 */
    @autowired(UILabel) mapName: UILabel = null;
    /**挂机地图名 */
    @autowired(UILabel) mapName1: UILabel = null;
    /**挂机地图名 */
    @autowired(UILabel) wave: UILabel = null;
    /**声望 */
    @autowired(UILabel) reputation: UILabel = null;
    /**声望进度条 */
    @autowired(UIImage) progress: UIImage = null;
    /**是否折叠 */
    private collasped: boolean;
    /**选中的地图序号 */
    private chosenMap: number;

    protected onInited(): void {
        this.node.zIndex = -1;
        this.challenge();
        this.windowInit();
        this.refreshTime();
        this.schedule(this.refreshTime, 1);
        this.return.onClick = () => {
            GWindow.goToMain();
        };
        this.chest.onClick = () => {
            GWindow.open(WindowExploreIncome);
        };
        this.missionbtn.onClick = () => {
            GWindow.open(WindowMission);
        };
        this.collaspe.onClick = () => {
            if (!this.collasped) {
                this.collasped = true;
                GWindow.get(WindowBattleScene).moveDown();
                cc.tween(this.mapinfo).to(0.3, { y: -280 }).start();
                cc.tween(this.mapinfo.getChildByName("list").getChildByName("id_mapList"))
                    .to(0.3, { opacity: 0 })
                    .start();
                // cc.tween(this.infobg.node).to(0.3, { y: 255 }).start();
                this.arrow.node.scaleY = -1;
                // this.mapinfo.getChildByName("list").active = false;
            } else {
                this.collasped = false;
                GWindow.get(WindowBattleScene).moveUp();
                cc.tween(this.mapinfo).to(0.3, { y: 180 }).start();
                // cc.tween(this.infobg.node).to(0.3, { y: -266 }).start();
                cc.tween(this.mapinfo.getChildByName("list").getChildByName("id_mapList"))
                    .to(0.3, { opacity: 255 })
                    .start();
                this.arrow.node.scaleY = 1;
                // this.mapinfo.getChildByName("list").active = true;
            }
        };
        this.shop.onClick = () => {
            GWindow.open(WindowShop, { mapIndex: this.chosenMap });
        };
        this.dropped.onClick = () => {
            GWindow.open(WindowBossInfo, { mapIndex: this.chosenMap });
        };
        this.goto.onClick = async () => {
            await GModel.stage.changeAfkMap(this.chosenMap);
            this.windowInit();
        };
    }

    @message([EventName.stateKey.stageAfkMap])
    refreshWaveLabel() {
        let current = GModel.stage.getStageAfkMap();
        let stage = GModel.stage.getStageByMapIndex(current);
        this.wave.setText([GLang.code.ui.stage_number, "_rs" + stage.stageIndex]);
    }

    /**窗口初始化 */
    @message([EventName.stateKey.stage, EventName.stateKey.mainMission])
    windowInit() {
        this.exclamation.node.active =
            GModel.mission.isTaskComplete() || GModel.mission.mainMissionList().some((m) => m.getStateIndex() === 0);
        let current = GModel.stage.getStageAfkMap();
        let stage = GModel.stage.getStageByMapIndex(current);
        this.chosenMap = stage.mapIndex;
        let tbl = GTable.getList("StageMapTbl");
        this.mapName.setText([tbl[current - 1].name]);
        this.mapName1.setText([tbl[current - 1].name]);
        this.wave.setText([GLang.code.ui.stage_number, "_rs" + stage.stageIndex]);
        this.reputation.setText(["_rs" + stage.reputation]);
        if (stage.stageIndex == 0) {
            this.chest.node.active = false;
        } else {
            this.chest.node.active = true;
        }
        this.refreshMap();
    }
    @message([EventName.stateKey.stage])
    /**刷新地图 */
    refreshMap() {
        let tbl = GTable.getList("StageMapTbl");
        let state = tbl.map((t) => {
            let stage = GModel.stage.getStageByMapIndex(t.mapIndex);
            let cb = async () => {
                this.mapName.setText([tbl[t.mapIndex - 1].name]);
                this.reputation.setText(["_rs" + stage.reputation]);
                this.chosenMap = t.mapIndex;
                this.refreshMap();
                if (
                    t.mapIndex === 1 ||
                    GModel.stage.getAllStage().find((v) => v.mapIndex === t.mapIndex - 1 && v.stageIndex > t.unlock[1])
                ) {
                    await GModel.stage.changeAfkMap(this.chosenMap);
                } else {
                    GTip.showTip([GLang.code.ui.map_notfound]);
                }
            };
            return { mapIndex: t.mapIndex, cb: cb, selected: this.chosenMap == t.mapIndex };
        });
        this.mapList.setState(state);
    }
    /**挑战下一关 */
    @message([EventName.resetBattle])
    async challenge(nextStage?: boolean) {
        this.windowInit();
        await GModel.stage.challengeStage(nextStage);
    }

    refreshTime() {
        let now = GameDate.nowUpdated();
        let time = GModel.stage.getStageAfkBattleReward();
        this.chestExclamation.node.active = time.reward.length > 0;
        this.explore.progress = (now - time.beginStamp) / 1000 / (8 * 60 * 60);
        this.time.setText(["_rs" + GUtils.date.formatRemainTime(time.getAfkTime(), "hh:mm:ss")]);
    }
    protected onRecycle(): void {
        this.unscheduleAllCallbacks();
    }
}
