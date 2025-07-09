import { autowired, message, registerClass } from "../../../framework/Decorator";
import { WindowOpenAnimationEnum, WindowOpenOption } from "../../../framework/ui/GWindow";
import UIButton from "../../../framework/ui/UIButton";
import UIEditBox from "../../../framework/ui/UIEditBox";
import UIImage from "../../../framework/ui/UIImage";
import UILabel from "../../../framework/ui/UILabel";
import UIScrollList from "../../../framework/ui/UIScrollList";
import UIWindow from "../../../framework/ui/UIWindow";
import EventName from "../../event/EventName";
import ListItemUserInfoItem from "../common/ListItemUserInfoItem";
import WindowSetPlayerName from "./WindowSetPlayerName";

const { ccclass, property } = cc._decorator;
@registerClass("WindowSetPlayerInfo")
@ccclass
export default class WindowSetPlayerInfo extends UIWindow {
    static defaultOpentOption: Partial<WindowOpenOption> = {
        animation: WindowOpenAnimationEnum.default,
    };
    @autowired(UIButton) closeBtn: UIButton = null;
    @autowired(UIScrollList) list: UIScrollList<ListItemUserInfoItem> = null;

    /**头像 */
    @autowired(UIImage) avatar: UIImage = null;
    /**输入文本 */
    @autowired(UILabel) userName: UILabel = null;
    /**设置名字 */
    @autowired(UIButton) setNameBtn: UIButton = null;
    /**使用 */
    @autowired(UIButton) useBtn: UIButton = null;

    private switchIconId: number = null;

    _windowParam: { closeCB: Function };
    _returnValue: any;
    protected onInited(): void {
        this.refIcon();
        this.closeBtn.onClick = () => {
            this.close();
            if (this._windowParam.closeCB) this._windowParam.closeCB();
        };

        this.setNameBtn.onClick = () => {
            GWindow.open(WindowSetPlayerName);
        };
        this.useBtn.onClick = () => {
            if (this.switchIconId == null) {
                GTip.showTip([GLang.code.ui.setPlayerInfoNoSwitch]);
                return;
            }
            GModel.player.changeRoleIcon(this.switchIconId);
            // this.refIcon();
        };
        this.refIcon();
        this.refName();
        this.refList();
    }

    switchIcon(id: number, roleIcon: number) {
        if (!GModel.player.hasIcon(id)) {
            GTip.showTip(["未拥有"]);
            return;
        }
        this.previewIcon(roleIcon);
        this.switchIconId = id;
        this.refList();
    }

    @message([EventName.refreshUserInfo])
    refIcon() {
        this.avatar.imgName = GTable.getById("HeroTbl", HttpServer.roleIcon).img + "_head";
    }

    @message([EventName.refreshUserInfo])
    refName() {
        this.userName.setText(["_rs" + HttpServer.roleName]);
    }

    refList() {
        const list = GTable.getList("HeroTbl");

        let data: {
            roleId: number;
            roleIcon: number;
            roleName: string;
            isClick: boolean;
            isShowMask: boolean;
            isSingleHead: boolean;
            switchRoleId: number;
            clickCB?: Function;
        }[] = [];
        list.forEach((element) => {
            data.push({
                roleId: element.id,
                roleIcon: element.id,
                roleName: element.name,
                isClick: true,
                switchRoleId: this.switchIconId,
                isShowMask: !GModel.player.hasIcon(element.id),
                isSingleHead: true,
                clickCB: (id: number, roleIcon: number) => {
                    this.switchIcon(id, roleIcon);
                },
            });
        });
        this.list.setState(data);
    }

    /**预览头像 */
    previewIcon(roleIcon: number) {
        this.avatar.imgName = GTable.getById("HeroTbl", roleIcon).img + "_head";
    }
}
