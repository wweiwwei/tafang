import { BattleDamage } from "../../Entity/BattleDamage";
import { BattleBattleStageContext } from "../../Processor/BattleBattleStageContext";
import { BattleDamageHook } from "./BattleDamageHook";

export class BattleDamageHookManager {
    constructor(public ctx: BattleBattleStageContext) {}

    private hooks: BattleDamageHook[] = [];

    addHook(hook: BattleDamageHook) {
        this.hooks.push(hook);
    }

    createHandle(d: BattleDamage) {
        this.hooks.forEach((h) => h.createHandle(d));
    }

    settleHandle(d: BattleDamage) {
        this.hooks.forEach((h) => h.settleHandle(d));
    }
}
