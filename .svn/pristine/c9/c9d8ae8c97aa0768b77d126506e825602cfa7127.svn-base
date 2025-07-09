import { autowired, registerClass } from "../../../framework/Decorator";
import ResourceLoader from "../../../framework/ResourceLoader";
import UIList from "../../../framework/ui/UIList";
import UIListItem from "../../../framework/ui/UIListItem";
import UIScrollList from "../../../framework/ui/UIScrollList";
import { Sprite } from "../../entity/Sprite";
import ListItemSkill from "../mainsceneNew/ListItemSkill";
import WindowSpriit from "../mainsceneNew/WindowSpriit";
import ListItemSprite from "./ListItemSprite";

const { ccclass, property } = cc._decorator;
@registerClass("ListItemDragItem")
@ccclass
export default class ListItemDragItem extends UIListItem {
    @autowired(UIList) herocontainer: UIList<ListItemSkill> = null;
    state: {
        id: number;
        window: WindowSpriit;
        cb: (index?: number) => void;
    };
    private sprite: Sprite;
    setState(state: this["state"]): void {
        this.state = state;
        this.node.name = this.state.id.toString();
        this.sprite = GModel.sprite.getSpriteById(this.state.id);
        this.herocontainer.setState([
            {
                id: this.state.id,
                gray: this.sprite.level <= 0,
                chosen: GModel.sprite.getFormation().some((f) => f === this.state.id),
                progress: true,
                disableBtn: true,
            },
        ]);
    }

    protected onInjected(): void {
        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
    }

    protected onRecycle(): void {}

    private startPoint: cc.Vec2;
    private tempNode: ListItemSprite = null;

    onTouchStart(event: cc.Event.EventTouch) {
        this.state.window.spriteList.setEnable(false);
        let container = cc.find("Canvas/window/WindowCultivate/content/id_window/WindowSpriit/dragContainer");
        // console.log(event.getLocation());

        this.startPoint = container.convertToNodeSpaceAR(event.getLocation());
        // console.log(this.startPoint);
    }
    onTouchMove(event: cc.Event.EventTouch) {
        const pos = event.getLocation();
        let container = cc.find("Canvas/window/WindowCultivate/content/id_window/WindowSpriit/dragContainer");
        if (this.sprite.level > 0) {
            if (this.tempNode === null) {
                this.tempNode = ResourceLoader.getNodeSyncWithPreload(ListItemSprite);
                container.addChild(this.tempNode.node);
                this.tempNode.setState({ id: this.sprite.id, cb: null });
                this.tempNode.node.setPosition(this.startPoint);
            }
            this.tempNode.node.setPosition(container.convertToNodeSpaceAR(pos));
        }
    }
    onTouchEnd(event: cc.Event.EventTouch) {
        let container = cc.find("Canvas/window/WindowCultivate/content/id_window/WindowSpriit/dragContainer");
        const pos = event.getLocation();
        // console.log(pos);

        const distance = container.convertToNodeSpaceAR(pos).sub(this.startPoint).mag();
        if (distance < 20) {
            this.state.cb();
        } else {
            const index = this.state.window.spriteFormation.node.children.findIndex((n) => {
                const box = n.getBoundingBoxToWorld();
                return box.contains(pos);
            });
            if (index > -1) {
                this.state.cb(index);
            }
        }
        if (this.tempNode) {
            this.tempNode.recycle();
            this.tempNode = null;
        }
        this.state.window.spriteList.setEnable(true);
    }
}
