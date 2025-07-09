import { autowired, message, registerClass } from "../../../framework/Decorator";
import { WindowOpenAnimationEnum, WindowOpenOption } from "../../../framework/ui/GWindow";
import UIButton from "../../../framework/ui/UIButton";
import UILabel from "../../../framework/ui/UILabel";
import UIList from "../../../framework/ui/UIList";
import UIWindow from "../../../framework/ui/UIWindow";
import EventName from "../../event/EventName";
import ListItemBanquetRank from "./ListItemBanquetRank";
import WindowBanquetMission from "./WindowBanquetMission";
import WindowBanquetExchange from "./WindowBanquetExchange";
import WindowBanquetStore from "./WindowBanquetStore";
import UIImage from "../../../framework/ui/UIImage";
import WindowRule from "./WindowRule";
import { GameDate } from "../../../framework/date/GameDate";
import WindowCongratulation from "../common/WindowCongratulation";
import ListItemBanquetGroup from "./ListItemBanquetGroup";
import WindowBanquetPoints from "./WindowBanquetPoints";
import WindowBanquetGroup from "./WindowBanquetGroup";
import Mission from "../../entity/Mission";
import Item from "../../entity/Item";

const { ccclass } = cc._decorator;
@registerClass("WindowBanquet")
@ccclass
export default class WindowBanquet extends UIWindow {
    static defaultOpentOption: Partial<WindowOpenOption> = {
        animation: WindowOpenAnimationEnum.default,
    };

    _windowParam: any;
    _returnValue: any;

    /**返回按钮 */
    @autowired(UIButton) closeBtn: UIButton = null;

    /**团购 */
    @autowired(UIList) groupPurchasesList: UIList<ListItemBanquetGroup> = null;
    /**积分奖励 */
    @autowired(UIButton) bonusPoints: UIButton = null;
    /**商店 */
    @autowired(UIButton) store: UIButton = null;
    /**秒杀团购日历 */
    @autowired(UIButton) flashSale: UIButton = null;
    /**任务 */
    @autowired(UIButton) task: UIButton = null;
    /**超值兑换 */
    @autowired(UIButton) exchange: UIButton = null;
    /**排名 */
    @autowired(UIList) rankList: UIList<ListItemBanquetRank> = null;

    /**进度 */
    @autowired(cc.ProgressBar) progressBar: cc.ProgressBar = null;
    /** */
    @autowired(UILabel) progressBarLab1: UILabel = null;
    /** */
    @autowired(UILabel) progressBarLab2: UILabel = null;
    /** */
    @autowired(UILabel) progressBarLab3: UILabel = null;
    /** */
    @autowired(UIButton) progressBarGetReward: UIButton = null;

    /** */
    /** */
    @autowired(UILabel) time: UILabel = null;
    /** */
    @autowired(UIButton) rule: UIButton = null;
    /**标题 */
    @autowired(UILabel) title: UILabel = null;
    /**剩余积分 */
    @autowired(UILabel) residuePoint: UILabel = null;
    /**我的排名 */
    @autowired(UILabel) rankNum: UILabel = null;
    /**积分 */
    @autowired(UILabel) point: UILabel = null;
    /**捐赠次数 */
    @autowired(UILabel) donateNum: UILabel = null;

    /**捐赠1 */
    @autowired(UIImage) add1Icon: UIImage = null;
    /** */
    @autowired(UIButton) add1Btn: UIButton = null;
    /** */
    @autowired(UILabel) add1Num: UILabel = null;

    /*捐赠2* */
    @autowired(UIImage) add2Icon: UIImage = null;
    /** */
    @autowired(UIButton) add2Btn: UIButton = null;
    /** */
    @autowired(UILabel) add2Num: UILabel = null;

    // private point1: number = 2;
    // private point2: number = 32;

