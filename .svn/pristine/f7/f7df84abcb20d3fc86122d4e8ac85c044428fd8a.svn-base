import { autowired, registerClass } from "../../../framework/Decorator";
import UILabel from "../../../framework/ui/UILabel";
import UIWindow from "../../../framework/ui/UIWindow";

const { ccclass, property } = cc._decorator;
@registerClass("WindowStory")
@ccclass
export default class WindowStory extends UIWindow {
    _windowParam: any;
    _returnValue: any;

    @autowired(UILabel) subtitling: UILabel = null;
    @autowired(UILabel) enterTip: UILabel = null;
    @autowired(cc.Node) scene1: cc.Node = null;
    @autowired(cc.Node) scene2: cc.Node = null;
    @autowired(cc.Node) hand: cc.Node = null;
    @autowired(cc.Node) handImg: cc.Node = null;
    @autowired(cc.Node) bg: cc.Node = null;
    /** 场景1的加速标志位 */
    private acc: boolean = false;
    private currentScene = 1;
    private lastClickTime = 0;

    protected onInited(): void {
        this.node.zIndex = 100;
        GAudio.playMusic("storm");
        this.scene1.active = true;
        this.scene2.active = false;
        this.subtitling.setText([GConfig.story.subtitling]);
        this.enterTip.setText([GConfig.story.enterTip]);
        this.node.on(
            cc.Node.EventType.TOUCH_START,
            () => {
                this.acc = true;
            },
            this
        );
        this.node.on(
            cc.Node.EventType.TOUCH_END,
            () => {
                this.acc = false;
                const now = Date.now();
                if (now - this.lastClickTime < 500) {
                    this.toScene2();
                }
                this.lastClickTime = now;
            },
            this
        );
        cc.tween(this.handImg)
            .repeatForever(
                cc
                    .tween(this.handImg)
                    .to(0.5, { x: -10 }, { easing: "sineOut" })
                    .to(0.5, { x: 10 }, { easing: "sineOut" })
            )
            .start();
    }

    move(dt: number) {
        if (this.currentScene !== 1) return;
        this.subtitling.node.y += dt * 50 * (this.acc ? 3 : 1);
        if (this.subtitling.node.y > this.subtitling.node.height + 50) {
            this.toScene2();
        }
    }

    protected update(dt: number): void {
        this.move(dt);
    }
    /** 场景2的关闭标志位 */
    private toClose = false;
    private closing = false;

    toScene2() {
        this.currentScene = 2;
        this.scene1.active = false;
        this.scene2.active = true;
        this.hand.active = false;
        this.scheduleOnce(() => {
            this.hand.active = true;
        }, 1);
        this.node.on(
            cc.Node.EventType.TOUCH_START,
            () => {
                this.toClose = true;
            },
            this
        );
        this.node.on(
            cc.Node.EventType.TOUCH_END,
            async () => {
                if (this.closing) return;
                if (this.toClose) {
                    this.closing = true;
                    this.scene2.active = false;
                    await Promise.all([GWindow.goToMain(), this.dispear()]);
                    this.close();
                }
            },
            this
        );
    }

    dispear() {
        this.bg.color = cc.Color.WHITE;
        return new Promise((resolve, reject) => {
            cc.tween(this.node).to(3, { opacity: 0 }, { easing: "sineInOut" }).call(resolve).start();
        });
    }
}
