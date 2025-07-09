import { Table } from "../Utils/BattleUtils";
import { BattleBattleStageData } from "./BattleBattleStageData";

type Tickable = {
    tick(): void;
};

type ScheduleInfo = {
    once: boolean;
    handler: Function;
    context: any;
    ms: number;
};

export class BattleScheduler {
    constructor(public ctx: BattleBattleStageData) {}

    private _set: Set<Tickable> = new Set();
    private _contextMap: Map<any, ScheduleInfo> = new Map();
    private _frameMap: Map<number, ScheduleInfo[]> = new Map();
    // private _table: Table<number, any, Set<ScheduleInfo>> = new Table();

    /** 加入tick集合 */
    on(t: Tickable) {
        this._set.add(t);
    }

    /** 从tick集合中排除 */
    off(t: Tickable) {
        this._set.delete(t);
    }

    /** 多少毫秒后执行一次 */
    scheduleOnce(ms: number, handler: Function, context: any) {
        this.schedule(ms, handler, context, true);
    }

    /** 每多少毫秒执行一次 */
    schedule(ms: number, handler: Function, context: any, once = false) {
        const info = {
            once,
            handler,
            context,
            ms,
        };
        this._contextMap.set(context, info);
        this.planNextFrame(info);
    }

    private planNextFrame(info: ScheduleInfo) {
        const frame = Math.round((info.ms * 60) / 1000);
        const desF = this.ctx.frame + frame;
        let list = this._frameMap.get(desF);
        if (!list) {
            list = [];
            this._frameMap.set(desF, list);
        }
        list.push(info);
    }

    /** 取消当前上下文的所有计时器 */
    unschedule(context: any) {
        this._contextMap.delete(context);
    }

    tick() {
        const m = this._frameMap.get(this.ctx.frame);
        this._frameMap.delete(this.ctx.frame);
        if (m) {
            m.forEach((info) => {
                // 如果context有效再执行
                if (this._contextMap.has(info.context)) {
                    info.handler.call(info.context);
                    if (!info.once) {
                        this.planNextFrame(info);
                    }
                }
            });
        }
        this._set.forEach((t) => t.tick());
    }
}
