import { autowired, message, registerClass } from "../../../framework/Decorator";
import ResourceLoader from "../../../framework/ResourceLoader";
import { WindowOpenAnimationEnum, WindowOpenOption } from "../../../framework/ui/GWindow";
import UIButton from "../../../framework/ui/UIButton";
import UIImage from "../../../framework/ui/UIImage";
import UILabel from "../../../framework/ui/UILabel";
import UIList from "../../../framework/ui/UIList";
import UISpine from "../../../framework/ui/UISpine";
import UIWindow from "../../../framework/ui/UIWindow";
import { MineAction } from "../../entity/MineAction";
import { MineBrick } from "../../entity/MineBrick";
import EventName from "../../event/EventName";
import WindowAdvertisement from "../common/WindowAdvertisement";
import ListItemGridItem from "./ListItemGridItem";
import ListItemMineBrick from "./ListItemMineBrick";
import ListItemMinePlayer from "./ListItemMinePlayer";
import WindowMineBattle from "./WindowMineBattle";

const { ccclass, property } = cc._decorator;
@registerClass("WindowMine", {
    preloadPrefab: ["ListItemMineBrick", "ListItemMinePlayer", "MineProp_Ani"],
})
@ccclass
export default class WindowMine extends UIWindow {
    static defaultOpentOption: Partial<WindowOpenOption> = {
        animation: WindowOpenAnimationEnum.default,
        hideMainScene: true,
    };
    _windowParam: any;
    _returnValue: any;

    @autowired(cc.Node) mainMapNode: cc.Node = null;

    @autowired(UIList) playerNode: UIList<ListItemMinePlayer> = null;
    @autowired(UIList) grid: UIList<ListItemGridItem> = null;

    @autowired(UIImage) bgNode: UIImage = null;
    @autowired(UIImage) bgNode2: UIImage = null;

    /**规则 */
    @autowired(UIButton) exclamation: UIButton = null;
    //---2
    /**体力 */
    @autowired(UILabel) powerLabel: UILabel = null;
    /**积分 */
    @autowired(UILabel) pointLabel: UILabel = null;

    /**层数显示 */
    @autowired(cc.Node) floorNode: cc.Node = null;
    /**挑战boss横幅 */
    @autowired(cc.Node) blockNode: cc.Node = null;
    /**boss 名称 */
    @autowired(UILabel) bossNameLabel: UILabel = null;
    /**重置要求 */
    @autowired(UILabel) resetRequireLabel: UILabel = null;
    /**战斗按钮 */
    @autowired(UIButton) fightBtn: UIButton = null;
    /**boos战力*/
    @autowired(UILabel) bossFightLabel: UILabel = null;
    /**看视频回复的体力数值*/
    @autowired(UILabel) recoverCount: UILabel = null;
    /**boss头像 */
    @autowired(UIImage) bossImg: UIImage = null;
    /**重置按钮 */
    @autowired(UIButton) resetBtn: UIButton = null;
    /**加速按钮 */
    @autowired(UIButton) accelerateBtn: UIButton = null;
    /**自动按钮 */
    @autowired(cc.Node) autoBtn: cc.Node = null;
    @autowired(cc.Node) autoBtn2: cc.Node = null;
    /**稿子 */
    @autowired(UIButton) hammar: UIButton = null;
    /**稿子数量 */
    @autowired(UILabel) hammarCount: UILabel = null;
    /**钻头 */
    @autowired(UIButton) drill: UIButton = null;
    /**钻头数量 */
    @autowired(UILabel) drillCount: UILabel = null;
    /**炸弹 */
    @autowired(UIButton) bomb: UIButton = null;
    /**炸弹数量 */
    @autowired(UILabel) bombCount: UILabel = null;
    /**返回 */
    @autowired(UIButton) returnBtn: UIButton = null;
    /**主要挖矿容器 */
    @autowired(cc.Node) main: cc.Node = null;
    @autowired(cc.Node) drillAni: cc.Node = null;
    /**楼层 */
    @autowired(UILabel) fLabel0: UILabel = null;
    @autowired(UILabel) fLabel1: UILabel = null;
    @autowired(UILabel) fLabel2: UILabel = null;
    @autowired(UILabel) fLabel3: UILabel = null;
    @autowired(UILabel) fLabel4: UILabel = null;

