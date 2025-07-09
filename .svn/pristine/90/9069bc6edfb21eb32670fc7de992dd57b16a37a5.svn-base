import Table2D from "../collection/Table2D";

export class PathSearchUtils {
    // ======================= 场景 ==============================

    /** 无向图迪杰斯特拉算法计算最短路径 */
    dijkstraForUndirectedGraph(
        points: Set<number>,
        link: { from: number; to: number; distance: number }[]
    ): Table2D<number, number, number[]> {
        const res = new Table2D<number, number, number[]>();
        const linkMap = new Table2D<number, number, number>();
        link.forEach((l) => {
            linkMap.set(l.from, l.to, l.distance);
            linkMap.set(l.to, l.from, l.distance);
        });
        points.forEach((from) => {
            points.forEach((to) => {
                if (from == to) return;
                if (res.get(from, to)) return;
                const distanceMap = new Map<number, number>();
                const pathMap = new Map<number, number[]>();
                points.forEach((p) => {
                    distanceMap.set(p, Infinity);
                    pathMap.set(p, []);
                });
                distanceMap.set(from, 0);
                pathMap.set(from, [from]);
                while (distanceMap.size > 0) {
                    let minDistance = Infinity;
                    let minPoint = -1;
                    distanceMap.forEach((distance, point) => {
                        if (distance < minDistance) {
                            minDistance = distance;
                            minPoint = point;
                        }
                    });
                    if (minPoint == -1) break;
                    distanceMap.delete(minPoint);
                    points.forEach((point) => {
                        if (point == minPoint) return;
                        const distance = linkMap.get(minPoint, point);
                        if (distance == undefined) return;
                        const newDistance = minDistance + distance;
                        if (newDistance < distanceMap.get(point)) {
                            distanceMap.set(point, newDistance);
                            pathMap.set(point, pathMap.get(minPoint).concat(point));
                        }
                    });
                }
                res.set(from, to, pathMap.get(to));
            });
        });
        return res;
    }

    // ============================ 挖矿 ========================================

    /**
     * itemMatrix是一个二维数组，null代表空的区域
     * beginPos代表玩家的位置（数组第1位是x轴位置，第2位是y轴位置）
     * 返回代表可行走区域的二维数组
     *  */
    getRoadMatrix(itemMatrix: any[][], beginPos: number[]): boolean[][] {
        const road: boolean[][] = [];
        for (let i = 0; i < itemMatrix.length; i++) {
            road[i] = [];
            for (let j = 0; j < itemMatrix[0].length; j++) {
                road[i].push(false);
            }
        }
        const hasSearch = new Set<number>();
        const queue: number[][] = [beginPos];
        const search = (pos: number[]) => {
            const [x, y] = pos;
            hasSearch.add(x * itemMatrix.length + y);
            if (itemMatrix[y][x]) return;
            road[y][x] = true;
            if (x > 0 && !hasSearch.has((x - 1) * itemMatrix.length + y)) {
                queue.push([x - 1, y]);
            }
            if (x < itemMatrix[0].length - 1 && !hasSearch.has((x + 1) * itemMatrix.length + y)) {
                queue.push([x + 1, y]);
            }
            if (y > 0 && !hasSearch.has(x * itemMatrix.length + y - 1)) {
                queue.push([x, y - 1]);
            }
            if (y < itemMatrix.length - 1 && !hasSearch.has(x * itemMatrix.length + y + 1)) {
                queue.push([x, y + 1]);
            }
        };
        while (queue.length > 0) {
            const pos = queue.shift();
            search(pos);
        }
        return road;
    }

    /** 获取可达区域二维数组，传入道路数组 */
    getReachableMatrix(roads: boolean[][]): boolean[][] {
        const res: boolean[][] = [];
        for (let i = 0; i < roads.length; i++) {
            res[i] = [];
            for (let j = 0; j < roads[0].length; j++) {
                if (roads[i][j]) {
                    res[i].push(true);
                } else if (i < roads.length - 1 && roads[i + 1][j]) {
                    res[i].push(true);
                } else if (i > 0 && roads[i - 1][j]) {
                    res[i].push(true);
                } else if (j < roads[0].length - 1 && roads[i][j + 1]) {
                    res[i].push(true);
                } else if (j > 0 && roads[i][j - 1]) {
                    res[i].push(true);
                } else {
                    res[i].push(false);
                }
            }
        }
        return res;
    }

    /** 获取到达位置旁边的位置（让矿工移动过去），传入道路数组和目标地点 */
    getGoToPos(road: boolean[][], pos: number[]) {
        if (pos[0] > 0 && road[pos[1]][pos[0] - 1]) {
            return [pos[0] - 1, pos[1]];
        } else if (pos[0] < road[0].length && road[pos[1]][pos[0] + 1]) {
            return [pos[0] + 1, pos[1]];
        } else if (pos[1] > 0 && road[pos[1] - 1][pos[0]]) {
            return [pos[0], pos[1] - 1];
        } else if (pos[1] < road.length && road[pos[1] + 1][pos[0]]) {
            return [pos[0], pos[1] + 1];
        } else {
            return null;
        }
    }
}
