// 容器，用于控制反转

export default class IocContainer {
    private static _container: Map<string, any> = new Map<string, any>();
    private static _sceneWindow: any[] = [];

    /** 根据注册名获取类 */
    static get(name: string): any {
        if (!this._container.has(name)) throw new Error(`class not found ${name}`);
        return this._container.get(name);
    }

    /** 注册类到容器中 */
    static set(name: string, value: any, metaInfo: any): void {
        if (this._container.has(name)) throw new Error(`class has already register ${name}`);
        value.__clsName = name;
        value.__metaInfo = metaInfo;
        this._container.set(name, value);
        if (metaInfo.sceneWindow) {
            this._sceneWindow.push(value);
        }
    }

    /** 获取所有场景窗口 */
    static getSceneWindow(): any[] {
        return this._sceneWindow;
    }
}
