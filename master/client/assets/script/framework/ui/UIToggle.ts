import UIButton from "./UIButton";

const { ccclass, property, menu } = cc._decorator;
@ccclass
@menu("UI/UIToggle")
export default class UIToggle extends UIButton {
    @property(cc.Node) check: cc.Node = null;
    @property(cc.Boolean) private _checked = true;
    @property(cc.Boolean) get checked(): boolean {
        return this._checked;
    }
    set checked(b: boolean) {
        this._checked = b;
        this.check.active = b;
    }

    protected onLoad(): void {
        super.onLoad();
        this.check.active = this.checked;
        this.onClick = (param: string) => {
            this.checked = !this.checked;
            if (this.onToggle) {
                this.onToggle(this.checked, param);
            }
        };
    }
    /** 切换函数 */
    onToggle: (checked: boolean, param: string) => void = null;
}
