import EventBus from "../../framework/event/EventBus";
import EventName from "../event/EventName";
import WindowMission from "../module/common/WindowMission";
import WindowHero from "../module/hero/WindowHero";
import WindowStrengthen from "../module/mainscene/WindowStrengthen";
import WindowTree from "../module/mainscene/WindowTree";
import WindowTurntable from "../module/mainscene/WindowTurntable";
import Item from "./Item";

export default class Mission {
    id: number;
    /** 任务进度 */
    progress: number;
    /** 是否已获取 */
    hasGet: boolean;
    /** 任务阶段 */
    stage: number;

    /** 获取表格（此处返回的是基本任务表，以便兼容多种不同的任务） */
    private getTbl(): BaseMissionTbl {
        return GIndex.mission.getMissionTbl(this.id);
    }
    // getProgress(): string[] {
    //     if(this.getTbl().kind===4){
    //         let now=GModel.stage.getAllStage().find(t=>t.getTbl().id===this.getTbl().param[0])
    //         return ["_rs"+]
    //     }
    //     return this.getTbl().require;
    // }

    /** 任务需求 */
    getRequire() {
        // console.log("this.getTbl() =", this.getTbl());
        const data = this.getTbl().require;
        if (this.stage === 1) {
            return data[0];
        } else {
            return data[0] + data[1] * (this.stage - 1);
        }
    }
    /** 获取任务状态 */
    getState(): "hasGet" | "complete" | "notComplete" {
        if (this.hasGet) return "hasGet";
        if (this.progress >= this.getRequire()) return "complete";
        return "notComplete";
    }

    /** 获取任务状态序号 */
    getStateIndex(): number {
        return ["complete", "notComplete", "hasGet"].indexOf(this.getState());
    }

    private static missionDescParam = {
        techName: (tbl: BaseMissionTbl, mission: Mission) => {
            return GModel.tree
                .getList()
                .find((t) => t.id === tbl.param[0])
                .getTbl().name;
        },
        qualityName: (tbl: BaseMissionTbl, mission: Mission) => {
            return GConstant.qualityLabel[tbl.param[0]];
        },
        chargeName: (tbl: BaseMissionTbl, mission: Mission) => {
            return GTable.getById("ChargeTbl", tbl.param[0]).name;
        },
        playerRankName: (tbl: BaseMissionTbl, mission: Mission) => {
            return GTable.getList("PlayerRankTbl").find((t) => t.rank === mission.getRequire()).careerName;
        },
        itemName: (tbl: BaseMissionTbl, mission: Mission) => {
            return Item.getName({ id: tbl.param[0], count: 0 })[0];
        },
        param0: (tbl: BaseMissionTbl, mission: Mission) => {
            return "_rs" + tbl.param[0];
        },
    };

