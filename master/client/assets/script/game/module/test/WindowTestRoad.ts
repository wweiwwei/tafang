import { autowired, registerClass } from "../../../framework/Decorator";
import ResourceLoader from "../../../framework/ResourceLoader";
import UISpine from "../../../framework/ui/UISpine";
import UIWindow from "../../../framework/ui/UIWindow";
import { BattleRoadBezier } from "../../battleLogic/Processor/Road/BattleRoadBezier";
import { BattleRoadEllipse } from "../../battleLogic/Processor/Road/BattleRoadEllipse";
import { BattleRoadRect } from "../../battleLogic/Processor/Road/BattleRoadRect";
import { IBattleRoad } from "../../battleLogic/Processor/Road/IBattleRoad";
import ListItemBattleObject from "../battle/ListItemBattleObject";

const { ccclass, property } = cc._decorator;

@registerClass("WindowTestRoad")
@ccclass
export default class WindowTestRoad extends UIWindow {
    _windowParam: {
        id: number;
    };
    _returnValue: any;

    private walker: cc.Node[] = [];
    private roadNode: cc.Node;
    private road: IBattleRoad;
    protected async onInited() {
        const tbl = GTable.getById("BattleRoadInfoTbl", this._windowParam.id);
        const roadPrefab = await ResourceLoader.loadPrefab(tbl.img);
        const roadNode = cc.instantiate(roadPrefab);
        this.roadNode = roadNode;
        for (let i = 0; i < 10; i++) {
            this.walker.push((await ResourceLoader.getNode(ListItemBattleObject)).node);
        }
        this.node.addChild(roadNode);
        this.walker.forEach((x) => this.roadNode.addChild(x));
        if (tbl.kind === 1) {
            this.road = new BattleRoadEllipse();
        } else if (tbl.kind === 2) {
            this.road = new BattleRoadRect();
        } else if (tbl.kind === 3) {
            this.road = new BattleRoadBezier();
        } else {
            throw new Error(`illegal road kind ${tbl.kind}`);
        }
        this.road.init([0, 0], 1, tbl.road);
        roadNode.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
    }

    onTouchEnd(event: cc.Event.EventTouch): void {
        const pos = this.roadNode.convertToNodeSpaceAR(event.getLocation());
        console.log(pos.x, pos.y);
    }

    p: number = 0;
    protected update(dt: number): void {
        if (this.road) {
            this.p += dt * 0.1;
            this.walker.forEach((n, i) => {
                const { pos, direction } = this.road.getPointAt(this.p + 0.1 * i);
                n.x = pos.x;
                n.y = pos.y;
                if (direction.x > 0) {
                    n.scaleX = 1;
                } else {
                    n.scaleX = -1;
                }
            });
        }
    }
}
