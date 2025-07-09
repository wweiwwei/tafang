import { registerDisplay } from "../../Processor/BattleIoc";
import { BattleSkillTimer } from "../Duration/BattleSkillTimer";
import { BattleSkillBaseDisplay } from "./BattleSkillBaseDisplay";

@registerDisplay("presentation/PresentationDelay")
export class BattleSkillPresentationDelay extends BattleSkillBaseDisplay {
    immediate: boolean;
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
    start(): void {}
    tick(): void {
        if (this.timer) this.timer.tick(1);
    }
    isEnd(): boolean {
        if (this.immediate) return true;
        return this.timer.isEnd();
    }
}
