import UILabel from "../ui/UILabel";

export default class LangHelper {
    private _data: any = {};
    private _curData: any = {};
    private _code: string = "zh_chs";

    /** 语言的KEY */
    code: LangkeyTip;

    constructor() {
        // 代理
        const p1: any = new Proxy(
            {},
            {
                get: (target, path1, receiver) => {
                    const p2 = new Proxy(
                        {},
                        {
                            get: (target, path2, receiver) => {
                                // @ts-ignore
                                return `${path1}/${path2}`;
                            },
                        }
                    );
                    return p2;
                },
            }
        );
        this.code = p1;
    }

    setData(data: any) {
        this._data = data;
        this._curData = data[this._code];
    }

    setCode(code: string) {
        this._code = code;
        this._curData = this._data[code];
        this.refreshScene();
    }

    refreshScene() {
        try {
            GLog.info("lang change, refresh scene, code: " + this._code);
            const f = (n: cc.Node) => {
                const l = n.getComponent(UILabel);
                if (l) l.syncText();
                n.children.forEach(f);
            };
            cc.director.getScene().children.forEach(f);
        } catch (e) {}
    }

    getText(key: string) {
        const keyList = key.split("[sp]");
        if (keyList.length > 1) {
            const mainKey = keyList[0];
            let mainText = this._getText(mainKey);
            for (let i = 1; i < keyList.length; i++) {
                const subKey = keyList[i];
                const subText = this._getText(subKey);
                mainText = mainText.replace("xxx_" + i, subText);
            }
            return mainText;
        } else {
            return this._getText(key);
        }
    }

    private _getText(key: string) {
        if (key.startsWith("_rs")) return key.slice(3);
        try {
            if (CC_EDITOR) {
                //@ts-ignore
                return EditorLang[this._code][key];
            } else {
                return this._curData[key];
            }
        } catch (e) {
            cc.error("lang key not found: " + key);
        }
    }
}

window["GLang"] = new LangHelper();
declare global {
    /** 语言管理类 */
    const GLang: LangHelper;
}