    protected onInited(): void {
        this.even();
        this.initUi();
        this.refRank();
        // this.showTaskRed();
        this.refProgress();
        this.updateTime();
        this.refGPItem();
        this.schedule(() => {
            this.updateTime();
            this.refGPItem();
        }, 50);
    }

    async showRank() {
        let mayRank = 0;
        (await GModel.ranking.rankingByIndex(7)).map((t) => {
            if (t.info.roleId == HttpServer.roleId) mayRank = t.rank;
        });
        this.rankNum.setText([GLang.code.ui.banquet_wdpm], ["_rs" + mayRank]);
    }

    @message([EventName.stateKey.storage])
    showResiduePoint() {
        this.residuePoint.setText(
            [GLang.code.ui.banquet_syjf],
            ["_rs" + GUtils.ui.getNumberString(GModel.knapsack.getStorageById(52003), 2)]
        );
    }

    @message([EventName.stateKey.banquetData])
    showPoint() {
        this.point.setText([GLang.code.ui.banquet_jf], ["_rs" + GState.data.banquetData.point]);
        this.donateNum.setText(["_rs" + GState.data.banquetData.donateTimes + "/" + GConfig.banquet.freeLimit]);
    }

    initUi(): void {
        this.showRank();
        this.showPoint();
        this.showResiduePoint();
        this.showNum();
    }

    @message([EventName.stateKey.storage])
    showNum() {
        let num = GModel.knapsack.getStorageById(52001);
        let num2 = GModel.knapsack.getStorageById(52002);
        if (num > 0) {
            this.add1Icon.imgName = Item.getImg(new Item(52001, num));
        } else {
            this.add1Icon.imgName = "";
        }
        if (num2 > 0) {
            this.add2Icon.imgName = Item.getImg(new Item(52002, num2));
        } else {
            this.add2Icon.imgName = "";
        }
        this.add1Num.setText(["_rs" + GUtils.ui.getNumberString(num, 2)]);
        this.add2Num.setText(["_rs" + GUtils.ui.getNumberString(num2, 2)]);
    }

    @message([EventName.stateKey.banquetData])
    refProgress() {
        let tbl = GTable.getList("BanquetLevelTbl").find((d) => {
            if (d.level == GState.data.banquetData.level) return d;
        });
        this.progressBar.progress = GState.data.banquetData.point / tbl.require;
        this.progressBarLab1.setText(["_rsLv." + GState.data.banquetData.level]);
        this.progressBarLab2.setText(["_rsLv." + GState.data.banquetData.level], [tbl.name]);
        this.progressBarLab3.setText([GState.data.banquetData.point + "/" + tbl.require]);

        this.progressBarGetReward.bg.node.active = GState.data.banquetData.point > tbl.require;
    }

    refGPItem() {
        let arr = [];
        GTable.getList("BanquetGroupTbl").map((d) => {
            if (
                (d.startTime > GameDate.now() && d.endTime < GameDate.now()) ||
                (arr.length == 0 && GameDate.now() < d.startTime && GameDate.now() < d.endTime)
            )
                arr.push({ type: 0, id: d.id });
        });
        this.groupPurchasesList.setState(arr);
    }

