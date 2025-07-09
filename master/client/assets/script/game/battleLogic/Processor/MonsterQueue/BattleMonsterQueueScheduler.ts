import { BattleBattleStageObject } from "../../Object/BattleStage/BattleBattleStageObject";
import { BattleBattleStageData } from "../BattleBattleStageData";

export class BattleMonsterQueueScheduler {
    public monsterId: number;
    public count: number;
    public hasSpawn: number = 0;
    private hasShowPortal: number = 0;
    public delay: number;
    public interval: number;
    public road: number;

    public delayFrame = 0;
    public intervalFrame = 0;
    constructor(public wave: number, data: number[], public waveLevel: number) {
        this.monsterId = data[0];
        this.count = data[1];
        this.delay = data[2];
        this.interval = data[3];
        this.road = data[4];
        this.delayFrame = Math.round(this.delay / GConstant.battle.logicTick);
        this.intervalFrame = Math.round(this.interval / GConstant.battle.logicTick);
    }
    private getMonsterInitPos(ctx: BattleBattleStageData, index: number) {
        return ctx.mapInfo.getMonsterInitPos();
        // const sr = ctx.sr;
        // if (this.road > 100 && this.road < 200) {
        //     // 圆圈刷怪
        //     const radius = GConstant.battle.monsterCircleRadius[this.road] || 500;
        //     const angle = sr.nextInt(0, 360);
        //     const pos = {
        //         x: radius * Math.cos(angle),
        //         y: radius * Math.sin(angle),
        //     };
        //     return pos;
        // } else if (this.road > 200 && this.road < 300) {
        //     // 矩形刷怪
        //     const rect: { x: -400; y: 200; height: 500; width: 300 } = GConstant.battle.monsterArea[this.road] || {
        //         x: -400,
        //         y: 400,
        //         height: 200,
        //         width: 200,
        //     };
        //     const x = sr.nextInt(Math.round(rect.x - rect.width * 0.5), Math.round(rect.x + rect.width * 0.5));
        //     const y = sr.nextInt(Math.round(rect.y - rect.height * 0.5), Math.round(rect.y + rect.height * 0.5));
        //     return { x, y };
        // } else if (this.road > 300 && this.road < 400) {
        //     // 圆圈刷怪均匀
        //     const radius = GConstant.battle.monsterCircleRadius[this.road] || 500;
        //     const angle = (2 * Math.PI * index) / this.count;
        //     const pos = {
        //         x: radius * Math.cos(angle),
        //         y: radius * Math.sin(angle),
        //     };
        //     return pos;
        // } else if (this.road === -1) {
        //     // boss
        //     return ctx.mapInfo.getBossPos();
        // } else {
        //     // 点区域刷怪
        //     const { x, y } = GConstant.battle.roadBegin[this.road - 1];
        //     const offsetX = sr.nextInt(-50, 50);
        //     const offsetY = sr.nextInt(-50, 50);
        //     const pos = {
        //         x: x + offsetX,
        //         y: y + offsetY,
        //     };
        //     return pos;
        // }
    }
    private createMonster(ctx: BattleBattleStageData, index: number) {
        const pos = this.getMonsterInitPos(ctx, index);
        const monster = BattleBattleStageObject.createMonster(ctx, this.monsterId, ctx.ctx.env, pos, this.waveLevel);
        if (monster.propertyManager.heroTag.includes("boss")) {
            monster.dropCoin = GConstant.battle.bossCoinDrop;
        } else {
            monster.dropCoin = GConstant.battle.baseCoinDrop(this.wave + 1);
        }
        return monster;
    }

    isEmpty() {
        return this.hasSpawn >= this.count;
    }

    isActive(wave: number) {
        return this.wave <= wave && this.hasSpawn < this.count;
    }

    nextPortal(ctx: BattleBattleStageData, wave: number, waveFrame: number): { x: number; y: number }[] {
        if (this.hasShowPortal >= this.count) return [];
        if (this.wave > wave) return [];
        const frame = ctx.frame + 48;
        const nextFrame = waveFrame + this.delayFrame + this.intervalFrame * this.hasShowPortal;
        if (frame < nextFrame) return [];
        if (this.intervalFrame === 0) {
            const res: { x: number; y: number }[] = [];
            for (let i = this.hasShowPortal; i < this.count; i++) {
                res.push(this.getMonsterInitPos(ctx, i));
            }
            this.hasShowPortal = this.count;
            return res;
        } else {
            const res = [this.getMonsterInitPos(ctx, this.hasShowPortal)];
            this.hasShowPortal++;
            return res;
        }
    }

    nextMonster(ctx: BattleBattleStageData, wave: number, waveFrame: number): BattleBattleStageObject[] {
        if (this.hasSpawn >= this.count) return [];
        if (this.wave > wave) return [];
        const frame = ctx.frame;
        const nextFrame = waveFrame + this.delayFrame + this.intervalFrame * this.hasSpawn;
        if (frame < nextFrame) return [];
        if (this.intervalFrame === 0) {
            const res: BattleBattleStageObject[] = [];
            for (let i = this.hasSpawn; i < this.count; i++) {
                res.push(this.createMonster(ctx, i));
            }
            this.hasSpawn = this.count;
            return res;
        } else {
            const res = [this.createMonster(ctx, this.hasSpawn)];
            this.hasSpawn++;
            return res;
        }
    }
}
