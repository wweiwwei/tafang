import { message, throttle } from "../../../../framework/Decorator";
import ResourceLoader from "../../../../framework/ResourceLoader";
import EventBus from "../../../../framework/event/EventBus";
import { BattleBattleStageObject } from "../../../battleLogic/Object/BattleStage/BattleBattleStageObject";
import BattleFactory from "../../../battleLogic/Utils/BattleFactory";
import { EquipmentMonster } from "../../../entity/EquipmentMonster";
import Item from "../../../entity/Item";
import { PlayerEquipment } from "../../../entity/PlayerEquipment";
import EventName from "../../../event/EventName";
import WindowMainSceneBottomUI from "../../mainscene/WindowMainSceneBottomUI";
import WindowSelectProp from "../../mainsceneNew/WindowSelectProp";
import ListItemEquipmentSceneDropItem from "../ListItemEquipmentSceneDropItem";

export default class BattleSceneEquipmentManage extends cc.Component {
    ctx: WindowMainSceneBottomUI;
    /** 装备掉落 */
    // private equipmentMap: Map<number, ListItemEquipmentSceneDropItem> = new Map();
    private equipment: ListItemEquipmentSceneDropItem = null;

    initEvent(ctx: WindowMainSceneBottomUI) {
        this.ctx = ctx;
        this.equipment = ResourceLoader.getNodeSyncWithPreload(ListItemEquipmentSceneDropItem);
        this.equipment.node.parent = this.ctx.equipmentContainer.node;
        EventBus.autoOn(this);
        this.ctx.chestSpine.setSpine("UI_Computer", "default", "idle");
        this.schedule(this.checkAutoSummon, 2);

        let temp = GModel.playerEquipment.temp();
        if (temp.length > 0) {
            this.ctx.chestSpine.changeAnimation("loop", true);
        }
        this._equipmentCheck();
    }

    setEquipmentActive(b: boolean) {
        this.equipment.node.active = b;
        if (this.ctx.chestSpine.currentAnimation === "attack") return;
        if (b && this.ctx.chestSpine.currentAnimation === "idle") {
            this.ctx.chestSpine.changeAnimation("loop", false);
        } else if (!b && this.ctx.chestSpine.currentAnimation === "loop") {
            this.ctx.chestSpine.changeAnimation("idle", false);
        }
    }

    @message([EventName.replacePlayerEquipment])
    replacePlayerEquipment(
        temp: PlayerEquipment,
        origin: PlayerEquipment,
        sell: boolean,
        res: {
            reward: Item[];
            exp: number;
        }
    ): void {
        const info = BattleFactory.getPlayerBattleInfo(GState.data);
        GBattleApiManager.getBattleStageApi(0).changePlayerState(info);
        if (origin == null) {
        } else if (sell) {
            this.equipment.dispear(res.reward);
        } else {
            // 替换
        }
        this._equipmentCheck();
    }

    private _equipmentCheck() {
        const temp = GModel.playerEquipment.temp();
        if (temp.length === 0) {
            this.setEquipmentActive(false);
        } else {
            const e = temp[0];
            this.setEquipmentActive(true);
            this.equipment.setState({ equipment: e });
        }
    }

    async checkAutoSummon() {
        if (!GModel.stone.isAuto()) return;
        if (GModel.playerEquipment.temp().length === 0) {
            this.handlePlayerClick();
        }
    }
    @message([EventName.sellPlayerEquipment])
    sellPlayerEquipment(
        temp: PlayerEquipment,
        res: {
            reward: Item[];
            exp: number;
        }
    ): void {
        this.equipment.dispear(res.reward);
        this._equipmentCheck();
    }
    @message([EventName.sellAllPlayerEquipment])
    sellAllPlayerEquipment(res: { reward: Item[]; exp: number }) {
        this.equipment.dispear(res.reward);
        this._equipmentCheck();
    }

    async addEquipment(
        res: {
            equipment: PlayerEquipment;
            reward: Item[];
            exp: number;
            sell: boolean;
        }[]
    ) {
        const data = res.find((d) => d.sell);
        if (!data) {
            this.equipment.node.active = false;
            await GUtils.http.delay(800);
            this._equipmentCheck();
        } else {
            this.equipment.setState({ equipment: data.equipment });
            this.equipment.node.active = false;
            await GUtils.http.delay(800);
            this.equipment.node.active = true;
            await GUtils.http.delay(200);
            this.equipment.dispear(data.reward);
            this._equipmentCheck();
        }
    }

    @message([EventName.playerEquipmentDrawcard])
    @throttle(1500)
    async handlePlayerClick() {
        let temp = GModel.playerEquipment.temp();
        if (temp.length > 0) {
            await GWindow.open(WindowSelectProp);
        } else {
            if (GModel.knapsack.getStorageById(GIndex.id.turntableStorageId) > 0) {
                const res = await GModel.stone.drawCard2();
                this.playShowEquipment();
                this.addEquipment(res);
                await GUtils.http.delay(1200);
                let temp = GModel.playerEquipment.temp();
                if (temp.length > 0) GWindow.open(WindowSelectProp);
            } else {
                GModel.stone.stopAuto();
            }
        }
    }

    playShowEquipment() {
        this.ctx.chestSpine.changeAnimation("attack", false);
        this.ctx.chestSpine.setCompleteListener(() => {
            const anim = GModel.playerEquipment.temp().length > 0 ? "loop" : "idle";
            this.ctx.chestSpine.changeAnimation(anim, true);
            this.ctx.chestSpine.setCompleteListener(null);
        });
    }
}
