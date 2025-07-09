import { autowired, message, registerClass } from "../../../framework/Decorator";
import UIButton from "../../../framework/ui/UIButton";
import UILabel from "../../../framework/ui/UILabel";
import UIList from "../../../framework/ui/UIList";
import UILongTouchButton from "../../../framework/ui/UILongTouchButton";
import UISpine from "../../../framework/ui/UISpine";
import UIWindow from "../../../framework/ui/UIWindow";
import ListItemDialogue from "./ListItemDialogue";
const { ccclass, property } = cc._decorator;
@registerClass("WindowDialogue")
@ccclass
export default class WindowDialogue extends UIWindow {
    _windowParam: {
        id: number;
    };
    _returnValue: any;

    @autowired(UISpine) role1: UISpine = null;
    @autowired(UISpine) role2: UISpine = null;
    @autowired(UIList) dialogueList: UIList<ListItemDialogue> = null;

    protected onInited(): void {
        this.node.zIndex = 3;
        this.node.getComponent(UIButton).setTransition(false);
        this.dialogueInit();
    }

    dialogueInit() {
        const list = GTable.getList("DialogueContentTbl").filter((t) => t.dialogueId === this._windowParam.id);
        const leftTbl = list.find((t) => t.rolePos == 1);
        if (leftTbl) {
            this.role1.node.active = true;
            this.role1.setSpine(leftTbl.role, "default", "idle");
        } else {
            this.role1.node.active = false;
        }
        const rightTbl = list.find((t) => t.rolePos == 2);
        if (rightTbl) {
            this.role2.node.active = true;
            this.role2.setSpine(rightTbl.role, "default", "idle");
        } else {
            this.role2.node.active = false;
        }
        this.node.getComponent(cc.Button).enabled = true;
        let index = 0;
        this.dialogueList.setState(list.filter((t, i) => i <= index).map((t) => ({ id: t.id })));
        this.node.getComponent(UIButton).onClick = () => {
            index++;
            GSDK.report({
                kind: "dialogue",
                data: {
                    id: list[index - 1].id,
                },
            });
            if (index < list.length) {
                this.dialogueList.setState(list.filter((t, i) => i <= index).map((t) => ({ id: t.id })));
            } else {
                this.close();
            }
        };
    }

    protected onRecycle(): void {
        this.node.stopAllActions();
    }
}
