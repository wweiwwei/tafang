import { autowired, registerClass } from "../../../framework/Decorator";
import { WindowOpenAnimationEnum, WindowOpenOption } from "../../../framework/ui/GWindow";
import UIButton from "../../../framework/ui/UIButton";
import UIImage from "../../../framework/ui/UIImage";
import UILabel from "../../../framework/ui/UILabel";
import UIWindow from "../../../framework/ui/UIWindow";

const { ccclass, property } = cc._decorator;
@registerClass("WindowFriendDetail")
@ccclass
export default class WindowFriendDetail extends UIWindow {
    static defaultOpentOption: Partial<WindowOpenOption> = {
        animation: WindowOpenAnimationEnum.default,
    };
    @autowired(UIButton) closeBtn: UIButton = null;
    /**用户名 */
    @autowired(UILabel) userName: UILabel = null;
    /**id */
    @autowired(UILabel) userId: UILabel = null;
    /**战力 */
    @autowired(UILabel) power: UILabel = null;
    /**头像 */
    @autowired(UIImage) avatar: UIImage = null;
    /**切磋 */
    @autowired(UIButton) challenge: UIButton = null;
    /**删除 */
    @autowired(UIButton) delete: UIButton = null;
    /**拉黑 */
    @autowired(UIButton) block: UIButton = null;
    _windowParam: {
        /** 角色头像 */
        roleIcon: number;
        /** 角色名字 */
        roleName: string;
        /** 角色id */
        roleId: number;
        /** 角色战斗力 */
        battlePoint: number;
        /** 角色头像 */
        headFrame: number;
    };
    _returnValue: any;
    protected onInited(): void {
        this.closeBtn.onClick = () => {
            this.close();
        };
        this.challenge.onClick = () => {};
        this.delete.onClick = () => {
            GModel.friend.deleteFriend(this._windowParam.roleId);
        };
        this.block.onClick = () => {};
        this.userName.setText(["_rs" + this._windowParam.roleName]);
        this.userId.setText(["_rs" + this._windowParam.roleId]);
        this.power.setText(["_rs" + this._windowParam.battlePoint]);
        // this.avatar.imgName=
    }
}
