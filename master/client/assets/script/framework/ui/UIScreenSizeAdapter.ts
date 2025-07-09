const { ccclass, property, menu } = cc._decorator;
@ccclass
@menu("UI/UIScreenSizeAdapter")
export default class UIScreenSizeAdapter extends cc.Component {
    @property(cc.Boolean) horizontal: boolean = false;
    @property(cc.Boolean) vertical: boolean = false;
    @property(cc.Boolean) always: boolean = false;
    @property(cc.Integer) top: number = 0;
    @property(cc.Integer) bottom: number = 0;
    @property(cc.Integer) left: number = 0;
    @property(cc.Integer) right: number = 0;

    protected onLoad(): void {
        if (CC_EDITOR) return;
        this.adapt();
    }

    protected adapt(): void {
        const winSize = cc.winSize;
        if (this.horizontal) {
            this.node.width = winSize.width - this.left - this.right;
        }
        if (this.vertical) {
            this.node.height = winSize.height - this.top - this.bottom;
        }
    }

    protected update(dt: number): void {
        if (CC_EDITOR) return;
        if (this.always) this.adapt();
    }
}
