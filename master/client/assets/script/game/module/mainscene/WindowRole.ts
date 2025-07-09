import { autowired, message, registerClass } from "../../../framework/Decorator";
import { WindowOpenAnimationEnum, WindowOpenOption } from "../../../framework/ui/GWindow";
import UIButton from "../../../framework/ui/UIButton";
import UIImage from "../../../framework/ui/UIImage";
import UILabel from "../../../framework/ui/UILabel";
import UIList from "../../../framework/ui/UIList";
import UIScrollList from "../../../framework/ui/UIScrollList";
import UIWindow from "../../../framework/ui/UIWindow";
import EventName from "../../event/EventName";
import ListItemItem from "../common/ListItemItem";
import ListItemRoleEquip from "../mainsceneNew/ListItemRoleEquip";
import ListItemRoleMenu from "../mainsceneNew/ListItemRoleMenu";
import ListItemSkill from "../mainsceneNew/ListItemSkill";
import WindowPlayer from "../mainsceneNew/WindowPlayer";
import ListItemEmailItem from "./ListItemEmailItem";

const { ccclass, property } = cc._decorator;
@registerClass("WindowRole", { preloadPrefab: ["ListItemRoleEquip", "ListItemSkill", "ListItemRoleMenu"] })
@ccclass
export default class WindowRole extends UIWindow {
    static defaultOpentOption: Partial<WindowOpenOption> = {
        animation: WindowOpenAnimationEnum.default,
    };
    /**左装备列表 */
    @autowired(UIList) lUiList: UIList<ListItemRoleEquip> = null;
    /**右装备列表 */
    @autowired(UIList) rUiList: UIList<ListItemRoleEquip> = null;
    /**技能列表 */
    @autowired(UIList) skillUiList: UIList<ListItemSkill> = null;
    /**菜单列表 */
    @autowired(UIList) menuUiList: UIList<ListItemRoleMenu> = null;
    /**属性列表 */
    @autowired(cc.Node) attributeNode: cc.Node = null;

    /**职业 */
    @autowired(UILabel) careerLabel: UILabel = null;
    /**等级左边文本 */
    @autowired(UILabel) levelLLabel: UILabel = null;
    /**等级右边文本 */
    @autowired(UILabel) leve2LLabel: UILabel = null;
    /**战力文本 */
    @autowired(UILabel) powerLabel: UILabel = null;
    /**角色 */
    @autowired(cc.Node) menuToggle1: cc.Node = null;
    /**技能 */
    @autowired(cc.Node) menuToggle2: cc.Node = null;
    /**职业 */
    @autowired(cc.Node) menuToggle3: cc.Node = null;

    @autowired(UIButton) closeBtn: UIButton = null;

    @autowired(cc.Node) player: cc.Node = null;
    @autowired(cc.Node) career: cc.Node = null;
    @autowired(UILabel) des: UILabel = null;
    @autowired(UIList) mainSkill: UIList<ListItemSkill> = null;
    @autowired(UIList) passiveSkill: UIList<ListItemSkill> = null;
    @autowired(UIButton) resBtn: UIButton = null;
    @autowired(UIButton) startBtn: UIButton = null;
    @autowired(UIImage) titleBg: UIImage = null;
    @autowired(UILabel) title: UILabel = null;

    _windowParam: { cb?: Function };
    _returnValue: any;
    protected onInited(): void {
        this.closeBtn.onClick = () => {
            if (this._windowParam.cb) this._windowParam.cb();
            this.close();
        };
        this.careerLabel.setText(["_rs刺客"]);
        this.levelLLabel.setText(["_rs220"]);
        this.leve2LLabel.setText(["_rs100/999"]);
        this.powerLabel.setText(["_rs999999"]);

        for (let i = 0; i < this.attributeNode.children.length; i++) {
            this.attributeNode.children[i].children[0].getComponent(UILabel).setText(["_rs技能:"]);
            this.attributeNode.children[i].children[1].getComponent(UILabel).setText(["_rs888"]);
        }
        this.menuToggle1.on(cc.Node.EventType.TOUCH_END, () => {
            this.player.active = true;
            this.career.active = false;
            this.title.setText([GLang.code.ui.role]);
        });
        this.menuToggle2.on(cc.Node.EventType.TOUCH_END, () => {
            GWindow.open(WindowPlayer, { status: 0 });
        });
        this.menuToggle3.on(cc.Node.EventType.TOUCH_END, () => {
            this.player.active = false;
            this.career.active = true;
            this.title.setText([GLang.code.ui.career]);
        });
    }

    refLUilist() {
        let a = [];
        for (let i = 0; i < 4; i++) {
            a.push({ playerEquipment: null });
        }
        this.lUiList.setState(a);
    }
    refRUiList() {
        let a = [];
        for (let i = 0; i < 4; i++) {
            a.push({ playerEquipment: null });
        }
        this.lUiList.setState(a);
    }
    refSkillUiList() {
        let a = [];
        for (let i = 0; i < 4; i++) {
            a.push({ status: 1, id: 0, cb: () => {}, chosen: false });
        }
        this.lUiList.setState(a);
    }
    refMenuUiList() {
        let a = [];
        for (let i = 0; i < 4; i++) {
            a.push({ status: 1, id: 0, cb: () => {}, chosen: false });
        }
        this.lUiList.setState(a);
    }
}
