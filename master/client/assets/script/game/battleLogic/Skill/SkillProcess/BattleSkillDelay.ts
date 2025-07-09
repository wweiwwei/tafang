import { registerSkillProcess } from "../../Processor/BattleIoc";
import { BattleSkillTimer } from "../Duration/BattleSkillTimer";
import { BattleBaseSkillProcess } from "./BattleBaseSkillProcess";

@registerSkillProcess("base/SkillDelay")
export class BattleSkillDelay extends BattleBaseSkillProcess {
    immediate: boolean = false;
    start(): void {}
    timer: BattleSkillTimer;

    init(): void {
        const duration = this.nodeConfig.getProperties("duration");
        if (duration === 0) {
            this.immediate = true;
        } else {
            this.immediate = false;
            this.timer = new BattleSkillTimer(duration);
        }
    }

    tick(): void {
        if (this.skillCategory === "normalAttack") {
            const s = this.ctx.object.propertyManager.finalProperty.normalAttackSpeed * 0.0001;
            if (this.timer) this.timer.tick(s);
        } else {
            if (this.timer) this.timer.tick(1);
        }
    }

    isEnd(): boolean {
        if (this.immediate) return true;
        return this.timer.isEnd();
    }
}
