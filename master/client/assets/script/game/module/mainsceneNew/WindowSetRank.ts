import { autowired, message, registerClass } from "../../../framework/Decorator";
import { GameDate } from "../../../framework/date/GameDate";
import { WindowOpenAnimationEnum, WindowOpenOption } from "../../../framework/ui/GWindow";
import UIButton from "../../../framework/ui/UIButton";
import UILabel from "../../../framework/ui/UILabel";
import UIList from "../../../framework/ui/UIList";
import UIWindow from "../../../framework/ui/UIWindow";
import { DateUtil } from "../../../framework/utils/DateUtils";
import EventName from "../../event/EventName";
import ListItemCost from "../hero/ListItemCost";
import ListItemPropItem from "./ListItemPropItem";

const { ccclass, property } = cc._decorator;
@registerClass("WindowSetRank")
@ccclass
export default class WindowSetRank extends UIWindow {
    _windowParam: any;
    _returnValue: any;
    static defaultOpentOption: Partial<WindowOpenOption> = {
        animation: WindowOpenAnimationEnum.default,
    };
    @autowired(UIButton) closeBtn: UIButton = null;
    /**游戏币1 */
    @autowired(UILabel) coin1: UILabel = null;
    /**游戏币2 */
    @autowired(UILabel) coin2: UILabel = null;
    /**上一个等级 */
    @autowired(UILabel) lastLeve: UILabel = null;
    /**下一个等级 */
    @autowired(UILabel) nexLeve: UILabel = null;
    /**升级中 */
    @autowired(UIButton) upLevelTime: UIButton = null;
    /**品质跟节点 */
    @autowired(cc.Node) qualityRoot: cc.Node = null;
    /**进度条 */
    @autowired(cc.ProgressBar) progressBar: cc.ProgressBar = null;
    /**进度条文本 */
    @autowired(UILabel) progressBarLabel: UILabel = null;
    @autowired(UILabel) costTime: UILabel = null;
    /**奖励列表 */
    @autowired(UIList) rewardUIList: UIList<ListItemPropItem> = null;
    /**升级需求 */
    @autowired(UIList) upLevelUiList: UIList<ListItemCost> = null;
    /**升级按钮 */
    @autowired(UIButton) upLevelBtn: UIButton = null;
    /**减少时间 */
    @autowired(UIButton) reduceTimeBtn: UIButton = null;
    /**品质框 */
    @autowired(UILabel) quality1: UILabel = null;
    @autowired(UILabel) quality2: UILabel = null;
    @autowired(UILabel) quality3: UILabel = null;
    @autowired(UILabel) quality4: UILabel = null;
    @autowired(UILabel) quality5: UILabel = null;
    @autowired(UILabel) quality6: UILabel = null;
    @autowired(UILabel) quality7: UILabel = null;
    @autowired(UILabel) quality8: UILabel = null;
    @autowired(UILabel) quality9: UILabel = null;

    protected onInited(): void {
        this.quality1.setText(["_rs["], ["ui/quality_label_" + 0], ["_rs]"]);
        this.quality2.setText(["_rs["], ["ui/quality_label_" + 1], ["_rs]"]);
        this.quality3.setText(["_rs["], ["ui/quality_label_" + 2], ["_rs]"]);
        this.quality4.setText(["_rs["], ["ui/quality_label_" + 3], ["_rs]"]);
        this.quality5.setText(["_rs["], ["ui/quality_label_" + 4], ["_rs]"]);
        this.quality6.setText(["_rs["], ["ui/quality_label_" + 5], ["_rs]"]);
        this.quality7.setText(["_rs["], ["ui/quality_label_" + 6], ["_rs]"]);
        this.quality8.setText(["_rs["], ["ui/quality_label_" + 7], ["_rs]"]);
        this.quality9.setText(["_rs["], ["ui/quality_label_" + 8], ["_rs]"]);

        this.upLevelTime.node.active = false;

        this.closeBtn.setTransition(false);
        this.closeBtn.onClick = () => {
            this.close();
        };
        this.upLevelBtn.onClick = () => {
            this.onUpLevel();
        };

        this.reduceTimeBtn.onClick = () => {
            this.onReduceTime();
        };

        this.showLevelInfo();
        this.refitem();
        // this.refTopCoin();
        // this.isUpgrade();

        // console.log("here");
        // 升级中显示 减少时间
        this.shwoTime();
        this.schedule(this.shwoTime, 1);
    }

    // @message([EventName.stateKey.storage])
    // refTopCoin() {
    //     this.coin1.setText(["_rs999"]);
    //     this.coin2.setText(["_rs999"]);
    // }

    refProgress() {
        const progressData = GModel.stone.getLevelProgress();
        this.progressBar.progress = progressData.current / progressData.require;
        this.progressBarLabel.setText(["_rs" + progressData.current + "/" + progressData.require]);
    }

    @message([EventName.stateKey.stone])
    showLevelInfo() {
        this.refProgress();

        this.reduceTimeBtn.node.active = GModel.stone.stone().upgrade;
        this.upLevelTime.node.active = GModel.stone.stone().upgrade;
        this.upLevelBtn.node.active = !GModel.stone.stone().upgrade;

        let level = GModel.stone.stone().level;
        this.lastLeve.setText(["_rs当前等级:" + level]);
        this.nexLeve.setText(["_rs下一等级:" + (level + 1)]);

        let lastTbl = GTable.getList("StoneLevelTbl").find((t) => t.level == level);
        let nexTbl = GTable.getList("StoneLevelTbl").find((t) => t.level == level + 1);

        for (let i = 0; i < this.qualityRoot.children.length; i++) {
            let schedule = this.qualityRoot.children[i].getChildByName("schedule");
            schedule
                .getChildByName("left")
                .getComponent(UILabel)
                .setText(["_rs" + lastTbl["rare" + i] / 100 + "%"]);
            schedule
                .getChildByName("right")
                .getComponent(UILabel)
                .setText(["_rs" + nexTbl["rare" + i] / 100 + "%"]);
        }
        this.costTime.setText([
            "_rs" + GUtils.date.formatRemainTime(GUtils.date.OneMinute * lastTbl.upgradeTime, "hh:mm:ss"),
        ]);
    }

    @message([EventName.stateKey.stone])
    refitem() {
        let temp = GModel.playerEquipment.temp();
        let arr = temp.map((element, index) => {
            return {
                playerEquipment: element,
                tempIndex: index,
                isContrast: true,
                showBottonName: true,
                showQuality: true,
            };
        });

        this.rewardUIList.setState(arr);
    }

    shwoTime() {
        let time = GModel.stone.stone().upgradeEndTime - GameDate.nowUpdated();
        if (time > 0) {
            this.upLevelTime.text.setText(["_rs" + GUtils.date.formatRemainTime(time, "hh:mm:ss")]);
        }
    }

    /**升级 */
    onUpLevel() {
        if (GModel.stone.stone().upgrade) {
            GTip.showTip(["_rs升级中"]);
            return;
        }
        this.refProgress();
        GModel.stone.upgrade();
    }

    /**减少时间 */
    onReduceTime() {
        GModel.stone.accelerate(1, 1);
    }
}
