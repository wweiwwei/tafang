import { autowired, message, registerClass } from "../../../framework/Decorator";
import ResourceLoader from "../../../framework/ResourceLoader";
import { GameDate } from "../../../framework/date/GameDate";
import { WindowOpenAnimationEnum, WindowOpenOption } from "../../../framework/ui/GWindow";
import UIButton from "../../../framework/ui/UIButton";
import UIImage from "../../../framework/ui/UIImage";
import UILabel from "../../../framework/ui/UILabel";
import UIWindow from "../../../framework/ui/UIWindow";
import Item from "../../entity/Item";
import EventName from "../../event/EventName";
import WindowCongratulation from "../common/WindowCongratulation";
import ListItemTurntableItem from "./ListItemTurntableItem";

const { ccclass, property } = cc._decorator;
@registerClass("WindowTurntable")
@ccclass
export default class WindowTurntable extends UIWindow {
    static defaultOpentOption: Partial<WindowOpenOption> = {
        animation: WindowOpenAnimationEnum.default,
        hideMainScene: true,
    };
    /**转盘消耗物库存 */
    @autowired(UILabel) storage: UILabel = null;
    /**跳过动画提示 */
    @autowired(UILabel) tip: UILabel = null;
    @autowired(UIButton) closeBtn: UIButton = null;
    /**转一次 */
    @autowired(UIButton) one: UIButton = null;
    /**视频按钮 */
    @autowired(UIButton) video: UIButton = null;
    /**转盘节点 */
    @autowired(cc.Node) turntable: cc.Node = null;
    /**未解锁视频节点 */
    @autowired(cc.Node) locked: cc.Node = null;
    /**解锁视频节点 */
    @autowired(cc.Node) unlock: cc.Node = null;
    /**视频次数 */
    @autowired(UILabel) remain: UILabel = null;
    /**视频冷却 */
    @autowired(UILabel) cd: UILabel = null;
    @autowired(cc.Animation) bottle_Animation: cc.Animation = null;
    _windowParam: any;
    _returnValue: any;
    private nodeArr: cc.Node[] = [];
    private index = 0;
    private duration = 0.05;
    private duration_max = 0.4;
    private loopCount = 0;
    private circleCount = 2;
    private count = 3;
    private continue = true;
    private btn: UIButton = null;
    private rewards: Item[];
    private turntableItem: ListItemTurntableItem[] = [];
    protected onInited(): void {
        this.btn = this.node.getComponent(UIButton);
        this.btn.setTransition(false);
        this.nodeArr = this.turntable.children;
        // let tbl = GTable.getList("TurntableTbl");
        // this.nodeArr.forEach((node, index) => {
        //     node.getChildByName("reward").getComponent(UIImage).imgName = Item.getImg(
        //         new Item(tbl[index].reward[0], tbl[index].reward[1])
        //     );
        // });
        this.closeBtn.onClick = () => {
            this.close();
        };
        this.one.onClick = () => {
            // this.turntableInit();
            this.btnClick(1);
        };
        this.video.onClick = async () => {
            await GModel.turntable.videoAddItem();
            this.refreshTime();
            this.schedule(this.refreshTime, 1);
        };
        // this.turntableInit();
        this.refreshTime();
        this.refreshTurntable();
        this.schedule(this.refreshTime, 1);
    }
    protected onRecycle(): void {
        this.unscheduleAllCallbacks();
    }
    refreshTime() {
        console.log(GModel.turntable.videoColdDown());

        if (GModel.turntable.remainVideo() <= 0) {
            this.locked.active = false;
            this.video.setGrey(true);
        } else {
            this.unlock.active = GModel.turntable.videoColdDown() <= 0;
            this.locked.active = GModel.turntable.videoColdDown() > 0;
            this.video.setGrey(this.locked.active);
        }
        this.unlock.active && this.unschedule(this.refreshTime);

        let minute = Math.ceil((GModel.turntable.videoColdDown() / GUtils.date.OneMinute) % 60);
        this.cd.setText([GLang.code.ui.minute, "_rs" + minute]);
    }
    @message([EventName.stateKey.turntableData, EventName.stateKey.storage])
    refreshTurntable() {
        this.remain.setText(["_rs" + GModel.turntable.remainVideo() + "/" + GConfig.turntable.videoLimit]);
        this.storage.setText(["_rs" + GModel.knapsack.getStorageById(GIndex.id.turntableStorageId)]);
    }
    turntableInit() {
        this.turntableItem = [];
        // const env = [{ lv: GConfig.turntable.captainReward[GModel.facility.captainRank()] }];
        GTable.getList("TurntableTbl").map(async (t, i) => {
            let count =
                t.scale > 0
                    ? t.reward[1] * GConfig.turntable.captainReward[GModel.facility.captainRank()]
                    : t.reward[1];
            const comp = await ResourceLoader.getNode(ListItemTurntableItem);
            comp.setState({
                item: new Item(t.reward[0], count),
            });
            this.nodeArr[i].addChild(comp.node);
            this.turntableItem.push(comp);
        });
    }
    showReward() {
        if (this.continue) {
            GWindow.open(WindowCongratulation, { items: this.rewards });
            this.one.setEnable(true);
            this.closeBtn.setEnable(true);
            this.video.setEnable(true);
            this.btn.setEnable(false);
            this.continue = false;
        }
    }
    /**按钮事件 */
    btnClick(count: number) {
        this.continue = true;
        this.index = 0;
        this.duration = 0.05;
        this.duration_max = 0.4;
        this.loopCount = 0;
        this.circleCount = 2;
        this.count = 3;
        this.btn.setEnable(true);
        this.closeBtn.setEnable(false);
        this.one.setEnable(false);
        this.video.setEnable(false);
        // let tbl = GTable.getList("TurntableTbl");
        GModel.turntable
            .roll(count)
            .then((res) => {
                this.bottle_Animation.play();
                this.bottle_Animation.on("stop", () => {
                    this.showReward();
                });
                let result = res;
                this.rewards = result.reward;
                // let index = result.id.map((id) => tbl.findIndex((t) => t.id === id)).sort((a, b) => a - b);
                // console.log(index);

                this.btn.onClick = () => {
                    // this.turntableItem.forEach((item, i) => {
                    //     index.some((a) => a === i) && item.playChosen();
                    // });
                    let ani = this.bottle_Animation;
                    ani.setCurrentTime(0, "TurntableBottle_Ani");
                    ani.stop();
                };
                // this.turn(index);
            })
            .catch(() => {
                this.one.setEnable(true);
                this.closeBtn.setEnable(true);
                this.btn.setEnable(false);
                this.video.setEnable(true);
            });
    }
    /**转盘动画 */
    turn(i: number[]) {
        if (this.continue) {
            //总次数
            this.count = this.nodeArr.length * (this.circleCount + 1) + i[i.length - 1];
            this.scheduleOnce(async () => {
                this.index++;
                if (this.index >= this.nodeArr.length) this.index = 0;
                if (this.loopCount >= this.nodeArr.length * this.circleCount)
                    this.duration += this.duration_max / (i[i.length - 1] + this.nodeArr.length);
                //当前次数
                this.loopCount++;
                if (this.loopCount === this.count) {
                    this.turntableItem.forEach((node, index) => {
                        if (index === this.index) {
                            node.playChosing();
                            if (i.some((i) => i === index)) {
                                node.playChosen();
                            }
                        }
                    });
                    await GUtils.http.delay(500);
                    GWindow.open(WindowCongratulation, { items: this.rewards });
                    this.one.setEnable(true);
                    this.closeBtn.setEnable(true);
                    this.video.setEnable(true);
                    this.btn.setEnable(false);
                    return;
                } else if (this.loopCount >= this.nodeArr.length * (this.circleCount + 1)) {
                    this.turntableItem.forEach((node, index) => {
                        if (index === this.index) {
                            node.playChosing();
                            if (i.some((i) => i === index)) {
                                node.playChosen();
                            }
                        }
                    });
                    this.turn(i);
                } else {
                    this.turntableItem.forEach((node, index) => {
                        if (index === this.index) {
                            node.playChosing();
                        }
                    });
                    this.turn(i);
                }
            }, this.duration);
        }
    }
}
