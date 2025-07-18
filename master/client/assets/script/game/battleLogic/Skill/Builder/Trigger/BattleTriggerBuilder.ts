import { BattleSkill } from "../../BattleSkill";
import { BattleTriggerAfterEvent } from "./BattleTriggerAfterEvent";
import { BattleTriggerColdDown } from "./BattleTriggerColdDown";
import { BattleTriggerComplex } from "./BattleTriggerComplex";
import { BattleTriggerEx } from "./BattleTriggerEx";
import { BattleTriggerIndependent } from "./BattleTriggerIndependent";
import { BattleTriggerMinEnergy } from "./BattleTriggerMinEnergy";
import { BattleTriggerNormalAttack } from "./BattleTriggerNormalAttack";
import { BattleTriggerPassive } from "./BattleTriggerPassive";
import { IBattleSkillTrigger } from "./IBattleSkillTrigger";

export class BattleTriggerBuilder {
    static availableTriggerKind = [
        "normalAttack",
        "minEnergy",
        "passive",
        "afterEvent",
        "independent",
        "coldDown",
        "ex",
    ];
    constructor(public kind: string, public params: any[]) {
        if (!BattleTriggerBuilder.availableTriggerKind.includes(kind)) {
            throw Error(`not support trigger kind ${kind}`);
        }
    }

    private other: BattleTriggerBuilder[] = [];
    concat(b: BattleTriggerBuilder): BattleTriggerBuilder {
        this.other.push(b);
        if (b.other.length > 0) {
            b.other.forEach((x) => {
                this.other.push(x);
            });
        }
        return this;
    }

    build(): IBattleSkillTrigger {
        if (this.other.length > 0) {
            return new BattleTriggerComplex(this.other.map((x) => x.build()));
        }
        switch (this.kind) {
            case "normalAttack":
                return new BattleTriggerNormalAttack();
            case "minEnergy":
                return new BattleTriggerMinEnergy(this.params[0]);
            case "passive":
                return new BattleTriggerPassive();
            case "afterEvent":
                return new BattleTriggerAfterEvent(this.params[0], this.params[1]);
            case "independent":
                return new BattleTriggerIndependent(this.params[0]);
            case "coldDown":
                return new BattleTriggerColdDown(this.params[0]);
            case "ex":
                return new BattleTriggerEx(this.params[0]);
            default:
                throw Error(`not support trigger kind ${this.kind}`);
        }
    }
}
