import EventName from "../../game/event/EventName";
import IocContainer from "../IocContainer";
import ResourceLoader from "../ResourceLoader";
import EventBus from "../event/EventBus";
import UIButton from "./UIButton";
import UILongTouchButton from "./UILongTouchButton";
import UIWindow from "./UIWindow";

export type WindowOpenOption = {
    /** 开关窗口的过渡动画 */
    animation: ValueOf<typeof WindowOpenAnimationEnum>;
    /** 打开该窗口时是否可以不渲染主场景(减少draw call) */
    hideMainScene?: boolean;
};

export type WindowListener = {
    onShown?: Function;
};

export const WindowOpenAnimationEnum = {
    /** 无过渡 */
    no: "no",
    slide: "slide",
    /** 默认缩放过渡 */
    default: "default",
} as const;

class BlockHelper {
    private openingWindowCount = 0;
    private closingWindowCount = 0;

    addOpeningWindowCount() {
        this.openingWindowCount++;
        this.refreshInputBlock();
    }

    addClosingWindowCount() {
        this.closingWindowCount++;
        this.refreshInputBlock();
    }

    subOpeningWindowCount() {
        this.openingWindowCount--;
        this.refreshInputBlock();
    }

    subClosingWindowCount() {
        this.closingWindowCount--;
        this.refreshInputBlock();
    }

    private refreshInputBlock() {
        if (this.openingWindowCount === 0 && this.closingWindowCount === 0) {
            cc.find("Canvas/inputBlock").active = false;
        } else {
            cc.find("Canvas/inputBlock").active = true;
        }
    }
}

export default class WindowHelper {
    private _windowMap: Map<typeof UIWindow, { node: cc.Node; resolve: Function; isClosing: boolean }> = new Map();

    private closeWaitCallBack: Function = null;
    private blockHelper = new BlockHelper();
    /** 清除所有窗口 */
    clear(): Promise<void> {
        return new Promise((resolve, reject) => {
            if (this._windowMap.size === 0) resolve();
            this._windowMap.forEach((value, key) => {
                if (!value.isClosing) this.close(key);
            });
            this.closeWaitCallBack = () => {
                if (this._windowMap.size === 0) {
                    this.closeWaitCallBack = null;
                    resolve();
                }
            };
        });
    }

    openByName(name: string, param?: any, openOption?: any, WindowListener?: WindowListener) {
        return this.open(IocContainer.get(name), param, openOption, WindowListener);
    }

    currentScene: "load" | "battle" | "main" = "load";
    inBattle = false;

    /** 开启窗口 */
    open<WindowType extends typeof UIWindow>(
        cls: WindowType,
        param?: WindowType["prototype"]["_windowParam"],
        openOption?: Partial<WindowOpenOption>,
        WindowListener?: WindowListener
    ): Promise<WindowType["prototype"]["_returnValue"]> {
        return new Promise(async (resolve, reject) => {
            if (this._windowMap.has(cls)) {
                reject("window already opened");
                return;
            }
            if (cls["__clsName"] === "WindowBattleScene") {
                this.inBattle = true;
            }
            this.blockHelper.addOpeningWindowCount();
            if (!param) param = {};
            if (cls["__metaInfo"].preloadPrefab) {
                await Promise.all(cls["__metaInfo"].preloadPrefab.map((name) => ResourceLoader.preloadPrefab(name)));
            }
            const comp = await ResourceLoader.getNode(cls, { _windowParam: param });
            EventBus.emit(EventName.windowOpen, comp);
            const node = comp.node;
            if (openOption) {
                comp._openOption = {
                    ...UIWindow.defaultOpentOption,
                    ...cls.defaultOpentOption,
                    ...openOption,
                } as WindowOpenOption;
            } else {
                comp._openOption = {
                    ...UIWindow.defaultOpentOption,
                    ...cls.defaultOpentOption,
                } as WindowOpenOption;
            }
            this._windowMap.set(cls, { node, resolve, isClosing: false });
            // todo 是否要加入层级配置？
            cc.find("Canvas/window").addChild(node);
            GAudio.playEffect("open");
            comp.show().then(() => {
                // 隐藏主场景处理
                if (comp._openOption.hideMainScene) {
                    this.addHideMainSceneCount();
                }
                comp.onShown();
                if (WindowListener && WindowListener.onShown) {
                    WindowListener.onShown();
                }
                EventBus.emit(EventName.windowHasOpened, comp);
                this.blockHelper.subOpeningWindowCount();
            });
        });
    }

    closeByName(name: string) {
        return this.close(IocContainer.get(name));
    }

    /** 关闭窗口 */
    close<WindowType extends typeof UIWindow>(cls: WindowType): Promise<WindowType["prototype"]["_returnValue"]> {
        return new Promise((resolve, reject) => {
            if (!this._windowMap.has(cls)) {
                reject("window not opened");
                return;
            }
            if (this._windowMap.get(cls).isClosing) {
                reject("window is closing");
                return;
            }
            if (cls["__clsName"] === "WindowBattleScene") {
                this.inBattle = false;
            }
            this.blockHelper.addClosingWindowCount();
            const node = this._windowMap.get(cls).node;
            const comp = node.getComponent(cls);
            EventBus.emit(EventName.windowClose, comp);
            this._windowMap.get(cls).isClosing = true;
            GAudio.playEffect("close");
            if (comp._openOption.hideMainScene) {
                this.subHideMainSceneCount();
            }
            comp.hide().then(() => {
                const resolveFunc = this._windowMap.get(cls).resolve;
                this._windowMap.delete(cls);
                comp.recycle();
                EventBus.emit(EventName.windowHasClosed, comp);
                if (resolveFunc) {
                    resolveFunc(comp._returnValue);
                }
                resolve(comp._returnValue);
                if (this.closeWaitCallBack) {
                    this.closeWaitCallBack();
                }
                this.blockHelper.subClosingWindowCount();
            });
        });
    }

