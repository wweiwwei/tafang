import { EnumFacilityType } from "../../config/GEnum";
import WindowArenaList from "../arena/WindowArenaList";
import WindowBuildingChallenge from "../battle/WindowBuildingChallenge";
import WindowBuildingDetail from "../mainscene/WindowBuildingDetail";
import WindowMine from "../mine/WindowMine";
import WindowTowerScene from "../tower/WindowTowerScene";

export default class SceneControl extends cc.Component {
    private __touchIds: Array<{ id: number; location: cc.Vec2 }> = [];
    private __originDist: number = -1;
    private __originScale: number = -1;
    private __originCenter: cc.Vec2 = null;
    private __touchStartPos: cc.Vec2;
    private __originPos: cc.Vec2;
    private __minScale: number = 1;
    private __maxScale: number = 2;
    private __dragRang: cc.Rect;
    private __doubleClick: boolean = false;

    protected onLoad(): void {
        this.__dragRang = new cc.Rect();
        this.__dragRang.width = this.node.getChildByName("buildfront").width;
        this.__dragRang.height = this.node.getChildByName("buildfront").height;
        this.__dragRang.x = this.node.getPosition().x;
        this.__dragRang.y = this.node.getPosition().y;
    }

    initEvent(): void {
        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
        this.node.on(cc.Node.EventType.MOUSE_WHEEL, this.onMouseWheel, this);
    }

    onTouchStart(event: cc.Event.EventTouch): void {
        this.updateTouchIds(event.getID(), event.getLocation());
        if (this.__touchIds.length > 1) {
            let point0: cc.Vec2 = this.__touchIds[0].location;
            let point1: cc.Vec2 = this.__touchIds[1].location;
            this.__originDist = cc.Vec2.distance(point0, point1);
            this.__originScale = this.node.scale;
            this.__originCenter = this.node.convertToNodeSpaceAR(point0.add(point1).mul(0.5));
        } else {
            this.__originDist = -1;
            this.__originScale = -1;
            this.__touchStartPos = event.getLocation();
            this.__originPos = this.node.getPosition();
        }
        this.limitNodePosition();
    }
    onTouchMove(event: cc.Event.EventTouch): void {
        this.updateTouchIds(event.getID(), event.getLocation());
        if (this.__touchIds.length == 1 && this.__originDist == -1) {
            let pos = this.__touchIds[0].location;
            if (this.__originPos != null && this.__touchStartPos != null) {
                let dist = pos.sub(this.__touchStartPos);
                pos = this.__originPos.add(dist);
                this.node.setPosition(pos);
            }
        } else {
            let point0: cc.Vec2 = this.__touchIds[0].location;
            let point1: cc.Vec2 = this.__touchIds[1].location;
            let dist = cc.Vec2.distance(point0, point1);
            if (this.__originDist == -1) {
                this.__originDist = dist;
                this.__originScale = this.node.scale;
                this.__originCenter = this.node.convertToNodeSpaceAR(point0.add(point1).mul(0.5));
            } else {
                this.node.scale = (this.__originScale * dist) / this.__originDist;
                if (this.node.scale < this.__minScale) {
                    this.node.scale = this.__minScale;
                }

                if (this.node.scale > this.__maxScale) {
                    this.node.scale = this.__maxScale;
                }
            }
        }
        this.limitNodePosition();
    }
    async onTouchEnd(event: cc.Event.EventTouch) {
        this.removeTouchIds(event.getID());
        let pos = event.getLocation();
        if (this.__touchIds.length == 0) {
            if (this.__touchStartPos == null) return;
            let dVec = pos.sub(this.__touchStartPos);
            if (this.__doubleClick) {
                this.__doubleClick = false;
                return;
            }
            if (dVec.mag() < 20) {
                const node = this.node.getChildByName("touch").children.find((touchNode) => {
                    let faciEmtityRect: cc.Rect = touchNode.getBoundingBoxToWorld();
                    return faciEmtityRect.contains(event.getLocation());
                });
                if (!node) return;
                const posId = Number(node.name);
                const facilityId = GTable.getList("FacilityTbl").find((t) => t.posId === posId).id;
                if (GTest.sDebug) return;
                if (GWindow.sceneEventBlock) return;
                if (GWindow.sceneLimit > 0 && GWindow.sceneLimit != facilityId) return;
                this.handleOpenFacility(facilityId);
            }
        }
    }

    async handleOpenFacility(facilityId: number) {
        const facilityData = GModel.facility.getFacilityById(facilityId);
        const originX = this.node.x;
        const originY = this.node.y;
        const originScale = this.node.scaleX;
        if (facilityData.unlock) {
            const f = GModel.facility.getFacilityById(facilityId);
            if (f.getKind() === EnumFacilityType.entrance) {
                if (f.id === 10017) {
                    this.focusFacility(facilityId);
                    await GWindow.open(WindowTowerScene);
                    cc.tween(this.node)
                        .to(0.15, { x: originX, y: originY, scale: originScale }, { easing: "sineInOut" })
                        .start();
                } else if (f.id === 10022) {
                    // GTip.showTip(["_rs敬请期待"]);
                    GWindow.open(WindowMine);
                } else if (f.id === 10016) {
                    // GTip.showTip(["_rs敬请期待"]);
                    // this.focusFacility(facilityId);
                    await GWindow.open(WindowArenaList);
                    // cc.tween(this.node)
                    //     .to(0.15, { x: originX, y: originY, scale: originScale }, { easing: "sineInOut" })
                    //     .start();
                } else {
                    GTip.showTip(["_rs敬请期待"]);
                }
            } else {
                this.focusFacility(facilityId);
                await GWindow.open(WindowBuildingDetail, { id: facilityId });
                cc.tween(this.node)
                    .to(0.15, { x: originX, y: originY, scale: originScale }, { easing: "sineInOut" })
                    .start();
            }
        } else {
            if (facilityData.isFacilityUnlockableEx(true)) {
                this.focusFacility(facilityId);
                await GWindow.open(WindowBuildingChallenge, { id: facilityData.id });
                cc.tween(this.node)
                    .to(0.15, { x: originX, y: originY, scale: originScale }, { easing: "sineInOut" })
                    .start();
            }
        }
    }

