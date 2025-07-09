const { ccclass, property, menu } = cc._decorator;
@ccclass
@menu("UI/UIScreenPositionAdapter")
export default class UIScreenPositionAdapter extends cc.Component {
    @property(cc.Boolean)
    private _enableTop: boolean = false;
    @property(cc.Boolean)
    get enableTop(): boolean {
        return this._enableTop;
    }
    set enableTop(v: boolean) {
        this._enableTop = v;
        if (v) {
            this.enableBottom = false;
            if (CC_EDITOR) {
                this._top = GConstant.designSize.height / 2 - this.node.y;
            }
        }
    }
    @property(cc.Boolean)
    private _enableBottom: boolean = false;
    @property(cc.Boolean)
    get enableBottom(): boolean {
        return this._enableBottom;
    }
    set enableBottom(v: boolean) {
        this._enableBottom = v;
        if (v) {
            this.enableTop = false;
            if (CC_EDITOR) {
                this._bottom = this.node.y + GConstant.designSize.height / 2;
            }
        }
    }
    @property(cc.Boolean)
    private _enableLeft: boolean = false;
    @property(cc.Boolean)
    get enableLeft(): boolean {
        return this._enableLeft;
    }
    set enableLeft(v: boolean) {
        this._enableLeft = v;
        if (v) {
            this.enableRight = false;
            if (CC_EDITOR) {
                this._left = -GConstant.designSize.width / 2 - this.node.x;
            }
        }
    }
    @property(cc.Boolean)
    private _enableRight: boolean = false;
    @property(cc.Boolean)
    get enableRight(): boolean {
        return this._enableRight;
    }
    set enableRight(v: boolean) {
        this._enableRight = v;
        if (v) {
            this.enableLeft = false;
            if (CC_EDITOR) {
                this._right = GConstant.designSize.width / 2 - this.node.x;
            }
        }
    }
    @property(cc.Boolean) always: boolean = false;
    @property(cc.Integer)
    private _top: number = 0;
    @property(cc.Integer)
    get top(): number {
        return this._top;
    }
    set top(v: number) {
        this._top = v;
        if (this.enableTop) {
            this.adapt();
        }
    }
    @property(cc.Integer)
    private _bottom: number = 0;
    @property(cc.Integer)
    get bottom(): number {
        return this._bottom;
    }
    set bottom(v: number) {
        this._bottom = v;
        if (this.enableBottom) {
            this.adapt();
        }
    }
    @property(cc.Integer)
    private _left: number = 0;
    @property(cc.Integer)
    get left(): number {
        return this._left;
    }
    set left(v: number) {
        this._left = v;
        if (this.enableLeft) {
            this.adapt();
        }
    }
    @property(cc.Integer)
    private _right: number = 0;
    @property(cc.Integer)
    get right(): number {
        return this._right;
    }
    set right(v: number) {
        this._right = v;
        if (this.enableRight) {
            this.adapt();
        }
    }

    protected onLoad(): void {
        if (CC_EDITOR) return;
        this.adapt();
    }

    protected adapt(): void {
        const winSize = CC_EDITOR ? GConstant.designSize : cc.winSize;
        if (this.enableTop) {
            this.node.y = winSize.height / 2 - this.top;
        } else if (this.enableBottom) {
            this.node.y = -winSize.height / 2 + this.bottom;
        }
        if (this.enableLeft) {
            this.node.x = -winSize.width / 2 + this.left;
        } else if (this.enableRight) {
            this.node.x = winSize.width / 2 - this.right;
        }
    }

    protected update(dt: number): void {
        if (CC_EDITOR) return;
        if (this.always) this.adapt();
    }
}
