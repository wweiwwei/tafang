import IocContainer from "../IocContainer";
import ResourceLoader from "../ResourceLoader";
import UIListItem from "./UIListItem";

const { ccclass, property, menu } = cc._decorator;
@ccclass
@menu("UI/UIList")
export default class UIList<T extends UIListItem> extends cc.Component {
    @property(cc.String) itemName: string = "";

    private prefab: cc.Prefab = null;
    private inited = false;
    private state: T["state"][] = [];
    private itemList: T[] = [];
    private todoList: Map<string, Function> = new Map();

    protected async onLoad() {
        if (CC_EDITOR) return;
        try {
            this.prefab = await ResourceLoader.loadPrefab(this.itemName);
            // 这里需要判断节点是否已经销毁
            if (!cc.isValid(this.node)) return;
            this.inited = true;
            this.todoList.forEach((todo) => todo());
            this.todoList.clear();
        } catch (e) {
            console.error(
                "list load error itemName",
                this.itemName,
                "node path:",
                GUtils.ui.getNodeFullPath(this.node)
            );
            throw e;
        }
    }

    setState(state: T["state"][]) {
        if (!this.inited) {
            this.todoList.set("setState", () => this.setState(state));
            return;
        }

        this.state = state;
        this.updateList();
    }

    /** 获取item列表，注意不能直接增加和删除节点 */
    getItems() {
        return this.itemList;
    }

    clear() {
        this.setState([]);
    }

    private updateList() {
        for (let i = 0; i < this.state.length; i++) {
            const item = this.itemList[i];
            if (!item) {
                const comp = ResourceLoader.getNodeSync(IocContainer.get(this.itemName), this.prefab);
                this.node.addChild(comp.node);
                this.itemList[i] = comp;
                comp.setState(this.state[i]);
            } else {
                item.setState(this.state[i]);
            }
        }
        for (let i = this.state.length; i < this.itemList.length; i++) {
            const item = this.itemList[i];
            if (item) {
                item.recycle();
                this.itemList[i] = null;
            }
        }
    }
}
