import { autowired, registerClass } from "../../../framework/Decorator";
import { WindowOpenAnimationEnum, WindowOpenOption } from "../../../framework/ui/GWindow";
import UIButton from "../../../framework/ui/UIButton";
import UIList from "../../../framework/ui/UIList";
import UIWindow from "../../../framework/ui/UIWindow";
import WindowCommonTip from "../common/WindowCommonTip";

import ListItemServerSelect from "./ListItemServerSelect";
import ListItemServerSelectArea from "./ListItemServerSelectArea";

const { ccclass, property } = cc._decorator;

@registerClass("WindowServerSelect")
@ccclass
export default class WindowServerSelect extends UIWindow {
    static defaultOpentOption: Partial<WindowOpenOption> = {
        animation: WindowOpenAnimationEnum.default,
    };
    _windowParam: { changeMode: boolean };
    _returnValue: { serverCode: string } = { serverCode: "" };

    @autowired(UIList) serverList: UIList<ListItemServerSelect> = null;
    @autowired(UIButton) loginBtn: UIButton = null;
    @autowired(UIList) areaList: UIList<ListItemServerSelectArea> = null;
    @autowired(UIButton) closeBtn: UIButton = null;

    private area = 0;
    private serverData: {
        list: {
            group: string;
            data: {
                /** 服务器名 */
                serverName: string;
                /** 服务器状态 */
                serverState: number;
                /** 服务器id */
                serverCode: string;
                /** 服务器分组 */
                serverGroup: string;
            }[];
        }[];
    };
    protected async onInited() {
        const data = await HttpServer.request("game/serverList", {});
        this.serverData = data;
        this.loginBtn.onClick = this.onLoginClick.bind(this);
        this.closeBtn.onClick = () => {
            this.close();
        };
        this.selectArea();
    }

    refresh() {
        this.serverList.setState(
            this.serverData.list[this.area].data.map((data) => {
                return {
                    ...data,
                    cb: () => {
                        this._returnValue.serverCode = data.serverCode;
                        this.refresh();
                    },
                    checked: data.serverCode === this._returnValue.serverCode,
                };
            })
        );
    }

    selectArea() {
        const state = this.serverData.list
            .map((d) => d.group)
            .map((data, i) => {
                return {
                    text: data,
                    cb: () => {
                        this.area = i;
                        this.selectArea();
                    },
                    checked: i === this.area,
                };
            });
        this.areaList.setState(state);
        this.refresh();
    }

    async onLoginClick() {
        if (this._returnValue.serverCode.length === 0) {
            GTip.showTip(["_rs请选择服务器"]);
            return;
        }
        if (this._windowParam.changeMode) {
            const { ok } = await HttpServer.request("game/changeServer", { serverCode: this._returnValue.serverCode });
            if (ok) {
                await GWindow.open(WindowCommonTip, { tip: ["_rs切换成功，游戏即将重启"] });
                GUtils.game.restart();
            } else {
                GTip.showTip(["_rs切换失败"]);
            }
        } else {
            this.close();
        }
    }
}
