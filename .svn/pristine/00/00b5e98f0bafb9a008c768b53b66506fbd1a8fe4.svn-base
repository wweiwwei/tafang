import { autowired, message, registerClass } from "../../../framework/Decorator";
import UIButton from "../../../framework/ui/UIButton";
import UILabel from "../../../framework/ui/UILabel";
import UILongTouchButton from "../../../framework/ui/UILongTouchButton";
import UISpine from "../../../framework/ui/UISpine";
import UIWindow from "../../../framework/ui/UIWindow";
import BattleSceneControl from "../battle/battleScene/BattleSceneControl";
const { ccclass, property } = cc._decorator;
@registerClass("WindowGuide")
@ccclass
export default class WindowGuide extends UIWindow {
    _windowParam: {
        id: number;
    };
    _returnValue: any;

    @autowired(cc.Node) mask: cc.Node = null;
    // @autowired(cc.Node) focus: cc.Node = null;
    @autowired(UISpine) role1: UISpine = null;
    @autowired(UISpine) role2: UISpine = null;
    @autowired(cc.Node) next: cc.Node = null;
    @autowired(UILabel) text: UILabel = null;
    @autowired(cc.Node) hand: cc.Node = null;
    @autowired(cc.Node) handImg: cc.Node = null;
    @autowired(cc.Node) dialogue: cc.Node = null;
    @autowired(cc.Node) nameBg: cc.Node = null;
    @autowired(UILabel) nameLabel: UILabel = null;

    protected onInited(): void {
        this.node.zIndex = 3;
        this.node.getComponent(UIButton).setTransition(false);
        cc.tween(this.next)
            .repeatForever(
                cc.tween(this.next).by(0.5, { y: -10 }, { easing: "sineOut" }).by(0.5, { y: 10 }, { easing: "sineOut" })
            )
            .start();
        // // 不再显示遮罩
        // this.mask.active = false;
        cc.tween(this.mask)
            .repeatForever(
                cc
                    .tween(this.mask)
                    .to(0.9, { scale: 0.9 }, { easing: "sineOut" })
                    .to(1.1, { scale: 1.1 }, { easing: "sineOut" })
            )
            .start();
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
        GWindow.buttonBlock = true;
        GWindow.sceneEventBlock = true;
        const list = GTable.getList("GuideContentTbl").filter((t) => t.guideId === this._windowParam.id);
        for (let i = 0; i < list.length; i++) {
            await this.guide(list[i]);
            GSDK.report({
                kind: "guide",
                data: {
                    guideId: list[i].id,
                },
            });
        }
        GWindow.guideBtn = null;
        GWindow.guideBtnPath = "";
        GWindow.buttonBlock = false;
        GWindow.sceneEventBlock = false;
        GWindow.sceneLimit = -1;
        this.close().then(() => {
            GModel.guide.complete(list[0].guideId);
            GModel.guide.triggerDialogue(7, list[0].guideId);
        });
    }
    private hasStartDragGuide = false;

