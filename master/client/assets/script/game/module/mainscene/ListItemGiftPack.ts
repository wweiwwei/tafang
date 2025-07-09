import { registerClass } from "../../../framework/Decorator";
import UIListItem from "../../../framework/ui/UIListItem";

const { ccclass, property } = cc._decorator;

@registerClass("ListItemGiftPack")
@ccclass
export default class ListItemGiftPack extends UIListItem {
    state: any;
    setState(state: this["state"]): void {
        throw new Error("Method not implemented.");
    }
    protected onInited(): void {
        console.log("listItemGiftPack init");
    }
}
