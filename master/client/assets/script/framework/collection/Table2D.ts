/**
 * 二维表格
 * @template RowKey 行键
 * @template ColKey 列键
 * @template Value 值
 */
export default class Table2D<RowKey, ColKey, Value> {
    private _map: Map<RowKey, Map<ColKey, Value>> = new Map<RowKey, Map<ColKey, Value>>();

    get(a: RowKey, b: ColKey): Value {
        let map = this._map.get(a);
        if (map) {
            return map.get(b);
        }
        return null;
    }

    set(a: RowKey, b: ColKey, v: Value): void {
        let map = this._map.get(a);
        if (!map) {
            map = new Map<ColKey, Value>();
            this._map.set(a, map);
        }
        map.set(b, v);
    }

    getRow(a: RowKey): Map<ColKey, Value> {
        return this._map.get(a);
    }

    getCol(b: ColKey): Map<RowKey, Value> {
        let map = new Map<RowKey, Value>();
        this._map.forEach((value, key) => {
            if (value.has(b)) {
                map.set(key, value.get(b));
            }
        });
        return map;
    }

    deleteRow(a: RowKey): void {
        this._map.delete(a);
    }

    deleteCol(b: ColKey): void {
        this._map.forEach((value, key) => {
            value.delete(b);
            if (value.size == 0) {
                this._map.delete(key);
            }
        });
    }

    delete(a: RowKey, b: ColKey): void {
        let map = this._map.get(a);
        if (map) {
            map.delete(b);
            if (map.size == 0) {
                this._map.delete(a);
            }
        }
    }

    toJSON(): string {
        let obj: any = {};
        this._map.forEach((value, key) => {
            let row: any = {};
            value.forEach((v, k) => {
                row[k] = v;
            });
            obj[key] = row;
        });
        return JSON.stringify(obj);
    }

    forEach(callbackfn: (value: Value, row: RowKey, col: ColKey) => void): void {
        this._map.forEach((value, key) => {
            value.forEach((v, k) => {
                callbackfn(v, key, k);
            });
        });
    }
}
