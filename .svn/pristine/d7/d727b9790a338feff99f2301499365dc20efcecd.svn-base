import ResourceLoader from "../ResourceLoader";
import EventBus from "../event/EventBus";
import UIList from "./UIList";
import UIScrollList from "./UIScrollList";
const { ccclass, property } = cc._decorator;

@ccclass
export default abstract class UIComponent extends cc.Component {
    /** 节点池大小，该值大于0时，会启用nodepool */
    static _poolSize = 0;

    private _propertyHasInject = false;

    /**
     * 遍历当前节点下的所有节点，包括自身。
     */
    forEachNode(cb: (node: cc.Node) => void) {
        const f = (node: cc.Node) => {
            cb(node);
            node.children.forEach(f);
        };
        f(this.node);
    }

    setGroup(g: string) {
        this.forEachNode((n) => {
            n.group = g;
        });
    }

    private _propertyInject() {
        const map: Map<string, typeof cc.Node | typeof cc.Component> = Object.getPrototypeOf(this)._autowiredMap;
        if (map !== undefined) {
            const hasInjectSet = new Set<string>();
            this.forEachNode((node) => {
                if (node.name.startsWith("id_")) {
                    const pName = node.name.slice(3);
                    if (hasInjectSet.has(node.name)) {
                        throw new Error(`无法重复注入属性 节点名重复：${pName}`);
                    }
                    const injectType = map.get(pName);
                    if (!injectType) {
                        throw new Error(`无法注入属性 ${pName}，未找到对应的属性`);
                    }
                    let res: any;
                    if (injectType === cc.Node) {
                        res = node;
                    } else {
                        // @ts-ignore
                        res = node.getComponent(injectType);
                    }
                    if (!res) {
                        throw new Error(`无法注入属性 ${pName}，未找到对应类型的组件`);
                    }
                    this[pName] = res;
                    hasInjectSet.add(pName);
                }
            });
            if (hasInjectSet.size !== map.size) {
                const lackKey = [];
                map.forEach((value, key) => {
                    if (!hasInjectSet.has(key)) {
                        lackKey.push(key);
                    }
                });
                throw new Error(`无法注入属性 ${lackKey.join(",")}，未找到对应节点`);
            }
        }
        this.onInjected();
    }

    private _autoOnEvent() {
        EventBus.autoOn(this);
    }

    /**
     * 框架内部调用，不要手动调用。
     */
    _nodeInit(_initState?: any) {
        if (!this._propertyHasInject) {
            this._propertyInject();
            this._propertyHasInject = true;
        }
        this._autoOnEvent();
        if (_initState) {
            Object.keys(_initState).forEach((key) => {
                this[key] = _initState[key];
            });
        }
        this.onInited();
    }

    /**
     * 框架内部调用，不要手动调用。
     */
    _nodeRecycle() {
        EventBus.offByTarget(this);
        const map: Map<string, typeof cc.Node | typeof cc.Component> = Object.getPrototypeOf(this)._autowiredMap;
        if (map !== undefined) {
            map.forEach((value, key) => {
                if (value === UIList || value === UIScrollList) {
                    if (this[key]) this[key].clear();
                }
            });
        }
        this.onRecycle();
    }

    protected onDestroy(): void {
        EventBus.offByTarget(this);
    }

    /** 回收当前节点 */
    recycle() {
        ResourceLoader.recycleNode(this.node);
    }

    /**
     * 生命周期，属性注入之后调用。
     * 只会执行一次，可用于代替onLoad。
     * */
    protected onInjected() {}

    /**
     * 生命周期，初始化。
     * 节点被实例化之后或者从节点池取出之后会执行。
     * 对于使用节点池的节点，这个生命周期会执行多次，使用时应该注意。
     *  */
    protected onInited() {}

    /**
     * 生命周期，回收节点
     * 节点被销毁或者被回收到节点池之前会执行。
     * 对于使用节点池的节点，这个生命周期会执行多次，使用时应该注意。
     * */
    protected onRecycle() {}
}