    /**层数显示 */
    private floorLabels: UILabel[] = [];
    /**记录开始层数 */
    private startFloor: number = 0;

    private role: ListItemMinePlayer = null;
    private itemMap: Map<number, ListItemMineBrick>;
    private changeFloor: number = 0;

    initPlayer() {
        this.role = ResourceLoader.getNodeSyncWithPreload(ListItemMinePlayer);
        this.role.node.parent = this.mainMapNode;
        this.role.setState({ pos: new cc.Vec2(GModel.mine.getMinerPos()[0], GModel.mine.getMinerPos()[1]) });
        this.role.node.zIndex = 9999;
    }
    initFloor() {
        this.floorNode.children.forEach((ndoe) => {
            this.floorLabels.push(ndoe.getComponent(UILabel));
        });
    }
    private chosenList: number[] = [];
    private arrBricks: MineBrick[] = [];
    private reachableList: boolean[] = [];
    private canUse = false;
    private reachable = false;
    private prop = 0;
    @message([EventName.stateKey.mineData, EventName.stateKey.mineBrick])
    initGrid() {
        this.reachableList = (this.prop === 0 ? GModel.mine.getReachableMatrix() : GModel.mine.getRoadMatrix()).reduce(
            (p, c) => p.concat(c),
            []
        );
        this.arrBricks = GModel.mine.getBrickAsMatrix().reduce((p, c) => p.concat(c), []);
        let bricks = this.arrBricks.map((b, i) => {
            if (b && this.itemMap.has(b.uniqueId)) {
                this.itemMap
                    .get(b.uniqueId)
                    .showShadow(!GModel.mine.getReachableMatrix().reduce((p, c) => p.concat(c), [])[i]);
            }
            return {
                chosen: this.chosenList.some((l) => l === i),
                brick: b,
                canUse: this.canUse && this.reachable,
                x: i % 6,
                y: Math.floor(i / 6),
            };
        });
        this.grid.setState(bricks);
    }
    initEvent() {
        this.grid.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.grid.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.grid.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.grid.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
    }
    private startGrid: number = null;
    private nowGrid: number = null;
    onTouchStart(event: cc.Event.EventTouch) {
        this.startGrid = this.grid.node.children.findIndex((node) => {
            let box = node.getBoundingBoxToWorld();
            return box.contains(event.getLocation());
        });
        this.nowGrid = this.startGrid;
    }
    onTouchMove(event: cc.Event.EventTouch) {
        this.nowGrid = this.grid.node.children.findIndex((node) => {
            let box = node.getBoundingBoxToWorld();
            return box.contains(event.getLocation());
        });
        this.click();
    }
    onTouchEnd(event: cc.Event.EventTouch) {
        if (this.nowGrid === this.startGrid) {
            this.click();
        }
        if (this.prop === 0) {
            this.canUse
                ? this.reachable
                    ? this.useHammar(this.arrBricks[this.nowGrid].uniqueId)
                    : GTip.showTip([GLang.code.ui.mine_unreachable])
                : GTip.showTip([GLang.code.ui.mine_cant_use_hammar]);
        } else {
            this.canUse
                ? this.reachable
                    ? this.useProp(
                          this.nowGrid % 6,
                          Math.floor(this.nowGrid / 6),
                          this.chosenList.filter((c) => c !== undefined)
                      )
                    : GTip.showTip([GLang.code.ui.mine_unreachable])
                : GTip.showTip([GLang.code.ui.mine_cant_use_prop]);
        }
        this.nowGrid = null;
        this.chosenList = [];
        this.initGrid();
    }
    click() {
        this.chosenList = [];
        if (this.prop === 0) {
            this.chosenList.push(this.nowGrid);
            this.canUse = this.arrBricks[this.nowGrid] !== null;
            this.reachable = this.reachableList[this.nowGrid];
        } else {
            this.canUse = this.arrBricks[this.nowGrid] === null;
            this.reachable = this.reachableList[this.nowGrid];
            this.countIndex(this.prop);
        }
        this.chosenList = Array.from(new Set(this.chosenList.filter((l) => l !== null)));
        this.initGrid();
    }
    countIndex(prop: number) {
        if (prop === 1) {
            this.arrBricks.forEach((b, i) => {
                if (i % 6 === this.nowGrid % 6) {
                    this.chosenList.push(i);
                    if (Math.floor(i / 6) === 5) {
                        if (i + 1 <= 35) this.chosenList.push(i + 1);
                        if (i - 1 >= 30) this.chosenList.push(i - 1);
                    }
                }
            });
        } else {
            this.chosenList.push(...this.expand(this.nowGrid % 6, Math.floor(this.nowGrid / 6), 2));
        }
    }
    expand(x: number, y: number, distance: number): number[] {
        if (distance <= 0 || x < 0 || y < 0 || y >= 6 || x >= 6) return;
        let current = [x, y];
        let surrounded = [
            [x - 1, y],
            [x + 1, y],
            [x, y - 1],
            [x, y + 1],
        ];
        let valid = surrounded.filter((coor) => coor[0] >= 0 && coor[1] >= 0 && coor[0] < 6 && coor[1] < 6);
        return [current[1] * 6 + current[0]]
            .concat(...valid.map((coor) => coor[1] * 6 + coor[0]))
            .concat(...valid.map((coor) => this.expand(coor[0], coor[1], distance - 1)));
    }
    async useHammar(id: number) {
        if (!this.complete) return;
        if (GState.data.mineData.power <= 0) {
            GTip.showTip([GLang.code.ui.lack_of_prop]);
            // this.openAdvertisement(0);
        } else {
            this.complete = false;
            let mineActionArr = await GModel.mine.hitBrick(id);
            await this.tackleMineAction(mineActionArr);
            this.complete = true;
        }
    }
    async useProp(x: number, y: number, list: number[]) {
        if (!this.complete) return;
        if (
            (this.prop === 1 && GModel.knapsack.getStorageById(GIndex.id.mineDrillId) <= 0) ||
            (this.prop == 2 && GModel.knapsack.getStorageById(GIndex.id.mineBombId) <= 0)
        ) {
            // this.openAdvertisement(propType);
            GTip.showTip([GLang.code.ui.lack_of_prop]);
        } else {
            this.complete = false;
            let mineActionArr = await GModel.mine.usePro(this.prop, x, y);
            this.prop === 1 && this.showDrillAni(x);
            this.prop === 2 &&
                list.forEach((v, i) => {
                    if (i > 4) {
                        this.scheduleOnce(() => {
                            this.grid.getItems()[v].playBoom();
                        }, 0.1);
                    } else {
                        this.grid.getItems()[v].playBoom();
                    }
                });
            await this.tackleMineAction(mineActionArr);
            this.complete = true;
            this.prop = 0;
            this.initProp();
        }
    }
    showDrillAni(x: number) {
        const beginPos = this.grid.node.children[x].convertToWorldSpaceAR(cc.v2());
        const pos = this.node.convertToNodeSpaceAR(beginPos);
        this.drillAni.setPosition(pos);
        this.drillAni.active = true;
        this.drillAni.getChildByName("content").getComponent(cc.Animation).play();
        cc.tween(this.drillAni)
            .by(0.62, { y: -600 })
            .call(() => (this.drillAni.active = false))
            .start();
    }
    openAdvertisement(type: number) {
        let title: string[];
        let cb: () => void;
        let content: string[];
        switch (type) {
            case 0:
                title = [GLang.code.ui.ad_get_power];
                content = [GLang.code.ui.advertisement_get_power, "_rs" + GConfig.mine.videoPowerRecover];
                cb = () => {
                    GModel.mine.videoAddPower();
                };
                break;
            case 1:
                title = [GLang.code.ui.mine_ad_get_prop];
                content = ["_rs钻头"];
                cb = () => {
                    GModel.mine.videoAddDrill();
                };
                break;
            case 2:
                title = [GLang.code.ui.mine_ad_get_prop];
                content = ["_rs炸弹"];
                cb = () => {
                    GModel.mine.videoAddBomb();
                };
                break;
            default:
                break;
        }
        GWindow.open(WindowAdvertisement, {
            title,
            content: [[GLang.code.ui.advertisement_watch_ad], [GLang.code.ui.get], content],
            text: [GLang.code.ui.get],
            cb,
        });
    }
    initProp() {
        let storage = [
            GState.data.mineData.power,
            GModel.knapsack.getStorageById(GIndex.id.mineDrillId),
            GModel.knapsack.getStorageById(GIndex.id.mineBombId),
        ];
        let remain = [
            GModel.mine.getVideoPowerRecoverRemain(),
            GModel.mine.getVideoDrillRemain(),
            GModel.mine.getVideoBombRemain(),
        ];
        let btns = [this.hammar, this.drill, this.bomb];
        btns.forEach((btn, i) => {
            btn.text.setText([
                storage[i] <= 0 ? `_rs(${remain[i]}/${GConfig.mine.videoPowerLimit})` : GLang.code.ui.use,
            ]);
            btn.text.node.setPosition(storage[i] <= 0 ? 15 : 0, 4.743);
            btn.bg.node.active = storage[i] <= 0;
            btn.node.getChildByName("bg").getComponent(UIImage).imgName =
                this.prop === i ? "common_btn8" : "common_btn9";
            btn.onClick = () => {
                if (storage[i] <= 0) {
                    remain[i] <= 0 ? GTip.showTip([GLang.code.ui.no_video_times]) : this.openAdvertisement(i);
                } else {
                    this.prop = i;
                }
                this.initProp();
            };
        });
        this.reachableList = (this.prop === 0 ? GModel.mine.getReachableMatrix() : GModel.mine.getRoadMatrix()).reduce(
            (p, c) => p.concat(c),
            []
        );
    }
    @message([EventName.stateKey.mineData, EventName.stateKey.storage])
    async initData() {
        this.exclamation.onClick = () => {
            // GWindow.open(windowRule, { ruleId: GIndex.id.ruleId.mine });
        };
        this.isShowAccelerateBtn = GModel.localStorage.quick;
        this.onAccelerateBtn();
        let power = GState.data.mineData.power;
        let drill = GModel.knapsack.getStorageById(GIndex.id.mineDrillId);
        let bomb = GModel.knapsack.getStorageById(GIndex.id.mineBombId);
        this.pointLabel.setText(["_rs" + GModel.knapsack.getStorageById(GIndex.id.minePointId)]);
        // this.recoverCount.setText([
        //     "_rs" + GModel.mine.getVideoPowerRecoverRemain() + "/" + GConfig.mine.videoPowerLimit,
        // ]);
        this.hammarCount.setText(["_rs" + GUtils.ui.getFixed(power, 2)]);
        this.drillCount.setText(["_rs" + GUtils.ui.getFixed(drill, 2)]);
        this.bombCount.setText(["_rs" + GUtils.ui.getFixed(bomb, 2)]);
        this.initProp();
        // this.playerNode.setState([{ pos: new cc.Vec2(GModel.mine.getMinerPos()[0], GModel.mine.getMinerPos()[1]) }]);
        // this.role.setState({ pos: new cc.Vec2(3, 2) });

        // this.autoBtn.onClick = () => {
        //     this.onOpenAuto();
        // };
        // this.autoBtn2.onClick = async () => {
        //     GWindow.open(WindowAdvertisement, {
        //         title: [GLang.code.ui.ad_get_power],
        //         content: [
        //             [GLang.code.ui.advertisement_watch_ad],
        //             [GLang.code.ui.get],
        //             [GLang.code.ui.advertisement_get_power, "_rs" + GConfig.mine.videoPowerRecover],
        //         ],
        //         text: [GLang.code.ui.get],
        //         cb: async () => {
        //             GModel.mine.videoAddPower();
        //         },
        //     });
        // };

        this.fightBtn.onClick = () => {
            this.onChallengeBtn();
        };

        this.returnBtn.onClick = () => {
            this.onReturnBtn();
        };

        this.accelerateBtn.onClick = () => {
            this.isShowAccelerateBtn = !this.isShowAccelerateBtn;
            GModel.localStorage.quick = this.isShowAccelerateBtn;
            this.role.setQuick(GModel.localStorage.quick);
            this.onAccelerateBtn();
        };

        this.resetBtn.onClick = () => {
            this.onResetBtn();
        };

        this.fightBtn.onClick = async () => {
            let data = await GModel.mine.challengeBoss();
            this.tackleMineAction(data);
        };
    }

