import ResourceLoader from "../../../framework/ResourceLoader";
import EventBus from "../../../framework/event/EventBus";
import EventName from "../../event/EventName";
import ListItemManorBuilding from "./ListItemManorBuilding";

interface BaseZoomState {
    ctx: ManorControl;
    onTouchStart(event: cc.Event.EventTouch): void;
    onTouchMove(event: cc.Event.EventTouch): void;
    onTouchEnd(event: cc.Event.EventTouch): void;
    update(dt: number): void;
    endState(): void;
}
/** 基本状态 */
class NormalState implements BaseZoomState {
    constructor(public ctx: ManorControl) {}
    private chosenId = -1;
    private singleTouchStartPos: cc.Vec2 = null;

    private switchToEdit = () => {
        this.ctx.switchState("edit");
    };

    onTouchStart(event: cc.Event.EventTouch) {
        let touches = event.getTouches();
        if (touches.length == 1) {
            this.singleTouchStartPos = touches[0].getLocation();
            const pos = this.ctx.node.convertToNodeSpaceAR(touches[0].getLocation());
            const blockPos = GModel.manor.gamePosToBlockPos(pos);
            const id = GModel.manor.getPosId(blockPos);
            console.log("click", id);
            if (id > 0) {
                this.chosenId = id;
            } else {
                this.chosenId = -1;
            }
        }
        this.ctx.baseTouchStart(event);
    }
    onTouchMove(event: cc.Event.EventTouch): void {
        this.ctx.baseTochMove(event);
    }
    onTouchEnd(event: cc.Event.EventTouch): void {
        this.ctx.baseTouchEnd(event);
        let touches = event.getTouches();
        if (this.chosenId > 0 && touches.length == 1) {
            // const curPos: cc.Vec2 = touches[0].getLocation();
            if (this.ctx.accMoveDistance < 65) {
                this.onClick(this.chosenId);
            }
        }
    }
    endState() {}
    onClick(id: number) {
        let facilityTbl = GTable.getById("ManorFacilityTbl", id);
        if (facilityTbl) {
            if (facilityTbl.unlock <= GModel.player.level()) {
                console.log(facilityTbl.name);
            } else {
                GTip.showTip(["_rs等级不足"]);
            }
        }
    }
    update(dt: number): void {}
}
/** 编辑状态 */
class EditState implements BaseZoomState {
    constructor(public ctx: ManorControl) {
        EventBus.emit(EventName.showGrid);
        this.ctx.setArea = [];
        EventBus.emit(EventName.refreshGrid);
    }

    private tempNode: cc.Node = null;
    private id: number = null;
    private lastTouchPoint: cc.Vec2 = null;
    private originPos: { x: number; y: number } = null;

    private async chooseBuilding(id: number, pos: { x: number; y: number }) {
        if (this.id === id) return;
        if (this.tempNode) {
            await this.tempNode.getComponent(ListItemManorBuilding).setNode(this.originPos);
            this.tempNode.destroy();
        }
        let index = GModel.manor.getIndex(id, pos);
        let origin = GModel.manor.getMap()[id][index];
        this.originPos = { x: origin[0], y: origin[1] };
        await GModel.manor.removeMapItem(id, index);
        this.id = id;
        const comp = ResourceLoader.getNodeSyncWithPreload(ListItemManorBuilding);
        comp.setState({
            status: "edit",
            id,
            remove: async () => {
                await GModel.manor.removeMapItem(id, index);
                comp.recycle();
            },
        });
        this.tempNode = comp.node;
        this.tempNode.parent = this.ctx.node.getChildByName("temp");
        this.ctx.changeColor(this.tempNode.getPosition(), this.id);
    }

    private isDrag = false;

    onTouchStart(event: cc.Event.EventTouch): void {
        let touches = event.getTouches();
        if (touches.length == 1) {
            // 否则看是否选中建筑
            const pos = this.ctx.node.getChildByName("id_grid").convertToNodeSpaceAR(touches[0].getLocation());
            const blockPos = GModel.manor.gamePosToBlockPos(pos);
            const id = GModel.manor.getPosId(blockPos);
            console.log(id);
            if (id > 0) {
                // 选中建筑，初始化
                this.chooseBuilding(id, blockPos);
                this.isDrag = true;
            } else {
                this.isDrag = false;
            }
        }
        this.ctx.baseTouchStart(event);
    }

