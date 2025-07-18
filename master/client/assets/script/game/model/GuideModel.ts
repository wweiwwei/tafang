import EventBus from "../../framework/event/EventBus";
import EventName from "../event/EventName";
import WindowBattleScene from "../module/battle/WindowBattleScene";
import WindowSettlement from "../module/battle/WindowSettlement";
import WindowBattle from "../module/battle/rogue/WindowBattle";
import WindowFacilityMap from "../module/build/WindowFacilityMap";
import WindowMission from "../module/common/WindowMission";
import WindowBuildingDetail from "../module/mainscene/WindowBuildingDetail";
import WindowDialogue from "../module/mainscene/WindowDialogue";
import WindowGuide from "../module/mainscene/WindowGuide";
import WindowWeakGuide from "../module/mainscene/WindowWeakGuide";

export default class GuideModel {
    /** 触发对话/引导 */
    triggerDialogue(kind: number, param: number, param2: number = -1) {
        GModel.player.triggerSystemUnlock(kind, param, param2);
        if (CC_PREVIEW && GModel.localStorage.skipGuide) return;
        const guide = GTable.getList("GuideTbl").find((t) => {
            if (param2 === -1) {
                return t.trigger[0] === kind && t.trigger[1] === param;
            } else {
                return t.trigger[0] === kind && t.trigger[1] === param && t.trigger[2] === param2;
            }
        });
        // 同一触发条件，引导优先于对话
        if (guide && !guide.skip.some((v) => this.predicate[v[0]](...v.slice(1)))) {
            GWindow.buttonBlock = true;
            GWindow.sceneEventBlock = true;
            GWindow.open(WindowGuide, { id: guide.id });
        } else {
            const dialogue = GTable.getList("DialogueTbl").find((t) => {
                if (param2 === -1) {
                    return t.trigger[0] === kind && t.trigger[1] === param;
                } else {
                    return t.trigger[0] === kind && t.trigger[1] === param && t.trigger[2] === param2;
                }
            });
            if (dialogue && !GWindow.get(WindowGuide)) {
                GWindow.open(WindowDialogue, { id: dialogue.id });
            }
        }
        const weakGuide = GTable.getList("WeakGuideTbl").find((t) => t.trigger[0] === kind && t.trigger[1] === param);
        if (weakGuide && !weakGuide.skip.some((v) => this.predicate[v[0]](...v.slice(1)))) {
            GWindow.open(WindowWeakGuide, { id: weakGuide.id });
        }
    }

    /** 结束跟随 */
    endFollow() {
        this.followEnd = true;
    }
    needGuideBattle = false;
    setGuideBattle(v: boolean) {
        // this.needGuideBattle = v;
        // const api = GBattleApiManager.getBattleStageApi();
        // if (api) {
        //     if (v) {
        //         api.switchToGuideMode();
        //     } else {
        //         api.switchToPeaceMode();
        //     }
        // }
    }

    preRun = {
        closeAndFocus: (idStr: string) => {
            const id = Number(idStr);
            GWindow.sceneLimit = id;
            GWindow.closeAll([WindowGuide]);
            // setTimeout(() => {
            //     GWindow.get(WindowFacilityMap)?.sceneControl.focusLimitPosition(id);
            // }, 200);
        },
        facilityBattle: (idStr: string) => {
            GWindow.close(WindowMission);
            GModel.facility.occupyFacility(Number(idStr));
        },
        closeAll: () => {
            GWindow.closeAll([WindowGuide]);
        },
        /** 跟随幸存者前往 */
        followTo: (fromStr: string, toStr: string) => {
            GWindow.get(WindowFacilityMap).survivorControl.followTo(Number(fromStr), Number(toStr));
            this.followEnd = false;
        },
        /** 添加引导怪物 */
        addGuideMonster: (countStr: string) => {
            const api = GBattleApiManager.getBattleStageApi(0);
            if (api) {
                api.addGuideMonster(Number(countStr));
            }
        },
        pauseBattle: () => {
            GModel.battle.pauseBattle(true);
        },
        continueBattle: () => {
            GModel.battle.pauseBattle(false);
        },
        showExSkill: () => {
            EventBus.emit(EventName.showExSkill);
        },
    };

