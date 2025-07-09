import { autowired, registerClass } from "../../../framework/Decorator";
import ResourceLoader from "../../../framework/ResourceLoader";
import { GameDate } from "../../../framework/date/GameDate";
import UIButton from "../../../framework/ui/UIButton";
import UIWindow from "../../../framework/ui/UIWindow";
import { BattleUtils } from "../../battleLogic/Utils/BattleUtils";
import WindowCommonConfirm from "../common/WindowCommonConfirm";

const { ccclass, property } = cc._decorator;
@registerClass("WindowMapEdit")
@ccclass
export default class WindowMapEdit extends UIWindow {
    _windowParam: {
        mapName: string;
    };
    _returnValue: any;
    /** 场景背景 */
    @autowired(cc.Node) sceneBg: cc.Node = null;
    @autowired(cc.Node) objectContainer: cc.Node = null;
    @autowired(cc.Node) gridContainer: cc.Node = null;

    @autowired(UIButton) allRoadBtn: UIButton = null;
    @autowired(UIButton) allObstacleBtn: UIButton = null;
    @autowired(UIButton) roadBtn: UIButton = null;
    @autowired(UIButton) obstacleBtn: UIButton = null;
    @autowired(UIButton) monsterBtn: UIButton = null;
    @autowired(UIButton) moveBtn: UIButton = null;
    @autowired(UIButton) saveBtn: UIButton = null;
    @autowired(UIButton) removeAllMonsterBtn: UIButton = null;

    grid: cc.Node[][] = [];
    roadData: boolean[][] = [];
    monsterBornData: { x: number[]; y: number[] }[] = [];

    protected async onInited() {
        window["d"] = this;
        const btns = this.node.getChildByName("btn");
        btns.parent = cc.find("Canvas");
        this.state = new MapEditMoveState(this);
        this.initBtn();
        this.sceneBg.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.sceneBg.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.sceneBg.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.sceneBg.on(cc.Node.EventType.MOUSE_WHEEL, this.onMouseWheel, this);
        await this.loadBg(this._windowParam.mapName);
        await this.initGrid();
        this.initRoad();
        this.initMonster();
    }

