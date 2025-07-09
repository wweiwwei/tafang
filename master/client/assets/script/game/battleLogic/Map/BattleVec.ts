export class BattleVec {
    /** 返回两点距离，单位：格子数 */
    static distance(p1: number[], p2: number[]): number {
        const d1 = p1[0] - p2[0];
        const d2 = p1[1] - p2[1];
        return Math.sqrt(d1 * d1 + d2 * d2);
    }

    /**  返回该向量的长度。 */
    static len(p: number[]): number {
        const [x, y] = p;
        return Math.sqrt(x * x + y * y);
    }

    /** 返回归一化后的向量。 注意，当前向量不变，并返回一个新的归一化向量。 */
    static normalize(p: number[]): number[] {
        const [x, y] = p;
        const len = this.len(p);
        return [x / len, y / len];
    }

    /** 向量减法，并返回新结果。 */
    static sub(p1: number[], p2: number[]) {
        return [p1[0] - p2[0], p1[1] - p2[1]];
    }

    /** 缩放向量，并返回新结果。 */
    static mul(p: number[], factor: number) {
        return p.map((x) => x * factor);
    }

    /** 向量加法，并返回新结果。 */
    static add(p1: number[], p2: number[]) {
        return [p1[0] + p2[0], p1[1] + p2[1]];
    }

    /** 贝塞尔曲线计算 */
    static bezier(p1: number[], p2: number[], p3: number[], t: number): number[] {
        return BattleVec.add(
            BattleVec.add(BattleVec.mul(p1, Math.pow(1 - t, 2)), BattleVec.mul(p2, 2 * t * (1 - t))),
            BattleVec.mul(p3, Math.pow(t, 2))
        );
    }
    /**
     * 计算点c到由点a和点b确定的直线的距离
     * 返回值为距离以及点c做垂线到
     * */
    static calculateDistanceToLine(
        pointA: {
            x: number;
            y: number;
        },
        pointB: {
            x: number;
            y: number;
        },
        pointC: {
            x: number;
            y: number;
        }
    ): [number, { x: number; y: number }] {
        const slope = (pointB.y - pointA.y) / (pointB.x - pointA.x);
        const intercept = pointA.y - slope * pointA.x;

        // Calculate the slope and intercept of the perpendicular line passing through point C
        const perpendicularSlope = -1 / slope;
        const perpendicularIntercept = pointC.y - perpendicularSlope * pointC.x;

        // Calculate the intersection point of the two lines
        const intersectionX = (perpendicularIntercept - intercept) / (slope - perpendicularSlope);
        const intersectionY = perpendicularSlope * intersectionX + perpendicularIntercept;

        // Calculate the distance between point C and the intersection point
        const distance = Math.sqrt(Math.pow(intersectionX - pointC.x, 2) + Math.pow(intersectionY - pointC.y, 2));

        return [distance, { x: intersectionX, y: intersectionY }];
    }
}