    private followEnd = false;
    predicate = {
        /** 已经解锁建筑 */
        notUnlockFacility: (idStr: string) => {
            return !GModel.facility.getFacilityById(Number(idStr)).unlock;
        },
        /** 任务在任务列表但状态是未完成 */
        missionExistAndNotComplete: (idStr: string, stageStr: string) => {
            return (
                GModel.mission
                    .mainMissionList()
                    .find(
                        (m) => m.id === Number(idStr) && m.stage === Number(stageStr) && m.getState() === "notComplete"
                    ) !== undefined
            );
        },
        /** 任务状态是已领取 */
        missionHasGet: (idStr: string, stageStr: string) => {
            return GModel.mission.isMainMissionComplete(Number(idStr), Number(stageStr));
        },
        /** 任务状态是已领取 */
        missionComplete: (idStr: string) => {
            return (
                GUtils.array
                    .objectToArray(GState.data.mainMission)
                    .find((m) => m.id === Number(idStr) && m.getState() === "complete") !== undefined
            );
        },
        /** 目标已完成 */
        taskHasGet: (idStr: string) => {
            return GModel.mission.taskInfo().id > Number(idStr);
        },
        /** 目标可以完成 */
        taskCanGet: (idStr: string) => {
            return (
                GModel.mission.taskInfo().id === Number(idStr) &&
                GModel.mission.taskInfo().progress >= GModel.mission.taskInfo().require
            );
        },
        /** 未完成关卡 */
        notCompleteStage: (mapIndex: string, stageIndex: string) => {
            return GModel.stage.getStageByMapIndex(Number(mapIndex)).stageIndex <= Number(stageIndex);
        },
        /** 英雄数量等于 */
        heroCountEqual: (countStr: string) => {
            return GModel.hero.getAllHero().length === Number(countStr);
        },
        /** 拥有英雄但未上阵 */
        hasHeroAndNotInTeam: (heroIdStr: string) => {
            const id = Number(heroIdStr);
            return GModel.hero.getHeroByUniqueId(id) !== undefined && GModel.hero.getFormation().indexOf(id) === -1;
        },
        /** 拥有英雄 */
        hasHero: (heroIdStr: string) => {
            const id = Number(heroIdStr);
            return GModel.hero.getHeroByUniqueId(id) !== undefined;
        },
        /**达到第几关 */
        stageIndexTo: (stageIndex: string) => {
            const index = Number(stageIndex);
            return GModel.stage.getAllStage().find((s) => s.mapIndex === 1).stageIndex >= index;
        },
        /** 系统解锁 */
        systemUnlock: (systemIdStr: string) => {
            return GModel.player.checkSystemUnlock(Number(systemIdStr), false);
        },
        /** 从不 */
        never: () => {
            return false;
        },
        /** 窗口打开 */
        windowOpen: (name: string) => {
            return GWindow.getByName(name) !== null;
        },
        /** 解锁建筑 */
        unlockFacility: (idStr: string) => {
            return GModel.facility.getFacilityById(Number(idStr)).unlock;
        },
        /** 建筑有工人 */
        hasWorker: (idStr: string) => {
            return GModel.facility.getFacilityById(Number(idStr)).workCount() > 0;
        },
        unlockAndNoWorker: (idStr: string) => {
            console.log(
                GModel.facility.getFacilityById(Number(idStr)).unlock &&
                    GModel.facility.getFacilityById(Number(idStr)).workCount() === 0
            );

            return (
                GModel.facility.getFacilityById(Number(idStr)).unlock &&
                GModel.facility.getFacilityById(Number(idStr)).workCount() === 0
            );
        },
        /** 节点显示 */
        nodeActive: (path: string) => {
            return cc.find(path).active;
        },
        /** 窗口关闭 */
        windowClose: (name: string) => {
            return GWindow.getByName(name) === null;
        },
        /** 火球引导 */
        battleClickGuide: () => {
            return GModel.battle.lightningCountGuide > 0 || GWindow.get(WindowBattleScene) === null;
        },
        /** 跟从幸存者视角结束 */
        followEnd: () => {
            return this.followEnd;
        },
        // /** 火球激活 */
        // fireBallActive: () => {
        //     return GModel.battle.getRemainMs() > 0;
        // },
        /**爬塔层数 */
        towerLevel: () => {
            return GModel.tower.level() > 0;
        },
        /**装备数量大于等于 */
        equipmentCountEqual: (count: string) => {
            return GModel.hero.getAllEquipment().length >= Number(count);
        },
        /**存在装备 */
        equipmentExist: (idStr: string) => {
            return GModel.hero.getEquipmentById(Number(idStr)) !== undefined;
        },
        /**英雄穿戴装备 */
        heroGetEquipment: (idStr: string) => {
            return GModel.hero.getHeroByUniqueId(Number(idStr)).equipment.some((t) => t && t.id === 31001);
        },
        /** 已点击转盘 */
        turntableGuide: () => {
            return GModel.turntable.guideCount > 0;
        },
        /** 有任何一键装备 */
        hasAnyEquipment: () => {
            return GModel.hero.getAllEquipment().length > 0;
        },
        /** 装备了任何一件装备 */
        equipAny: () => {
            return GModel.hero.getAllHero().some((h) => h.equipment.some((e) => e));
        },
        /** 没有装备任何一件装备 */
        notEquipAny: () => {
            return !this.predicate.equipAny();
        },
        /** 升级了任何一键装备 */
        upgradeAnyEqupment: () => {
            return GUtils.array
                .chain(GModel.hero.getAllEquipment())
                .flatMap((e) => e.getEquipmentWrapperList())
                .some((e) => e.level > 1);
        },
        /** 之前所有的引导完成而当前引导未完成 */
        allPreGuideCompleteAndThisGuideNotComplete: (idStr: string) => {
            const id = Number(idStr);
            const completeGuide = this.getHasComplete();
            if (completeGuide.includes(id)) return false;
            const index = GTable.getList("GuideTbl")
                .map((t) => t.id)
                .indexOf(id);
            if (index === -1) return false;
            return GTable.getList("GuideTbl")
                .slice(0, index)
                .every((t) => completeGuide.includes(t.id));
        },
        /** 击杀怪物数量 */
        monsterClearCount: (countStr: string) => {
            return GModel.battle.killMonsterCount >= Number(countStr);
        },
        /** 总计召唤 */
        totalSummon: (countStr: string) => {
            return GModel.stone.stone().totalSummon >= Number(countStr);
        },
        /** 是否已有某部位的装备 */
        hasEquipment: (partStr: string) => {
            return GModel.playerEquipment.equipment()[Number(partStr)] != null;
        },
        /** 是否已有某部位的装备 */
        hasEquipmentWithId: (partStr: string, idStr: string) => {
            return GModel.playerEquipment.equipment()[Number(partStr)]?.id === Number(idStr);
        },
        /** 启动了自动召唤 */
        stoneAuto: () => {
            return GModel.stone.isAuto();
        },
        /** 开启了挑战模式 */
        challengeMode: () => {
            return !GModel.stage.isPeaceMode();
        },
        /** 某一位置的塔已经上阵 */
        hasTower: (indexStr: string) => {
            return GModel.defendTower.getTowerFormation()[Number(indexStr)] >= 0;
        },
        notHasTower: (indexStr: string) => {
            return !GModel.guide.predicate.hasTower(indexStr);
        },
        /** 是否激活了图鉴 */
        hasActiveCollection: (partStr: string, idStr: string) => {
            const part = Number(partStr);
            const id = Number(idStr);
            return GModel.defendTower.getColletionData(part).find((d) => d.equipmentId === id).state === "hasActive";
        },
        /** 是否激活了天赋 */
        hasActiveTalent: (partStr: string, idStr: string) => {
            const part = Number(partStr);
            const id = Number(idStr);
            const data = GModel.defendTower.getTowerTalentData(part).find((d) => d.equipmentId === id);
            return data.state === "hasActive" || data.state === "canUpgrade";
        },
        /** 激活了任何天赋 */
        hasActiveAnyTalent: () => {
            return Object.keys(GState.data.towerTalent).some((k) => {
                const list: { [index: number]: number } = GState.data.towerTalent[k];
                return Object.values(list).some((v) => v > 0);
            });
        },
        /** 没有激活任何天赋 */
        notActiveAnyTalent: () => {
            return !GModel.guide.predicate.hasActiveAnyTalent();
        },
        /** 玩家等级大于等于 */
        playerLevelEqualOrGreater: (lvStr: string) => {
            return GModel.player.level() >= Number(lvStr);
        },
        /** 科技级别大于等于 */
        techLvEqualOrGreater: (idStr: string, lvStr: string) => {
            return GModel.tree.getList().find((t) => t.id === Number(idStr)).level >= Number(lvStr);
        },
        // /** 怪物数量大于等于 */
        // monsterReachCount: (countStr: string) => {
        //     const count = Number(countStr);
        //     const api = GBattleApiManager.getBattleStageApi(0);
        //     if (api) {
        //         return api.getWaveInfo().monsterCount >= count;
        //     } else {
        //         return false;
        //     }
        // },
        /** 波数等待 */
        monsterWave: (waveStr: string) => {
            const wave = Number(waveStr);
            const api = GBattleApiManager.getBattleStageApi(0);
            if (api) {
                return api.getWaveInfo().wave >= wave;
            } else {
                return false;
            }
        },
        /** 波数即将结束 */
        monsterWaveNearEnd: (waveStr: string) => {
            const wave = Number(waveStr);
            const api = GBattleApiManager.getBattleStageApi(0);
            if (api) {
                const info = api.getWaveInfo();
                return info.wave > wave || (info.wave === wave && info.progress >= 0.97);
            } else {
                return false;
            }
        },
        /** 技能被封印 */
        skillForbid: () => {
            const api = GBattleApiManager.getBattleStageApi(0);
            if (api) {
                return api.getForbidInfo().length > 0;
            } else {
                return false;
            }
        },
        /** 有发动神通的指令 */
        hasExSkillOrder: () => {
            return GBattleApiManager["playerCommandList"].some((c) => c.kind === "exSkill");
        },
        /** 拥有鸿运卡 */
        hasBattleDiamond: () => {
            const api = GBattleApiManager.getBattleStageApi(0);
            if (api) {
                return api.globalProperty().diamond > 0;
            } else {
                return false;
            }
        },
        battleEnd: () => {
            const api = GBattleApiManager.getBattleStageApi(0);
            if (api) {
                return api.isBattleEnd();
            } else {
                return true;
            }
        },
    };

