import { BattleDisplayToLogicApi } from "../../battleApi/BattleDisplayToLogicApi";

export class BattleDisplayEvent<Key extends keyof BattleDisplayToLogicApi> {
    constructor(public eventType: Key, public data: Parameters<BattleDisplayToLogicApi[Key]>[0]) {}
}
