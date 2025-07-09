export class RandomUtils {
    /** 获取种子随机数 */
    getSeedRandom(seed: number) {
        return new SeedRand(seed);
    }

    /** 获取位于最小值和最大值之间的整数（包含最小和最大值） */
    nextInt(min: number, max: number) {
        const rd = Math.random();
        return min + Math.floor((max - min + 1) * rd);
    }

    /** 带权重的抽取，返回元素 */
    chooseWithWeight<T>(arr: T[], weight: number[]) {
        return arr[this.chooseIndexWithWeight(weight)];
    }

    /** 带权重的抽取，返回index */
    chooseIndexWithWeight(weight: number[]) {
        if (weight.length === 0) throw new Error("weight can not be empty");
        const sum = weight.reduce((a, b) => a + b, 0);
        if (sum <= 0) throw new Error("weight must > 0");
        var s = 0;
        const rd = Math.floor(sum * Math.random());
        for (let i = 0; i < weight.length; i++) {
            s += weight[i];
            if (s > rd) return i;
        }
        return 0;
    }

    /** 随机获取获取map中特定数量的元素 */
    rdMapElement<K, T>(map: Map<K, T>, count: number): T[] {
        const arr: T[] = [];
        map.forEach((o) => arr.push(o));
        return this.rdArrayElement(arr, count);
    }

    /** 随机获取数组中随机数量的元素 */
    rdArrayElement<T>(arr: T[], count: number): T[] {
        const copy = arr.map((e) => e);
        if (copy.length <= count) return copy;
        const res: T[] = [];
        for (let i = 0; i < count; i++) {
            const rdIndex = this.nextInt(0, copy.length - 1);
            res.push(copy[rdIndex]);
            copy.splice(rdIndex, 1);
        }
        return res;
    }

    isHappen(p: number) {
        return Math.random() < p;
    }
}

export class SeedRand {
    private seed: number;

    constructor(initSeed: number) {
        this.seed = initSeed;
    }

    next() {
        this.seed = (this.seed * 9301 + 49297) % 233280;
        return this.seed / 233280.0;
    }

    /** 获取位于最小值和最大值之间的整数（包含最小和最大值） */
    nextInt(min: number, max: number) {
        const rd = this.next();
        return min + Math.floor((max - min + 1) * rd);
    }

    /** 带权重的抽取，返回元素 */
    chooseWithWeight<T>(arr: T[], weight: number[]) {
        return arr[this.chooseIndexWithWeight(weight)];
    }

    /** 带权重的抽取，返回index */
    chooseIndexWithWeight(weight: number[]) {
        if (weight.length === 0) throw new Error("weight can not be empty");
        const sum = weight.reduce((a, b) => a + b, 0);
        if (sum <= 0) throw new Error("weight must > 0");
        var s = 0;
        const rd = Math.floor(sum * this.next());
        for (let i = 0; i < weight.length; i++) {
            s += weight[i];
            if (s > rd) return i;
        }
        return 0;
    }

    /** 随机获取获取map中特定数量的元素 */
    rdMapElement<K, T>(map: Map<K, T>, count: number): T[] {
        const arr: T[] = [];
        map.forEach((o) => arr.push(o));
        return this.rdArrayElement(arr, count);
    }

    /** 随机获取数组中随机数量的元素 */
    rdArrayElement<T>(arr: T[], count: number): T[] {
        const copy = arr.map((e) => e);
        if (copy.length <= count) return copy;
        const res: T[] = [];
        for (let i = 0; i < count; i++) {
            const rdIndex = this.nextInt(0, copy.length - 1);
            res.push(copy[rdIndex]);
            copy.splice(rdIndex, 1);
        }
        return res;
    }
}
