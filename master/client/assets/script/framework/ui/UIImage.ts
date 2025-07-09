import ResourceLoader from "../ResourceLoader";

const { ccclass, property, menu } = cc._decorator;

if (CC_EDITOR) {
    const spriteSet = Object.getOwnPropertyDescriptor(cc.Sprite.prototype, "spriteFrame").set;
    Object.defineProperty(cc.Sprite.prototype, "spriteFrame", {
        //@ts-ignore
        set(v, force) {
            if (v) this.imgName = v.name;
            spriteSet.call(this, v, force);
        },
    });
}

@ccclass
@menu("UI/UIImage")
export default class UIImage extends cc.Sprite {
    @property(cc.String)
    private _imgName: string = "";
    @property(cc.String)
    get imgName(): string {
        return this._imgName;
    }
    @property(cc.Integer)
    private _fixHeight: number = 0;
    @property(cc.Integer)
    get fixHeight(): number {
        return this._fixHeight;
    }
    set fixHeight(v: number) {
        if (v === this._fixHeight) return;
        this._fixHeight = v;
        this.syncSize();
    }
    @property(cc.Integer)
    private _fixWidth: number = 0;
    @property(cc.Integer)
    get fixWidth(): number {
        return this._fixWidth;
    }
    set fixWidth(v: number) {
        if (v === this._fixWidth) return;
        this._fixWidth = v;
        this.syncSize();
    }
    set imgName(v: string) {
        if (v === this._imgName) return;
        this._imgName = v;
        this.syncImg();
    }

    protected onEnable(): void {
        this.syncImg();
        super.onEnable();
    }

    private syncSize() {
        if (!this.spriteFrame) return;
        if (this._fixWidth <= 0 && this._fixHeight <= 0) return;
        if (this._fixHeight > 0) {
            this.node.scale = this._fixHeight / this.spriteFrame.getOriginalSize().height;
        }
        if (this._fixWidth > 0) {
            this.node.scale = this._fixWidth / this.spriteFrame.getOriginalSize().width;
        }
    }

    syncImg() {
        if (CC_EDITOR) {
            const resNotFound = () => {
                // @ts-ignore
                return !EditorAssetIndex.imageNameToAtlas[this._imgName];
            };
            if (this.spriteFrame == null && this._imgName !== "" && resNotFound()) {
                cc.error(
                    "UIImage load img error imageName:" + this._imgName,
                    "node path:",
                    GUtils.ui.getNodeFullPath(this.node)
                );
            }
            if (this.spriteFrame && this.spriteFrame.name !== this._imgName) {
                cc.error(
                    "UIImage name not match imagName:" + this._imgName,
                    "node path:",
                    GUtils.ui.getNodeFullPath(this.node)
                );
            }
            return;
        }
        if (this._imgName === "" || this._imgName == null) {
            this.spriteFrame = null;
            return;
        }
        if (this.spriteFrame && this.spriteFrame.name === this._imgName) return;
        ResourceLoader.loadImageByAtlas(this._imgName)
            .then((sp) => {
                if (cc.isValid(this.node, true)) {
                    this.spriteFrame = sp;
                    this.syncSize();
                }
            })
            .catch((err) => {
                cc.error(
                    "UIImage load img error imagName:" + this._imgName,
                    "node path:",
                    GUtils.ui.getNodeFullPath(this.node)
                );
                throw err;
            });
    }
}