    /** 登录触发 */
    async loginCheckTrigger() {
        if (CC_PREVIEW && GModel.localStorage.skipGuide) return;
        // 跳过的引导标记为完成
        const needComplete = GTable.getList("GuideTbl").filter((t) => {
            return !this.getHasComplete().includes(t.id) && t.skip.some((v) => this.predicate[v[0]](...v.slice(1)));
        });
        const promiseList = needComplete.map((t) => {
            return this.complete(t.id);
        });
        await Promise.all(promiseList);
        const guide = GTable.getList("GuideTbl").find((t) => {
            return (
                !this.getHasComplete().includes(t.id) &&
                t.loginTrigger.every((v) => this.predicate[v[0]](...v.slice(1))) &&
                !t.skip.some((v) => this.predicate[v[0]](...v.slice(1)))
            );
        });
        if (guide) {
            GWindow.open(WindowGuide, { id: guide.id });
        }
    }

    /** 汇报完成 */
    complete(id: number) {
        // if (id === 5) {
        //     // 切换到自动攻击
        //     const api = GBattleApiManager.getBattleStageApi(0);
        //     if (api) {
        //         api.setAutoAttack();
        //         api.switchToPeaceMode();
        //     }
        // }
        return GApi.guide.complete({ id });
    }
    guideBattle() {
        if (CC_PREVIEW && GModel.localStorage.skipGuide) return false;
        return GModel.defendTower.getTowerFormation().every((id) => id < 0);
    }

    /** 获取已完成的引导 */
    getHasComplete(): number[] {
        return GState.data.guideData.hasComplete;
    }

    isFirstBattle() {
        if (CC_PREVIEW && GModel.localStorage.skipGuide) return false;
        return GState.data.guideData.hasComplete.length === 0;
    }
    beginGuideBattle() {
        return new Promise<void>(async (resolve) => {
            await GModel.guide.loginCheckTrigger();
            const processor = GModel.battle.createGuideBattle();
            GWindow.open(WindowBattle);
            GWindow.open(WindowBattleScene, {
                startOnInit: true,
                processor,
                battleType: "stage",
                battleEndCallBack: async (isWin) => {
                    if (isWin) {
                        const intervalId = setInterval(async () => {
                            if (this.getHasComplete().includes(1)) {
                                await GWindow.close(WindowBattleScene);
                                await GWindow.close(WindowBattle);
                                resolve();
                                clearInterval(intervalId);
                            }
                        }, 1000);
                    } else {
                        this.complete(1);
                        GWindow.close(WindowGuide);
                        await GWindow.close(WindowBattleScene);
                        await GWindow.close(WindowBattle);
                    }
                },
                disableAutoClose: true,
            });
        });
    }

    dragGuide = false;
}