    /** 获取窗口，如果窗口未开启或者正在关闭，返回null */
    get<WindowType extends typeof UIWindow>(cls: WindowType): WindowType["prototype"] {
        if (!this._windowMap.has(cls)) {
            return null;
        }
        if (this._windowMap.get(cls).isClosing) {
            return null;
        }
        const node = this._windowMap.get(cls).node;
        const comp = node.getComponent(cls);
        return comp;
    }

    /** 隐藏窗口 */
    hide<WindowType extends typeof UIWindow>(cls: WindowType) {
        if (this.get(cls)) this.get(cls).node.active = false;
    }

    /** 显示窗口 */
    show<WindowType extends typeof UIWindow>(cls: WindowType) {
        if (this.get(cls)) this.get(cls).node.active = true;
    }

    getByName(name: string) {
        return this.get(IocContainer.get(name));
    }

    /** 增加遮罩计数器 */
    addBlock() {
        this.blockHelper.addOpeningWindowCount();
    }

    /** 减少遮罩计数器 */
    subBlock() {
        this.blockHelper.subOpeningWindowCount();
    }

    /** 关闭除了指定窗口以外的窗口，不会影响场景窗口 */
    closeAll(excludeList: (typeof UIWindow)[]) {
        const list = IocContainer.getSceneWindow();
        const ex = list.concat(excludeList);
        this._windowMap.forEach((value, key) => {
            if (ex.indexOf(key) === -1) {
                this.close(key);
            }
        });
    }

    /** 是否有除了场景以外的窗口打开了 */
    isAnyWindowOpening() {
        const list = IocContainer.getSceneWindow();
        let result = false;
        this._windowMap.forEach((value, key) => {
            if (list.indexOf(key) === -1) {
                result = true;
            }
        });
        return result;
    }
    private hideMainSceneCount = 0;
    private addHideMainSceneCount() {
        this.hideMainSceneCount++;
        if (this.hideMainSceneCount > 0) {
            const sceneWindow = IocContainer.getSceneWindow().filter((c) => {
                return c.__metaInfo.sceneWindow.kind === this.currentScene || c.__metaInfo.sceneWindow.kind === "both";
            });
            sceneWindow.forEach((c) => {
                this.get(c).node.opacity = 0;
            });
        }
    }
    private subHideMainSceneCount() {
        this.hideMainSceneCount--;
        if (this.hideMainSceneCount <= 0) {
            const sceneWindow = IocContainer.getSceneWindow().filter((c) => {
                return c.__metaInfo.sceneWindow.kind === this.currentScene || c.__metaInfo.sceneWindow.kind === "both";
            });
            sceneWindow.forEach((c) => {
                this.get(c).node.opacity = 255;
            });
        }
    }
    private async switchScene(scene: "battle" | "main") {
        if (this.currentScene === scene) return;
        this.currentScene = scene;
        if (scene === "main") {
            GAudio.playMusic("battle_1");
        }
        // 关闭原场景
        const closeList = IocContainer.getSceneWindow().filter((c) => {
            return c.__metaInfo.sceneWindow.kind !== scene && c.__metaInfo.sceneWindow.kind !== "both";
        });
        for (let i = 0; i < closeList.length; i++) {
            if (this.get(closeList[i])) {
                await this.close(closeList[i]);
            }
        }
        // 打开前往的场景
        const openWithShownPromise = (cls: any) => {
            return new Promise<void>((resolve, reject) => {
                this.open(cls, null, null, {
                    onShown: () => {
                        resolve();
                    },
                });
            });
        };
        const list = IocContainer.getSceneWindow()
            .filter((c) => {
                return c.__metaInfo.sceneWindow.kind === scene || c.__metaInfo.sceneWindow.kind === "both";
            })
            .sort((a, b) => {
                return a.__metaInfo.sceneWindow.openIndex - b.__metaInfo.sceneWindow.openIndex;
            });
        for (let i = 0; i < list.length; i++) {
            if (!this.get(list[i])) {
                await openWithShownPromise(list[i]);
            }
        }
    }

    /** 前往主场景 */
    async goToMain() {
        await this.switchScene("main");
    }

    /** 前往战斗场景 */
    async goToBattle() {
        await this.switchScene("battle");
    }

    /** 限制的可点击建筑 */
    sceneLimit = -1;
    /** 场景事件屏蔽 */
    sceneEventBlock = false;
    /** 按键屏蔽模式，用于引导 */
    buttonBlock = false;
    /** 引导按钮路径 */
    guideBtnPath: string = "";
    /** 引导按钮 */
    guideBtn: UIButton | UILongTouchButton = null;
    /** 已结束离线结算 */
    offlineSettled = false;
}

window["GWindow"] = new WindowHelper();
declare global {
    const GWindow: WindowHelper;
}
