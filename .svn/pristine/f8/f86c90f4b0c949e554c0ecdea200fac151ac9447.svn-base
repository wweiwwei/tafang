import { autowired, message, registerClass } from "../../../framework/Decorator";
import UIButton from "../../../framework/ui/UIButton";
import UILabel from "../../../framework/ui/UILabel";
import UILongTouchButton from "../../../framework/ui/UILongTouchButton";
import UISpine from "../../../framework/ui/UISpine";
import UIWindow from "../../../framework/ui/UIWindow";
const { ccclass, property } = cc._decorator;
@registerClass("WindowWeakGuide")
@ccclass
export default class WindowWeakGuide extends UIWindow {
    _windowParam: {
        id: number;
    };
    _returnValue: any;

    @autowired(cc.Node) hand: cc.Node = null;
    @autowired(cc.Node) handImg: cc.Node = null;

    protected onInited(): void {
        cc.tween(this.handImg)
            .repeatForever(
                cc
                    .tween(this.handImg)
                    .to(0.5, { x: -10 }, { easing: "sineOut" })
                    .to(0.5, { x: 10 }, { easing: "sineOut" })
            )
            .start();
        this.guideInit();
    }

    async guideInit() {
        const list = GTable.getList("WeakGuideContentTbl").filter((t) => t.guideId === this._windowParam.id);
        for (let i = 0; i < list.length; i++) {
            await this.guide(list[i]);
        }
        GWindow.guideBtn = null;
        GWindow.sceneEventBlock = false;
        GWindow.sceneLimit = -1;
        this.close().then(() => {
            GModel.guide.complete(list[0].guideId);
            GModel.guide.triggerDialogue(7, list[0].guideId);
        });
    }

    guide(tbl: WeakGuideContentTbl): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this.node.opacity = 255;
            const check = () => {
                const guideNode = cc.find(tbl.point);
                GWindow.guideBtnPath = tbl.point;
                if (guideNode) {
                    GWindow.guideBtn = guideNode.getComponent(UIButton) || guideNode.getComponent(UILongTouchButton);
                    this.hand.active = true;
                    const guideWorldPos = guideNode.convertToWorldSpaceAR(cc.v2());
                    const pos = this.node.parent.convertToNodeSpaceAR(guideWorldPos);
                    this.hand.setPosition(pos.x + (tbl.hand[0] || 0), pos.y + (tbl.hand[1] || 0));
                } else {
                    this.unscheduleAllCallbacks();
                    resolve();
                }
                if (tbl.complete.every((v) => GModel.guide.predicate[v[0]](...v.slice(1)))) {
                    this.unscheduleAllCallbacks();
                    resolve();
                }
            };
            this.schedule(check, 0.1);
        });
    }

    protected onRecycle(): void {
        this.node.stopAllActions();
    }
}
