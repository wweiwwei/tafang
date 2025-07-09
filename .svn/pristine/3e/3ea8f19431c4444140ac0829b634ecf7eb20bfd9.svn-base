import { autowired, registerClass } from "../../../framework/Decorator";
import { WindowOpenAnimationEnum, WindowOpenOption } from "../../../framework/ui/GWindow";
import UIButton from "../../../framework/ui/UIButton";
import UIList from "../../../framework/ui/UIList";
import UIWindow from "../../../framework/ui/UIWindow";
import Item from "../../entity/Item";
import ListItemItem from "./ListItemItem";

const { ccclass, property } = cc._decorator;
@registerClass("WindowCongratulation_Sprite")
@ccclass
export default class WindowCongratulation_Sprite extends UIWindow {
    static defaultOpentOption: Partial<WindowOpenOption> = {
        animation: WindowOpenAnimationEnum.default,
    };
    @autowired(UIList) rewardList: UIList<ListItemItem> = null;
    _windowParam: {
        items: Item[];
    };
    _returnValue: any;
    protected onInited(): void {
        let anim = this.node.getChildByName("content").getComponent(cc.Animation);
        anim.play("SpriteReward_Ani");
        anim.on("finished", () => {
            anim.play("SpriteRewardLoop_Ani");
        });
        let btn = this.node.getComponent(UIButton);
        btn.setTransition(false);
        btn.onClick = () => {
            this.close();
        };
        this.itemInit();
    }
    itemInit() {
        if (this._windowParam.items.length > 5) this.rewardList.node.getComponent(cc.Layout).type = cc.Layout.Type.GRID;
        let state = this._windowParam.items.map((t) => {
            return { item: t, status: 0, new: t.count === 1, debris: t.count !== 1 };
        });
        this.rewardList.setState(state);
    }
}