    onTouchCancel(event: cc.Event.EventTouch): void {}
    onMouseWheel(event: cc.Event.EventMouse): void {
        let scale = 1 + event.getScrollY() / 1200;
        this.node.scale *= scale;

        if (this.node.scale > this.__maxScale) this.node.scale = this.__maxScale;
        if (this.node.scale < this.__minScale) this.node.scale = this.__minScale;
        this.limitNodePosition();
    }

    private updateTouchIds(id: number, location: cc.Vec2) {
        let idx = this.__touchIds.findIndex((touch) => touch.id == id);
        if (idx == -1) {
            this.__touchIds.push({ id, location });
        } else {
            this.__touchIds[idx].location = location;
        }
        if (this.__touchIds.length > 1) {
            this.__doubleClick = true;
        }
    }
    private removeTouchIds(id: number) {
        let idx = this.__touchIds.findIndex((touch) => touch.id == id);
        if (idx > -1) {
            return this.__touchIds.splice(idx, 1);
        }
    }

    focusFacility(id: number, scaleVal: number = 2) {
        const posId = GTable.getById("FacilityTbl", id).posId;
        const node = this.node.getChildByName("touch").getChildByName(posId.toString());
        let worldPos = node.convertToWorldSpaceAR(cc.v2(0, 0));
        let scale = scaleVal / this.node.scale;
        let x = (this.node.x + (cc.winSize.width / 2 - worldPos.x)) * scale;
        let y = (this.node.y + (cc.winSize.height / 2 - worldPos.y)) * scale + 250;
        if (scaleVal == 1) {
            x = this.node.x;
            y = this.node.y + 250;
        }
        cc.tween(this.node).to(0.15, { x, y, scale: scaleVal }, { easing: "sineInOut" }).start();
    }

    /** 跟随某一节点 */
    followNode(node: cc.Node, scaleVal: number = 2) {
        let worldPos = node.convertToWorldSpaceAR(cc.v2(0, 0));
        let scale = scaleVal / this.node.scale;
        let x = (this.node.x + (cc.winSize.width / 2 - worldPos.x)) * scale;
        let y = (this.node.y + (cc.winSize.height / 2 - worldPos.y)) * scale + 250;
        this.node.scale = scaleVal;
        this.node.x = x;
        this.node.y = y;
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

    private getLimitNodePosition(toX: number, toY: number, scale: number): { x: number; y: number } {
        const minX = -(this.__dragRang.width * scale - cc.winSize.width) / 2;
        const maxX = (this.__dragRang.width * scale - cc.winSize.width) / 2;
        const minY = -(this.__dragRang.height * scale - cc.winSize.height) / 2;
        const maxY = (this.__dragRang.height * scale - cc.winSize.height) / 2;
        if (toX < minX) toX = minX;
        if (toX > maxX) toX = maxX;
        if (toY < minY) toY = minY;
        if (toY > maxY) toY = maxY;
        return { x: toX, y: toY };
    }

    private limitInfo: {
        id: number;
        begin: {
            x: number;
            y: number;
            scale: number;
        };
        end: {
            x: number;
            y: number;
            scale: number;
        };
        dt: number;
    } = null;

    protected update(dt: number): void {
        if (GWindow.sceneLimit > 0) {
            if (!this.limitInfo || this.limitInfo.id != GWindow.sceneLimit) {
                const id = GWindow.sceneLimit;
                const scaleVal = 2;
                const posId = GTable.getById("FacilityTbl", id).posId;
                const node = this.node.getChildByName("touch").getChildByName(posId.toString());
                let worldPos = node.convertToWorldSpaceAR(cc.v2(0, 0));
                let scale = scaleVal / this.node.scale;
                let x = (this.node.x + (cc.winSize.width / 2 - worldPos.x)) * scale;
                let y = (this.node.y + (cc.winSize.height / 2 - worldPos.y)) * scale - 250;
                const limitPos = this.getLimitNodePosition(x, y, scaleVal);
                this.limitInfo = {
                    id: id,
                    begin: {
                        x: this.node.x,
                        y: this.node.y,
                        scale: this.node.scale,
                    },
                    end: {
                        x: limitPos.x,
                        y: limitPos.y,
                        scale: scaleVal,
                    },
                    dt: 0,
                };
            }
            this.limitInfo.dt += dt;
            if (this.limitInfo.dt > 0.15) {
                this.node.x = this.limitInfo.end.x;
                this.node.y = this.limitInfo.end.y;
                this.node.scale = this.limitInfo.end.scale;
            } else {
                this.node.x =
                    this.limitInfo.begin.x +
                    (this.limitInfo.end.x - this.limitInfo.begin.x) * (this.limitInfo.dt / 0.15);
                this.node.y =
                    this.limitInfo.begin.y +
                    (this.limitInfo.end.y - this.limitInfo.begin.y) * (this.limitInfo.dt / 0.15);
                this.node.scale =
                    this.limitInfo.begin.scale +
                    (this.limitInfo.end.scale - this.limitInfo.begin.scale) * (this.limitInfo.dt / 0.15);
            }
        } else {
            this.limitInfo = null;
        }
    }
}