    onTouchMove(event: cc.Event.EventTouch): void {
        if (this.isDrag) {
            let touches = event.getTouches();
            if (touches.length == 1) {
                let delta = event.getDelta();
                const newPos = this.tempNode.getPosition().add(delta);
                this.ctx.changeColor(newPos, this.id);
                this.tempNode.setPosition(newPos);
                const p = touches[0].getLocation();
                this.lastTouchPoint = p;
            }
        } else {
            this.ctx.baseTochMove(event);
        }
    }

    async onTouchEnd(event: cc.Event.EventTouch) {
        if (this.isDrag) {
            this.lastTouchPoint = null;
            const hasMove = await this.tempNode.getComponent(ListItemManorBuilding).onConfirm();
            if (!hasMove) {
                this.tempNode.getComponent(ListItemManorBuilding).setNode(this.originPos);
                this.tempNode.destroy();
                this.tempNode = null;
                this.id = -1;
                this.ctx.setArea = [];
                EventBus.emit(EventName.refreshGrid);
            }
        } else {
            this.ctx.baseTouchEnd(event);
        }
    }

    endState() {
        if (this.tempNode) {
            this.tempNode.getComponent(ListItemManorBuilding).setNode(this.originPos);
            this.tempNode.destroy();
            this.tempNode = null;
            this.id = -1;
            this.originPos = null;
        }
        EventBus.emit(EventName.hideGrid);
    }

    update(dt: number): void {
        // 检查边缘移动
        if (this.isDrag && this.lastTouchPoint) {
            const { x, y } = this.ctx.node.getPosition();
            if (Math.abs(this.lastTouchPoint.x) < 30) {
                this.ctx.node.x += 10;
            } else if (Math.abs(this.lastTouchPoint.x - cc.winSize.width) < 30) {
                this.ctx.node.x -= 10;
            }
            if (Math.abs(this.lastTouchPoint.y) < 30) {
                this.ctx.node.y += 10;
            } else if (Math.abs(this.lastTouchPoint.y - cc.winSize.height) < 30) {
                this.ctx.node.y -= 10;
            }
            this.ctx.restrictPic();
            this.tempNode.x += x - this.ctx.node.x;
            this.tempNode.y += y - this.ctx.node.y;
        }
    }
}
/** 建造状态 */
class BuildState implements BaseZoomState {
    constructor(public ctx: ManorControl, id: number) {
        EventBus.emit(EventName.showGrid);
        this.id = id;
        const comp = ResourceLoader.getNodeSyncWithPreload(ListItemManorBuilding);
        comp.setState({
            id,
            status: "build",
            confirm: async () => {
                let x = ctx.setArea[0][0];
                let y = ctx.setArea[0][1];
                switch (GModel.manor.checkBuildable(id, x, y)) {
                    case "ok":
                        await GModel.manor.setMap(id, x, y);
                        comp.recycle();
                        ctx.switchState("base");
                        return;
                    case "hasOtherBuilding":
                        GTip.showTip(["_rs存在其他建筑"]);
                        return;
                    case "overEdge":
                        GTip.showTip(["_rs超出可建造范围"]);
                        return;
                }
            },
            cancel: () => {
                comp.recycle();
                ctx.switchState("base");
            },
        });
        this.tempNode = comp.node;
        this.tempNode.parent = this.ctx.node.getChildByName("temp");
        const center = {
            x: -this.ctx.node.x,
            y: -this.ctx.node.y,
        };
        comp.node.x = center.x;
        comp.node.y = center.y;
        ctx.changeColor(center, id);
    }

    private tempNode: cc.Node = null;
    private id: number = null;
    private isDrag: boolean = false;
    private lastTouchPoint: cc.Vec2 = null;

    onTouchStart(event: cc.Event.EventTouch): void {
        const p = event.getTouches()[0];
        const point = this.tempNode.convertToNodeSpaceAR(p.getLocation());
        const rec = GModel.manor.getBuildingRect(this.id);
        // 选中了节点，可以拖拽
        this.isDrag = rec.contains(point);
        if (!this.isDrag) {
            this.ctx.baseTouchStart(event);
        }
    }

    onTouchMove(event: cc.Event.EventTouch): void {
        if (this.isDrag) {
            let delta = event.getDelta();
            const newPos = this.tempNode.getPosition().add(delta);
            this.ctx.changeColor(newPos, this.id);
            this.tempNode.setPosition(newPos);
            this.lastTouchPoint = event.getTouches()[0].getLocation();
            this.ctx.restrictPic();
        } else {
            this.ctx.baseTochMove(event);
        }
    }

