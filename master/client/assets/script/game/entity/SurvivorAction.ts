export type SurvivorStateType = "idle" | "work" | "eat" | "sleep" | "heal" | "dead";

export type SurvivorAction = {};

export type SurvivorActionChangeBuild = {
    action: "changeBuild";
    change: { uniqueId: number; facilityId: number }[];
};

export type SurvivorActionChangeDorm = {
    action: "changeDorm";
    change: { uniqueId: number; dormId: number }[];
};

export type SurvivorActionNewArrive = {
    action: "newArrive";
    change: { uniqueId: number }[];
};

export type SurvivorActionDead = {
    action: "dead";
    change: { uniqueId: number }[];
};

export type SurvivorActionEat = {
    action: "eat";
    change: { uniqueId: number }[];
};

export type SurvivorActionHeal = {
    action: "heal";
    change: { uniqueId: number }[];
};

export type SurvivorActionSleep = {
    action: "sleep";
    change: { uniqueId: number }[];
};

export type SurvivorActionWork = {
    action: "work";
    change: { uniqueId: number; facilityId: number }[];
};

export type SurvivorActionIdle = {
    action: "idle";
    change: { uniqueId: number }[];
};
