import { BattleTriggerEvent } from "../Event/BattleTriggerEvent";
import { BattleObjectInfoSkill } from "../Object/BattleStage/BattleObjectInfo";
import { BattleBattleStageContext } from "../Processor/BattleBattleStageContext";
import { BattleSkill } from "./BattleSkill";
import { BattleBuilderEnv } from "./Builder/BattleBuilderEnv";
import { BattleTriggerColdDown } from "./Builder/Trigger/BattleTriggerColdDown";
import { BattleTriggerEx } from "./Builder/Trigger/BattleTriggerEx";
import { BattleTriggerIndependent } from "./Builder/Trigger/BattleTriggerIndependent";

export class BattleSkillManager {
    constructor(public ctx: BattleBattleStageContext) {
        if (this.ctx.object.objectType === GConstant.battle.battleObjectType.wall) return;
        const info = this.ctx.object.info;
        const all = [
            ...info.independentSkill,
            ...info.mainSkill,
            ...info.otherSkill,
            ...info.artifact,
            info.normalAttack,
        ];
        // 初始化flag
        all.forEach(({ id, level }) => {
            const tbl = GTable.getById("BattleSkillTbl", id);
            tbl.flag.forEach((f) => this.ctx.object.propertyManager.heroFlag.push(f));
        });
        const spineTbl = this.ctx.object.getSpineTbl();
        const normalAttackSkills = BattleBuilderEnv.getSkills(
            info.normalAttack.id,
            info.normalAttack,
            info.normalAttack.level,
            this.ctx.object,
            spineTbl
        );
        const others = GUtils.array
            .chain(info.otherSkill)
            .flatMap((skillInfo) =>
                BattleBuilderEnv.getSkills(skillInfo.id, skillInfo, skillInfo.level, this.ctx.object, spineTbl)
            )
            .unwrap();
        const mains = GUtils.array
            .chain(info.mainSkill)
            .flatMap((skillInfo) =>
                BattleBuilderEnv.getSkills(skillInfo.id, skillInfo, skillInfo.level, this.ctx.object, spineTbl)
            )
            .unwrap();
        const independents = GUtils.array
            .chain(info.independentSkill)
            .flatMap((skillInfo) =>
                BattleBuilderEnv.getSkills(skillInfo.id, skillInfo, skillInfo.level, this.ctx.object, spineTbl)
            )
            .unwrap();
        const exs = GUtils.array
            .chain(info.exSkill)
            .flatMap((skillInfo) =>
                BattleBuilderEnv.getSkills(skillInfo.id, skillInfo, skillInfo.level, this.ctx.object, spineTbl)
            )
            .unwrap();
        const artifacts = GUtils.array
            .chain(info.artifact)
            .flatMap((skillInfo) =>
                BattleBuilderEnv.getSkills(skillInfo.id, skillInfo, skillInfo.level, this.ctx.object, spineTbl)
            )
            .unwrap();
        const allSkills = [...normalAttackSkills, ...others, ...mains, ...independents, ...exs, ...artifacts];
        allSkills.forEach((skill) => {
            switch (skill.skillCategory) {
                case "independent":
                    this.independentSkill.push(skill);
                    break;
                case "main":
                    this.mainSkill.push(skill);
                    break;
                case "passive":
                    this.passiveSkill.push(skill);
                    break;
                case "normalAttack":
                    this.normalAttack = skill;
                    break;
                case "ex":
                    this.exSkill.push(skill);
                    break;
                case "artifact":
                    this.artifactSkill.push(skill);
                    break;
            }
        });
    }

    /** 普攻 */
    private normalAttack: BattleSkill = null;
    /** 独立技能 */
    independentSkill: BattleSkill[] = [];
    /** 怒气技能 */
    private mainSkill: BattleSkill[] = [];
    /** 其他所有技能 */
    private passiveSkill: BattleSkill[] = [];
    /** 必杀技 */
    private exSkill: BattleSkill[] = [];
    /** 神器技能 */
    private artifactSkill: BattleSkill[] = [];
    private curSkill: BattleSkill = null;

