import { BattleBattleStageObject } from "../../Object/BattleStage/BattleBattleStageObject";
import { BattleBattleStageContext } from "../../Processor/BattleBattleStageContext";
import { BattleIoc } from "../../Processor/BattleIoc";
import { BattleSkillConfigNode, BattleSkillNodeType } from "../BattleSkillConfigGraph";
import { BattleSkillBaseDisplay } from "../Display/BattleSkillBaseDisplay";
import { BattleSkillTargetSelectManager } from "../TargetSelect/BattleSkillTargetSelectManager";

export abstract class BattleBaseSkillProcess {
    constructor(public ctx: BattleBattleStageContext, public nodeId: number) {
        this.init();
    }
    get skillCategory() {
        return this.ctx.skill.skillCategory;
    }
    /** 初始化 */
    abstract init(): void;

    get nodeConfig() {
        const graph = this.ctx.skill.graph;
        return graph.getNodeById(this.nodeId);
    }

    get nodeKey(): string {
        return `${this.ctx.skill.id}_${this.nodeId}`;
    }

    /** 是否立即完成 */
    abstract immediate: boolean;

    /** 开始技能流程 */
    abstract start(): void;

    /** 缓存的技能目标 */
    cacheTargetList: BattleBattleStageObject[] = [];

    /** 是否已结束 */
    isEnd(): boolean {
        return true;
    }

    /** 结束时调用 */
    onProcessEnd() {}

    /** 上一流程 */
    prevProcess(): BattleBaseSkillProcess | null {
        const prev = this.nodeConfig.getInput("prev");
        if (prev) {
            return this.buildProcess(prev);
        } else {
            return null;
        }
    }

    /** 下一流程 */
    nextProcess(): BattleBaseSkillProcess | null {
        return this.nextProcessByOutputName("next");
    }

    /** 下一流程 */
    nextProcessByOutputName(name: string): BattleBaseSkillProcess | null {
        const next = this.nodeConfig.getOutput(name);
        if (next.length > 0) {
            return this.buildProcess(next[0]);
        } else {
            return null;
        }
    }

    /** 获取目标 */
    getTarget(): BattleBattleStageObject[] {
        const redirect = this.nodeConfig.getInput("target");
        let t: BattleBattleStageObject[];
        if (redirect) {
            const tsm = new BattleSkillTargetSelectManager(this.ctx, redirect.id);
            t = tsm.getTarget();
        } else {
            t = this.ctx.skill.targetSelectManager.getTarget();
        }
        return t;
    }

    handleDisplay() {
        const display = this.buildDisplay();
        display.forEach((d) => {
            d.start();
        });
    }

    abstract tick(): void;

    buildProcess(node: BattleSkillConfigNode): BattleBaseSkillProcess {
        const c = BattleIoc.getClass(node.type);
        return Reflect.construct(c, [this.ctx, node.id]);
    }

    buildDisplay(): BattleSkillBaseDisplay[] {
        const display = this.nodeConfig.getOutput("presentation");
        return display.map((d) => {
            const c = BattleIoc.getClass(d.type);
            return Reflect.construct(c, [this, d]);
        });
    }
}
