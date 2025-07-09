import { autowired, message, registerClass } from "../../../framework/Decorator";
import UIList from "../../../framework/ui/UIList";
import UIWindow from "../../../framework/ui/UIWindow";
import EventName from "../../event/EventName";
import ListItemMainSceneBottomMenu from "./ListItemMainSceneBottomMenu";

const { ccclass, property } = cc._decorator;

@registerClass("WindowMainSceneBottomUI", {
    sceneWindow: {
        kind: "main",
        openIndex: 2,
    },
    preloadPrefab: ["ListItemEquipmentSceneDropItem"],
})
@ccclass
export default class WindowMainSceneBottomUI extends UIWindow {
    static _poolSize: number = 1;
    _windowParam: any;
    _returnValue: any;
    @autowired(UIList) bottomMenu: UIList<ListItemMainSceneBottomMenu> = null;

    private touchMenu: number = 2; //初始2为中间战斗
    protected onInited(): void {
        this.node.zIndex = 0;
        this.refreshBottom();
    }

    /**刷新底部 */
    @message([EventName.stateKey.mainMission, EventName.systemUnlock, EventName.openWindowStage])
    refreshBottom() {
        let pos = [-300, -150, 0, 150, 300];
        const tblList = GTable.getList("UIMainSceneTbl").filter((t) => t.position === 9);
        const state = tblList.map((t, i) => {
            let tbl = GTable.getById("UIMainSceneTbl", t.id);
            let img = tbl.img;
            let label = tbl.text;
            let cb: Function;
            cb = async (touchMenu: number) => {
                if (t.window.length === 0 && touchMenu != 2) {
                    GTip.showTip(["_rs开发中"]);
                    return;
                }

                if (this.touchMenu == touchMenu) {
                    if (cc.find("Canvas/window/" + t.window)) await GWindow.closeByName(t.window);
                    this.touchMenu = 2;
                    this.refreshBottom();
                    return;
                } else {
                    this.touchMenu = touchMenu;
                    const list = tblList.map((t) => {
                        if (t.window.length > 0) {
                            return GWindow.closeByName(t.window).catch(() => {});
                        }
                        Promise.resolve();
                    });
                    await Promise.all(list);
                }
                if (i !== 2) GModel.player.openWindowWithSystemUnlockCheck(tbl);
                this.refreshBottom();
            };
            return {
                img,
                label,
                id: t.id,
                cb,
                index: i,
                unlock: GModel.player.checkSystemUnlock(tbl.systemId, false),
                touchMenu: this.touchMenu,
                initPos: pos[i],
                showTips: false,
            };
        });
        this.bottomMenu.setState(state);
    }
}