    protected onInited(): void {
        this.initData();
        this.updateShowInfo();
        this.initPlayer();
        this.initFloor();
    }
    protected onInjected(): void {
        this.initMap();
        this.initGrid();
        this.initEvent();
    }
    /**更新展示信息 */
    @message([EventName.stateKey.mineData])
    updateShowInfo() {
        // 更新体力
        const mineMaxPower = GConfig.mine.powerLimit;
        this.powerLabel.setText([`_rs${GModel.mine.getCurrentPower()}/${mineMaxPower}`]);
        // 更新楼层
        let floor = GModel.mine.getCurrentFloor() + "";
        // 楼层数位不足5位时，自动补齐后再设置文本
        while (floor.length < 5) {
            floor = "0" + floor;
        }
        floor.split("").forEach((t, i) => {
            this["fLabel" + i].setText(["_rs" + t]);
        });
    }

    protected onRecycle(): void {
        const MBs = GModel.mine.getAllBrick();
        this.itemMap.forEach((item, key) => {
            if (MBs.every((item) => item.uniqueId !== key)) {
                this.itemMap.get(key).recycle();
            }
            // item.recycle();
        });
    }

    onChallengeBtn() {
        //boos战斗
        // MineManager.s_instance.BeginBlockBattle(false);
    }

