import EventBus from "../../framework/event/EventBus";
import Item from "../entity/Item";
import Mission from "../entity/Mission";
import EventName from "../event/EventName";
import WindowCongratulation from "../module/common/WindowCongratulation";

export default class PlayerModel {
    /** 设置名字 */
    async changeRoleName(name: string): Promise<void> {
        const ok = await GSDK.msgCheck(name);
        if (ok) {
            await GApi.player.changeRoleName({ name });
            HttpServer.roleName = name;
        } else {
            GTip.showTip(["_rs含有违规内容"]);
        }
        EventBus.emit(EventName.refreshUserInfo);
    }

    /** 设置头像 */
    async changeRoleIcon(icon: number): Promise<void> {
        await GApi.player.changeRoleIcon({ icon });
        HttpServer.roleIcon = icon;
        EventBus.emit(EventName.refreshUserInfo);
    }

    /** 是否拥有头像 */
    hasIcon(icon: number): boolean {
        // todo
        return false;
        // return GState.data.hero[icon] !== undefined;
    }

    // 修改头像框
    async changeHeadFrame(headFrame: number): Promise<void> {
        // todo
    }

    /** 是否可以免费改名 */
    isFreeChangeName() {
        return GState.data.playerData.freeChangeName;
    }

    /** 角色名 */
    roleName() {
        return HttpServer.roleName;
    }

    /** 角色头像 */
    roleIcon() {
        return HttpServer.roleIcon;
    }

    /** 角色头像框 */
    headFreame() {
        return HttpServer.headFrame;
    }

    async openWindowWithSystemUnlockCheck(tbl: UIMainSceneTbl) {
        if (tbl.window.length === 0) {
            GTip.showTip(["_rs开发中"]);
            return;
        }
        if (tbl.systemId < 0 || this.checkSystemUnlock(tbl.systemId, true)) {
            await GWindow.openByName(tbl.window, tbl.windowParam.length > 0 ? JSON.parse(tbl.windowParam) : undefined);
        }
    }

    checkUnlockCondition(condition: number[], tip: boolean, lv?: number) {
        if (condition.length === 0) return true;
        if (condition[0] === 1) {
            if (GModel.mission.isMainMissionComplete(condition[1], condition[2])) {
                return true;
            } else {
                if (tip) {
                    const current = GModel.mission.mainMissionList()[0];
                    if (current) {
                        const curId = current.id;
                        const targetId = condition[1];
                        const offset =
                            GTable.getById("MainMissionTbl", targetId).order -
                            GTable.getById("MainMissionTbl", curId).order +
                            1;
                        GTip.showTip([GLang.code.ui.follow_mainmission_ex, "_rs" + offset]);
                    } else {
                        GTip.showTip([GLang.code.ui.follow_mainmission]);
                    }
                }
                return false;
            }
        } else if (condition[0] === 8) {
            if (GModel.stage.isStagePass(condition[1], condition[2])) {
                return true;
            } else {
                let map = GTable.getList("StageMapTbl").find((t) => t.mapIndex === condition[1]);
                tip && GTip.showTip([GLang.code.ui.map_condition, map.name, "_rs" + condition[2]]);
                return false;
            }
        } else if (condition[0] === 2) {
            if (GModel.mission.taskInfo().id > condition[1]) {
                return true;
            } else {
                tip && GTip.showTip([GLang.code.ui.follow_mainmission]);
                return false;
            }
        } else {
            if (condition[1] > lv && tip) {
                switch (condition[0]) {
                    case 3:
                        GTip.showTip(
                            [GLang.code.ui.hero],
                            [GLang.code.ui.map_unlock_level, "_rs" + condition[1]],
                            [GLang.code.ui.unlock]
                        );
                        break;
                    case 4:
                        GTip.showTip(
                            [GLang.code.ui.equipment],
                            [GLang.code.ui.map_unlock_level, "_rs" + condition[1]],
                            [GLang.code.ui.unlock]
                        );
                        break;
                    case 5:
                        GTip.showTip(
                            [GLang.code.ui.facility],
                            [GLang.code.ui.property_ranknum, "_rs" + condition[1]],
                            [GLang.code.ui.unlock]
                        );
                        break;
                }
            }
            return condition[1] <= lv;
        }
    }

