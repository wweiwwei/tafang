import { BaseMissionTbl } from "../../entity/Mission";

export default class MissionIndex {
    private _missionMap: Map<number, BaseMissionTbl> = new Map();

    constructor() {
        GTable.getList("MainMissionTbl").forEach((t) => {
            this._missionMap.set(t.id, t);
        });
        GTable.getList("CaptainMissionTbl").forEach((t) => {
            this._missionMap.set(t.id, t);
        });
        // GTable.getList("DailyMissionTbl").forEach((t) => {
        //     this._missionMap.set(t.id, t);
        // });
        // GTable.getList("PuzzleMissionTbl").forEach((t) => {
        //     this._missionMap.set(t.id, t);
        // });
        GTable.getList("RankMissionTbl").forEach((t) => {
            this._missionMap.set(t.id, t);
        });
        GTable.getList("PlayerMissionTbl").forEach((t) => {
            this._missionMap.set(t.id, t);
        });
        GTable.getList("BanquetMissionTbl").forEach((t) => {
            this._missionMap.set(t.id, t);
        });
    }

    getMissionTbl(id: number): BaseMissionTbl {
        return this._missionMap.get(id);
    }
}
