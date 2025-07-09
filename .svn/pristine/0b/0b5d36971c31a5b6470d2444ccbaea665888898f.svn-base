import { BattleDisplayEvent } from "../../../Display/BattleDisplayEvent";
import { BattleBaseFSM } from "./BattleBaseFSM";

/** 眩晕状态机 */
export class BattleStuporFSM extends BattleBaseFSM {
    endState(): void {}
    tick(): void {}
    startState(): void {
        // 设置动画状态
        this.fsmManager.setAnimationInfo({
            name: GConstant.battle.animationType.idle,
            loop: true,
        });
        this.ctx.data.pushDisplayEvent(
            new BattleDisplayEvent("switchAnimation", {
                obj: this.ctx.object,
                animation: GConstant.battle.animationType.idle,
                loop: true,
            })
        );
    }
}
