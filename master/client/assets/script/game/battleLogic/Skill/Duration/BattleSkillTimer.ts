export class BattleSkillTimer {
    private timePass: number = 0;
    constructor(public duration: number) {}

    /** 当前进度，在0-1之间 */
    getProgress() {
        const progress = this.timePass / this.duration;
        return progress > 1 ? 1 : progress;
    }

    tick(speed: number) {
        this.timePass += GConstant.battle.logicTick * speed;
    }

    isEnd() {
        return this.timePass >= this.duration;
    }

    reset() {
        this.timePass = 0;
    }
}
