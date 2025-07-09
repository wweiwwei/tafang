import { BattleDisplayEvent } from "../../Display/BattleDisplayEvent";
import { BattleBattleStageData } from "../BattleBattleStageData";

export class BattleRogueBossManager {
    private bossId: number;
    private config: {
        id: number;
        wave: number;
    }[];
    private hasLaunch = 0;
    constructor(public ctx: BattleBattleStageData) {
        const tbl = GTable.getById("MonsterWaveTbl", this.ctx.ctx.waveId);
        this.bossId = tbl.boss;
        this.config = GTable.getById("BattleRogueBossTbl", this.bossId).skill.map(([id, wave]) => {
            return { id, wave };
        });
    }

    tick() {
        if (this.hasLaunch >= this.config.length) return;
        const wave = this.ctx.monsterQueue.getWave();
        const c = this.config[this.hasLaunch];
        if (wave >= c.wave) {
            this.startSkill();
        }
        this.checkBuff();
    }

    private startSkill() {
        const c = this.config[this.hasLaunch];
        this.hasLaunch++;
        const tbl = GTable.getById("BattleRogueBossSkillTbl", c.id);
        this.ctx.pushDisplayEvent(new BattleDisplayEvent("bossSkillDialogue", { id: c.id }));
        this.ctx.scheduler.scheduleOnce(
            100,
            () => {
                tbl.config.forEach((list) => {
                    if (list[0] === "1") {
                        this.handleSkillBlock(list);
                    } else if (list[0] === "2") {
                        this.handleSkillSlow(list);
                    } else if (list[0] === "3") {
                        this.handlePlayerBuff(list);
                    } else if (list[0] === "4") {
                        // 召唤怪物
                    }
                });
            },
            this
        );
    }

    private handleSkillBlock(config: string[]) {
        // 随机封技能
        const player = this.ctx.attackTeam.get(1);
        const list = config.map((t) => Number(t));
        const [_, count, time] = list;
        const skillCount = player.skillManager.independentSkill.length;
        let index: number[] = [];
        if (skillCount <= count) {
            // 顺序封印格子
            for (let i = 0; i < count; i++) {
                index.push(i);
            }
        } else {
            // 随机封印格子
            const list: number[] = [];
            for (let i = 0; i < skillCount; i++) {
                list.push(i);
            }
            const sr = this.ctx.sr;
            index = sr.rdArrayElement(list, count);
        }
        this.ctx.scheduler.scheduleOnce(
            1000,
            () => {
                player.skillManager.blockInfo = {
                    index,
                    endFrame: this.ctx.frame + Math.round(time / GConstant.battle.logicTick),
                };
            },
            this
        );
        this.ctx.pushDisplayEvent(
            new BattleDisplayEvent("showBossEffect", {
                kind: 1,
                bullet: "UIforbid_skillattack",
                index,
            })
        );
    }

    private handleSkillSlow(config: string[]) {
        // 随机延长技能间隔
        const player = this.ctx.attackTeam.get(1);
        const list = config.map((t) => Number(t));
        const [_, count, slow, time] = list;
        const skillCount = player.skillManager.independentSkill.length;
        let index: number[] = [];
        if (skillCount <= count) {
            // 顺序封印格子
            for (let i = 0; i < count; i++) {
                index.push(i);
            }
        } else {
            // 随机封印格子
            const list: number[] = [];
            for (let i = 0; i < skillCount; i++) {
                list.push(i);
            }
            const sr = this.ctx.sr;
            index = sr.rdArrayElement(list, count);
        }
        this.ctx.scheduler.scheduleOnce(
            1000,
            () => {
                player.skillManager.slowInfo = {
                    index,
                    slow,
                    endFrame: this.ctx.frame + Math.round(time / GConstant.battle.logicTick),
                };
            },
            this
        );
        this.ctx.pushDisplayEvent(
            new BattleDisplayEvent("showBossEffect", {
                kind: 1,
                bullet: "UIforbid_skillattack",
                index,
            })
        );
    }
    private buffList: {
        property: string;
        value: string;
        endFrame: number;
    }[] = [];
    private handlePlayerBuff(config: string[]) {
        // 附加玩家Buff
        const player = this.ctx.attackTeam.get(1);
        player.propertyManager.setFinalPropertyDirty();
        this.buffList.push({
            property: config[1],
            value: config[2],
            endFrame: this.ctx.frame + Math.round(Number(config[3]) / GConstant.battle.logicTick),
        });
    }
    checkBuff() {
        const frame = this.ctx.frame;
        if (this.buffList.some((t) => t.endFrame < frame)) {
            this.buffList = this.buffList.filter((t) => t.endFrame >= frame);
            const player = this.ctx.attackTeam.get(1);
            player.propertyManager.setFinalPropertyDirty();
        }
    }

    getBuffList() {
        return this.buffList;
    }
    private handleMonsterSummon(config: string[]) {}
}