    checkSystemUnlock(systemId: number, tip: boolean, lv?: number): boolean {
        if (GModel.localStorage.unlockAllSystem) return true;
        let tbl = GTable.getById("SystemUnlockTbl", systemId);
        if (!tbl) return true;
        return this.checkUnlockCondition(tbl.condition, tip, lv);
    }

    async triggerSystemUnlock(kind: number, param: number, param2: number) {
        let tbl = GTable.getList("SystemUnlockTbl").find((t) => {
            return param2 !== -1
                ? t.condition[0] === kind && t.condition[1] === param && t.condition[2] === param2
                : t.condition[0] === kind && t.condition[1] === param;
        });
        if (tbl && this.checkSystemUnlock(tbl.id, false)) {
            EventBus.emit(EventName.systemUnlock);
            if (tbl.inform > 0) {
                await GWindow.open(WindowCongratulation, { text: tbl.text, img: tbl.img });
                GModel.guide.triggerDialogue(9, tbl.id);
            }
        }
    }

    /** 玩家等级 */
    level() {
        return GState.data.level;
    }
    /** 玩家经验 */
    // exp() {
    //     return GState.data.exp;
    // }
    // /** 等级信息 */
    // levelInfo(): {
    //     /** 等级 */
    //     level: number;
    //     /** 当前经验值 */
    //     exp: number;
    //     /** 下一级所需经验值（如果满级了这个值是-1） */
    //     nextLevelExp: number;
    // } {
    //     const tbl = GTable.getList("PlayerLevelTbl").find((t) => t.level == this.level());
    //     return {
    //         level: this.level(),
    //         exp: this.exp(),
    //         nextLevelExp: tbl.require,
    //     };
    // }
    /**领取功能解锁奖励 */
    obtainMissionReward(id: number) {
        return GApi.player.obtainMissionReward({ id });
    }

    //突破
    upgradeRank() {
        return GApi.player.upgradeRank();
    }
    //升级
    async upgradeLevel() {
        await GApi.player.upgradeLevel();
        GSDK.report({
            kind: "levelUp",
            data: {},
        });
        GTip.showUpgradeEffect();
    }

    getMission(): Mission[] {
        return Object.keys(GState.data.playerMission)
            .map((key) => GState.data.playerMission[key])
            .filter((m) => GState.data.rank === GTable.getById("PlayerMissionTbl", m.id).rank);
    }

    isMaxLevel() {
        var rankTbl = GTable.getList("PlayerRankTbl").find((t) => t.rank == GState.data.rank);
        return this.level() >= GTable.getList("PlayerLevelTbl").length;
        // || this.level() >= rankTbl.levelLimit;
    }

    IsMaxRank() {
        return GState.data.rank >= GTable.getList("PlayerRankTbl").length - 1;
    }
    upgradeCost() {
        return new Item(
            GIndex.id.coinId,
            GTable.getList("PlayerLevelTbl").find((t) => t.level === GState.data.level).require
        );
    }
    /**是否可晋升 */
    canPromote() {
        return !this.isMaxLevel() && GModel.tree.getList().every((t) => t.level === this.level());
    }
    /**等级属性加成 */
    getLevelProperty(): { property: string; value: number }[] {
        return GTable.getList("PlayerLevelTbl")
            .find((t) => t.level === GModel.player.level())
            .property.map((p) => {
                return { property: p[0], value: Number(GUtils.ui.getFixed(Number(p[1]) * 0.01, 2)) };
            });
    }
    /**阶数属性加成 */
    getRankProperty(): { property: string; value: number }[] {
        return GTable.getList("PlayerRankTbl")
            .find((t) => t.rank === GState.data.rank)
            .property.map((p) => {
                return { property: p[0], value: Number(GUtils.ui.getFixed(Number(p[1]) * 0.01, 2)) };
            });
    }

    getRankTbl(rank: number) {
        return GTable.getList("PlayerRankTbl").find((t) => {
            return t.rank == rank;
        });
    }

    canUprank() {
        let rankTbl = GTable.getList("PlayerRankTbl").find((t) => t.rank == GState.data.rank);
        return (
            !this.IsMaxRank() &&
            this.getMission().every((m) => m.getState() === "hasGet") &&
            this.level() >= rankTbl.levelLimit
        );
    }
}
