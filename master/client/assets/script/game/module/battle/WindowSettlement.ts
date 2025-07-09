import { autowired, registerClass } from "../../../framework/Decorator";
import IocContainer from "../../../framework/IocContainer";
import UIButton from "../../../framework/ui/UIButton";
import UIImage from "../../../framework/ui/UIImage";
import UILabel from "../../../framework/ui/UILabel";
import UIList from "../../../framework/ui/UIList";
import UIWindow from "../../../framework/ui/UIWindow";
import { WindowOpenAnimationEnum, WindowOpenOption } from "../../../framework/ui/GWindow";
import Item from "../../entity/Item";
import ListItemItem from "../common/ListItemItem";
import WindowCardPool from "../hero/WindowCardPool";
import WindowHero from "../hero/WindowHero";
import WindowCarDetail from "../mainscene/WindowCarDetail";
import WindowKnapsack from "../mainscene/WindowKnapsack";
import ListItemWays from "./ListItemWays";
import UIRichText from "../../../framework/ui/UIRichText";

const { ccclass, property } = cc._decorator;
@registerClass("WindowSettlement")
@ccclass
export default class WindowSettlement extends UIWindow {
    static defaultOpentOption: Partial<WindowOpenOption> = {
        animation: WindowOpenAnimationEnum.default,
    };
    _windowParam: {
        isWin: boolean;
        tower?: boolean;
        reward?: Item[];
        text?: string[][];
    };
    _returnValue: any;
    /**背景 */
    @autowired(UIImage) bg: UIImage = null;
    /**胜利文案 */
    @autowired(UIImage) victory: UIImage = null;
    /**失败文案 */
    @autowired(cc.Node) failed: cc.Node = null;
    /**总结文案 */
    @autowired(UIRichText) conclusion: UIRichText = null;
    /**奖励或提升 */
    @autowired(UILabel) tip: UILabel = null;
    /**点击关闭 */
    @autowired(UILabel) clicktip: UILabel = null;
    /**确定 */
    @autowired(UIButton) confirm: UIButton = null;
    /**下一关 */
    @autowired(UIButton) next: UIButton = null;
    /**提升途径 */
    @autowired(UIList) waytoimprove: UIList<ListItemWays> = null;
    /**掉落列表 */
    @autowired(UIList) droppedList: UIList<ListItemItem> = null;
    protected onInited(): void {
        let closebtn = this.node.getComponent(UIButton);
        closebtn.setTransition(false);
        let animation = this.node.getChildByName("content").getComponent(cc.Animation);
        if (this._windowParam.isWin) {
            this.handleWin();
            animation.play("battlescene_victory_Ani");
            animation.on("stop", () => {
                animation.play("battlescene_victoryLoop_Ani");
            });
        } else {
            this.handleFail();
            animation.play("battlescene_failed_Ani");
        }
    }

    handleWin() {
        this.conclusion.setText(...this._windowParam.text);
        this.tip.setText([GLang.code.ui.getrewards], ["_rs:"]);
        let state = this._windowParam.reward.map((t) => {
            return { item: t, equipment: null, carEquipment: null, status: 0 };
        });
        this.droppedList.setState(state);
        if (this._windowParam.tower) {
            this.clicktip.node.active = false;
            this.next.node.active = GModel.tower.level() % 10 !== 0;
            if (GModel.tower.level() % 10 === 0) this.confirm.node.setPosition(0, this.confirm.node.position.y);
            this.confirm.node.active = true;
            this.next.onClick = () => {
                this.close();
                GModel.tower.challengeTower();
            };
            this.confirm.onClick = () => {
                this.close();
            };
        } else {
            let closebtn = this.node.getComponent(UIButton);
            // this.bg.imgName = "battlescene_victory_bg";
            // this.failed.active = false;
            // this.waytoimprove.node.active = false;
            closebtn.onClick = () => {
                state.map((t) =>
                    GTip.showFlyReward(this.droppedList.node.convertToWorldSpaceAR(cc.v2()), new Item(t.item.id, 10))
                );
                this.close();
            };
        }
    }

    handleFail() {
        let closebtn = this.node.getComponent(UIButton);
        // this.bg.imgName = "battlescene_failed_bg";
        // this.victory.node.active = false;
        // this.droppedList.node.active = false;
        this.conclusion.setText([GLang.code.ui.failed_conclusion]);
        this.tip.setText([GLang.code.ui.improve_power_ways], ["_rs:"]);
        let state = GConstant.waystoimprove.map((t, i) => {
            let label = t.label;
            let img = t.img;
            let cb = () => {
                const tblList = GTable.getList("UIMainSceneTbl").filter((t) => t.position === 3);
                tblList.forEach((tbl) => {
                    // if (tbl.window.length === 0) return;
                    // const cls = IocContainer.get(tbl.window);
                    // if (GWindow.get(cls)) {
                    //     GWindow.close(cls);
                    // }
                    GModel.player.openWindowWithSystemUnlockCheck(tbl);
                });
                switch (i) {
                    case 0:
                        GWindow.open(WindowCardPool);
                        break;
                    case 1:
                        GWindow.open(WindowHero);
                        // GWindow.open(WindowCarDetail);
                        break;
                    case 2:
                        GWindow.open(WindowKnapsack, 1);
                        break;
                    // case 3:
                    //     GWindow.open(WindowCardPool);
                    //     break;
                    // case 4:
                    //     break;

                    default:
                        break;
                }
            };
            return { label, img, cb };
        });
        this.waytoimprove.setState(state);
        closebtn.onClick = () => {
            this.close();
        };
    }
}
