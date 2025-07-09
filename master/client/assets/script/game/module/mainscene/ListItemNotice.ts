import { autowired, registerClass } from "../../../framework/Decorator";
import UILabel from "../../../framework/ui/UILabel";
import UIListItem from "../../../framework/ui/UIListItem";
import UIRichText from "../../../framework/ui/UIRichText";

const { ccclass, property } = cc._decorator;
@registerClass("ListItemNotice")
@ccclass
export default class ListItemNotice extends UIListItem {
    @autowired(UILabel) title: UILabel = null;
    @autowired(UIRichText) detail: UIRichText = null;
    state: {
        title: string;
        content: string;
    };
    setState(state: this["state"]): void {
        this.state = state;
        this.title.setText(["_rs" + this.state.title]);
        this.detail.setText(["_rs" + this.state.content]);
    }
}