    onTouchEnd(event: cc.Event.EventTouch): void {
        if (this.isDrag) {
            // 网格吸附
            this.tempNode.getComponent(ListItemManorBuilding).syncPos();
        } else {
            this.ctx.baseTouchEnd(event);
        }
        this.lastTouchPoint = null;
    }

    endState() {
        EventBus.emit(EventName.hideGrid);
    }

    update(dt: number): void {
        // 检查边缘移动
        if (this.lastTouchPoint) {
            const { x, y } = this.ctx.node.getPosition();
            if (Math.abs(this.lastTouchPoint.x) < 30) {
                this.ctx.node.x += 10;
            } else if (Math.abs(this.lastTouchPoint.x - cc.winSize.width) < 30) {
                this.ctx.node.x -= 10;
            }
            if (Math.abs(this.lastTouchPoint.y) < 30) {
                this.ctx.node.y += 10;
            } else if (Math.abs(this.lastTouchPoint.y - cc.winSize.height) < 30) {
                this.ctx.node.y -= 10;
            }
            this.ctx.restrictPic();
            this.tempNode.x += x - this.ctx.node.x;
            this.tempNode.y += y - this.ctx.node.y;
        }
    }
}
/** 种田状态 */
class AddPlantState implements BaseZoomState {
    constructor(public ctx: ManorControl) {}
    onTouchStart(event: cc.Event.EventTouch): void {}
    onTouchMove(event: cc.Event.EventTouch): void {}
    onTouchEnd(event: cc.Event.EventTouch): void {}
    endState() {}
    update(dt: number): void {}
}
export default class ManorControl extends cc.Component {
    private __dragRang: cc.Rect;
    private __minScale: number = 1;
    private __maxScale: number = 2;
    private startPos1: cc.Vec2 = null;
    private startPos2: cc.Vec2 = null;
    private pointsDis: number = null;
    public map = GModel.manor.getMap();
    public setArea: number[][] = [];
    protected onLoad(): void {
        this.__dragRang = new cc.Rect();
        this.__dragRang.width = this.node.getChildByName("id_grid").width;
        this.__dragRang.height = this.node.getChildByName("id_grid").height;
        this.__dragRang.x = this.node.getPosition().x;
        this.__dragRang.y = this.node.getPosition().y;
        this.initEvent();
    }
    // 当前的场景状态机
    private state: BaseZoomState = new NormalState(this);
    private stateIndex: "base" | "addPlant" | "build" | "edit" = "base";
    get currentState() {
        return this.stateIndex;
    }
    accMoveDistance = 0;
    initEvent(): void {
        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.node.on(cc.Node.EventType.MOUSE_WHEEL, this.onMouseWheel, this);
    }
    switchState(index: "base" | "addPlant" | "build" | "edit", id?: number) {
        if (this.stateIndex === index) return;
        this.stateIndex = index;
        this.state.endState();
        switch (index) {
            case "base":
                this.state = new NormalState(this);
                return;
            case "addPlant":
                this.state = new AddPlantState(this);
                return;
            case "build":
                this.state = new BuildState(this, id);
                return;
            case "edit":
                this.state = new EditState(this);
                return;
        }
    }
    onTouchStart(event: cc.Event.EventTouch) {
        this.state.onTouchStart(event);
    }
    onTouchMove(event: cc.Event.EventTouch) {
        this.state.onTouchMove(event);
    }
    onTouchEnd(event: cc.Event.EventTouch) {
        this.state.onTouchEnd(event);
    }
    onMouseWheel(event: cc.Event.EventMouse) {
        let scale = 1 + event.getScrollY() / 1200;
        this.node.scale *= scale;

        if (this.node.scale > this.__maxScale) this.node.scale = this.__maxScale;
        if (this.node.scale < this.__minScale) this.node.scale = this.__minScale;
        this.limitNodePosition();
    }
    private limitNodePosition() {
        // console.log(this.__dragRang, cc.winSize.width, this.__minScale);
        let minX = -((this.__dragRang.width + 100) * this.node.scale - cc.winSize.width) / 2;
        let maxX = ((this.__dragRang.width + 100) * this.node.scale - cc.winSize.width) / 2;
        let minY = -((this.__dragRang.height + 250) * this.node.scale - cc.winSize.height) / 2;
        let maxY = ((this.__dragRang.height + 250) * this.node.scale - cc.winSize.height) / 2;
        if (this.node.x < minX) {
            this.node.x = minX;
        }
        if (this.node.x > maxX) {
            this.node.x = maxX;
        }
        if (this.node.y < minY) this.node.y = minY;
        if (this.node.y > maxY) this.node.y = maxY;
    }
    baseTouchStart(event: cc.Event.EventTouch) {
        this.startPos1 = null;
        this.startPos2 = null;
        this.pointsDis = null;
        let touches = event.getTouches();
        if (touches.length == 1) {
        } else if (touches.length == 2) {
            // 双指
            this.startPos1 = this.node.convertToNodeSpaceAR(touches[0].getLocation());
            this.startPos2 = this.node.convertToNodeSpaceAR(touches[1].getLocation());
            this.pointsDis = this.startPos1.sub(this.startPos2).mag();
        }

        // console.log("touches:", touches);
        // console.log("getID:", event.getID());
        this.accMoveDistance = 0;
    }

