/** 
 * 双向映射表
 * 该表会维护一个正向映射表和一个反向映射表
 * 可以直接从值获取到对应的键，但要求值是唯一的，如果尝试插入重复的值，会抛出异常
 */
export class BiMap<Key, Value> {

    private _map: Map<Key, Value> = new Map<Key, Value>();
    private _reverseMap: Map<Value, Key> = new Map<Value, Key>();

    set(a: Key, b: Value): void {
        if (this._reverseMap.has(b)) {
            throw new Error("value already exists");
        }
        this._map.set(a, b);
        this._reverseMap.set(b, a);
    }

    getByValue(b: Value): Key {
        return this._reverseMap.get(b);
    }

    getByKey(a: Key): Value {
        return this._map.get(a);
    }

    deleteByValue(b: Value): void {
        let a = this._reverseMap.get(b);
        this._reverseMap.delete(b);
        this._map.delete(a);
    }

    deleteByKey(a: Key): void {
        let b = this._map.get(a);
        this._map.delete(a);
        this._reverseMap.delete(b);
    }

    getMap(): Map<Key, Value> {
        return this._map;
    }

    getReverseMap(): Map<Value, Key> {
        return this._reverseMap;
    }

    toJSON(): string {
        let obj: any = {};
        this._map.forEach((value, key) => {
            obj[key] = value;
        });
        return JSON.stringify(obj);
    }

}