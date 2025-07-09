import { BattleBattleStageData } from "../Processor/BattleBattleStageData";

export class BattleMapUtils {
    /** 格子坐标的原点（左下角）位置 */
    getZeroPoint(gridSize: number, gridCount: number[]) {
        return {
            x: -((gridCount[0] - 1) / 2) * gridSize,
            y: -((gridCount[1] - 1) / 2) * gridSize,
        };
    }

    /** 格子坐标转换游戏坐标 */
    gridPosToGamePos(p: { x: number; y: number }, gridSize: number, gridCount: number[]) {
        const relatePos = { x: p.x * gridSize, y: p.y * gridSize };
        const zeroPoint = this.getZeroPoint(gridSize, gridCount);
        return { x: relatePos.x + zeroPoint.x, y: relatePos.y + zeroPoint.y };
    }

    /** 游戏坐标转换格子坐标 */
    gamePosToGridPos(p: { x: number; y: number }, gridSize: number, gridCount: number[]) {
        const zeroPoint = this.getZeroPoint(gridSize, gridCount);
        const relatePos = { x: p.x - zeroPoint.x, y: p.y - zeroPoint.y };
        return { x: relatePos.x / gridSize, y: relatePos.y / gridSize };
    }

    changeRoadData(
        map: boolean[][],
        beginPos: { x: number; y: number },
        endPos: { x: number; y: number },
        value: boolean
    ) {
        const minX = Math.min(beginPos.x, endPos.x);
        const safeMinx = Math.max(0, minX);
        const maxX = Math.max(beginPos.x, endPos.x);
        const safeMaxX = Math.min(map[0].length - 1, maxX);
        const minY = Math.min(beginPos.y, endPos.y);
        const safeMinY = Math.max(0, minY);
        const maxY = Math.max(beginPos.y, endPos.y);
        const safeMaxY = Math.min(map.length - 1, maxY);
        for (let i = safeMinY; i <= safeMaxY; i++) {
            for (let j = safeMinx; j <= safeMaxX; j++) {
                map[i][j] = value;
            }
        }
    }

    getMonsterBorn(
        map: boolean[][],
        beginPos: { x: number; y: number },
        endPos: { x: number; y: number }
    ): { x: number[]; y: number[] } {
        const minX = Math.min(beginPos.x, endPos.x);
        const safeMinx = Math.max(0, minX);
        const maxX = Math.max(beginPos.x, endPos.x);
        const safeMaxX = Math.min(map[0].length - 1, maxX);
        const minY = Math.min(beginPos.y, endPos.y);
        const safeMinY = Math.max(0, minY);
        const maxY = Math.max(beginPos.y, endPos.y);
        const safeMaxY = Math.min(map.length - 1, maxY);
        return {
            x: [safeMinx, safeMaxX],
            y: [safeMinY, safeMaxY],
        };
    }

    encodeMap(map: boolean[][]): string {
        const compress = map.map((list) => {
            const cList: number[] = [];
            let current: boolean = null;
            let currentCount = 0;
            list.forEach((v, i) => {
                if (current === null) {
                    current = v;
                    currentCount = 1;
                    return;
                }
                if (current === v) {
                    currentCount++;
                } else {
                    cList.push(current ? 1 : 0);
                    cList.push(currentCount);
                    current = v;
                    currentCount = 1;
                }
            });
            cList.push(current ? 1 : 0);
            cList.push(currentCount);
            return cList.join(",");
        });
        const str = compress.join("|");
        return str;
    }

    decodeMap(str: string): boolean[][] {
        const map = str.split("|").map((l) => {
            const cList = l.split(",");
            const list: boolean[] = [];
            for (let i = 0; i < cList.length; i += 2) {
                const v = cList[i] === "1" ? true : false;
                const count = Number(cList[i + 1]);
                for (let j = 0; j < count; j++) {
                    list.push(v);
                }
            }
            return list;
        });
        return map;
    }

    encodeMonsterBorn(data: { x: number[]; y: number[] }[]): string {
        const list = data.map((d) => {
            return `${d.x[0]},${d.x[1]},${d.y[0]},${d.y[1]}`;
        });
        return list.join("|");
    }

    decodeMonsterBorn(str: string): { x: number[]; y: number[] }[] {
        const list = str.split("|").map((l) => {
            const arr = l.split(",");
            return {
                x: [Number(arr[0]), Number(arr[1])],
                y: [Number(arr[2]), Number(arr[3])],
            };
        });
        return list;
    }
}

export class BattleUuIdGenerator {
    private uid: number = 1;
    uuid() {
        return this.uid++;
    }
}

export class BattleUtils {
    private static uid: number = 1;

    static resetUuid() {
        this.uid = 1;
    }

    static uuid() {
        return this.uid++;
    }

    static map = new BattleMapUtils();

    /** 通过A星算法获取路径 */
    static getAStarPath(
        map: boolean[][],
        start: { x: number; y: number },
        target: { x: number; y: number }
    ): { x: number; y: number }[] {
        const res = getAStarPath(map, start, target);
        return res;
    }
}

export class BattleSeedRand {
    private seed: number;

    constructor(initSeed: number, public data: BattleBattleStageData) {
        this.seed = initSeed;
    }

    isHappen(rate: number) {
        return this.next() < rate;
    }

