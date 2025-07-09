import { autowired, registerClass } from "../../../framework/Decorator";
import UIButton from "../../../framework/ui/UIButton";
import UIList from "../../../framework/ui/UIList";
import UIToggle from "../../../framework/ui/UIToggle";

import UIWindow from "../../../framework/ui/UIWindow";
import PlatformConfig from "../../config/PlatformConfig";
import ListItemGMServerSelect from "./ListItemGMServerSelect";

const { ccclass, property } = cc._decorator;

@registerClass("WindowGMLogin")
@ccclass
export default class WindowGMLogin extends UIWindow {
    _windowParam: null = null;
    _returnValue: { sdkChannel: string; sdkUid: string; sdkExtra: string };

    @autowired(cc.EditBox) accountEditBox: cc.EditBox = null;
    @autowired(UIList) serverList: UIList<ListItemGMServerSelect> = null;
    @autowired(UIButton) loginBtn: UIButton = null;
    @autowired(UIToggle) skipGuide: UIToggle = null;
    @autowired(UIToggle) testPreload: UIToggle = null;
    @autowired(UIToggle) loginServerSelect: UIToggle = null;
    @autowired(UIToggle) unlockAllSystem: UIToggle = null;
    @autowired(cc.Node) testOption: cc.Node = null;
    @autowired(UIToggle) logVerbose: UIToggle = null;
    @autowired(UIToggle) logDebug: UIToggle = null;
    @autowired(UIToggle) logInfo: UIToggle = null;

    protected onInjected(): void {
        const state = Object.keys(HttpServer.serverMap).map((k) => {
            return {
                serverName: k,
                cb: () => {
                    PlatformConfig.serverCode = k;
                    GTip.showTip([`_rs切换服务器成功，当前服务器：${k}`]);
                },
            };
        });
        this.serverList.setState(state);
        this.loginBtn.onClick = this.onLoginClick.bind(this);
        if (GModel.localStorage.browserAccount) {
            this.accountEditBox.string = GModel.localStorage.browserAccount;
        }
        this.serverList.node.active = CC_PREVIEW;
        this.testOption.active = CC_PREVIEW;
    }

    protected onInited(): void {
        this.skipGuide.checked = GModel.localStorage.skipGuide;
        this.skipGuide.onToggle = (checked) => {
            GModel.localStorage.skipGuide = checked;
        };
        this.skipGuide.setTransition(false);
        this.testPreload.checked = GModel.localStorage.testPreload;
        this.testPreload.onToggle = (checked) => {
            GModel.localStorage.testPreload = checked;
        };
        this.testPreload.setTransition(false);
        this.loginServerSelect.checked = GModel.localStorage.loginServerSelect;
        this.loginServerSelect.onToggle = (checked) => {
            GModel.localStorage.loginServerSelect = checked;
        };
        this.loginServerSelect.setTransition(false);
        this.unlockAllSystem.checked = GModel.localStorage.unlockAllSystem;
        this.unlockAllSystem.onToggle = (checked) => {
            GModel.localStorage.unlockAllSystem = checked;
        };
        this.unlockAllSystem.setTransition(false);
        if (CC_PREVIEW) {
            if (!GModel.localStorage.logLevel) {
                GModel.localStorage.logLevel = 4;
            }
            GLog.logLevel = GModel.localStorage.logLevel;
            this.refreshLogLevel();
            this.logVerbose.onToggle = (checked) => {
                GLog.logLevel = 5;
                GModel.localStorage.logLevel = 5;
                this.refreshLogLevel();
            };
            this.logDebug.onToggle = (checked) => {
                GLog.logLevel = 4;
                GModel.localStorage.logLevel = 4;
                this.refreshLogLevel();
            };
            this.logInfo.onToggle = (checked) => {
                GLog.logLevel = 3;
                GModel.localStorage.logLevel = 3;
                this.refreshLogLevel();
            };
        }
    }

    refreshLogLevel() {
        this.logVerbose.checked = GLog.logLevel === 5;
        this.logDebug.checked = GLog.logLevel === 4;
        this.logInfo.checked = GLog.logLevel == 3;
        this.logVerbose.setTransition(false);
        this.logDebug.setTransition(false);
        this.logInfo.setTransition(false);
    }

    onLoginClick() {
        console.log("onLoginClick");
        const account = this.accountEditBox.string;
        if (!account) {
            GTip.showTip(["_rs账号不能为空"]);
            return;
        }
        GModel.localStorage.browserAccount = account;
        const sdkChannel = "BrowserTest";
        const sdkUid = account;
        const sdkExtra = account;
        this._returnValue = { sdkChannel, sdkUid, sdkExtra };
        this.close();
    }
}
