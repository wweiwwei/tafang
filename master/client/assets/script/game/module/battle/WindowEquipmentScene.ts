import { autowired, message, registerClass } from "../../../framework/Decorator";
import ResourceLoader from "../../../framework/ResourceLoader";
import UIWindow from "../../../framework/ui/UIWindow";
import { BattleUtils } from "../../battleLogic/Utils/BattleUtils";
import EventName from "../../event/EventName";
import ListItemEquipmentSceneBullet from "./ListItemEquipmentSceneBullet";
import ListItemEquipmentSceneMonster from "./ListItemEquipmentSceneMonster";
import ListItemEquipmentScenePlayer from "./ListItemEquipmentScenePlayer";
import ListItemGuideLight from "./ListItemGuideLight";

const { ccclass, property } = cc._decorator;

@registerClass("WindowEquipmentScene", {
    // sceneWindow: {
    //     kind: "main",
    //     openIndex: 0,
    // },
    preloadPrefab: [
        "ListItemEquipmentSceneBullet",
        "ListItemEquipmentSceneMonster",
        "ListItemEquipmentScenePlayer",
        "ListItemGuideLight",
    ],
})
@ccclass
export default class WindowEquipmentScene extends UIWindow {
    static _poolSize: number = 1;
    _windowParam: any;
    _returnValue: any;
    /** 场景背景 */
    @autowired(cc.Node) sceneBg: cc.Node = null;
    @autowired(cc.Node) objectContainer: cc.Node = null;
    @autowired(cc.Node) gridContainer: cc.Node = null;

    private playerObject: ListItemEquipmentScenePlayer = null;
    private monsterObject: Map<number, ListItemEquipmentSceneMonster> = new Map();
    private bulletObject: ListItemEquipmentSceneBullet = null;

    private mode: "wait" | "waitResponse" | "next" | "playerAttack" | "bulletFly" = "wait";
    private roadData: boolean[][] = null;
    private gridSize: number = null;
    private gridCount: number[] = null;
    private aStarCache: number[][] = null;
    grid: cc.Node[][] = [];

    protected async onInjected() {
        window["d"] = this;
        const player = ResourceLoader.getNodeSyncWithPreload(ListItemEquipmentScenePlayer);
        this.objectContainer.addChild(player.node);
        this.playerObject = player;
        this.playerObject.setState({});
        this.checkMonster();
        // this.sceneBg.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.loadBg("map1");
        this.initRoadData();
        // await this.initGrid();
        // this.refreshGrid();
    }
    protected onInited(): void {}

    private initRoadData() {
        const tbl = GTable.getList("BattleSceneInfoTbl").find((tbl) => tbl.prefab === "map1");
        this.roadData = BattleUtils.map.decodeMap(tbl.road);
        this.gridSize = tbl.gridSize;
        this.gridCount = tbl.gridCount;
    }
    private async initGrid() {
        const gridPrefab = await ResourceLoader.loadPrefab("battleMapBlock");
        const tbl = GTable.getList("BattleSceneInfoTbl").find((tbl) => tbl.prefab === "map1");
        const [x, y] = tbl.gridCount;
        this.gridContainer.width = tbl.gridSize * x;
        this.gridContainer.height = tbl.gridSize * y;
        for (let i = 0; i < y; i++) {
            const list: cc.Node[] = [];
            for (let j = 0; j < x; j++) {
                const node = cc.instantiate(gridPrefab);
                node.width = tbl.gridSize;
                node.height = tbl.gridSize;
                this.gridContainer.addChild(node);
                list.push(node);
            }
            this.grid.push(list);
        }
        this.grid.reverse();
    }

    private refreshGrid() {
        for (let i = 0; i < this.grid.length; i++) {
            const nodeList = this.grid[i];
            const roadList = this.roadData[i];
            nodeList.forEach((node, index) => {
                node.color = roadList[index] ? cc.Color.GREEN : cc.Color.RED;
            });
        }
    }

    async onTouchEnd(event: cc.Event.EventTouch) {
        const screenPos = event.getLocation();
        const worldPos = cc.v3();
        // 将一个屏幕坐标系下的点转换到世界坐标系下
        GCamera.battleCamera.getScreenToWorldPoint(screenPos, worldPos);
        const relatePos = this.playerObject.node.convertToNodeSpaceAR(worldPos);
        const targetPos = this.playerObject.node.position.add(cc.v3(relatePos.x, relatePos.y));
        const guideNode = ResourceLoader.getNodeSyncWithPreload(ListItemGuideLight);
        this.objectContainer.addChild(guideNode.node);
        guideNode.setState({ pos: targetPos });
        // this.playerMoveTo(targetPos);
    }

