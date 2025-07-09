export class GameLogicDSLEnv {
    constructor(private env: any[]) {}

    private runtimeStack: any[] = [{}];

    get(key: string): any {
        for (let i = this.runtimeStack.length - 1; i >= 0; i--) {
            const frame = this.runtimeStack[i];
            if (key in frame) return frame[key];
        }
        for (let i = 0; i < this.env.length; i++) {
            const e = this.env[i];
            if (key in e) return e[key];
        }
        if (window[key]) {
            return window[key];
        }
        throw new Error(`can not find symbol ${key}`);
    }

    declare(key: string) {
        const frame = this.runtimeStack[this.runtimeStack.length - 1];
        if (key in frame) throw new Error(`symbol ${key} has already declare`);
        return (frame[key] = undefined);
    }

    assign(key: string, value: any) {
        const frame = this.runtimeStack[this.runtimeStack.length - 1];
        if (key in frame) return (frame[key] = value);
        throw new Error(`can not find symbol ${key}`);
    }

    pushStack() {
        this.runtimeStack.push({});
    }

    popStack() {
        this.runtimeStack.pop();
    }
}
