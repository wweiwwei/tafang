import { BattleUtils } from "../../../battleLogic/Utils/BattleUtils";
import WindowSelectProp from "../../mainsceneNew/WindowSelectProp";
import EquipmentSceneMonster from "./EquipmentSceneMonster";
import EquipmentScenePlayer from "./EquipmentScenePlayer";

export default class EquipmentSceneData {
    public player: EquipmentScenePlayer;
    private monster: Map<number, EquipmentSceneMonster> = new Map();
    public roadData: boolean[][] = null;
    public gridSize: number = null;
    public gridCount: number[] = null;

    monsterInitPos: {
        x: number[];
        y: number[];
    };
    monsterBorder: {
        x: number[];
        y: number[];
    };

    private monsterAreaIndex = 0;
    private currentPlayerOrder: EquipmentSceneOrder = null;

    constructor(public mapName: string) {
        this.checkMode();
        this.initRoadData();
        this.refreshMonsterArea();
        this.player = new EquipmentScenePlayer(this);
        this.checkMonster();
    }

    addPlayerOrder(order: EquipmentSceneOrder) {
        if (this.waitingRes) return;
        this.currentPlayerOrder = order;
    }
    private initRoadData() {
        const tbl = GTable.getList("BattleSceneInfoTbl").find((tbl) => tbl.prefab === this.mapName);
        this.roadData = BattleUtils.map.decodeMap(tbl.road);
        this.gridSize = tbl.gridSize;
        this.gridCount = tbl.gridCount;
    }
    tick() {
        this.checkMode();
        this.checkMonster();
        this.monster.forEach((monster) => monster.tick());
        if (this.mode === "wait") return;
        this.checkAuto();
        if (!this.currentPlayerOrder) return;
        this.player.tick();
    }

    checkAuto() {
        if (GModel.stone.isAuto() && GModel.playerEquipment.temp().length === 0) {
            this.addPlayerOrder({ kind: "attack" });
        }
    }

    getMonster(uniqueId: number) {
        return this.monster.get(uniqueId);
    }

    refreshMonsterArea() {
        const tbl = GTable.getList("BattleSceneInfoTbl").find((tbl) => tbl.prefab === this.mapName);
        const list = BattleUtils.map.decodeMonsterBorn(tbl.monsterPoint);
        const current = list[this.monsterAreaIndex % list.length];
        const base1 = BattleUtils.map.gridPosToGamePos(
            { x: current.x[0], y: current.y[0] },
            this.gridSize,
            this.gridCount
        );
        const base2 = BattleUtils.map.gridPosToGamePos(
            { x: current.x[1], y: current.y[1] },
            this.gridSize,
            this.gridCount
        );
        this.monsterInitPos = {
            x: [base1.x + this.gridSize, base2.x - this.gridSize],
            y: [base1.y + this.gridSize, base2.y - this.gridSize],
        };
        this.monsterBorder = {
            x: [base1.x, base2.x],
            y: [base1.y, base2.y],
        };
        this.monsterAreaIndex++;
    }

    checkMonster() {
        // 检测数据变动，补全缺失的怪物
        Object.keys(GState.data.equipmentMonster).forEach((k) => {
            if (!this.monster.has(Number(k))) {
                this.monster.set(Number(k), new EquipmentSceneMonster(this, GState.data.equipmentMonster[k]));
            }
        });
        // 删除无效的位置
        this.monster.forEach((v, k) => {
            if (!GState.data.equipmentMonster[k]) {
                this.monster.delete(k);
            }
        });
    }
    private checkMode() {
        if (GModel.knapsack.getStorageById(GIndex.id.turntableStorageId) <= 0) {
            this.mode = "wait";
            return;
        }
        if (this.waitingRes) {
            this.mode = "wait";
            return;
        }
        if (GModel.playerEquipment.temp().length > 0) {
            this.mode = "wait";
            return;
        }
        this.mode = "next";
    }

    private waitingRes: boolean = false;
    private mode: "wait" | "next" = "wait";
    async attackFinish() {
        this.currentPlayerOrder = null;
        this.waitingRes = true;
        const allMode = GModel.stone.stoneAuto().all && GModel.equipmentScene.isCanUseAllAttackMode();
        const isAuto = GModel.stone.isAuto();
        // 受击表现
        const targetMonster = this.getNextMonster();
        if (allMode) {
            // 全体模式
            this.monster.forEach((m) => {
                m.hit(allMode);
                m.die();
            });
            this.monster.clear();
        } else {
            // 单击模式
            const m = this.monster.get(targetMonster);
            m.hit(allMode);
            const data = GState.data.equipmentMonster[targetMonster];
            if (data.life <= 1) {
                m.die();
                this.monster.delete(targetMonster);
            }
        }
        if (this.monster.size === 0) this.refreshMonsterArea();
        const res = await GModel.stone.drawCard(allMode, isAuto);
        this.waitingRes = false;
        // todo 处理奖励展示
        let temp = GModel.playerEquipment.temp();
        if (temp.length > 0) {
            // 替换装备窗口
            GWindow.open(WindowSelectProp);
        }
    }

    getNextMonster(): number {
        this.checkMonster();
        return Number(Object.keys(GState.data.equipmentMonster)[0]);
    }
}

type EquipmentSceneOrder = {
    kind: "attack";
};