    async loadBg(img: string) {
        if (
            this.sceneBg.children.length === 0 ||
            (this.sceneBg.children.length > 0 && this.sceneBg.children[0].name !== img)
        ) {
            const bgPrefab = await ResourceLoader.loadPrefab(img);
            const bgNode = cc.instantiate(bgPrefab);
            this.sceneBg.removeAllChildren();
            this.sceneBg.addChild(bgNode);
        }
    }

    // @message([EventName.playerEquipmentDrawcard])
    handlePlayerClick() {
        // GModel.stone.stopAuto();
        // if (GModel.playerEquipment.temp().length !== 0) {
        //     // 提示需要先装备
        //     GTip.showTip(["_rs先将装备替换，出售或分解后才能继续"]);
        //     return;
        // }
        // GModel.equipmentScene.data.addPlayerOrder({ kind: "attack" });
    }

    checkAuto() {
        if (GModel.stone.isAuto() && GModel.playerEquipment.temp().length === 0) {
            if (this.mode === "wait") {
                this.mode = "next";
            }
        }
    }
    @message([EventName.equipmentSceneMonsterRefresh])
    checkMonster() {
        // 检查是否缺少实例化
        const allId = GModel.equipmentScene.allMonsterUniqueId();
        allId.forEach((uid) => {
            if (!this.monsterObject.has(uid)) {
                const m = ResourceLoader.getNodeSyncWithPreload(ListItemEquipmentSceneMonster);
                this.objectContainer.addChild(m.node);
                m.setState({ uniqueId: uid });
                this.monsterObject.set(uid, m);
            }
        });
        const needRemove: number[] = [];
        this.monsterObject.forEach((v, k) => {
            if (!allId.includes(k)) {
                needRemove.push(k);
            }
        });
        needRemove.forEach((k) => {
            this.monsterObject.get(k).die();
            this.monsterObject.delete(k);
        });
    }

    followPlayer() {
        GCamera.battleCamera.node.position = this.playerObject.node.position;
    }

    protected update(dt: number): void {
        GModel.equipmentScene.data.tick();
        this.playerObject.tick();
        this.monsterObject.forEach((v) => v.tick());
        this.followPlayer();
    }
    // private playerAttackTimer = 0;
    // private handleNext() {
    //     this.playerObject.attack();
    //     this.playerAttackTimer = 0;
    //     this.mode = "playerAttack";
    // }

    // private async playerAttackUpdate(dt: number) {
    //     this.playerAttackTimer += dt;
    //     if (this.playerAttackTimer > 0.6) {
    //         if (this.bulletObject) {
    //             this.bulletObject.recycle();
    //             this.bulletObject = null;
    //         }
    //         this.bulletObject = ResourceLoader.getNodeSyncWithPreload(ListItemEquipmentSceneBullet);
    //         this.objectContainer.addChild(this.bulletObject.node);
    //         const uniqueId = GModel.equipmentScene.currentTargetMonster();
    //         this.bulletObject.setState({ targetUniqueId: uniqueId });
    //         this.mode = "bulletFly";
    //     }
    // }

    // private async bulletFlyUpdate() {
    //     // 更新子弹位置
    //     const ok = this.bulletObject.refreshPos();
    //     if (ok) {
    //         this.bulletObject.recycle();
    //         this.bulletObject = null;
    //         // 命中
    //         this.mode = "waitResponse";
    //         const allMode = GModel.stone.stoneAuto().all && GModel.equipmentScene.isCanUseAllAttackMode();
    //         const isAuto = GModel.stone.isAuto();
    //         // 受击表现
    //         const targetMonster = GModel.equipmentScene.currentTargetMonster();
    //         if (allMode) {
    //             // 全体模式
    //             this.monsterObject.forEach((m) => {
    //                 m.hit(allMode);
    //                 m.die();
    //             });
    //             this.monsterObject.clear();
    //         } else {
    //             // 单击模式
    //             const m = this.monsterObject.get(targetMonster);
    //             m.hit(allMode);
    //             const data = GModel.equipmentScene.getEquipmentMonsterWithPosition(targetMonster);
    //             if (data.life <= 1) {
    //                 m.die();
    //                 this.monsterObject.delete(targetMonster);
    //             }
    //         }
    //         const res = await GModel.stone.drawCard(allMode, isAuto);
    //         this.mode = "wait";
    //         // todo 处理奖励展示
    //         let temp = GModel.playerEquipment.temp();
    //         if (temp.length > 0) {
    //             // 替换装备窗口
    //             if (temp.length == 1) {
    //                 GWindow.open(WindowSelectProp, {
    //                     playerEquipment: temp[0],
    //                     tempIndex: 0,
    //                 });
    //             } else {
    //                 GWindow.open(WindowSelectManyProp, { playerEquipments: temp });
    //             }
    //         }
    //     }
    // }
}
