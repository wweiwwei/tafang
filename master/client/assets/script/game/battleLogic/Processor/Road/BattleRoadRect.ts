import { IBattleRoad } from "./IBattleRoad";

export class BattleRoadRect implements IBattleRoad {
    getTotalLength(): number {
        return (this.width + this.height) * 2;
    }
    getPointAt(baseP: number): {
        pos: { x: number; y: number };
        direction: { x: number; y: number };
    } {
        const p = baseP - Math.floor(baseP);
        let pos: { x: number; y: number };
        if (p < this.splitPoint[0]) {
            // 第一段路
            const offset = p - 0;
            pos = { x: -this.halfWidth + this.x, y: this.halfHeight - offset * this.totalLength + this.y };
        } else if (p < this.splitPoint[1]) {
            // 第二段路
            const offset = p - this.splitPoint[0];
            pos = { x: -this.halfWidth + offset * this.totalLength + this.x, y: -this.halfHeight + this.y };
        } else if (p < this.splitPoint[2]) {
            // 第三段路
            const offset = p - this.splitPoint[1];
            pos = { x: this.halfWidth + this.x, y: -this.halfHeight + offset * this.totalLength + this.y };
        } else {
            // 第四段路
            const offset = p - this.splitPoint[2];
            pos = { x: this.halfWidth - offset * this.totalLength + this.x, y: this.halfHeight + this.y };
        }
        let direction: { x: number; y: number };
        if (p < 0.5) {
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
        return { pos, direction };
    }
    width: number;
    height: number;
    halfWidth: number;
    halfHeight: number;
    x: number;
    y: number;
    splitPoint: number[] = [];
    totalLength: number;
    init(pos: number[], scale: number, data: number[][]) {
        this.width = data[0][0] * scale;
        this.height = data[0][1] * scale;
        this.halfWidth = this.width * 0.5;
        this.halfHeight = this.height * 0.5;
        this.x = pos[0] + data[0][2] * scale;
        this.y = pos[1] + data[0][3] * scale;
        const ratio = (this.height / (this.width + this.height)) * 0.5;
        this.splitPoint = [ratio, 0.5, 0.5 + ratio, 1];
        this.totalLength = this.getTotalLength();
    }
}
