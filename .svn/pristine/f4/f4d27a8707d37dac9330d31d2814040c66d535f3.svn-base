import { autowired, registerClass } from "../../../framework/Decorator";
import UIListItem from "../../../framework/ui/UIListItem";
import UISpine from "../../../framework/ui/UISpine";
import { BattleEffect } from "../../battleLogic/Object/Effect/BattleEffect";
const { ccclass, property } = cc._decorator;

@registerClass("ListItemBattleEffectWithControl")
@ccclass
export default class ListItemBattleEffectWithControl extends UIListItem {
    static _poolSize: number = 20;

    @autowired(UISpine) spine: UISpine = null;

    protected onInjected(): void {
        this.spine.setEventListener((entry: sp.spine.TrackEntry, event) => {
            if (event.data.name === "shock") {
                GCamera.shockScreen();
            } else if ((event.data.name as string).startsWith("sound_")) {
                GAudio.playEffect(event.data.name);
            }
        });
    }
    state: {
        effect: BattleEffect;
    };
    setState(state: this["state"]): void {
        this.state = state;
        this.spine.setSpine(this.state.effect.effectName, "default", this.state.effect.effectAnimation);
        this.spine.loop = this.state.effect.loop;
        this.setAnimationSpeed(1);
        if (!this.state.effect.loop) {
            this.spine.setCompleteListener(() => {
                this.recycle();
            });
        }
    }
    setAnimationSpeed(ts: number) {
        this.spine.timeScale = ts * GModel.battle.getBattleSpeed();
    }

    protected update(dt: number): void {
        this.node.position = cc.v3(this.state.effect.position.x, this.state.effect.position.y);
        this.node.scaleX = this.state.effect.scaleX;
        this.node.scaleY = this.state.effect.scaleY;
        this.node.angle = this.state.effect.angle;
        if (this.state.effect.needDestroy) {
            this.recycle();
        }
    }
}
