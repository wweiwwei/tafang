import { autowired, registerClass } from "../../../framework/Decorator";
import UIButton from "../../../framework/ui/UIButton";
import UIImage from "../../../framework/ui/UIImage";
import UIListItem from "../../../framework/ui/UIListItem";
import { MineMapType } from "../../config/GEnum";
import Item from "../../entity/Item";
import { MineBrick } from "../../entity/MineBrick";

const { ccclass, property } = cc._decorator;

@registerClass("ListItemMineBrick")
@ccclass
export default class ListItemMineBrick extends UIListItem {
    static _poolSize: number = 10;

    state: { startFloor: number; uniqueId: number; changeFloor?: number };
    @autowired(UIImage) rewardIcon: UIImage = null;
    @autowired(UIImage) shadow: UIImage = null;
    @autowired(cc.ProgressBar) lifeBar: cc.ProgressBar = null;
    // @autowired(cc.Node) stoneNode: cc.Node = null;
    private bgImg: UIImage = null;
    // private maxLife: number = 0;
    /**偏移值 */
    private offsetPos: cc.Vec2 = null;
    protected onInited(): void {
        this.bgImg = this.node.getComponent(UIImage);
        this.offsetPos = new cc.Vec2(this.node.width / 2, this.node.height / 2);
    }
    private mineBrick: MineBrick = null;

    init() {
        this.mineBrick = GModel.mine.getBrickByUniqueId(this.state.uniqueId);
        this.initPos(this.mineBrick.x, this.mineBrick.y);
        this.refreshLife(this.mineBrick.life);
        this.initBrick(this.mineBrick.mapType);
        this.showReward(this.mineBrick.rewardId);
        // this.node.on(cc.Node.EventType.TOUCH_END, () => {
        //     this.onHitBrick();
        // });
    }

    showShadow(shadow: boolean) {
        this.shadow.node.active = shadow;
    }

    showReward(rewardId: number) {
        /** 将挖矿奖励id转为对应物品id */
        // const itemId = GModel.mine.getItemIdByRewardId(rewardId);
        // if (itemId >= 0 && this.mineBrick.mapType !== MineMapType.BATTLE) {
        if (GModel.mine.getItemIdByRewardImg(rewardId)) {
            this.rewardIcon.node.parent.active = true;
            this.rewardIcon.imgName = GModel.mine.getItemIdByRewardImg(rewardId);
            // this.rewardIcon.imgName = Item.getImg(new Item(itemId, 1));
        } else {
            this.rewardIcon.node.parent.active = false;
        }
    }

    initPos(x: number, floor: number) {
        let pos = new cc.Vec2();
        pos.x = x * this.node.width + this.offsetPos.x;
        let curFloor = this.state.changeFloor
            ? GModel.mine.getCurrentFloor() - this.state.changeFloor
            : GModel.mine.getCurrentFloor();
        const baseY = curFloor - 5;

        const y = floor - baseY;
        if (y >= 0) {
            // 砖块垂直渲染位置 = （当前楼层（楼层移动时为移动前的楼层） - （挖矿过程中变化的总楼层） - 指令楼层） * 砖块高度 + 砖块在地图的位差
            pos.y = (curFloor - (curFloor - this.state.startFloor) - floor) * this.node.height + this.offsetPos.y;
        }
        this.node.setPosition(pos.x, pos.y);
    }

    initBrick(mineMapType: MineMapType) {
        let imgName = "";
        switch (mineMapType) {
            case MineMapType.BRICK_1:
                imgName = "mine_brickbg2";
                break;
            case MineMapType.BRICK_3:
                imgName = "mine_brickbg4";
                break;
            case MineMapType.NOREWARD1:
                imgName = "mine_brickbg2";
                break;
            case MineMapType.MAP_BOMB:
                imgName = "mine_star";
                break;
            case MineMapType.NOREWARD2:
                imgName = "mine_brickbg4";
                break;
        }
        this.bgImg.imgName = imgName;
    }

    showBrickReward(item: Item) {}

    setState(state: this["state"]): void {
        this.state = state;
        this.init();
    }
    playAni() {
        this.node.getChildByName("Stone").active = true;
        this.node.getComponent(cc.Animation).play();
    }
    refreshLife(life: number, animationCb?: Function) {
        this.lifeBar.node.active = false;
        if (this.mineBrick.mapType === MineMapType.BRICK_3 || this.mineBrick.mapType === MineMapType.NOREWARD2) {
            if (life < 2) {
                this.lifeBar.node.active = true;
                this.lifeBar.progress = life / 2;
            }
        }
        if (animationCb) {
            // 播放伤害动画
            // 动画结束回调
            if (animationCb) animationCb();
        }
    }

    // async onHitBrick() {
    //     //todo 触发砖块是否有相应
    //     this.state.cb();
    // }
}