    onOpenAuto() {
        //打开开启自动窗体
    }

    onReturnBtn(): void {
        this.close();
    }

    private isShowAccelerateBtn = false;
    onAccelerateBtn() {
        //点击加速按钮
        if (this.isShowAccelerateBtn) {
            this.accelerateBtn.node.children[0].active = true;
        } else {
            this.accelerateBtn.node.children[0].active = false;
        }
    }

    onResetBtn() {
        //重置
        // GModel.mine.challengeBoss;
    }

    initMap() {
        this.startFloor = GModel.mine.getCurrentFloor();
        // GModel.mine.getCurrentFloor() > 5 ? GModel.mine.getCurrentFloor() - 5 : GModel.mine.getCurrentFloor();
        this.itemMap = new Map();
        this.getBrick();
        // GConfig.mine.powerLimit;
    }

    getBrick() {
        const MBs = GModel.mine.getAllBrick();
        // console.log("hxz_allBrick:", MBs);

        MBs.forEach((d) => {
            // if (this.itemMap.get(d.uniqueId)) return;
            const sItem = ResourceLoader.getNodeSyncWithPreload(ListItemMineBrick);
            sItem.setState({
                startFloor: this.startFloor,
                uniqueId: d.uniqueId,
                // cb: async () => {
                //     if (!this.complete) return;
                //     this.complete = false;
                //     let mineActionArr = await GModel.mine.hitBrick(d.uniqueId);
                //     await this.tackleMineAction(mineActionArr);
                //     this.complete = true;
                //     // this.initMap();
                // },
            });
            sItem.node.setParent(this.mainMapNode);
            this.itemMap.set(d.uniqueId, sItem);
        });
        // await GUtils.http.delay(1000);
        // this.onRecycle();
    }
    private complete = true;

