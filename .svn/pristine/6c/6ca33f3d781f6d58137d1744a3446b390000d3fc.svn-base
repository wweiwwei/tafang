export class MapUtil {
    /** 合并map列表，不过要注意前面的值可能倍覆盖 */
    combine<K, V>(arr: Map<K, V>[]): Map<K, V> {
        const map: Map<K, V> = new Map();
        arr.forEach((m) => {
            m.forEach((v, k) => {
                map.set(k, v);
            });
        });
        return map;
    }

    /** 将map的值进行变换，但key保持不变 */
    mapToMap<K, V, NV>(map: Map<K, V>, cb: (element: V, key: K, map: Map<K, V>) => NV): Map<K, NV> {
        const res = new Map();
        map.forEach((e, k, m) => {
            const v = cb(e, k, m);
            res.set(k, v);
        });
        return res;
    }

    mapToArray<K, V, NV>(map: Map<K, V>, cb: (element: V, key: K, map: Map<K, V>) => NV): NV[] {
        const res: NV[] = [];
        map.forEach((e, k, m) => {
            const v = cb(e, k, m);
            res.push(v);
        });
        return res;
    }

    some<K, V>(map: Map<K, V>, cb: (element: V, key: K, map: Map<K, V>) => boolean): boolean {
        let res = false;
        map.forEach((e, k, m) => {
            if (cb(e, k, m)) {
                res = true;
            }
        });
        return res;
    }

    every<K, V>(map: Map<K, V>, cb: (element: V, key: K, map: Map<K, V>) => boolean): boolean {
        let res = true;
        map.forEach((e, k, m) => {
            if (!cb(e, k, m)) {
                res = false;
            }
        });
        return res;
    }

    maxBy<K, V>(map: Map<K, V>, cb: (element: V, key: K, map: Map<K, V>) => number): [K, V] {
        let res: [K, V] = null;
        let max = -Infinity;
        map.forEach((e, k, m) => {
            const v = cb(e, k, m);
            if (v > max) {
                max = v;
                res = [k, e];
            }
        });
        return res;
    }

    minBy<K, V>(map: Map<K, V>, cb: (element: V, key: K, map: Map<K, V>) => number): [K, V] {
        let res: [K, V] = null;
        let min = Infinity;
        map.forEach((e, k, m) => {
            const v = cb(e, k, m);
            if (v < min) {
                min = v;
                res = [k, e];
            }
        });
        return res;
    }
}
