import { autowired, message, registerClass } from "../../../framework/Decorator";
import ResourceLoader from "../../../framework/ResourceLoader";
import UIButton from "../../../framework/ui/UIButton";
import UIComponent from "../../../framework/ui/UIComponent";
import UIImage from "../../../framework/ui/UIImage";
import UIListItem from "../../../framework/ui/UIListItem";
import Item from "../../entity/Item";
import { PlayerEquipment } from "../../entity/PlayerEquipment";
import WindowSelectProp from "../mainsceneNew/WindowSelectProp";
import ListItemEquipmentDispearEffect from "./ListItemEquipmentDispearEffect";

const { ccclass, property } = cc._decorator;

@registerClass("ListItemEquipmentSceneDropItem")
@ccclass
export default class ListItemEquipmentSceneDropItem extends UIListItem {
    static _poolSize: number = 1;

    @autowired(UIImage) item: UIImage = null;

    state: {
        equipment: PlayerEquipment;
        // pos: number[];
    };

    setState(state: this["state"]): void {
        // this.node.scale = 0.35;
        this.state = state;
        // this.node.position = cc.v3(this.state.pos[0], this.state.pos[1]);
        const animation = this.node.getComponent(cc.Animation);
        const tbl = this.state.equipment.tbl();
        animation.play(`Level0${tbl.quality + 1}_Ani`);
        this.item.imgName = tbl.img;
    }

    /** 分解消失 */
    dispear(reward?: Item[]) {
        if (reward) {
            // this.recycle();
            // const pos = this.state.pos;
            const parant = this.node.parent.parent;
            const worldPos = this.node.parent.convertToWorldSpaceAR(this.node.position);
            const position = parant.convertToNodeSpaceAR(worldPos);
            ResourceLoader.getNode(ListItemEquipmentDispearEffect).then((e) => {
                e.node.parent = parant;
                e.setState({
                    position,
                    reward,
                });
            });
        } else {
            // this.recycle();
        }
    }

    protected onEnable(): void {
        const btn = this.getComponent(UIButton);
        if (GModel.playerEquipment.temp().length > 0) {
            btn.setEnable(true);
            btn.onClick = () => {
                let temp = GModel.playerEquipment.temp();
                if (temp.length > 0) GWindow.open(WindowSelectProp);
            };
        } else {
            btn.setEnable(false);
        }
    }
}
