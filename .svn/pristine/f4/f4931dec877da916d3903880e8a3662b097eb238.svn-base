export class BattleRect {
    /** 构建矩形，x和y是矩形左下角的坐标 */
    constructor(public x: number, public y: number, public width: number, public height: number) {}

    isInRect(x: number, y: number): boolean {
        return x >= this.x && x <= this.x + this.width && y >= this.y && y <= this.y + this.height;
    }

    isIntersect(other: BattleRect): boolean {
        return !(
            other.x - this.x > this.width ||
            this.x - other.x > other.width ||
            other.y - this.y > this.height ||
            this.y - other.y > other.height
        );
    }
}
