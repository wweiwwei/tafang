export class BattleForce {
    public frame = 0;
    constructor(public direction: number[], public distance: number) {}

    tick() {
        this.frame++;
        // todo 击退时间为0.5秒
        const offset = this.distance / 30;
        return this.direction.map((v) => v * offset);
    }

    needRemove() {
        return this.frame > 30 - 1;
    }
}
