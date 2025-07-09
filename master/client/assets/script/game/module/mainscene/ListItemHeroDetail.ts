import { autowired, registerClass } from "../../../framework/Decorator";
import ResourceLoader from "../../../framework/ResourceLoader";
import UIButton from "../../../framework/ui/UIButton";
import UIImage from "../../../framework/ui/UIImage";
import UILabel from "../../../framework/ui/UILabel";
import UIList from "../../../framework/ui/UIList";
import UIListItem from "../../../framework/ui/UIListItem";
import UIScrollList from "../../../framework/ui/UIScrollList";
import ListItemHeroDetailDrag from "./ListItemHeroDetailDrag";
const { ccclass, property } = cc._decorator;
@registerClass("ListItemHeroDetail")
@ccclass
export default class ListItemHeroDetail extends UIListItem {
    @autowired(UIButton) click: UIButton = null;
    @autowired(UIImage) quality: UIImage = null;
    @autowired(UIImage) icon: UIImage = null;
    @autowired(UILabel) lv: UILabel = null;
    @autowired(UILabel) name1: UILabel = null;
    @autowired(UIImage) switch: UIImage = null;
    @autowired(UIImage) lock: UIImage = null;
    @autowired(UIImage) up: UIImage = null;
    @autowired(UIImage) have: UIImage = null;
    @autowired(UIImage) tips: UIImage = null;
    @autowired(UILabel) get: UILabel = null;
    @autowired(UILabel) downText: UILabel = null;
    @autowired(UIImage) useIng: UIImage = null;
    @autowired(UIImage) addImg: UIImage = null;

    state: {
        id: number;
        /**品质框 */
        quailtyImg: string;
        /**图标 */
        icon: string;
        /**回调 */
        cb?: Function;
        /**等级 */
        lv?: string;
        /**默认昵称 */
        name?: string;
        /**选中状态 */
        switch?: boolean;
        /**锁 */
        lock?: boolean;
        /**升级箭头 */
        up?: boolean;
        /**是否yongy */
        isHave?: boolean;
        /**感叹号提示 */
        tips?: boolean;
        /**已领取 */
        get?: boolean;
        /**下面文本 */
        downText?: string;
        /**使用中 */
        useIng?: boolean;
        addImg?: string;
        /** 拖动信息 */
        dragInfo?: {
            /** 拖动节点的容器 */
            container: cc.Node;
            /** 普通石头节点 */
            strangeNodeList: UIList<ListItemHeroDetail>;
            /** 神器节点 */
            strangeNode2: cc.Node;
            /** 滑动列表 */
            scrollView: UIScrollList<ListItemHeroDetail>;
        };
    };

    /** 是否已经订阅了拖动事件 */
    private isOnDrag = false;
    private dragNode: ListItemHeroDetailDrag;

    protected onRecycle(): void {
        this.recycleDrag();
    }
    private recycleDrag() {
        if (this.dragNode) {
            this.dragNode.recycle();
            this.dragNode = null;
        }
    }

    setState(state: this["state"]): void {
        this.state = state;
        if (this.state.dragInfo) {
            if (!this.isOnDrag) {
                this.isOnDrag = true;
                this.onDragEvent();
            }
            this.click.setEnable(false);
        } else {
            if (this.isOnDrag) {
                this.isOnDrag = false;
                this.offDragEvent();
            }
            this.click.setEnable(true);
        }
        this.click.onClick = () => {
            if (state.cb) {
                state.cb(state.id);
            }
        };
        this.click.setGrey(!state.isHave);
        this.have.node.active = state.isHave;
        this.quality.imgName = state.quailtyImg;
        this.icon.imgName = state.icon;
        // this.lv.setText([]);
        // this.name1.setText([]);
        this.lv.setText([state.lv]);
        this.name1.setText([state.name]);
        this.switch.node.active = state.switch;
        this.lock.node.active = state.lock;
        this.up.node.active = state.up;
        this.tips.node.active = state.tips;
        this.get.node.active = state.get;
        this.downText.setText([state.downText]);
        this.useIng.node.active = state.useIng;
        this.addImg.imgName = state.addImg;
    }

    onDragEvent() {
        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
    }

    offDragEvent() {
        this.node.off(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.off(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.node.off(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.node.off(cc.Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
    }
    private startPoint: cc.Vec2;
    onTouchStart(event: cc.Event.EventTouch) {
        const drag = ResourceLoader.getNodeSyncWithPreload(ListItemHeroDetailDrag);
        drag.setState({ icon: this.state.icon });
        drag.node.parent = this.state.dragInfo.container;
        this.dragNode = drag;
        this.state.dragInfo.scrollView.setEnable(false);
        this.startPoint = event.getLocation();
        const pos = this.state.dragInfo.container.convertToNodeSpaceAR(event.getLocation());
        drag.node.setPosition(pos);
    }

    onTouchMove(event: cc.Event.EventTouch) {
        const pos = this.state.dragInfo.container.convertToNodeSpaceAR(event.getLocation());
        this.dragNode.node.setPosition(pos);
    }

    onTouchEnd(event: cc.Event.EventTouch) {
        this.recycleDrag();
        this.state.dragInfo.scrollView.setEnable(true);
        if (event.getLocation().sub(this.startPoint).mag() < 10) {
            // 移动范围小，认为是点击
            if (this.state.cb) {
                this.state.cb(this.state.id);
            }
            return;
        }
        const tbl = GTable.getById("ItemTbl", this.state.id);
        if (tbl.kind === 1001) {
            // 石头
            const stoneList = this.state.dragInfo.strangeNodeList.getItems().map((c) => c.node);
            for (let i = 0; i < stoneList.length; i++) {
                const n = stoneList[i];
                const rect = n.getBoundingBoxToWorld();
                if (rect.contains(event.getLocation())) {
                    GModel.fossil.equipStone(i, this.state.id);
                }
            }
        } else if (tbl.kind === 1002) {
            // 神器
            const strangeNode = this.state.dragInfo.strangeNode2;
            const rect = strangeNode.getBoundingBoxToWorld();
            if (rect.contains(event.getLocation())) {
                GModel.fossil.setStar(this.state.id);
            }
        }
    }
}