    roguePassiveSkill: BattleObjectInfoSkill[] = [];

    hasMainSkill() {
        return this.mainSkill.length > 0;
    }

    getMainSkillProcess() {
        const t = this.mainSkill[0].trigger as BattleTriggerColdDown;
        const frame = this.ctx.data.frame;
        return (frame - t.lastLaunch) / t.interval;
    }

    getExSkillInfo() {
        return this.exSkill.map((s) => {
            const t = s.trigger as BattleTriggerEx;
            const progress = this.ctx.data.globalPropertyManager.totalKill - t.nextLaunch + t.require;
            const require = t.require;
            return {
                info: s.skillInfo,
                progress,
                require,
            };
        });
    }

    getIndependantSkillInfo() {
        return this.independentSkill.map((s) => {
            const t = s.trigger as BattleTriggerIndependent;
            const frame = this.ctx.data.frame;
            const progress = (frame - t.lastLaunch) / t.getInterval();
            return {
                info: s.skillInfo,
                progress,
            };
        });
    }
    /** 获取肉鸽技能等级 */
    getRogueSkillLevel(rogueId: number) {
        const originIndex = this.independentSkill.findIndex((s) => s.skillInfo.rogueSkillId === rogueId);
        if (originIndex === -1 || originIndex === 0) {
            // 找不到技能或者第一个技能不允许售出
            return 0;
        } else {
            const origin = this.independentSkill[originIndex];
            const originLv = origin.skillInfo.level;
            return originLv;
        }
    }
    /** 出售肉鸽技能，返回金额 */
    sellRogueSkill(rogueId: number): number {
        const originIndex = this.independentSkill.findIndex((s) => s.skillInfo.rogueSkillId === rogueId);
        if (originIndex === -1) {
            // 不存在技能
            return 0;
        } else {
            const origin = this.independentSkill[originIndex];
            this.independentSkill = this.independentSkill.filter((s) => s !== origin);
            const tbl = GTable.getById("RogueSkillDetailTbl", origin.skillInfo.relateSkillId);
            return tbl.price;
        }
    }
    /** 增加肉鸽技能或者等级，返回升级后的等级 */
    addRougueSkill(rogueId: number): number {
        const tbl = GTable.getById("RogueSkillTbl", rogueId);
        if (tbl.passive) {
            // 被动肉鸽技能
            const originIndex = this.roguePassiveSkill.findIndex((s) => s.rogueSkillId === rogueId);
            if (originIndex === -1) {
                this.roguePassiveSkill.push({
                    rogueSkillId: rogueId,
                    id: rogueId,
                    level: 1,
                });
            } else {
                this.roguePassiveSkill[originIndex].level += 1;
            }
            // 刷新buff
            this.ctx.object.propertyManager.setFinalPropertyDirty();
            return;
        }
        // 肉鸽主动技能
        const originIndex = this.independentSkill.findIndex((s) => s.skillInfo.rogueSkillId === rogueId);
        if (originIndex === -1) {
            // 原本不存在，添加技能
            const tbl = GTable.getById("RogueSkillTbl", rogueId);
            const detailTbl = GTable.getList("RogueSkillDetailTbl").find((t) => t.skillId === tbl.id && t.level === 1);
            const skillInfo = {
                rogueSkillId: tbl.id,
                id: detailTbl.battleSkill[0],
                relateSkillId: detailTbl.id,
                level: 1,
            };
            const spineTbl = this.ctx.object.getSpineTbl();
            const skill = BattleBuilderEnv.getSkills(
                skillInfo.id,
                skillInfo,
                skillInfo.level,
                this.ctx.object,
                spineTbl
            )[0];
            this.independentSkill.push(skill);
            return 1;
        } else {
            // 原本存在，升1级
            const origin = this.independentSkill[originIndex];
            const originLv = origin.skillInfo.level;
            const tbl = GTable.getById("RogueSkillTbl", rogueId);
            const detailTbl = GTable.getList("RogueSkillDetailTbl").find(
                (t) => t.skillId === tbl.id && t.level === originLv + 1
            );
            const skillInfo = {
                rogueSkillId: tbl.id,
                id: detailTbl.battleSkill[0],
                relateSkillId: detailTbl.id,
                level: originLv + 1,
            };
            const spineTbl = this.ctx.object.getSpineTbl();
            const skill = BattleBuilderEnv.getSkills(
                skillInfo.id,
                skillInfo,
                skillInfo.level,
                this.ctx.object,
                spineTbl
            )[0];
            this.independentSkill[originIndex] = skill;
            return skill.skillInfo.level;
        }
    }

