import Table2D from "../collection/Table2D";

export default class EventBus {
    private static _eventTable = new Table2D<string | symbol, any, Set<Function>>();

    /**
     * 监听事件
     * @param event 事件名
     * @param callback 回调函数
     * @param target 监听对象
     */
    static on(event: string | symbol, callback: Function, target: any) {
        let set = this._eventTable.get(event, target);
        if (!set) {
            set = new Set<Function>();
            this._eventTable.set(event, target, set);
        }
        set.add(callback);
    }

    /** 自动根据装饰器订阅事件 */
    static autoOn(target: any) {
        const map: Map<string, string[]> = Object.getPrototypeOf(target)._autoEventMap;
        if (map !== undefined) {
            map.forEach((value, key) => {
                value.forEach((event) => {
                    EventBus.on(event, target[key], target);
                });
            });
        }
    }

    /**
     * 从事件表中删除事件
     * @param event 事件名
     * @param callback 回调函数
     * @param target 监听对象
     */
    static off(event: string | symbol, callback: Function, target: any) {
        let set = this._eventTable.get(event, target);
        if (set) {
            set.delete(callback);
            if (set.size == 0) {
                this._eventTable.delete(event, target);
            }
        }
    }

    /**
     * 从事件表中删除所有target相关的事件
     */
    static offByTarget(target: any) {
        let map = this._eventTable.getCol(target);
        map.forEach((value, key) => {
            this._eventTable.delete(key, target);
        });
    }

    /**
     * 发送事件
     */
    static emit(event: string | symbol, ...args: any[]) {
        let map = this._eventTable.getRow(event);
        if (map) {
            map.forEach((value, key) => {
                value.forEach((callback) => {
                    callback.apply(key, args);
                });
            });
        }
    }
}
