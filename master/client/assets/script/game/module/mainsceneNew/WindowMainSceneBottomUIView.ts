import { autowired, message, registerClass } from "../../../framework/Decorator";
import IocContainer from "../../../framework/IocContainer";
import UIList from "../../../framework/ui/UIList";
import UIWindow from "../../../framework/ui/UIWindow";
import { EnumFacilityType } from "../../config/GEnum";
import Item from "../../entity/Item";
import EventName from "../../event/EventName";
import WindowCongratulation from "../common/WindowCongratulation";
import ListItemMainSceneBottomMenu from "../mainscene/ListItemMainSceneBottomMenu";

const { ccclass, property } = cc._decorator;

// @registerClass("WindowMainSceneBottomUIView", {
//     sceneWindow: {
//         kind: "battle",
//         openIndex: 2,
//     },
// })
@ccclass
export default class WindowMainSceneBottomUIView extends UIWindow {
    static _poolSize: number = 1;
    _windowParam: any;
    _returnValue: any;

    /** 底部菜单容器 **/
    @autowired(UIList) bottomMenu: UIList<ListItemMainSceneBottomMenu> = null;

    // private selectedIndex = -1;
    protected onInited(): void {
        this.refreshBottom();
    }
    showReward(reward: Item[]) {
        // if (this.continue) {
        GWindow.open(WindowCongratulation, { items: reward });
        // this.btn.setEnable(false);
        // this.continue = false;
        // }
    }
    /**刷新底部 */
    @message([
        EventName.stateKey.mainMission,
        // EventName.stateKey.stageAfkMapProduce,
        EventName.stateKey.stageAfkBattleReward,
        EventName.stateKey.stage,
        EventName.stateKey.storage,
        EventName.systemUnlock,
    ])
    refreshBottom() {
        const tblList = GTable.getList("UIMainSceneTbl").filter((t) => t.position === 3);
        const state = tblList.map((t, i) => {
            let tbl = GTable.getById("UIMainSceneTbl", t.id);
            let img = tbl.img;
            let label = tbl.text;
            let show = false;
            let cb: () => void;
            if (t.id !== 1003) {
                cb = async () => {
                    // if (t.window.length === 0) return;
                    // const cls = IocContainer.get(t.window);
                    // GWindow.open(cls);
                    GModel.player.openWindowWithSystemUnlockCheck(t);
                };
            }
            switch (i) {
                case 0:
                    show =
                        GModel.player.checkSystemUnlock(GConstant.systemId.heroUpgrade, false) &&
                        (GModel.hero
                            .getAllHero()
                            .some((h) => (h.canUpgrade() || h.canUprank() || h.canUpstar()) && h.isFormated()) ||
                            GModel.hero.canFormate() ||
                            GModel.knapsack.isCanComposeFlag());
                    break;
                case 1:
                    show =
                        GModel.facility
                            .getAllFacility()
                            .filter((t) => t.getKind() !== EnumFacilityType.entrance)
                            .find((t) => {
                                return (
                                    (t.isFacilityUnlockable(false) && !t.unlock) ||
                                    t.canUpgrade() ||
                                    t.canUprank() ||
                                    t.canUpstar()
                                );
                            }) !== undefined;
                    break;
                case 2:
                    show = GModel.knapsack.getStorageById(GIndex.id.turntableStorageId) > 0;
                    break;
            }
            return { img, label, id: t.id, cb, show };
        });
        this.bottomMenu.setState(state);
    }
}
