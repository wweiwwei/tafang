/** 数组工具 */
export class ArrayUtil {
    /** 将对象转换为数组 */
    objectToArray<T>(obj: { [key: string]: T } | { [key: number]: T }): T[] {
        const res: T[] = [];
        for (const key in obj) {
            res.push(obj[key]);
        }
        return res;
    }
    /** 求最大值 */
    max(arr: number[]): number {
        if (arr.length === 0) throw new Error("array must not empty");
        let res = arr[0];
        arr.forEach((e) => {
            if (e > res) res = e;
        });
        return res;
    }

    /** 求最大值 */
    maxBy<T>(arr: T[], cb: (element: T, index?: number, array?: T[]) => number): T {
        if (arr.length === 0) throw new Error("array must not empty");
        let res = arr[0];
        let tempValue = cb(res, 0, arr);
        arr.forEach((e, i, a) => {
            const newValue = cb(e, i, a);
            if (newValue > tempValue) {
                tempValue = newValue;
                res = e;
            }
        });
        return res;
    }

    /** 求最小值 */
    min(arr: number[]) {
        if (arr.length === 0) throw new Error("array must not empty");
        let res = arr[0];
        arr.forEach((e) => {
            if (e < res) res = e;
        });
        return res;
    }

    /** 求最小值 */
    minBy<T>(arr: T[], cb: (element: T, index?: number, array?: T[]) => number) {
        if (arr.length === 0) throw new Error("array must not empty");
        let res = arr[0];
        let tempValue = cb(res, 0, arr);
        arr.forEach((e, i, a) => {
            const newValue = cb(e, i, a);
            if (newValue < tempValue) {
                tempValue = newValue;
                res = e;
            }
        });
        return res;
    }

    /** 求和 */
    sum(arr: number[]) {
        let s = 0;
        arr.forEach((e) => (s = e + s));
        return s;
    }

    /** 求和 */
    sumBy<T>(arr: T[], cb: (element: T, index?: number, array?: T[]) => number) {
        let s = 0;
        arr.forEach((e, i, a) => (s = s + cb(e, i, a)));
        return s;
    }

    /**
     * 分组，参考
     * https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/group
     * */
    group<T>(arr: T[], cb: (element: T, index?: number, array?: T[]) => string): { [key: string]: T[] } {
        const res: { [key: string]: T[] } = {};
        arr.forEach((e, i, a) => {
            const key = cb(e, i, a);
            if (!res[key]) res[key] = [];
            res[key].push(e);
        });
        return res;
    }

    /**
     * 分组为map，参考
     * https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/groupToMap
     * */
    groupToMap<K, T>(arr: T[], cb: (element: T, index?: number, array?: T[]) => K): Map<K, T[]> {
        const res = new Map<K, T[]>();
        arr.forEach((e, i, a) => {
            const key = cb(e, i, a);
            if (!res.has(key)) res.set(key, []);
            res.get(key).push(e);
        });
        return res;
    }

    /** 原地打乱数组/洗牌算法 */
    shuffle<T>(arr: Array<T>) {
        for (let i = 1; i < arr.length; i++) {
            const random = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[random]] = [arr[random], arr[i]];
        }
    }

    /** 返回可以进行链式操作的包装类 */
    chain<T>(arr: T[]): ArrayWrapper<T> {
        return new ArrayWrapper(arr);
    }

    /**
     * 仿lodash的方法
     * https://www.lodashjs.com/docs/lodash.flatMap#_flatmapcollection-iteratee_identity
     * */
    flatMap<T, U>(arr: T[], cb: (element: T, index?: number, array?: T[]) => U[]): U[] {
        const res: U[] = [];
        arr.forEach((e, i, a) => {
            res.push(...cb(e, i, a));
        });
        return res;
    }

    /** 计算数量 */
    count<T>(arr: T[], cb: (element: T, index?: number, array?: any[]) => boolean): number {
        let count = 0;
        arr.forEach((e, i, a) => {
            if (cb(e, i, a)) count++;
        });
        return count;
    }

    /** 是否存在元素满足条件 */
    some<T>(arr: T[], cb: (element: T, index?: number, array?: any[]) => boolean): boolean {
        for (let i = 0; i < arr.length; i++) {
            if (cb(arr[i], i, arr)) return true;
        }
        return false;
    }

    /** 是否所有元素都满足条件 */
    every<T>(arr: T[], cb: (element: T, index?: number, array?: any[]) => boolean): boolean {
        for (let i = 0; i < arr.length; i++) {
            if (!cb(arr[i], i, arr)) return false;
        }
        return true;
    }
}

export class ArrayWrapper<T> {
    constructor(private arr: T[]) {}

    map<R>(cb: (element: T, index?: number, array?: T[]) => R): ArrayWrapper<R> {
        return new ArrayWrapper(this.arr.map(cb));
    }

    filter(cb: (element: T, index?: number, array?: T[]) => boolean): ArrayWrapper<T> {
        return new ArrayWrapper(this.arr.filter(cb));
    }

    forEach(cb: (element: T, index?: number, array?: T[]) => void): void {
        this.arr.forEach(cb);
    }

    unwrap(): T[] {
        return this.arr;
    }

    /** 求和 */
    sumBy(cb: (element: T, index?: number, array?: T[]) => number): number {
        return GUtils.array.sumBy(this.arr, cb);
    }
    /** 求和 */
    sum(): number {
        // @ts-ignore
        return GUtils.array.sum(this.arr);
    }
    /** 求最大值 */
    maxBy(cb: (element: T, index?: number, array?: T[]) => number): T {
        return GUtils.array.maxBy(this.arr, cb);
    }
    /** 求最大值 */
    max(): T {
        // @ts-ignore
        return GUtils.array.max(this.arr);
    }
    /** 求最小值 */
    minBy(cb: (element: T, index?: number, array?: T[]) => number): T {
        return GUtils.array.minBy(this.arr, cb);
    }
    /** 求最小值 */
    min(): T {
        // @ts-ignore
        return GUtils.array.min(this.arr);
    }

    /**
     * 分组，参考
     * https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/group
     * */
    group(cb: (element: T, index?: number, array?: T[]) => string): { [key: string]: T[] } {
        return GUtils.array.group(this.arr, cb);
    }

    /**
     * 分组为map，参考
     * https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/groupToMap
     * */
    groupToMap<K>(cb: (element: T, index?: number, array?: T[]) => K): Map<K, T[]> {
        return GUtils.array.groupToMap(this.arr, cb);
    }

    /**
     * 仿lodash的方法
     * https://www.lodashjs.com/docs/lodash.flatMap#_flatmapcollection-iteratee_identity
     * */
    flatMap<U>(cb: (element: T, index?: number, array?: T[]) => U[]): ArrayWrapper<U> {
        return new ArrayWrapper(GUtils.array.flatMap(this.arr, cb));
    }

    /** 计算数量 */
    count(cb: (element: T, index?: number, array?: T[]) => boolean): number {
        return GUtils.array.count(this.arr, cb);
    }

    /** 是否存在元素都满足条件 */
    some(cb: (element: T, index?: number, array?: T[]) => boolean): boolean {
        return GUtils.array.some(this.arr, cb);
    }

    /** 是否所有元素都满足条件 */
    every(cb: (element: T, index?: number, array?: T[]) => boolean): boolean {
        return GUtils.array.every(this.arr, cb);
    }
}
