import { autowired, registerClass } from "../../../framework/Decorator";
import UIImage from "../../../framework/ui/UIImage";
import UIList from "../../../framework/ui/UIList";
import UIListItem from "../../../framework/ui/UIListItem";
import Item from "../../entity/Item";
import ListItemYuanBaoItem from "./ListItemYuanBaoItem";
const { ccclass, property } = cc._decorator;
@registerClass("ListItemYuanBaoItem2")
@ccclass
export default class ListItemYuanBaoItem2 extends UIListItem {
    /** */
    @autowired(UIList) uiList: UIList<ListItemYuanBaoItem> = null;

    state: {
        items: { id: number; index: number }[];
    };
    setState(state: this["state"]): void {
        this.state = state;

        this.refItem();
    }

    refItem() {
        this.uiList.setState(this.state.items);
    }
}
