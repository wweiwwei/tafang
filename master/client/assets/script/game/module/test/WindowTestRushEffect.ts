import { autowired, registerClass } from "../../../framework/Decorator";
import UIButton from "../../../framework/ui/UIButton";
import UISpine from "../../../framework/ui/UISpine";
import UIWindow from "../../../framework/ui/UIWindow";

const { ccclass, property } = cc._decorator;

@registerClass("WindowTestRushEffect")
@ccclass
export default class WindowTestRushEffect extends UIWindow {
    _windowParam: {
        spine: string;
    };
    _returnValue: any;

    @autowired(UISpine) spine: UISpine = null;
    @autowired(cc.Node) rush: cc.Node = null;
    @autowired(UIButton) returnBtn: UIButton = null;
    protected onInited(): void {
        this.spine.setSpine(this._windowParam.spine, "default", "run");
        this.returnBtn.onClick = () => {
            this.close();
        };
    }

    protected update(dt: number): void {
        const tbl = GTable.getList("SpineInfoTbl").find((t) => t.spine === this._windowParam.spine);
        if (tbl) {
            this.spine.node.scale = tbl.scale;
            this.rush.scale = tbl.rush[1];
            this.rush.y = tbl.rush[0];
        }
        this.rush.angle += 2;
    }
}
