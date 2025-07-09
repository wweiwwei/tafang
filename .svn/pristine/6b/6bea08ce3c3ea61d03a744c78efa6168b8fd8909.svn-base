import { autowired, message, registerClass } from "../../../framework/Decorator";
import UILabel from "../../../framework/ui/UILabel";
import UIWindow from "../../../framework/ui/UIWindow";
import PlatformConfig from "../../config/PlatformConfig";
import EventName from "../../event/EventName";

const { ccclass, property } = cc._decorator;

@registerClass("WindowLoadScene")
@ccclass
export default class WindowLoadScene extends UIWindow {
    _windowParam: any;
    _returnValue: any;

    /** 进度条提示 */
    @autowired(UILabel) tip: UILabel = null;
    /** 进度条 */
    @autowired(cc.ProgressBar) progress: cc.ProgressBar = null;
    /** 版本号 */
    @autowired(UILabel) version: UILabel = null;
    @autowired(UILabel) userId: UILabel = null;

    protected onInited(): void {
        this.node.zIndex = -1;
        this.version.setText([`_rsv${PlatformConfig.version}`]);
        this.tip.setText([`_rs`]);
        this.progress.progress = 0;
        this.progress.node.active = false;
        this.refreshUserId();
    }

    @message([EventName.refreshUserId])
    refreshUserId() {
        if (!HttpServer.roleId) {
            this.userId.setText(["_rsAccountId:" + (HttpServer.playerInfo.playerId || "")]);
        } else {
            this.userId.setText(["_rsUserId:" + (HttpServer.roleId || "")]);
        }
    }

    /** 设置进度条 */
    @message([EventName.setLoadProgress])
    setProgress(tip: string[], progress: number): void {
        this.progress.node.active = true;
        this.tip.setText(tip);
        this.progress.progress = progress;
    }

    hideProgress(): void {
        this.progress.node.active = false;
        this.tip.setText([`_rs`]);
    }
}
