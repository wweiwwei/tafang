import { autowired, registerClass } from "../../../framework/Decorator";
import ResourceLoader from "../../../framework/ResourceLoader";
import UIListItem from "../../../framework/ui/UIListItem";
import Item from "../../entity/Item";
import ListItemEquipmentDispearText from "./ListItemEquipmentDispearText";
const { ccclass, property } = cc._decorator;

@registerClass("ListItemEquipmentDispearEffect")
@ccclass
export default class ListItemEquipmentDispearEffect extends UIListItem {
    static _poolSize: number = 1;

    @autowired(cc.Animation) anim: cc.Animation = null;

    protected onInjected(): void {
        this.anim.on(cc.Animation.EventType.FINISHED, () => {
            const parent = this.node.parent;
            this.anim.node.children[0].children.forEach(async (n) => {
                // 经验值
                const worldPos = n.convertToWorldSpaceAR(cc.Vec2.ZERO);
                const position = parent.convertToNodeSpaceAR(worldPos);
                const text = ["_rs+1"];
                const effect = await ResourceLoader.getNode(ListItemEquipmentDispearText);
                effect.node.parent = parent;
                effect.setState({
                    position,
                    text,
                    colorIndex: 1,
                });
            });
            const coinReward = this.state.reward.find((r) => r.id === GIndex.id.coinId);
            let coin = coinReward ? Math.round(coinReward.count / 6) : 1;
            const text = [`_rs+${coin}`];
            this.anim.node.children[1].children.forEach(async (n) => {
                // 金币
                const worldPos = n.convertToWorldSpaceAR(cc.Vec2.ZERO);
                const position = parent.convertToNodeSpaceAR(worldPos);

                const effect = await ResourceLoader.getNode(ListItemEquipmentDispearText);
                effect.node.parent = parent;
                effect.setState({
                    position,
                    text,
                    colorIndex: 0,
                });
            });
            this.recycle();
        });
    }

    state: {
        position: { x: number; y: number };
        reward: Item[];
    };
    setState(state: this["state"]): void {
        this.state = state;
        this.node.scale = 0.5;
        this.node.x = this.state.position.x;
        this.node.y = this.state.position.y;
        this.anim.play();
    }
}
