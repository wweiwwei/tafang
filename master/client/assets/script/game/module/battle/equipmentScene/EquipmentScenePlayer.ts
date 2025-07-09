import { BattleUtils } from "../../../battleLogic/Utils/BattleUtils";
import EquipmentSceneData from "./EquipmentSceneData";

export default class EquipmentScenePlayer {
    constructor(public ctx: EquipmentSceneData) {
        this.pos = { ...GConstant.equipmentScene.playerPos };
    }

    pos: { x: number; y: number };
    direction: { x: number; y: number } = { x: 1, y: 0 };
    private aStarCache: { x: number; y: number }[];
    private currentAstarIndex = 0;
    targetPos: { x: number; y: number };
    mode: "move" | "idle" | "attack" = "idle";

    tick() {
        if (this.mode === "idle") {
            this.idleTick();
        } else if (this.mode === "move") {
            this.moveTick();
        } else if (this.mode === "attack") {
            this.attackTick();
        }
    }

    private moveTick() {
        if (this.currentAstarIndex > this.aStarCache.length - 1) {
            // 到达
            this.attackTimer = 0;
            this.mode = "attack";
            return;
        }
        const pathNode = this.aStarCache[this.currentAstarIndex];
        this.pos.x += this.direction.x * GConstant.equipmentScene.playerMoveSpeed;
        this.pos.y += this.direction.y * GConstant.equipmentScene.playerMoveSpeed;
        const distance = { x: this.pos.x - pathNode.x, y: this.pos.y - pathNode.y };
        if (distance.x * distance.x + distance.y * distance.y < 100) {
            this.currentAstarIndex++;
            this.setDirection();
        }
    }

    private setDirection() {
        const pathNode = this.aStarCache[this.currentAstarIndex];
        if (!pathNode) return;
        this.direction = { x: pathNode.x - this.pos.x, y: pathNode.y - this.pos.y };
        const len = Math.sqrt(this.direction.x * this.direction.x + this.direction.y * this.direction.y);
        this.direction.x /= len;
        this.direction.y /= len;
    }

    private attackTick() {
        if (this.targetPos.x - this.pos.x > 0) {
            this.direction.x = Math.abs(this.pos.x);
        } else {
            this.direction.x = Math.abs(this.pos.x);
        }
        this.attackTimer++;
        if (this.attackTimer > 60) {
            this.mode = "idle";
            this.ctx.attackFinish();
        }
    }

    private idleTick() {
        const nextMonster = this.ctx.getNextMonster();
        if (nextMonster < 0) return;
        const monster = this.ctx.getMonster(nextMonster);
        this.targetPos = monster.pos;
        const blockBeginPos = BattleUtils.map.gamePosToGridPos(this.pos, this.ctx.gridSize, this.ctx.gridCount);
        const blockTargetPos = BattleUtils.map.gamePosToGridPos(this.targetPos, this.ctx.gridSize, this.ctx.gridCount);
        const beginFinal = { x: Math.round(blockBeginPos.x), y: Math.round(blockBeginPos.y) };
        const targetFinal = { x: Math.round(blockTargetPos.x), y: Math.round(blockTargetPos.y) };
        this.aStarCache = BattleUtils.getAStarPath(this.ctx.roadData, beginFinal, targetFinal).map((p) =>
            BattleUtils.map.gridPosToGamePos(p, this.ctx.gridSize, this.ctx.gridCount)
        );
        this.currentAstarIndex = 0;
        this.setDirection();
        this.mode = "move";
    }

    private attackTimer: number = 0;
}
