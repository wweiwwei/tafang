export class BattleBulletBuilder {
    _img: string = "";
    /** 子弹的图像是什么，可以填写spine名或图片名 */
    img(img: string): this {
        this._img = img;
        return this;
    }

    _scale: number = 1;
    /** 缩放比例 */
    scale(s: number): this {
        this._scale = s;
        return this;
    }
    _skin: string = "default";
    /** 皮肤 */
    skin(s: string): this {
        this._skin = s;
        return this;
    }

    _animation: string = "general_tail";
    /** 动画 */
    animation(s: string): this {
        this._animation = s;
        return this;
    }
}