    /** 获取任务描述 */
    getDescription(useColor: boolean = false): string[][] {
        const tbl = this.getTbl();
        const kindTbl = GTable.getById("MissionKindTbl", tbl.kind);
        if (kindTbl) {
            if (useColor) {
                let strarr = this.getDescriptionEx();
                strarr.push([
                    "_rs(<color=#DCB896><outline color=#000000 width=2>" +
                        this.progress +
                        "</outline></color>" +
                        "/" +
                        this.getRequire() +
                        ")",
                ]);
                return strarr;
            }
            return this.getDescriptionEx();
        } else {
            return [[`_rs未定义任务类型${tbl.kind}`]];
        }
        // let getRequireStr = () => {
        //     if (useColor) {
        //         return [
        //             ["_rs(<color=#DCB896><outline color=#000000 width=2>" + this.progress],
        //             ["_rs</outline></color>"],
        //             ["_rs" + "/" + this.getRequire() + ")"],
        //         ];
        //     } else {
        //         return [["_rs(" + this.progress + "/" + this.getRequire() + ")"]];
        //     }
        // };
        // const tbl = this.getTbl();
        // const kindTbl = GTable.getById("MissionKindTbl", tbl.kind);
        // if (kindTbl) {
        //     return [
        //         [kindTbl.description, ...kindTbl.descriptionParam.map((p) => Mission.missionDescParam[p](tbl, this))],
        //         ...getRequireStr(),
        //     ];
        // } else {
        //     return [[`_rs未定义任务类型${tbl.kind}`]];
        // }
    }
    getDescriptionEx(): string[][] {
        let str: string[][] = [];
        let tbl = this.getTbl();
        switch (this.getTbl().kind) {
            case 1:
                str.push([
                    GLang.code.ui.mission_description_upgrade,
                    GTable.getById("TechTreeTbl", tbl.param[0]).name,
                    "_rs" + this.getRequire(),
                ]);
                break;
            case 2:
                str.push([
                    GLang.code.ui.mission_description_get_tower,
                    "_rs" + this.getRequire(),
                    "_rs" + tbl.param[0],
                ]);
                break;
            case 3:
                str.push([GLang.code.ui.mission_description_tower_level, "_rs" + this.getRequire()]);
                break;
            case 4:
                str.push([GLang.code.ui.mission_description_challenge, "_rs" + this.getRequire()]);
                break;
            case 5:
                // str.push([GLang.code.ui.mission_description_survivor, "_rs" + this.getRequire()]);
                break;
            case 6:
                // str.push([
                //     GLang.code.ui.send_survivor_to_building,
                //     "_rs" + this.getRequire(),
                //     GModel.facility.getFacilityById(tbl.param[0]).getTbl().name,
                // ]);
                break;
            case 7:
                // str.push([GLang.code.ui.mission_description_upgrade_hero, "_rs" + this.getRequire()]);
                break;
            case 8:
                // str.push([
                //     GLang.code.ui.mission_collect_material,
                //     "_rs" + GTable.getById("ItemTbl", tbl.param[0]).name,
                //     "_rs" + this.getRequire(),
                // ]);
                break;
            case 9:
                // str.push([GLang.code.ui.update_many_hero, "_rs" + this.getRequire(), "_rs" + tbl.param[0]]);
                break;
            case 10:
                str.push([GLang.code.ui.turntable_mission, "_rs" + this.getRequire()]);
                break;
            case 11:
                // str.push([
                //     GLang.code.ui.mission_occupy_facility,
                //     GModel.facility.getFacilityById(tbl.param[0]).getTbl().name,
                // ]);
                break;
            case 12:
                // str.push([GLang.code.ui.mission_hero_reach_rank, "_rs" + this.getRequire()]);
                break;
            case 13:
                // str.push([GLang.code.ui.mission_hero_reach_rank2, "_rs" + this.getRequire(), "_rs" + tbl.param[0]]);
                break;
            case 14:
                // str.push([
                //     GLang.code.ui.mission_equipment_reach_level,
                //     "_rs" + this.getRequire(),
                //     "_rs" + tbl.param[0],
                // ]);
                break;
            case 15:
                // str.push([GLang.code.ui.mission_equipment_reach_rank, "_rs" + this.getRequire(), "_rs" + tbl.param[0]]);
                break;
            case 16:
                // str.push([GLang.code.ui.mission_survivor_eat, "_rs" + this.getRequire()]);
                break;
            case 17:
                str.push([GLang.code.ui.mission_kill_enemy, "_rs" + this.getRequire()]);
                break;
            case 18:
                // str.push([
                //     GLang.code.ui.map_condition,
                //     GTable.getById("FacilityTbl", tbl.param[0]).name,
                //     "_rs" + this.getRequire(),
                // ]);
                break;
            case 19:
            case 29:
                // str.push([GLang.code.ui.mission_draw_card, GLang.code.ui.hero, "_rs" + this.getRequire()]);
                break;
            case 20:
            case 30:
                // str.push([GLang.code.ui.mission_draw_card, GLang.code.ui.equipment, "_rs" + this.getRequire()]);
                break;
            case 21:
                str.push([GLang.code.ui.mission_login_days, "_rs" + this.getRequire()]);
                break;
            case 22:
                str.push([GLang.code.ui.mission_arena_challenge, "_rs" + this.getRequire()]);
                break;
            case 23:
                str.push([GLang.code.ui.mission_enemy_times, "_rs" + this.getRequire()]);
                break;
            case 24:
                str.push([
                    GLang.code.ui.mission_cost_items,
                    GTable.getById("ItemTbl", tbl.param[0]).name,
                    "_rs" + this.getRequire(),
                ]);
                break;
            case 25:
                str.push([GLang.code.ui.mission_mine_cost, "_rs" + this.getRequire()]);
                break;
            case 26:
                str.push([GLang.code.ui.mission_puzzle_day, "_rs" + this.getRequire()]);
                break;
            case 27:
                str.push([GLang.code.ui.purchase]);
                let a = GTable.getById("ChargeTbl", this.getTbl().param[0]);
                str.push([a.name]);
                break;
            case 28:
                str.push([GLang.code.ui.mission_mine_floor, "_rs" + this.getRequire()]);
                break;
            case 31:
                // str.push([GLang.code.ui.mission_arena_point, "_rs" + this.getRequire()]);
                break;
            case 32:
                str.push([GLang.code.ui.mission_uprank_player, "_rs" + this.getRequire()]);
                break;
            case 33:
                str.push([
                    GLang.code.ui.mission_uprank_player2,
                    "_rs" + GTable.getList("PlayerRankTbl").find((t) => t.rank === this.getRequire()).careerName,
                ]);
                break;
            case 34:
                str.push([GLang.code.ui.mission_obtain_items2, GTable.getById("ItemTbl", tbl.param[0]).name]);
                break;
            case 35:
                str.push([GLang.code.ui.selectProp_decompose, "_rs" + this.getRequire()]);
                break;
            case 36:
                str.push([GLang.code.ui.mission_tower_formation, "_rs" + this.getRequire()]);
                break;
            case 37:
                str.push([GLang.code.ui.mission_upgrade_stone, "_rs" + this.getRequire()]);
                break;
            case 38:
                str.push([GLang.code.ui.talent, "_rs" + this.getRequire()]);
                break;
            default:
                break;
        }
        return str;
    }

