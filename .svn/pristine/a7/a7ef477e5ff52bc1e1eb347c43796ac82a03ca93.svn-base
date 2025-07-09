export class BattleSkillFrameTimer {
    framePass: number = 0;
    constructor(public frame: number) {}

    /** 当前进度，在0-1之间 */
    getProgress() {
        const progress = this.framePass / this.frame;
        return progress > 1 ? 1 : progress;
    }

    tick(speed: number) {
        this.framePass += speed;
    }

    isEnd() {
        return this.framePass >= this.frame;
    }

    reset() {
        this.framePass = 0;
    }
}
