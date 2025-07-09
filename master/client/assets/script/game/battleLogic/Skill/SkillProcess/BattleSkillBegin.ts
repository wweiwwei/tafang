import { registerSkillProcess } from "../../Processor/BattleIoc";
import { BattleBaseSkillProcess } from "./BattleBaseSkillProcess";

@registerSkillProcess("base/SkillBegin")
export class BattleSkillBegin extends BattleBaseSkillProcess {
    tick(): void {}
    immediate: boolean = true;
    init(): void {}
    start(): void {
        this.ctx.skill.launchCount++;
    }
}
