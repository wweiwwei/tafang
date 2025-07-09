const { ccclass, property, menu } = cc._decorator;

@ccclass
@menu("UI/UIRichText")
export default class UIRichText extends cc.RichText {
    @property(cc.String)
    private _multiLanguageKey: string = "";
    @property(cc.String)
    get multiLanguageKey(): string {
        return this._multiLanguageKey;
    }
    set multiLanguageKey(v: string) {
        if (v === this._multiLanguageKey) return;
        this._multiLanguageKey = v;
        this.syncText();
    }

    protected onEnable(): void {
        this.syncText();
        super.onEnable();
    }

    syncText() {
        this.string = this._multiLanguageKey
            .split("[key]")
            .map((k) => GLang.getText(k))
            .join("");
    }

    /**
     * 设置文本
     * 参数是一个字符串数组，数组中的每个元素都是一个多语言key，如果前缀为_rs，则该文本会被当作普通字符串处理，不会进行多语言转换，主要用于传入数字。
     * rs的意思是raw string。
     * 例如：["hero/hero1", "_rs50", "_rs1800"]。
     * 上述例子中，如果hero/hero1对应的文本是"升到下一级需要xxx_1宝石和xxx_2金币"，那这个字符串会被显示为"升到下一级需要50宝石和1800金币"。
     *  */
    setText(...keysList: string[][]) {
        this.multiLanguageKey = keysList.map((keys) => keys.join("[sp]")).join("[key]");
    }
}
