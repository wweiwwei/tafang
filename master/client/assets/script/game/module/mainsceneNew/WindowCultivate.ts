import { autowired, message, registerClass } from "../../../framework/Decorator";
import ResourceLoader from "../../../framework/ResourceLoader";
import EventBus from "../../../framework/event/EventBus";
import { WindowOpenAnimationEnum, WindowOpenOption } from "../../../framework/ui/GWindow";
import UIButton from "../../../framework/ui/UIButton";
import UIWindow from "../../../framework/ui/UIWindow";
import Item from "../../entity/Item";
import EventName from "../../event/EventName";
import WindowTree from "../mainscene/WindowTree";
import WindowSpriit from "./WindowSpriit";
import WindowStrange from "./WindowStrange";

const { ccclass, property } = cc._decorator;
@registerClass("WindowCultivate", {
    preloadPrefab: ["WindowTree", "WindowStrange", "WindowSpriit", "ListItemTree", "ListItemSprite"],
})
@ccclass
export default class WindowCultivate extends UIWindow {
    _windowParam: any;
    _returnValue: any;
    static defaultOpentOption: Partial<WindowOpenOption> = {
        animation: WindowOpenAnimationEnum.no,
    };
    @autowired(UIButton) tech: UIButton = null;
    @autowired(UIButton) sprite: UIButton = null;
    @autowired(UIButton) fossil: UIButton = null;
    @autowired(cc.Node) tip1: cc.Node = null;
    @autowired(cc.Node) tip2: cc.Node = null;
    @autowired(cc.Node) tip3: cc.Node = null;
    @autowired(cc.Node) window: cc.Node = null;

    private page = 0;
    private tree: WindowTree;
    private mount: WindowSpriit;
    private strange: WindowStrange;
    protected onInited(): void {
        EventBus.emit(EventName.hideMainSceneLeftMenuUi, false);
        this.node.zIndex = -1;
        this.tech.onClick = () => {
            this.page = 0;
            this.refWindow();
        };
        this.sprite.onClick = () => {
            if (!GModel.player.checkSystemUnlock(GIndex.id.systemId.sprite, true)) return;
            this.page = 1;
            this.refWindow();
        };
        this.fossil.onClick = () => {
            if (!GModel.player.checkSystemUnlock(GIndex.id.systemId.fossil, true)) return;
            this.page = 2;
            this.refWindow();
        };
        const sprites = GModel.sprite.getSprites().filter((s) => s.level > 0);
        this.tree = ResourceLoader.getNodeSyncWithPreload(WindowTree);
        this.mount = ResourceLoader.getNodeSyncWithPreload(WindowSpriit);
        this.mount.setState({ id: sprites.length <= 0 ? 800001 : sprites[0].id });
        this.strange = ResourceLoader.getNodeSyncWithPreload(WindowStrange);
        this.refWindow();
        this.refTips();
    }
    @message([EventName.redTipRefresh])
    refTips() {
        this.tip1.active = GModel.redTip.getRed(1007) > 0;
        this.tip2.active = GModel.redTip.getRed(1008) > 0;
        this.tip3.active = GModel.redTip.getRed(1009) > 0;
    }
    refWindow() {
        this.tech.bg.imgName = this.page === 0 ? "cultivate_chosen" : "cultivate_unchosen";
        this.sprite.bg.imgName = this.page === 1 ? "cultivate_chosen" : "cultivate_unchosen";
        this.fossil.bg.imgName = this.page === 2 ? "cultivate_chosen" : "cultivate_unchosen";
        this.window.removeAllChildren();
        switch (this.page) {
            case 0:
                this.window.addChild(this.tree.node);
                break;
            case 1:
                this.window.addChild(this.mount.node);
                break;
            case 2:
                this.window.addChild(this.strange.node);
                break;
            default:
                break;
        }
    }

    protected onDisable(): void {
        EventBus.emit(EventName.hideMainSceneLeftMenuUi, true);
    }
}
