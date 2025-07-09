import { Table } from "../Utils/BattleUtils";
import { BattleEvent, BattleEventDataMap } from "./BattleEvent";

type BattleEventHandler = {
    handleEvent(e: BattleEvent): void;
};

export class BattleEventBus {
    private eventMap: Table<number, string, Set<BattleEventHandler>> = new Table();
    /** 只注册执行一次的 */
    private onceSet: Set<BattleEventHandler> = new Set();

    /** 注意本事件系统基本是按照一个对象只会监听一个事件设计的，所以实现上做了简化，如果以后设计有变，应该进行修改 */
    onOnce(uid: number, eventType: keyof BattleEventDataMap, handler: BattleEventHandler) {
        let set = this.eventMap.get(uid, eventType);
        if (!set) {
            set = new Set();
            this.eventMap.put(uid, eventType, set);
        }
        set.add(handler);
        this.onceSet.add(handler);
    }

    on(uid: number, eventType: keyof BattleEventDataMap, handler: BattleEventHandler) {
        let set = this.eventMap.get(uid, eventType);
        if (!set) {
            set = new Set();
            this.eventMap.put(uid, eventType, set);
        }
        set.add(handler);
    }

    off(uid: number, eventType: keyof BattleEventDataMap, handler: BattleEventHandler) {
        const set = this.eventMap.get(uid, eventType);
        if (!set) return;
        set.delete(handler);
        if (set.size === 0) this.eventMap.remove(uid, eventType);
    }

    offByUid(uid: number) {
        this.eventMap.removeRow(uid);
    }

    emit<EventType extends keyof BattleEventDataMap>(e: BattleEvent<EventType>) {
        const set = this.eventMap.get(e.target, e.eventType);
        if (!set) return;
        const toRemove: Set<BattleEventHandler> = new Set();
        set.forEach((h) => {
            if (this.onceSet.has(h)) {
                toRemove.add(h);
            }
            h.handleEvent(e);
        });
        toRemove.forEach((h) => {
            this.onceSet.delete(h);
            this.off(e.target, e.eventType, h);
        });
    }
}
