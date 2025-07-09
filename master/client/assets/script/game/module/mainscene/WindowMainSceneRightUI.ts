import { autowired, message, registerClass } from "../../../framework/Decorator";
import UIButton from "../../../framework/ui/UIButton";
import UIImage from "../../../framework/ui/UIImage";
import UIList from "../../../framework/ui/UIList";
import UIWindow from "../../../framework/ui/UIWindow";
import EventName from "../../event/EventName";
import ListItemBtn from "../common/ListItemBtn";
import WindowCareer2 from "../mainsceneNew/WindowCareer2";

const { ccclass, property } = cc._decorator;

@registerClass("WindowMainSceneRightUI")
@ccclass
export default class WindowMainSceneRightUI extends UIWindow {
    _windowParam: any;
    _returnValue: any;
    @autowired(cc.Node) avatarNode: cc.Node = null;
    @autowired(UIImage) avatar: UIImage = null;
    @autowired(UIImage) tips: UIImage = null;
    @autowired(UIButton) bg: UIButton = null;
    @autowired(UIButton) avatarBtn: UIButton = null;

    @autowired(cc.Node) mainLeft: cc.Node = null;
    @autowired(cc.Node) LMenu: cc.Node = null;
    @autowired(UIButton) LArrow: UIButton = null;
    @autowired(UIList) LBtnList: UIList<ListItemBtn> = null;
    private action = null;

    protected onInited(): void {
        this.tips.node.active = false;
        // this.node.zIndex = -2;
        this.bg.setTransition(false);
        this.bg.setEnable(false);
        this.bg.onClick = () => {
            this.onLarrow();
        };

        this.LArrow.onClick = () => {
            this.onLarrow();
        };

        this.refreshCollapse();

        this.avatarBtn.onClick = () => {
            GWindow.open(WindowCareer2);
        };

        this.avatar.imgName = "Role_mermaid_head";
    }

    private isPop: boolean = false;

    @message([EventName.hideMainSceneLeftMenuUi])
    hideMainSceneLeftMenuUi(isshow) {
        this.mainLeft.active = isshow;
    }

    onLarrow() {
        this.isPop = !this.isPop;
        let getMoveX = () => {
            return this.isPop ? 139 : 0;
        };

        this.action = cc.moveTo(0.3, cc.v2(getMoveX(), this.mainLeft.y));
        this.mainLeft.runAction(this.action);
        this.LArrow.bg.node.angle = !this.isPop ? -180 : 0;
        this.bg.bg.enabled = !this.isPop ? false : true;
        // this.avatarNode.active = !this.isPop ? false : true;
        this.bg.setEnable(!this.isPop ? false : true);
    }

    @message([EventName.stateKey.email])
    refreshCollapse() {
        let showTips: boolean = false;
        const tblList = GTable.getList("UIMainSceneTbl").filter((t) => t.position === 5);
        const state = tblList.map((t, i) => {
            let tbl = GTable.getById("UIMainSceneTbl", t.id);
            let img = tbl.img;
            let label = tbl.text;
            let show = false;
            switch (t.id) {
                case 1014:
                    // show = GModel.collection.canObtain() || GModel.collection.canUpgrade();
                    break;
                case 1013:
                    show = GModel.email.canObtain();
                    break;

                default:
                    break;
            }
            if (show) {
                showTips = true;
            }
            let cb: () => void;
            cb = async () => {
                GModel.player.openWindowWithSystemUnlockCheck(t);
            };
            return { img, label, id: t.id, cb, show };
        });
        this.LBtnList.setState(state);
        this.tips.node.active = showTips;
    }
}
