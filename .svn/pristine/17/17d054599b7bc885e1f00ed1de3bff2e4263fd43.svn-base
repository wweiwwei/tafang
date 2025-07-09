import { autowired, registerClass } from "../../../framework/Decorator";
import ResourceLoader from "../../../framework/ResourceLoader";
import UIButton from "../../../framework/ui/UIButton";
import UIList from "../../../framework/ui/UIList";
import UISpine from "../../../framework/ui/UISpine";
import UIWindow from "../../../framework/ui/UIWindow";
import ListItemGMServerSelect from "./ListItemGMServerSelect";

const { ccclass, property } = cc._decorator;

@registerClass("WindowTestBattleScene")
@ccclass
export default class WindowTestBattleScene extends UIWindow {
    _windowParam: null = null;
    _returnValue: any;

    /** 场景背景 */
    @autowired(cc.Node) sceneBg: cc.Node = null;
    /** 角色 */
    @autowired(UISpine) role: UISpine = null;
    /** 场景按钮 */
    @autowired(UIList) sceneBtn: UIList<ListItemGMServerSelect> = null;
    /** 滚动按钮 */
    @autowired(UIList) scrollBtn: UIList<ListItemGMServerSelect> = null;
    /** 角色动作按钮 */
    @autowired(UIList) animationBtn: UIList<ListItemGMServerSelect> = null;
    /** 角色按钮 */
    @autowired(UIList) roleBtn: UIList<ListItemGMServerSelect> = null;

    @autowired(cc.Node) btn: cc.Node = null;

    @autowired(UIButton) hideToggle: UIButton = null;

    protected onInited(): void {
        this.hideToggle.onClick = () => {
            this.btn.active = !this.btn.active;
        };
        this.node.zIndex = 100;
        this.setSceneBg(GTable.getList("BattleSceneInfoTbl")[0].prefab);
        this.setRole("langren");
        this.sceneBtn.setState(
            GTable.getList("BattleSceneInfoTbl").map((t) => ({
                serverName: t.prefab,
                cb: () => this.setSceneBg(t.prefab),
            }))
        );
        this.scrollBtn.setState(
            ["no", "slow", "fast"].map((t) => ({ serverName: t, cb: () => (this.scrollMode = t) }))
        );
        this.animationBtn.setState(
            ["idle", "run", "walk", "attack", "skill"].map((t) => ({ serverName: t, cb: () => this.setAnimation(t) }))
        );
        this.roleBtn.setState(
            GTable.getList("SpineInfoTbl").map((t) => ({
                serverName: t.spine,
                cb: () => this.setRole(t.spine),
            }))
        );
    }
    private sceneBgComp: BattleBackground = null;
    private scrollMode: string = "no";
    private animation = "idle";
    private spineName = "langren";

    async setSceneBg(mapName: string) {
        const bgPrefab = await ResourceLoader.loadPrefab(mapName);
        const sceneInfo = GTable.getList("BattleSceneInfoTbl").find((t) => t.prefab === mapName);
        GAudio.playMusic(sceneInfo.music);
        const bgNode = cc.instantiate(bgPrefab);
        this.sceneBg.removeAllChildren();
        this.sceneBg.addChild(bgNode);
        this.sceneBgComp = bgNode.addComponent(BattleBackground);
        this.sceneBgComp.setMapName(mapName);
    }

    async setRole(spineName: string) {
        this.spineName = spineName;
        this.role.setSpine(spineName, "default", this.animation);
        const tbl = GTable.getList("SpineInfoTbl").find((t) => t.spine === spineName);
        this.role.node.scale = tbl.scale;
        this.setAnimation(this.animation);
    }

    async setAnimation(animation: string) {
        this.animation = animation;
        this.role.changeAnimation(animation, true);
        const tbl = GTable.getList("SpineAttackAnimationInfoTbl").find(
            (t) => t.spine === this.spineName && t.animation === animation
        );
        if (tbl) {
            this.role.timeScale = tbl.animationSpeed;
        } else {
            this.role.timeScale = 1;
        }
    }

    protected update(dt: number): void {
        if (this.sceneBgComp) {
            if (this.scrollMode === "slow") {
                this.sceneBgComp.scroll(1);
            } else if (this.scrollMode === "fast") {
                this.sceneBgComp.scroll(2);
            }
        }
    }
}
