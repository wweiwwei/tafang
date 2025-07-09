import { GameDate } from "../../framework/date/GameDate";
import { BattleProperty } from "../battleLogic/Object/BattleStage/BattleProperty";
import BattleFactory from "../battleLogic/Utils/BattleFactory";
import WindowBattleScene from "../module/battle/WindowBattleScene";
import WindowCommonTip from "../module/common/WindowCommonTip";
import WindowTestBattleScene from "../module/test/WindowTestBattleScene";

export default class GMCommandHandler {
    static async ai(p1, p2) {
        return await GApi.gm.gmAddItem({ item: { id: Number(p1), count: Number(p2) } });
    }

    static async ae(p1, p2, p3) {
        return await GApi.gm.gmAddEquipment({ id: Number(p1), level: Number(p2), count: Number(p3) });
    }

    static async si(p1, p2) {
        return await GApi.gm.gmSubItem({ item: { id: Number(p1), count: Number(p2) } });
    }

    static async at(p1, p2) {
        switch (p2) {
            case "d":
                return await GApi.gm.gmAddTime({ time: Number(p1) * GameDate.OneDay });
            case "h":
                return await GApi.gm.gmAddTime({ time: Number(p1) * GameDate.OneHour });
            case "m":
                return await GApi.gm.gmAddTime({ time: Number(p1) * GameDate.OneMinute });
            case "s":
                return await GApi.gm.gmAddTime({ time: Number(p1) * GameDate.OneSecond });
        }
    }

    static async aahf(p1) {
        GTable.getList("ItemTbl")
            .filter((t) => t.kind === 21)
            .forEach((t) => {
                this.ai(t.id, p1);
            });
    }

    static async aae(p1, p2) {
        GTable.getList("HeroEquipmentTbl").forEach((t) => {
            this.ae(t.id, p1, p2);
        });
    }

    static async mi() {
        GTable.getList("ItemTbl")
            .filter((t) => t.kind !== 101 && t.kind !== 91 && t.kind !== 121)
            .forEach((t) => {
                this.ai(t.id, 1e15);
            });
    }

    static async me() {
        GTable.getList("HeroEquipmentTbl").forEach((t) => {
            this.ae(t.id, 1, 10000);
        });
    }

    static async sd() {
        const data = await GApi.gm.gmGetSaveData();
        console.log(JSON.parse(data));
        return data;
    }

    static async clear() {
        return GApi.gm.gmClearData();
    }

    static async ss(p1) {
        const count = Number(p1);
        for (let i = 0; i < count; i++) {
            await GApi.stage.challengeStage();
        }
    }
    static async uc(lv) {
        this.mi();
        const checkUnlock = () => {
            return GModel.facility.getFacilityById(GConstant.captainId).rank < lv;
        };
        while (checkUnlock()) {
            const list = GModel.facility.getAllFacility().filter((f) => f.unlock);
            for (let i = 0; i < list.length; i++) {
                const f = list[i];
                try {
                    while (true) {
                        await GApi.facility.upgradeFacility({ id: f.id });
                    }
                } catch {}
                try {
                    while (true) {
                        await GApi.facility.upgradeFacilityRank({ id: f.id });
                    }
                } catch {}
            }
            const unlockList = GModel.facility.getAllFacility().filter((f) => !f.unlock);
            for (let i = 0; i < unlockList.length; i++) {
                const f = unlockList[i];
                try {
                    await GApi.facility.occupyFacility({ id: f.id });
                } catch {}
            }
        }
    }
    static async af() {
        const itemList = GTable.getList("ItemTbl").filter((t) => t.kind !== 101 && t.kind !== 91 && t.kind !== 61);
        for (let i = 0; i < itemList.length; i++) {
            await this.ai(itemList[i].id, 1e15);
        }
        const checkUnlock = () => {
            const list = GModel.facility.getAllFacility();
            return list.some((f) => !f.unlock);
        };

        while (checkUnlock()) {
            const list = GModel.facility.getAllFacility().filter((f) => f.unlock);
            for (let i = 0; i < list.length; i++) {
                const f = list[i];
                try {
                    while (true) {
                        await GApi.facility.upgradeFacility({ id: f.id });
                    }
                } catch {}
                try {
                    while (true) {
                        await GApi.facility.upgradeFacilityRank({ id: f.id });
                    }
                } catch {}
            }
            const unlockList = GModel.facility.getAllFacility().filter((f) => !f.unlock);
            for (let i = 0; i < unlockList.length; i++) {
                const f = unlockList[i];
                try {
                    await GApi.facility.occupyFacility({ id: f.id });
                } catch {}
            }
        }
    }

    static async ace(p1, p2, p3) {
        const id = Number(p1);
        const level = Number(p2);
        const count = Number(p3);
        GApi.gm.gmAddCarEquipment({ id, level, count });
    }

    static async mce() {
        GTable.getList("CarEquipmentTbl").forEach((t) => {
            this.ace(t.id, 1, 10000);
        });
    }
    static async sdebug() {
        GTest.sDebug = !GTest.sDebug;
    }

    static async bd() {
        GWindow.open(WindowTestBattleScene);
    }

    static async kb(p1) {
        if (p1 === "1") {
            GWindow.get(WindowBattleScene)._returnValue = { win: false };
        } else {
            GWindow.get(WindowBattleScene)._returnValue = { win: true };
        }
        GWindow.close(WindowBattleScene);
    }

    static tp(p1) {
        const id = Number(p1);
        GModel.charge.pay(id, "{}");
    }

    static async tv() {
        await GSDK.showVideo("test");
        GWindow.open(WindowCommonTip, { tip: ["_rs广告奖励已发放"] });
    }

    static fdebug() {
        GTest.fDebug = !GTest.fDebug;
    }

    static hdebug() {
        GTest.hDebug = !GTest.hDebug;
    }

    static nt() {
        GApi.gm.gmNextTask();
    }

    static mf() {
        GApi.gm.gmFacilityUnlock();
    }

    static am() {
        GApi.gm.gmAllMission();
    }

    static cs() {
        GApi.gm.clearAllSurvivor();
    }

    static as(p1, p2) {
        GApi.gm.gmAddSkill({ id: p1, count: p2 });
    }
    static ap(p1, p2) {
        GApi.gm.gmAddPet({ id: p1, count: p2 });
    }

    static sp() {
        const team = BattleFactory.getPlayerPveTeam(GState.data);
        const list = team.map((info) => {
            const tbl = GTable.getById("JobChangeTbl", info.id) || GTable.getById("DefendTowerTbl", info.id);
            const p = info.property;
            const str = Object.keys(p)
                .map((k) => {
                    const v = p[k];
                    const kName = GIndex.battle.propertyText(k);
                    if (GLang.getText(kName)) {
                        return GLang.getText(kName) + ":" + v;
                    } else {
                        return null;
                    }
                })
                .filter((s) => s)
                .join("\n");
            const nameStr = GLang.getText(tbl.name);
            return `${nameStr}:\n${str}\n`;
        });
        console.log(list.join("\n"));
    }

    static unlock() {
        GModel.localStorage.unlockAllSystem = true;
    }

    static lock() {
        GModel.localStorage.unlockAllSystem = false;
    }
}