    next() {
        // console.log(this.data.frame, this.seed);
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

/** 仿guava库实现的数据结构 */
export class Table<R, C, V> {
    private _data: Map<R, Map<C, V>> = new Map();

    get(rowbKey: R): Map<C, V>;
    get(rowbKey: R, columnKey: C): V;
    get(rowbKey: R, columnKey?: C) {
        if (columnKey === undefined) {
            return this._data.get(rowbKey);
        } else {
            const column = this._data.get(rowbKey);
            if (column) {
                return column.get(columnKey);
            } else {
                return null;
            }
        }
    }

    put(rowbKey: R, columnKey: C, value: V): V {
        const column = this._data.get(rowbKey);
        if (column) {
            column.set(columnKey, value);
        } else {
            const newCol = new Map<C, V>();
            newCol.set(columnKey, value);
            this._data.set(rowbKey, newCol);
        }
        return value;
    }

    remove(rowbKey: R, columnKey: C): V {
        const column = this._data.get(rowbKey);
        if (column) {
            const res = column.get(columnKey);
            column.delete(columnKey);
            if (column.size === 0) {
                this._data.delete(rowbKey);
            }
            return res;
        } else {
            return null;
        }
    }

    removeRow(rowbKey: R) {
        this._data.delete(rowbKey);
    }

    foreach(func: (value: V, rowKey: R, columnKey: C) => V): void {
        this._data.forEach((col, rowKey) => {
            col.forEach((value, columnKey) => {
                func(value, rowKey, columnKey);
            });
        });
    }

    // todo 实现以下全部或部分接口
    // contains()
    // clear()
    // containsRow
    // containsColumn
    // containsValue
    // isEmpty
    // size
    // rowKeySet
    // columnKeySet
    // values
    // rowMap
    // columnMap
}
type Node = {
    x: number;
    y: number;
    g: number;
    h: number;
    f: number;
    parent: Node | null;
};

function getAStarPath(
    map: boolean[][],
    start: { x: number; y: number },
    target: { x: number; y: number }
): { x: number; y: number }[] {
    const numRows = map.length;
    const numCols = map[0].length;

    const isValid = (x: number, y: number): boolean => {
        return x >= 0 && x < numCols && y >= 0 && y < numRows && map[y][x];
    };

    const calculateHeuristic = (x: number, y: number): number => {
        return Math.abs(x - target.x) + Math.abs(y - target.y);
    };

    const getNeighbours = (node: Node): Node[] => {
        const { x, y } = node;
        const neighbours: Node[] = [];

        const directions = [
            { dx: -1, dy: 0 }, // Left
            { dx: 1, dy: 0 }, // Right
            { dx: 0, dy: -1 }, // Up
            { dx: 0, dy: 1 }, // Down
        ];

        for (const dir of directions) {
            const nx = x + dir.dx;
            const ny = y + dir.dy;

            if (isValid(nx, ny)) {
                neighbours.push({
                    x: nx,
                    y: ny,
                    g: node.g + 1,
                    h: calculateHeuristic(nx, ny),
                    f: 0,
                    parent: node,
                });
            }
        }

        return neighbours;
    };

    const isNodeInList = (node: Node, list: Node[]): boolean => {
        return list.some((n) => n.x === node.x && n.y === node.y);
    };

    const getNodeWithLowestF = (list: Node[]): Node => {
        let lowestFNode = list[0];

        for (const node of list) {
            if (node.f < lowestFNode.f) {
                lowestFNode = node;
            }
        }

        return lowestFNode;
    };

    const reconstructPath = (node: Node): { x: number; y: number }[] => {
        const path: { x: number; y: number }[] = [];
        let currNode: Node | null = node;

        while (currNode !== null) {
            path.unshift({ x: currNode.x, y: currNode.y });
            currNode = currNode.parent;
        }

        return path;
    };

    const openList: Node[] = [];
    const closedList: Node[] = [];

    const startNode: Node = {
        x: start.x,
        y: start.y,
        g: 0,
        h: calculateHeuristic(start.x, start.y),
        f: 0,
        parent: null,
    };

    openList.push(startNode);

    while (openList.length > 0) {
        const currentNode: Node = getNodeWithLowestF(openList);

        openList.splice(openList.indexOf(currentNode), 1);
        closedList.push(currentNode);

        if (currentNode.x === target.x && currentNode.y === target.y) {
            return reconstructPath(currentNode);
        }

        const neighbours: Node[] = getNeighbours(currentNode);

        for (const neighbour of neighbours) {
            if (isNodeInList(neighbour, closedList)) {
                continue;
            }

            const gScore = currentNode.g + 1;

            if (!isNodeInList(neighbour, openList) || gScore < neighbour.g) {
                neighbour.g = gScore;
                neighbour.f = neighbour.g + neighbour.h;
                neighbour.parent = currentNode;

                if (!isNodeInList(neighbour, openList)) {
                    openList.push(neighbour);
                }
            }
        }
    }

    return []; // If no path is found
}

// // Example usage:
// const map: boolean[][] = [
//     [true, true, true, true, true],
//     [true, false, false, false, true],
//     [true, true, true, true, true],
// ];
// const start: { x: number; y: number } = { x: 0, y: 0 };
// const target: { x: number; y: number } = { x: 4, y: 2 };

// const path: { x: number; y: number }[] = getAStarPath(map, start, target);
// console.log(path);
