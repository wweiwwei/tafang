import { BattleTargetSearch } from "../../Target/BattleTargetSearch";

export abstract class BattleTargetBuilder {
    static availableBaseTargets: string[] = [
        "self",
        "selfTeam",
        "selfTeamExcludeSelf",
        "enemyTeam",
        "triggerEventSource",
        "triggerEventTarget",
        "selfTeamDead",
    ];

    /** 构建 */
    abstract build(): BattleTargetSearch;
}
