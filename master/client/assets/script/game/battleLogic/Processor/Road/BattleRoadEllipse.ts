import { IBattleRoad } from "./IBattleRoad";

export class BattleRoadEllipse implements IBattleRoad {
    getTotalLength(): number {
        return this.calculateEllipseCircumference(this.width, this.height) * 2;
    }
    private static PI2 = Math.PI * 2;
    getPointAt(p: number): {
        pos: { x: number; y: number };
        direction: { x: number; y: number };
    } {
        const angle = Math.PI * 2 * p;
        const x = this.x + this.width * Math.cos(angle);
        const y = this.y + this.height * Math.sin(angle);
        const pos = { x, y };
        let direction: { x: number; y: number };
        const remain = angle % BattleRoadEllipse.PI2;
        if (remain > Math.PI) {
            // 向右
            direction = {
                x: 1,
                y: 0,
            };
        } else {
            // 向左
            direction = {
                x: -1,
                y: 0,
            };
        }
        return {
            pos,
            direction,
        };
    }
    width: number;
    height: number;
    x: number;
    y: number;
    init(pos: number[], scale: number, data: number[][]) {
        this.width = data[0][0] * 0.5 * scale;
        this.height = data[0][1] * 0.5 * scale;
        this.x = pos[0] + data[0][2] * scale;
        this.y = pos[1] + data[0][3] * scale;
    }
    private calculateEllipseCircumference(a: number, b: number): number {
        const pi: number = Math.PI;
        const circumference: number = pi * b + 2 * (a - b);
        return circumference;
    }
}
