import { memory } from "../../framework/Decorator";
import EventBus from "../../framework/event/EventBus";
import EventName from "../event/EventName";

export default class DefendTowerModel {
    /** 获取图鉴数据 */
    getColletionData(part: number): {
        /** 装备id */
        equipmentId: number;
        /** 天赋id */
        talentId: number;
        /** 状态：未激活、可激活、已激活 */
        state: "notActive" | "canActive" | "hasActive";
    }[] {
        return GTable.getList("EquipmentTbl")
            .filter((tbl) => tbl.part === part)
            .map((tbl) => {
                let state: "notActive" | "canActive" | "hasActive" = "notActive";
                if (GState.data.equipmentCollection.canActive.includes(tbl.id)) {
                    state = "canActive";
                } else if (GState.data.equipmentCollection.hasActive.includes(tbl.id)) {
                    state = "hasActive";
                }
                return {
                    equipmentId: tbl.id,
                    talentId: tbl.skillTalent,
                    state,
                };
            });
    }

    /** 获取当前防御塔的阵容 */
    getTowerFormation() {
        return GState.data.towerFormation;
    }

    getPartDescription(part: number): string[] {
        const tbl = GTable.getList("PlayerSkillTbl").find((t) => t.part === part);
        if (!tbl) return ["_rs"];
        const env = [{ lv: 0 }];
        const param = tbl.descriptionParam.map((x) => "_rs" + AstUtil.eval(x, env));
        return [tbl.description, ...param];
    }

    /** 获取防御的天赋数据 */
    getTowerTalentData(part: number): {
        /** 天赋id */
        talentId: number;
        /** 装备id */
        equipmentId: number;
        /** 天赋位置 */
        index: number;
        /** 状态：未激活、可激活、已激活 */
        state: "notActive" | "canActive" | "hasActive" | "canUpgrade";
    }[] {
        const talentTbls = GTable.getList("PlayerSkillTalentTbl").filter((t) => t.part === part);
        const map = GUtils.array.groupToMap(talentTbls, (t) => t.index);
        const activeTalent = GState.data.towerTalent[part];
        const res = GUtils.map
            .mapToArray(map, (v) => v)
            .map((list) => {
                // const hasActive = list.filter((t) => {
                //     const eId = GIndex.id.talentToEquipmentId[t.id];
                //     // 修改，可激活的图鉴也可选择
                //     return (
                //         GState.data.equipmentCollection.hasActive.includes(eId) ||
                //         GState.data.equipmentCollection.canActive.includes(eId)
                //     );
                // });
                // const index = list[0].index;
                // let state: "notActive" | "canActive" | "hasActive" = "notActive";
                // if (activeTalent.includes(index)) {
                //     state = "hasActive";
                // } else if (hasActive.length > 0) {
                //     state = "canActive";
                // }
                // let talentTbl = list[0];
                // if (hasActive.length > 0) {
                //     talentTbl = GUtils.array.maxBy(hasActive, (t) => t.rank);
                // }
                // const equipmentId = GIndex.id.talentToEquipmentId[talentTbl.id];
                // return {
                //     talentId: talentTbl.id,
                //     index,
                //     state,
                //     equipmentId,
                // };
                let state: "notActive" | "canActive" | "hasActive" | "canUpgrade" = "notActive";
                const index = list[0].index;
                const hasGet = list.filter((t) => {
                    const eId = GIndex.id.talentToEquipmentId[t.id];
                    // 修改，可激活的图鉴也可选择
                    return (
                        GState.data.equipmentCollection.hasActive.includes(eId) ||
                        GState.data.equipmentCollection.canActive.includes(eId)
                    );
                });
                let talentId = activeTalent[index];
                const talentTbl = list.find((l) => l.id === talentId);
                if (talentId === -1 && hasGet.length > 0) {
                    state = "canActive";
                } else if (hasGet.some((t) => t.rank > talentTbl.rank)) {
                    state = "canUpgrade";
                } else if (hasGet.some((t) => t.rank <= talentTbl.rank)) {
                    state = "hasActive";
                }
                talentId = talentId === -1 ? list[0].id : talentId;
                const equipmentId = GIndex.id.talentToEquipmentId[talentId];
                return {
                    talentId,
                    index,
                    state,
                    equipmentId,
                };
            });
        res.sort((a, b) => a.index - b.index);
        return res;
    }

    /** 获取已激活的天赋数量 */
    // getTowerTalentHasActiveCount(part: number): number {
    //     const activeTalent = GState.data.towerTalent[part];
    //     return activeTalent.length;
    // }

    /** 替换上阵的塔
     * @param originIndex 想要替换的塔位置，如果塔位有3个，则有效值为0，1，2
     * @param replacePart 用于替换的装备部位
     */
    async replaceTower(originIndex: number, replacePart: number): Promise<void> {
        if (!this.isTowerPlaceUnlock(originIndex, true)) {
            return;
        }
        const origin = GModel.battle.getBattlePoint();
        await GApi.playerEquipment.replaceTower({ originIndex, replacePart });
        const after = GModel.battle.getBattlePoint();
        GTip.showBattlePointChange(origin, after, [], [], false);
        EventBus.emit(EventName.changeTower, originIndex);
    }

    async changeTowerPosition(fromIndex: number, toIndex: number) {
        if (!this.isTowerPlaceUnlock(toIndex, true)) {
            return;
        }
        await GApi.playerEquipment.changeTowerPosition({ fromIndex, toIndex });
        EventBus.emit(EventName.changeTowerPosition, fromIndex, toIndex);
    }
    /** 激活图鉴 */
    async activateColletion(equipmentId: number): Promise<void> {
        const reward = await GApi.playerEquipment.activateColletion({ equipmentId });
        reward.forEach((r) => {
            GTip.showRewardItem(r);
        });
    }
    /**
     * 选择天赋，如果原本已选会变成未选，未选会变成已选
     * @param part 装备部位
     * @param index 天赋的index
     */
    async selectTalent(part: number, index: number): Promise<void> {
        await GApi.playerEquipment.selectTalent({ part, index });
        // GModel.stage.battleSceneMainLoop();
    }
    /**
     * 选择天赋，如果原本已选会变成未选，未选会变成已选
     * @param part 装备部位
     * @param index 天赋的index
     */
    async upgradeTalent(part: number, index: number): Promise<void> {
        await GApi.playerEquipment.upgradeTalent({ part, index });
        // GModel.stage.battleSceneMainLoop();
    }

    isTowerPlaceUnlock(index: number, tip: boolean = false) {
        return index === 0 || GModel.player.checkSystemUnlock(GIndex.id.systemId.towerPlace[index], tip);
    }

    @memory
    getDefaultSceneTowerPos() {
        const tbl = GTable.getList("BattleSceneInfoTbl").find((t) => t.prefab === "map2");
        return tbl.towerPos.map(([x, y]) => {
            return { x, y };
        });
    }
}