    even() {
        this.closeBtn.onClick = () => {
            this.close();
        };
        this.bonusPoints.onClick = () => {
            GWindow.open(WindowBanquetPoints);
        };
        this.store.onClick = () => {
            GWindow.open(WindowBanquetStore);
        };
        this.flashSale.onClick = () => {
            GWindow.open(WindowBanquetGroup);
        };
        this.task.onClick = () => {
            GWindow.open(WindowBanquetMission);
        };
        this.exchange.onClick = () => {
            GWindow.open(WindowBanquetExchange);
        };

        this.rule.onClick = () => {
            GWindow.open(WindowRule, { ruleId: GIndex.id.ruleId.towerScene });
        };
        this.add1Btn.onClick = async () => {
            if (GModel.knapsack.getStorageById(52001) > 1) {
                let a = await GModel.banquet.exchangePoint(52001, 1);
                // console.log("a=", a);
                GTip.showDonateItem(a[0]);
            } else {
                GWindow.open(WindowBanquetMission);
            }
        };
        this.add2Btn.onClick = async () => {
            if (GModel.knapsack.getStorageById(52002) > 1) {
                // GTip.showDonateItem(new Item(52002, 1));
                let a = await GModel.banquet.exchangePoint(52002, 1);
                // console.log("a=", a);
                GTip.showDonateItem(a[0]);
            } else {
                GWindow.open(WindowBanquetExchange);
            }
        };

        let add1 = async () => {
            let a = await GModel.banquet.exchangePoint(52001, 1);
            GTip.showDonateItem(a[0]);
        };

        this.add1Btn.node.on(cc.Node.EventType.TOUCH_START, () => {
            this.schedule(add1, 0.4, 110, 0);
        });
        this.add1Btn.node.on(cc.Node.EventType.TOUCH_END, () => {
            this.unschedule(add1);
        });
        this.add1Btn.node.on(cc.Node.EventType.TOUCH_CANCEL, () => {
            this.unschedule(add1);
        });

        let add2 = async () => {
            let a = await GModel.banquet.exchangePoint(52002, 1);
            GTip.showDonateItem(a[0]);
        };
        this.add2Btn.node.on(cc.Node.EventType.TOUCH_START, () => {
            this.schedule(add2, 0.4, 110, 0);
        });
        this.add2Btn.node.on(cc.Node.EventType.TOUCH_END, () => {
            this.unschedule(add2);
        });
        this.add2Btn.node.on(cc.Node.EventType.TOUCH_CANCEL, () => {
            this.unschedule(add2);
        });

        this.progressBarGetReward.onClick = async () => {
            let tbl = GTable.getList("BanquetLevelTbl").find((d) => {
                if (d.level == GState.data.banquetData.level) return d;
            });
            let reward = await GModel.banquet.getLevelReward(tbl.id);
            if (reward.length > 0) GWindow.open(WindowCongratulation, { items: reward });
        };
    }

    @message([EventName.stateKey.banquetMission])
    showTaskRed() {
        let showRed = () => {
            let data = GState.data.banquetMission;
            console.log("data =", data);
            const list: Mission[] = Object.keys(data).map((k) => {
                return data[k];
            });
            for (let i = 0; i < list.length; i++) {
                const d = list[i];
                if (d.progress >= d.getRequire()) {
                    return true;
                }
            }
            return false;
        };
        this.task.bg.node.active = showRed();
    }

    updateTime() {
        let now = GameDate.now();
        // console.log("time 4=", GState.data.banquetData.beginTime);
        let endTime: number =
            GTable.getById("ActivitiesTbl", 1033).lastDay * GameDate.OneDay + GState.data.banquetData.beginTime;
        // console.log("time 5=", endTime);
        if (now < endTime) {
            // console.log("time 1=", GTable.getById("ActivitiesTbl", 1033).lastDay);
            // console.log("time 2=", GTable.getById("ActivitiesTbl", 1033).lastDay * GameDate.OneDay);
            // console.log(
            //     "time 3=",
            //     GState.data.banquetData.beginTime + GTable.getById("ActivitiesTbl", 1033).lastDay * GameDate.OneDay
            // );
            // console.log("time 4=", GState.data.banquetData.beginTime);
            // console.log("time 5=", endTime);
            let time = GUtils.date.formatRemainTime(endTime - now, "DD hh:mm");
            this.time.setText([GLang.code.ui.banquet_hddjs], ["_rs" + time]);
        }
        // else if (now < this.endTime) {
        //     this.time.setText([GLang.code.ui.banquet_dhdjs], ["_rs"]);
        // }
    }

    async refRank() {
        let state = (await GModel.ranking.rankingByIndex(7)).map((t) => {
            return { rank: t.rank, info: t.info, point: t.point };
        });
        this.rankList.setState(state);
    }
}
