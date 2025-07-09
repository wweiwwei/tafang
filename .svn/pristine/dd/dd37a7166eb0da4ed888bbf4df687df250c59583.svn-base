import { autowired, registerClass } from "../../../framework/Decorator";
import UIImage from "../../../framework/ui/UIImage";
import UIListItem from "../../../framework/ui/UIListItem";
import UISpine from "../../../framework/ui/UISpine";
import { BattleBattleStageObject } from "../../battleLogic/Object/BattleStage/BattleBattleStageObject";

const { ccclass, property } = cc._decorator;

@registerClass("ListItemBattleTempMoveObject")
@ccclass
export default class ListItemBattleTempMoveObject extends UIListItem {
    static _poolSize: number = 1;

    @autowired(UISpine) spine: UISpine = null;
    @autowired(UIImage) range: UIImage = null;

    state: {
        /** 使用队伍index表示 */
        index: number;
        /** 直接使用part赋值 */
        partMode?: boolean;
        /** 防御塔所属的part */
        part?: number;
        range?: boolean;
    };
    setState(state: this["state"]): void {
        this.state = state;
        this.initHero();

        this.schedule(() => {
            console.log("node scale=", this.node.scale);
        }, 2);
    }
    initHero() {
        if (this.state.range) {
            this.showRange();
        }
        this.node.opacity = 150;
        let part: number;
        if (this.state.partMode) {
            part = this.state.part;
        } else {
            part = GModel.defendTower.getTowerFormation()[this.state.index];
        }
        const tbl = GTable.getList("DefendTowerTbl").find((t) => t.part === part);
        this.spine.setSpine(tbl.img, "default", "idle");
        const spineTbl = GTable.getList("SpineInfoTbl").find((t) => t.spine === tbl.img);
        this.spine.node.scale = spineTbl.scale;
    }

    showRange() {
        // this.range.parent.scale = GCamera.battleCamera.zoomRatio;
        // this.node.scale = GCamera.battleCamera.zoomRatio;
        let map = new Map();
        let towerProperty = GModel.playerEquipment.towerProperty(this.state.part);
        towerProperty.forEach((d) => {
            map.set(d.property, d);
        });

        let d = map.get("normalAttackRange");
        this.range.node.scale = (d.value / 100) * GCamera.battleCamera.zoomRatio;
    }
}
