import { BattleBattleStageContext } from "../../Processor/BattleBattleStageContext";
import { BattleBaseFSM } from "./FSM/BattleBaseFSM";
import { BattleMonsterFSM } from "./FSM/BattleMonsterFSM";
import { BattleStuporFSM } from "./FSM/BattleStuporFSM";
import { BattleTDMonsterPeaceFSM } from "./FSM/BattleTDMonsterPeaceFSM";
import { BattleTDMonsterWaitFSM } from "./FSM/BattleTDMonsterWaitFSM";
import { BattleTDPlayerWaitFSM } from "./FSM/BattleTDPlayerWaitFSM";
import { BattleTDTowerWaitFSM } from "./FSM/BattleTDTowerWaitFSM";
import { BattleTDWallWaitFSM } from "./FSM/BattleTDWallWaitFSM";
import { BattleWaitFSM } from "./FSM/BattleWaitFSM";
import { BattleWaitMonsterInfiniteModeFSM } from "./FSM/BattleWaitMonsterInfiniteModeFSM";

export class BattleFSMManager {
    constructor(public ctx: BattleBattleStageContext) {
        this.viewModel = new BattleObjectViewModel(ctx);
        if (this.ctx.object.objectType === GConstant.battle.battleObjectType.wall) {
            this.viewModel.name = "";
            this.viewModel.img = "";
            this.viewModel.skin = "";
        } else {
            this.viewModel.name = this.ctx.object.getName();
            this.viewModel.img = this.ctx.object.getImg();
            this.viewModel.skin = this.ctx.object.getSkin();
        }
    }

    init() {
        this.toBaseFSM();
    }

    toBaseFSM() {
        if (this.ctx.object.objectType === GConstant.battle.battleObjectType.wall) {
            this.curFSM = new BattleTDWallWaitFSM(this.ctx, this);
        } else if (this.ctx.object.objectType === GConstant.battle.battleObjectType.hero) {
            this.curFSM = new BattleTDWallWaitFSM(this.ctx, this);
        } else if (this.ctx.object.objectType === GConstant.battle.battleObjectType.pet) {
            this.curFSM = new BattleTDWallWaitFSM(this.ctx, this);
        } else {
            // if (this.ctx.data.ctx.battleKind === "infinite") {
            //     // 无尽模式走直线
            //     this.curFSM = new BattleWaitMonsterInfiniteModeFSM(this.ctx, this);
            // } else if (this.ctx.data.ctx.battleKind === "damageBoss") {
            //     // boss模式
            //     this.curFSM = new BattleWaitFSM(this.ctx, this);
            // } else {
            //     this.curFSM = new BattleWaitFSM(this.ctx, this);
            // }
            this.curFSM = new BattleMonsterFSM(this.ctx, this);

            // if (this.ctx.data.ctx.battleKind === "normal") {
            //     this.curFSM = new BattleWaitFSM(this.ctx, this);
            // } else {
            //     this.curFSM = new BattleTDMonsterPeaceFSM(this.ctx, this);
            // }
        }
        this.curFSM.startState();
    }

    toStuporFSM() {
        this.curFSM = new BattleStuporFSM(this.ctx, this);
        this.curFSM.startState();
    }

    curFSM: BattleBaseFSM;

    switchState(fsm: BattleBaseFSM) {
        if (this.curFSM) this.curFSM.endState();
        this.curFSM = fsm;
        fsm.startState();
        this.needRefreshSpeed();
    }

    tick() {
        this.curFSM.tick();
    }

    private _needRefreshSpeed: boolean = false;

    /** 需要刷新速度 */
    needRefreshSpeed() {
        this._needRefreshSpeed = true;
    }

    vmRefresh() {
        if (this._needRefreshSpeed) {
            this.viewModel.refreshAnimationSpeed();
            this._needRefreshSpeed = false;
        }
        this.viewModel.tick();
    }

    turnRight() {
        this.viewModel.direction.x = Math.abs(this.viewModel.direction.x);
    }

    turnLeft() {
        this.viewModel.direction.x = -Math.abs(this.viewModel.direction.x);
    }

    readonly viewModel: IBattleObjectViewModel;
}

export interface IBattleObjectViewModel {
    /** 动画 */
    img: string;
    /** 动画皮肤 */
    skin: string;
    /** 角色名 */
    name: string;
    /** 动画名 */
    animation: string;
    /** 动画时间 */
    animationTime: number;
    /** 动画速度 */
    animationSpeed: number;
    /** 动画速度是否发生了变化，变化时的战斗帧数 */
    readonly animationSpeedDirty: number;
    /** 是否需要切换动画，变化时的战斗帧数 */
    readonly animationDirty: number;
    /** 角色行走方向 */
    direction: { x: number; y: number };
    /** 循环播放 */
    loop: boolean;
    /** 刷新动画速度 */
    refreshAnimationSpeed(): void;
    /** 修改动画速度 */
    changeAnimationSpeed(speed: number): void;
    /** 修改动画 */
    changeAnimation(animation: string): void;
    /** 执行一帧 */
    tick(): void;
}

export class BattleObjectViewModel implements IBattleObjectViewModel {
    constructor(public ctx: BattleBattleStageContext) {}

    img: string = "";
    skin: string = "default";
    name: string = "_rs";
    animation: string = "idle";
    animationTime: number = 0;
    animationSpeed: number = 1;
    animationSpeedDirty: number = 0;
    animationDirty: number = 0;
    direction: { x: number; y: number } = { x: 1, y: 0 };
    loop: boolean = true;

    refreshAnimationSpeed() {
        const speed = this.ctx.object.getAnimationSpeed();
        this.changeAnimationSpeed(speed);
    }

    changeAnimationSpeed(speed: number): void {
        this.animationSpeed = speed;
        this.animationSpeedDirty = this.ctx.data.frame;
    }
    changeAnimation(animation: string): void {
        this.animation = animation;
        this.animationDirty = this.ctx.data.frame;
    }
    tick(): void {
        this.animationTime += this.animationSpeed * GConstant.battle.logicTick;
    }
}
