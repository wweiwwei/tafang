import { BattleUtils } from "../Utils/BattleUtils";
import { BattleRoadBezier } from "./Road/BattleRoadBezier";
import { BattleRoadEllipse } from "./Road/BattleRoadEllipse";
import { BattleRoadRect } from "./Road/BattleRoadRect";
import { IBattleRoad } from "./Road/IBattleRoad";

export class BattleMapInfo {
    private tbl: BattleSceneInfoTbl;
    private road: IBattleRoad;

    constructor(public id: number) {
        this.tbl = GTable.getById("BattleSceneInfoTbl", id);
        const roadTbl = GTable.getById("BattleRoadInfoTbl", this.tbl.roadId);
        if (roadTbl.kind === 1) {
            this.road = new BattleRoadEllipse();
        } else if (roadTbl.kind === 2) {
            this.road = new BattleRoadRect();
        } else if (roadTbl.kind === 3) {
            this.road = new BattleRoadBezier();
        } else {
            throw new Error(`illegal road kind ${roadTbl.kind}`);
        }
        this.road.init(this.tbl.roadPos, this.tbl.roadScale, roadTbl.road);
        this.mapLength = this.road.getTotalLength();
        this.monsterInitPos = this.getPointByMapPos(this.tbl.monsterBegin).pos;
    }
    private mapLength = 0;
    private monsterInitPos: { x: number; y: number };

    getPlayerPos(): { x: number; y: number } {
        const [x, y] = this.tbl.playerPos;
        return { x, y };
    }

    getInitProgress() {
        return this.tbl.monsterBegin;
    }

    getMonsterInitPos() {
        return this.monsterInitPos;
    }

    getMapLength() {
        return this.mapLength;
    }

    getPointByMapPos(p: number): {
        pos: { x: number; y: number };
        direction: { x: number; y: number };
    } {
        return this.road.getPointAt(p);
    }
}
