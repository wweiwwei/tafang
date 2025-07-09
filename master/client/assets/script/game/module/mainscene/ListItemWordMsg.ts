import { autowired, registerClass } from "../../../framework/Decorator";
import UIList from "../../../framework/ui/UIList";
import UIListItem from "../../../framework/ui/UIListItem";
import { FriendInfo } from "../../entity/FriendInfo";
import { PlayerChatMessage } from "../../entity/PlayerChatMessage";
import ListItemSingleChat from "./ListItemSingleChat";
import ListItemVideoChat from "./ListItemVideoChat";

const { ccclass, property } = cc._decorator;
@registerClass("ListItemWordMsg")
@ccclass
export default class ListItemWordMsg extends UIListItem {
    @autowired(UIList) uiList: UIList<ListItemVideoChat | ListItemSingleChat> = null;
    state: {
        lastTime: number;
        scriptName: string;
        headClickCB: Function;
        msg: { data: PlayerChatMessage; info: FriendInfo };
        endCB: Function;
    };
    setState(state: this["state"]): void {
        this.state = state;
        this.uiList.itemName = state.scriptName;
        let arr = [];
        if (this.uiList.itemName == "ListItemSingleChat") {
            arr.push({
                lastTime: this.state.lastTime,
                info: this.state.msg,
                headClickCB: (id: number, name: string) => {
                    if (this.state.headClickCB) this.state.headClickCB(id, name);
                },
                endCB: () => {
                    this.state.endCB();
                },
            });
        } else if (this.uiList.itemName == "ListItemVideoChat") {
            arr.push({
                lastTime: this.state.lastTime,
                info: this.state.msg,
                headClickCB: (id: number, name: string) => {
                    if (this.state.headClickCB) this.state.headClickCB(id, name);
                },
                endCB: () => {
                    this.state.endCB();
                },
            });
        }
        this.uiList.setState(arr);
    }
}
