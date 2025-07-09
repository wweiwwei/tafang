import { autowired, registerClass } from "../../../framework/Decorator";
import UIButton from "../../../framework/ui/UIButton";
import UILabel from "../../../framework/ui/UILabel";
import UISpine from "../../../framework/ui/UISpine";
import UIWindow from "../../../framework/ui/UIWindow";
import WindowBattleScene from "../battle/WindowBattleScene";

const { ccclass, property } = cc._decorator;
@registerClass("WindowStory2")
@ccclass
export default class WindowStory2 extends UIWindow {
    _windowParam: any;
    _returnValue: any;

    @autowired(UISpine) role1: UISpine = null;
    @autowired(UISpine) role2: UISpine = null;
    @autowired(cc.Node) dialogue: cc.Node = null;
    @autowired(cc.Node) nameBg: cc.Node = null;
    @autowired(UILabel) nameLabel: UILabel = null;
    @autowired(UILabel) text: UILabel = null;
    @autowired(cc.Node) next: cc.Node = null;

    @autowired(UISpine) survivor1: UISpine = null;
    @autowired(UISpine) survivor2: UISpine = null;
    @autowired(UISpine) effect1: UISpine = null;
    @autowired(UISpine) effect2: UISpine = null;
    @autowired(UIButton) bubble1: UIButton = null;
    @autowired(UIButton) bubble2: UIButton = null;

    @autowired(cc.Node) survivorContainer: cc.Node = null;

    protected onInited(): void {
        this.node.getComponent(UIButton).setTransition(false);
        cc.tween(this.next)
            .repeatForever(
                cc.tween(this.next).by(0.5, { y: -10 }, { easing: "sineOut" }).by(0.5, { y: 10 }, { easing: "sineOut" })
            )
            .start();
        this.guideInit();
    }

    async guideInit() {
        const list = GTable.getList("GuideContentTbl").filter((t) => t.guideId === 9999);
        for (let i = 0; i < list.length; i++) {
            await this.guide(list[i], i);
            GSDK.report({
                kind: "guide",
                data: {
                    guideId: list[i].id,
                },
            });
        }
        this.close();
    }

    private battleSceneMove = false;
    guide(tbl: GuideContentTbl, i: number) {
        this.refreshDialogue(tbl);
        return new Promise<void>((resolve, reject) => {
            if (i === 0) {
                this.dialogue.active = false;
                this.bubble1.node.active = this.bubble2.node.active = false;
                this.battleSceneMove = true;
                cc.tween(this.survivorContainer)
                    .by(500 / 240, { x: -500 })
                    .call(() => {
                        this.dialogue.active = true;
                        this.battleSceneMove = false;
                        this.bubble1.node.active = this.bubble2.node.active = true;
                        let hasCure = 0;
                        this.bubble1.onClick = () => {
                            this.survivor1.setAnimation(0, "idle", true);
                            this.survivor1.node.scaleX *= -1;
                            this.bubble1.node.active = false;
                            hasCure++;
                            if (hasCure === 2) {
                                resolve();
                            }
                            this.effect1.setSpine("supporrabbit_skillattack", "default", "skillattack");
                        };
                        this.bubble2.onClick = () => {
                            this.survivor2.setAnimation(0, "idle", true);
                            this.survivor2.node.scaleX *= -1;
                            this.bubble2.node.active = false;
                            hasCure++;
                            if (hasCure === 2) {
                                resolve();
                            }
                            this.effect2.setSpine("supporrabbit_skillattack", "default", "skillattack");
                        };
                    })
                    .start();
            } else {
                this.node.getComponent(UIButton).onClick = () => {
                    resolve();
                };
            }
        });
    }

    refreshDialogue(tbl: GuideContentTbl) {
        if (tbl.rolePos === 1) {
            this.role1.node.scaleX = tbl.role === "Survivor_Treatment" ? 0.6 : 1;
            this.role1.node.scaleY = tbl.role === "Survivor_Treatment" ? 0.6 : 1;
            this.role1.setSpine(tbl.role, "default", "idle");
        } else {
            this.role2.node.scaleX = tbl.role === "Survivor_Treatment" ? -0.6 : -1;
            this.role2.node.scaleY = tbl.role === "Survivor_Treatment" ? 0.6 : 1;
            this.role2.setSpine(tbl.role, "default", "idle");
        }
        this.role1.node.active = tbl.rolePos === 1;
        this.role2.node.active = tbl.rolePos === 2;
        this.dialogue.x = tbl.rolePos === 1 ? 0 : 230;
        this.nameBg.x = tbl.rolePos === 1 ? -230 : 10;
        const heroTbl = GTable.getList("HeroTbl").find((v) => v.img === tbl.role);
        const roleName = heroTbl ? heroTbl.name : "_rs幸存者";
        this.nameLabel.setText([roleName]);
        this.text.setText([tbl.content]);
        this.dialogue.y = tbl.dialogueOffset;
    }

    protected update(dt: number): void {
        if (this.battleSceneMove) {
            const scene = GWindow.get(WindowBattleScene);
            scene.scene.x -= 240 * dt;
            scene.front.x -= 240 * dt;
            scene["sceneBgComp"].scroll(2);
        }
    }
}