    async tackleMineAction(mineActionArr: MineAction[]) {
        const floorChangeItem = mineActionArr.find((t) => t.action === "floorChange");
        if (floorChangeItem) this.changeFloor = floorChangeItem.data.floor;

        for (let i = 0; i < mineActionArr.length; i++) {
            await this.handle(mineActionArr[i]);
        }
    }

    async handle(a: MineAction) {
        switch (a.action) {
            case "delay": {
                await GUtils.http.delay(a.data.time);
                break;
            }
            case "battle": {
                const actionList = await GWindow.open(WindowMineBattle, { id: a.data.uniqueId });
                this.tackleMineAction(actionList);
                break;
            }
            case "brickDamage": {
                // 实现暂时砖块破坏
                const brick = this.itemMap.get(a.data.uniqueId);
                brick.playAni();
                brick.refreshLife(a.data.life, async () => {
                    if (a.data.life === 0) {
                        cc.tween(brick.node)
                            .to(0.5, { opacity: 0 })
                            .call(() => {
                                this.itemMap.delete(a.data.uniqueId);
                                brick.recycle();
                            })
                            .start();
                    }
                });

                break;
            }
            case "showBrickReward": {
                a.data.reward.forEach((i) => GTip.showRewardItem(i));
                break;
            }
            case "minerMove": {
                await this.role.setPlayerPos(a.data.x, a.data.y + (GModel.mine.getCurrentFloor() - this.startFloor));
                this.changeFloor = 0;
                break;
            }
            case "minerHitBrick": {
                this.role.playHit();
                await GUtils.http.delay(300);
                break;
            }
            case "minerChangeDirection": {
                this.role.changeDirection(a.data.direction);
                break;
            }
            case "showDiamondWindow": {
                GWindow.open(WindowAdvertisement, {
                    title: [GLang.code.ui.mine_diamond_ad],
                    content: [
                        [GLang.code.ui.advertisement_watch_ad],
                        [GLang.code.ui.get],
                        ["_rs" + a.data.count],
                        [GLang.code.table_item.diamond],
                    ],
                    text: [GLang.code.ui.get],
                    cb: async () => {
                        let data = await GModel.mine.videoDiamond();
                        data.forEach((item) => GTip.showRewardItem(item));
                    },
                });
                break;
            }
            case "floorChange": {
                // 追加砖块
                const MBs = GModel.mine.getAllBrick();
                MBs.forEach((d) => {
                    if (this.itemMap.get(d.uniqueId)) return;
                    const sItem = ResourceLoader.getNodeSyncWithPreload(ListItemMineBrick);
                    sItem.setState({
                        startFloor: this.startFloor,
                        uniqueId: d.uniqueId,
                        changeFloor: a.data.floor,
                        // cb: async () => {
                        //     if (!this.complete) return;
                        //     this.complete = false;
                        //     let mineActionArr = await GModel.mine.hitBrick(d.uniqueId);
                        //     await this.tackleMineAction(mineActionArr);
                        //     this.complete = true;
                        //     // this.initMap();
                        // },
                    });
                    sItem.node.setParent(this.mainMapNode);
                    this.itemMap.set(d.uniqueId, sItem);
                });

                // 100是砖块的高度
                const tweenMainMapNode = () => {
                    return new Promise<void>((resolve, reject) => {
                        cc.tween(this.mainMapNode)
                            .by(0.5, { y: 100 * a.data.floor })
                            .call(resolve)
                            .start();
                    });
                };
                await tweenMainMapNode();
                // this.mainMapNode.runAction(cc.moveBy(0.5, cc.v2({ x: 0, y: 100 * a.data.floor })));
                // await GUtils.http.delay(500);
                // this.onRecycle();
                break;
            }
        }
        this.initGrid();
    }
    private bg1Moved = false;
    private bg2Moved = false;
    protected update(dt: number): void {
        if (this.mainMapNode.position.y >= 300) {
            if (this.mainMapNode.position.y >= -this.bgNode2.node.position.y && !this.bg1Moved) {
                this.bgNode.node.setPosition(cc.v2(300, this.bgNode.node.position.y - 1200));
                this.bg1Moved = true;
                this.bg2Moved = false;
            }
            if (this.mainMapNode.position.y >= -this.bgNode.node.position.y && !this.bg2Moved) {
                this.bgNode2.node.setPosition(cc.v2(300, this.bgNode2.node.position.y - 1200));
                this.bg2Moved = true;
                this.bg1Moved = false;
            }
            //     // console.log(this.bg1Moved, this.bg2Moved);

            //     if (((this.mainMapNode.position.y + 300) / 600) % 2 === 1 && !this.bg1Moved) {
            //         this.bg1Moved = true;
            //         // this.bgNode.node.position.y -= 1200;
            //         console.log("-----------------------------------bg1 moved");
            //         this.bgNode.node.setPosition(cc.v2(300, this.bgNode.node.position.y - 1200));
            //     }
            //     if (((this.mainMapNode.position.y + 300) / 600) % 2 === 0 && !this.bg2Moved) {
            //         this.bg2Moved = true;
            //         // this.bgNode2.node.position.y -= 1200;
            //         console.log("-----------------------------------bg2 moved");
            //         this.bgNode2.node.setPosition(cc.v2(300, this.bgNode2.node.position.y - 1200));
            //     }
        }
    }
    initBoss(bossId) {
        this.bossImg.imgName = "";
        this.bossFightLabel.setText([]);
    }
}