    baseTochMove(event: cc.Event.EventTouch) {
        let touches = event.getTouches();
        if (touches.length == 1) {
            // 一根手指是移动
            let delta = event.getDelta();
            this.accMoveDistance += delta.mag();
            this.node.setPosition(this.node.getPosition().add(delta));
            this.restrictPic();
        } else if (touches.length == 2) {
            // 两根手指是缩放
            let touchPoint1 = this.node.convertToNodeSpaceAR(touches[0].getLocation());
            let touchPoint2 = this.node.convertToNodeSpaceAR(touches[1].getLocation());
            let newPointsDis = touchPoint1.sub(touchPoint2).mag();

            if (!this.pointsDis)
                // 该行代码针对安卓手机
                this.pointsDis = 0;

            if (newPointsDis > this.pointsDis) {
                // 表明两根手指在往外划
                this.pointsDis = newPointsDis;
                this.node.scale += 0.05;
            } else if (newPointsDis < this.pointsDis) {
                // 表明两根手指在往内划
                if (this.node.scale <= 1) {
                    this.node.scale = 1;
                    return;
                }

                this.pointsDis = newPointsDis;
                this.node.scale -= 0.05;
            }

            this.restrictPic();
        }
    }
    restrictPic() {
        // 限制移动，放置出现黑边
        // let picWidth = this.node.getBoundingBox().width;
        // let picHeight = this.node.getBoundingBox().height;
        // if (this.node.x > 0 && this.node.x - 0 > picWidth / 2 - cc.winSize.width / 2)
        //     this.node.x = picWidth / 2 - cc.winSize.width / 2;
        // if (this.node.x < 0 && this.node.x - 0 < cc.winSize.width / 2 - picWidth / 2)
        //     this.node.x = cc.winSize.width / 2 - picWidth / 2;
        // if (this.node.y > 0 && this.node.y - 0 > picHeight / 2 - cc.winSize.height / 2)
        //     this.node.y = picHeight / 2 - cc.winSize.height / 2;
        // if (this.node.y < 0 && this.node.y - 0 < cc.winSize.height / 2 - picHeight / 2)
        //     this.node.y = cc.winSize.height / 2 - picHeight / 2;
    }

    baseTouchEnd(event: cc.Event.EventTouch) {}

    changeColor(tempNodePos: { x: number; y: number }, id: number) {
        this.setArea = [];
        const map = GModel.manor.getMapMatrix();
        let facility = GTable.getById("ManorFacilityTbl", Number(id));
        let decoration = GTable.getById("ManorDecorationTbl", Number(id));
        let tbl = facility ? facility : decoration;
        const width = tbl.area[0];
        const height = tbl.area[1];
        const centerPos = GModel.manor.gamePosToBlockPos(tempNodePos);
        const leftBottomPos = GModel.manor.centerToLeftBottom(id, centerPos);
        for (let y = leftBottomPos.y; y < leftBottomPos.y + height; y++) {
            for (let x = leftBottomPos.x; x < leftBottomPos.x + width; x++) {
                if (!map[y]) continue;
                if (!map[y][x]) continue;
                this.setArea.push([x, y]);
            }
        }
        EventBus.emit(EventName.refreshGrid);
    }

    protected update(dt: number): void {}
}