    /** 获取任务奖励 */
    getReward(): Item[] {
        return Item.fromItemArray(this.getTbl().reward);
    }

    /** 任务跳转 */
    async goto(): Promise<void> {
        // const closeWin = () => {
        //     // todo 根据任务类型关闭窗口
        //     GWindow.close(WindowMission);
        // };
        // const currentScene = GWindow.currentScene;
        let tbl = this.getTbl();
        const kindTbl = GTable.getById("MissionKindTbl", tbl.kind);
        if (kindTbl.guide[0] === "weakGuide") {
            GModel.weakGuide.guideFunc[kindTbl.guide[1]](kindTbl.guide[2], kindTbl.guide[3], kindTbl.guide[4]);
        }
        // switch (tbl.kind) {
        //     case 1:
        //         GWindow.open(WindowTree);
        //         return;
        //     case 3:
        //         GWindow.open(WindowStrengthen);
        //         return;
        //     case 4:
        //         closeWin();
        //         // if (currentScene === "main") {
        //         //     // todo 判断是否已解锁
        //         //     await GWindow.goToBattle();
        //         // }
        //         GModel.stage.changeAfkMap(tbl.param[0]);
        //         return;
        //     // case 9:
        //     // case 7:
        //     // case 12:
        //     // case 13:
        //     // case 14:
        //     // case 15:
        //     //     closeWin();
        //     //     GWindow.open(WindowHero);
        //     //     return;
        //     // case 8:
        //     //     closeWin();
        //     //     if (currentScene === "battle") {
        //     //         GWindow.goToMain();
        //     //     }
        //     //     return;
        //     case 10:
        //         closeWin();
        //         // if (currentScene === "battle") {
        //         //     GWindow.goToMain();
        //         // }
        //         // GWindow.open(WindowTurntable);
        //         return;
        // }
    }
}

export type BaseMissionTbl = {
    /**唯一id（不可修改）*/ readonly id: number;
    /**任务类型*/ readonly kind: number;
    /**任务需求*/ readonly require: number[];
    /**任务参数*/ readonly param: number[];
    /**奖励*/ readonly reward: number[][];
    /**最大任务阶段数*/ readonly stage: number;
};