    removeRougueSkill(id: number) {}

    onTriggerEvent(e: BattleTriggerEvent) {
        this.passiveSkill.filter((x) => x.onEvent(e)).forEach((x) => x.start(e));
    }

    onEnter() {
        this.normalAttack.onEnter();
        this.mainSkill.forEach((s) => s.onEnter());
        this.independentSkill.forEach((s) => s.onEnter());
        this.passiveSkill.forEach((s) => s.onEnter());
    }

    onQuit() {
        this.normalAttack.onQuit();
        this.mainSkill.forEach((s) => s.onQuit());
        this.independentSkill.forEach((s) => s.onQuit());
        this.passiveSkill.forEach((s) => s.onQuit());
    }

    onExOrder(index: number) {
        const s = this.exSkill[index];
        if (s.trigger.onOrder(s)) {
            s.start();
        }
    }

    preBattle() {
        this.passiveSkill.forEach((s) => {
            const tbl = GTable.getById("BattleSkillTbl", s.id);
            tbl.flag.forEach((f) => this.ctx.object.propertyManager.heroFlag.push(f));
        });
        // todo
        // this.skill.filter((s) => s.graph.skillType === "prebattle").forEach((s) => s.launchDirect());
    }

    getNormalAttack(): BattleSkill {
        return this.normalAttack;
    }
    slowInfo: {
        slow: number;
        index: number[];
        endFrame: number;
    } = {
        slow: 0,
        index: [],
        endFrame: 0,
    };
    blockInfo: {
        index: number[];
        endFrame: number;
    } = {
        index: [],
        endFrame: 0,
    };

    tick() {
        const frame = this.ctx.data.frame;
        this.independentSkill.forEach((s, i) => {
            if (frame < this.blockInfo.endFrame) {
                // 查看封禁状态
                if (this.blockInfo.index.includes(i)) return;
            }
            if (frame < this.slowInfo.endFrame) {
                // 查看延长间隔
                if (this.slowInfo.index.includes(i)) {
                    s.independentTick(this.slowInfo.slow);
                } else {
                    s.independentTick(0);
                }
            } else {
                s.independentTick(0);
            }
        });
        this.artifactSkill.forEach((s) => s.independentTick(0));
    }

    /** 下一个可以主动释放的技能，已检测异常状态影响，所以该技能一定可以释放。没有任何技能可释放返回null */
    nextLaunchSkill(): BattleSkill | null {
        const readyMainSkill = this.mainSkill.filter((s) => s.onAttack())[0];
        if (readyMainSkill) return readyMainSkill;
        if (this.normalAttack.onAttack()) return this.normalAttack;
        return null;
    }

    /** 下一个可以释放的技能，优先可达性 */
    nextLaunchAndReachableSkill(): BattleSkill | null {
        const readyMainSkill = this.mainSkill.filter((s) => s.onAttack())[0];
        if (readyMainSkill && readyMainSkill.isPosCanLaunch()) return readyMainSkill;
        if (this.normalAttack.onAttack()) return this.normalAttack;
        return null;
    }

    setCurrentSkill(skill: BattleSkill) {
        this.curSkill = skill;
    }

    getCurSkill() {
        return this.curSkill;
    }

    endCurSkill() {
        this.curSkill.endSkill();
        this.curSkill = null;
    }
}