    guide(tbl: GuideContentTbl): Promise<void> {
        if (tbl.role.length > 0) {
            if (tbl.rolePos === 1) {
                this.role1.node.scaleX = tbl.role === "Survivor_Treatment" ? 0.6 : 1;
                this.role1.node.scaleY = tbl.role === "Survivor_Treatment" ? 0.6 : 1;
                this.role1.setSpine(tbl.role, "default", "idle");
            } else {
                this.role2.node.scaleX = tbl.role === "Survivor_Treatment" ? -0.6 : -1;
                this.role2.node.scaleY = tbl.role === "Survivor_Treatment" ? 0.6 : 1;
                this.role2.setSpine(tbl.role, "default", "idle");
            }
        }
        this.role1.node.active = tbl.rolePos === 1;
        this.role2.node.active = tbl.rolePos === 2;
        this.dialogue.x = tbl.rolePos === 1 ? 0 : 230;
        this.nameBg.x = tbl.rolePos === 1 ? -230 : 10;
        if (tbl.roleName.length > 0) this.nameLabel.setText([tbl.roleName]);
        this.text.setText([tbl.content]);
        this.dialogue.y = tbl.dialogueOffset;
        GWindow.sceneEventBlock = tbl.sceneBlock > 0;
        GWindow.buttonBlock = tbl.buttonBlock > 0;
        if (tbl.preRun.length > 0) {
            GModel.guide.preRun[tbl.preRun[0]](...tbl.preRun.slice(1));
        }
        const afterRun = () => {
            if (tbl.afterRun.length > 0) {
                GModel.guide.preRun[tbl.afterRun[0]](...tbl.afterRun.slice(1));
            }
        };
        GModel.guide.setGuideBattle(tbl.guideBattle > 0);
        return new Promise<void>((resolve, reject) => {
            this.node.opacity = 255;
            const check = () => {
                GModel.guide.setGuideBattle(tbl.guideBattle > 0);
                const guideNode = cc.find(tbl.point);
                GWindow.guideBtnPath = tbl.point;
                if (tbl.point === "wait") {
                    this.node.getComponent(UIButton).setEnable(false);
                }
                if (tbl.point === "dragFormation") {
                    this.dragGuide();
                }
                if (guideNode) {
                    this.node.getComponent(UIButton).setEnable(false);
                    GWindow.guideBtn = guideNode.getComponent(UIButton) || guideNode.getComponent(UILongTouchButton);
                    this.hand.active = true;
                    const box = guideNode.getBoundingBoxToWorld();
                    this.mask.width = box.width;
                    this.mask.height = box.height;
                    const guideWorldPos = guideNode.convertToWorldSpaceAR(cc.v2());
                    const pos = this.mask.parent.convertToNodeSpaceAR(guideWorldPos);
                    this.mask.setPosition(pos);
                    // this.hand.setPosition(
                    //     pos.x + box.width / 2 + (tbl.hand[0] || 0),
                    //     pos.y - box.height / 2 + (tbl.hand[1] || 0)
                    // );
                    this.hand.setPosition(pos.x + (tbl.hand[0] || 0), pos.y + (tbl.hand[1] || 0));
                }
                if (tbl.complete.every((v) => GModel.guide.predicate[v[0]](...v.slice(1)))) {
                    this.unschedule(check);
                    resolve();
                    afterRun();
                }
            };
            if (tbl.point === "") {
                this.mask.width = 0;
                this.mask.height = 0;
                // this.focus.active = false;
                this.hand.active = false;
                GWindow.guideBtn = this.node.getComponent(UIButton);
                this.node.getComponent(UIButton).setEnable(true);
                this.node.getComponent(UIButton).onClick = () => {
                    resolve();
                    afterRun();
                };
            } else if (tbl.point === "wait") {
                this.node.opacity = 0;
                this.schedule(check, 0.1);
                check();
            } else {
                this.hand.active = false;
                this.mask.width = 0;
                this.mask.height = 0;
                // this.focus.active = true;
                this.schedule(check, 0.1);
                check();
            }
        });
    }

    dragGuide() {
        this.node.getComponent(UIButton).setEnable(false);
        // 拖动上阵引导
        this.hand.active = true;
        this.mask.active = false;
        let beginPos = cc.v2(-285, -536.5);
        let targetPos = cc.v3(-115.5, 161);
        const node1 = cc.find("Canvas/window/WindowMainSceneUI/bottom/equipment/id_formation");
        if (!node1) return;
        const node2 = node1.children[0];
        if (!node2) return;
        beginPos = this.node.convertToNodeSpaceAR(node2.convertToWorldSpaceAR(cc.v2(0, 0)));
        if (!BattleSceneControl.s_instance) return;
        targetPos = this.node.convertToNodeSpaceAR(
            GCamera.mainCamera.getWorldToScreenPoint(BattleSceneControl.s_instance.getGuideScreenPos(0))
        );
        if (!this.hasStartDragGuide) {
            this.hand.x = beginPos.x;
            this.hand.y = beginPos.y;
            this.hasStartDragGuide = true;
            GModel.guide.dragGuide = true;
            cc.tween(this.hand)
                .repeatForever(
                    cc
                        .tween(this.hand)
                        .to(2, { x: targetPos.x, y: targetPos.y }, { easing: "sineOut" })
                        .call(() => {
                            this.hand.x = beginPos.x;
                            this.hand.y = beginPos.y;
                        })
                )
                .start();
        }
    }

    protected onRecycle(): void {
        this.node.stopAllActions();
        this.unscheduleAllCallbacks();
        GModel.guide.setGuideBattle(false);
        GModel.guide.dragGuide = false;
    }
}
