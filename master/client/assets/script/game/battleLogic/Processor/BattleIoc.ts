export class BattleIoc {
    private static container: any = {};

    static registerClass(editorType: string, c: any) {
        if (this.container[editorType]) {
            throw new Error(`战斗机制${editorType}重复注册！！`);
        }
        this.container[editorType] = c;
    }
    static getClass(editorType: string): any {
        const c = this.container[editorType];
        if (!c) {
            throw new Error(`战斗机制${editorType}没有注册！！`);
        }
        return c;
    }
}

/** 注册技能流程 */
export function registerSkillProcess(editorType: string) {
    return function (target: Function) {
        // if (!CC_EDITOR) {
        BattleIoc.registerClass(editorType, target);
        // }
    };
}

/** 注册技能触发机制 */
export function registerSkillTrigger(editorType: string) {
    return function (target: Function) {
        // if (!CC_EDITOR) {
        BattleIoc.registerClass(editorType, target);
        // }
    };
}

// /** 注册目标选择机制 */
// export function registerTargetSelect(editorType: string) {
//     return function (target: Function) {
//         BattleIoc.registerClass(editorType, target)
//     }
// }

/** 注册表现机制 */
export function registerDisplay(editorType: string) {
    return function (target: Function) {
        // if (!CC_EDITOR) {
        BattleIoc.registerClass(editorType, target);
        // }
    };
}

/** 注册持续事件机制 */
export function registerDuration(editorType: string) {
    return function (target: Function) {
        // if (!CC_EDITOR) {
        BattleIoc.registerClass(editorType, target);
        // }
    };
}

/** 注册状态机制 */
export function registerState(stateType: string) {
    return function (target: Function) {
        // if (!CC_EDITOR) {
        BattleIoc.registerClass(stateType, target);
        // }
    };
}