    private async initGrid() {
        const gridPrefab = await ResourceLoader.loadPrefab("battleMapBlock");
        const tbl = GTable.getList("BattleSceneInfoTbl").find((tbl) => tbl.prefab === this._windowParam.mapName);
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

    private initRoad() {
        const tbl = GTable.getList("BattleSceneInfoTbl").find((tbl) => tbl.prefab === this._windowParam.mapName);
        if (tbl.road === "") {
            const [x, y] = tbl.gridCount;
            for (let i = 0; i < y; i++) {
                const list: boolean[] = [];
                for (let j = 0; j < x; j++) {
                    list.push(true);
                }
                this.roadData.push(list);
            }
        } else {
            this.roadData = BattleUtils.map.decodeMap(tbl.road);
        }
        this.refreshGrid();
    }

    private initMonster() {
        const tbl = GTable.getList("BattleSceneInfoTbl").find((tbl) => tbl.prefab === this._windowParam.mapName);
        if (tbl.monsterPoint === "") {
            this.monsterBornData = [];
        } else {
            this.monsterBornData = BattleUtils.map.decodeMonsterBorn(tbl.monsterPoint);
        }
        this.refreshGrid();
    }

    private initBtn() {
        this.allRoadBtn.onClick = async () => {
            // 将地图重置为全部是道路
            const ok = await GWindow.open(WindowCommonConfirm, { tip: ["_rs是否将整个地图重置为道路？"] });
            if (ok) {
                this.roadData.forEach((list) => {
                    list.fill(true);
                });
            }
            this.refreshGrid();
        };
        this.allObstacleBtn.onClick = async () => {
            // 将地图重置为全部是障碍
            const ok = await GWindow.open(WindowCommonConfirm, { tip: ["_rs是否将整个地图重置为障碍？"] });
            if (ok) {
                this.roadData.forEach((list) => {
                    list.fill(false);
                });
            }
            this.refreshGrid();
        };
        this.removeAllMonsterBtn.onClick = async () => {
            // 将地图重置为全部是障碍
            const ok = await GWindow.open(WindowCommonConfirm, { tip: ["_rs是否移除上一个出怪点？"] });
            if (ok) {
                this.monsterBornData.pop();
            }
            this.refreshGrid();
        };
        this.roadBtn.onClick = () => {
            // 道路笔刷
            this.switchState("road");
        };
        this.obstacleBtn.onClick = () => {
            // 障碍笔刷
            this.switchState("obstacle");
        };
        this.monsterBtn.onClick = () => {
            // 出怪点设置模式
            this.switchState("monster");
        };
        this.moveBtn.onClick = () => {
            // 移动模式
            this.switchState("move");
        };
        this.saveBtn.onClick = () => {
            // 保存地图信息
            const str = BattleUtils.map.encodeMap(this.roadData);
            this.download(
                "road_" + GUtils.date.formatRemainTime(Date.now() + GameDate.OneHour * 8, "hh_mm_ss") + ".txt",
                str
            );
            const str2 = BattleUtils.map.encodeMonsterBorn(this.monsterBornData);
            this.download(
                "monster_" + GUtils.date.formatRemainTime(Date.now() + GameDate.OneHour * 8, "hh_mm_ss") + ".txt",
                str2
            );
        };
    }

    private download(name: string, data: string) {
        let blob = new Blob([data]);
        let link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = name;
        link.click();
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

    state: IMapEditState = null;

    switchState(mode: "road" | "obstacle" | "monster" | "move") {
        switch (mode) {
            case "move": {
                if (this.state instanceof MapEditMoveState) return;
                this.state = new MapEditMoveState(this);
                return;
            }
            case "monster": {
                if (this.state instanceof MapEditMonsterState) return;
                this.state = new MapEditMonsterState(this);
                return;
            }
            case "obstacle": {
                if (this.state instanceof MapEditObstacleState) return;
                this.state = new MapEditObstacleState(this);
                return;
            }
            case "road": {
                if (this.state instanceof MapEditRoadState) return;
                this.state = new MapEditRoadState(this);
                return;
            }
        }
    }

    refreshGrid() {
        for (let i = 0; i < this.grid.length; i++) {
            const nodeList = this.grid[i];
            const roadList = this.roadData[i];
            nodeList.forEach((node, index) => {
                node.color = roadList[index] ? cc.Color.GREEN : cc.Color.RED;
            });
        }
        this.monsterBornData.forEach((d) => {
            for (let i = d.y[0]; i <= d.y[1]; i++) {
                for (let j = d.x[0]; j <= d.x[1]; j++) {
                    const node = this.grid[i][j];
                    node.color = cc.Color.BLUE;
                }
            }
        });
    }

    onTouchStart(event: cc.Event.EventTouch): void {
        this.state.onTouchStart(event);
    }
    onTouchMove(event: cc.Event.EventTouch): void {
        this.state.onTouchMove(event);
    }
    onTouchEnd(event: cc.Event.EventTouch): void {
        this.state.onTouchEnd(event);
    }
    onMouseWheel(event: cc.Event.EventMouse): void {
        let scale = 1 + event.getScrollY() / 1200;
        GCamera.battleCamera.zoomRatio *= scale;
    }
}

interface IMapEditState {
    ctx: WindowMapEdit;
    onTouchStart(event: cc.Event.EventTouch): void;
    onTouchMove(event: cc.Event.EventTouch): void;
    onTouchEnd(event: cc.Event.EventTouch): void;
}

class MapEditMoveState implements IMapEditState {
    constructor(public ctx: WindowMapEdit) {}

    onTouchStart(event: cc.Event.EventTouch): void {}
    onTouchMove(event: cc.Event.EventTouch): void {
        const delta = event.getDelta();
        GCamera.battleCamera.node.position = GCamera.battleCamera.node.position.sub(cc.v3(delta.x, delta.y));
    }
    onTouchEnd(event: cc.Event.EventTouch): void {}
}

class MapEditRoadState implements IMapEditState {
    private beginPos: { x: number; y: number } = null;
    constructor(public ctx: WindowMapEdit) {}
    onTouchStart(event: cc.Event.EventTouch): void {
        const tbl = GTable.getList("BattleSceneInfoTbl").find((tbl) => tbl.prefab === this.ctx._windowParam.mapName);
        const screenPos = event.getLocation();
        const worldPos = cc.v3();
        // 将一个屏幕坐标系下的点转换到世界坐标系下
        GCamera.battleCamera.getScreenToWorldPoint(screenPos, worldPos);
        const relatePos = this.ctx.node.convertToNodeSpaceAR(worldPos);
        const { x, y } = BattleUtils.map.gamePosToGridPos(relatePos, tbl.gridSize, tbl.gridCount);
        this.beginPos = { x: Math.round(x), y: Math.round(y) };
    }
    onTouchMove(event: cc.Event.EventTouch): void {}
    onTouchEnd(event: cc.Event.EventTouch): void {
        const tbl = GTable.getList("BattleSceneInfoTbl").find((tbl) => tbl.prefab === this.ctx._windowParam.mapName);
        const screenPos = event.getLocation();
        const worldPos = cc.v3();
        GCamera.battleCamera.getScreenToWorldPoint(screenPos, worldPos);
        const relatePos = this.ctx.node.convertToNodeSpaceAR(worldPos);
        const { x, y } = BattleUtils.map.gamePosToGridPos(relatePos, tbl.gridSize, tbl.gridCount);
        const endPos = { x: Math.round(x), y: Math.round(y) };
        BattleUtils.map.changeRoadData(this.ctx.roadData, this.beginPos, endPos, true);
        this.ctx.refreshGrid();
    }
}

class MapEditMonsterState implements IMapEditState {
    constructor(public ctx: WindowMapEdit) {}
    private beginPos: { x: number; y: number } = null;
    onTouchStart(event: cc.Event.EventTouch): void {
        const tbl = GTable.getList("BattleSceneInfoTbl").find((tbl) => tbl.prefab === this.ctx._windowParam.mapName);
        const screenPos = event.getLocation();
        const worldPos = cc.v3();
        // 将一个屏幕坐标系下的点转换到世界坐标系下
        GCamera.battleCamera.getScreenToWorldPoint(screenPos, worldPos);
        const relatePos = this.ctx.node.convertToNodeSpaceAR(worldPos);
        const { x, y } = BattleUtils.map.gamePosToGridPos(relatePos, tbl.gridSize, tbl.gridCount);
        this.beginPos = { x: Math.round(x), y: Math.round(y) };
    }
    onTouchMove(event: cc.Event.EventTouch): void {}
    onTouchEnd(event: cc.Event.EventTouch): void {
        const tbl = GTable.getList("BattleSceneInfoTbl").find((tbl) => tbl.prefab === this.ctx._windowParam.mapName);
        const screenPos = event.getLocation();
        const worldPos = cc.v3();
        GCamera.battleCamera.getScreenToWorldPoint(screenPos, worldPos);
        const relatePos = this.ctx.node.convertToNodeSpaceAR(worldPos);
        const { x, y } = BattleUtils.map.gamePosToGridPos(relatePos, tbl.gridSize, tbl.gridCount);
        const endPos = { x: Math.round(x), y: Math.round(y) };
        this.ctx.monsterBornData.push(BattleUtils.map.getMonsterBorn(this.ctx.roadData, this.beginPos, endPos));
        this.ctx.refreshGrid();
    }
}

class MapEditObstacleState implements IMapEditState {
    constructor(public ctx: WindowMapEdit) {}
    private beginPos: { x: number; y: number } = null;
    onTouchStart(event: cc.Event.EventTouch): void {
        const tbl = GTable.getList("BattleSceneInfoTbl").find((tbl) => tbl.prefab === this.ctx._windowParam.mapName);
        const screenPos = event.getLocation();
        const worldPos = cc.v3();
        // 将一个屏幕坐标系下的点转换到世界坐标系下
        GCamera.battleCamera.getScreenToWorldPoint(screenPos, worldPos);
        const relatePos = this.ctx.node.convertToNodeSpaceAR(worldPos);
        const { x, y } = BattleUtils.map.gamePosToGridPos(relatePos, tbl.gridSize, tbl.gridCount);
        this.beginPos = { x: Math.round(x), y: Math.round(y) };
    }
    onTouchMove(event: cc.Event.EventTouch): void {}
    onTouchEnd(event: cc.Event.EventTouch): void {
        const tbl = GTable.getList("BattleSceneInfoTbl").find((tbl) => tbl.prefab === this.ctx._windowParam.mapName);
        const screenPos = event.getLocation();
        const worldPos = cc.v3();
        GCamera.battleCamera.getScreenToWorldPoint(screenPos, worldPos);
        const relatePos = this.ctx.node.convertToNodeSpaceAR(worldPos);
        const { x, y } = BattleUtils.map.gamePosToGridPos(relatePos, tbl.gridSize, tbl.gridCount);
        const endPos = { x: Math.round(x), y: Math.round(y) };
        BattleUtils.map.changeRoadData(this.ctx.roadData, this.beginPos, endPos, false);
        this.ctx.refreshGrid();
    }
}
