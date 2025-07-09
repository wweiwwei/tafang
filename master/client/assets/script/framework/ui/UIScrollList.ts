import IocContainer from "../IocContainer";
import ResourceLoader from "../ResourceLoader";
import UIListItem from "./UIListItem";

const { ccclass, property, menu } = cc._decorator;

const listTypeEnum = cc.Enum({
    Horizontal: 0,
    Vertical: 1,
    Grid: 2,
});

const axisDirectionEnum = cc.Enum({
    Horizontal: 0,
    Vertical: 1,
});

@ccclass
@menu("UI/UIScrollList")
export default class UIScrollList<T extends UIListItem> extends cc.Component {
    @property(cc.String) itemName: string = "";
    @property(cc.Integer) private _paddingTop: number = 0;
    @property(cc.Integer) get paddingTop(): number {
        return this._paddingTop;
    }
    set paddingTop(v: number) {
        if (v === this._paddingTop) return;
        this._paddingTop = v;
        this.inited && this.updateList();
    }
    @property(cc.Integer) private _paddingBottom: number = 0;
    @property(cc.Integer) get paddingBottom(): number {
        return this._paddingBottom;
    }
    set paddingBottom(v: number) {
        if (v === this._paddingBottom) return;
        this._paddingBottom = v;
        this.inited && this.updateList();
    }
    @property(cc.Integer) private _paddingLeft: number = 0;
    @property(cc.Integer) get paddingLeft(): number {
        return this._paddingLeft;
    }
    set paddingLeft(v: number) {
        if (v === this._paddingLeft) return;
        this._paddingLeft = v;
        this.inited && this.updateList();
    }
    @property(cc.Integer) private _paddingRight: number = 0;
    @property(cc.Integer) get paddingRight(): number {
        return this._paddingRight;
    }
    set paddingRight(v: number) {
        if (v === this._paddingRight) return;
        this._paddingRight = v;
        this.inited && this.updateList();
    }
    @property(cc.Integer) private _spacingY: number = 0;
    @property(cc.Integer) get spacingY(): number {
        return this._spacingY;
    }
    set spacingY(v: number) {
        if (v === this._spacingY) return;
        this._spacingY = v;
        this.inited && this.updateList();
    }
    @property(cc.Integer) private _spacingX: number = 0;
    @property(cc.Integer) get spacingX(): number {
        return this._spacingX;
    }
    set spacingX(v: number) {
        if (v === this._spacingX) return;
        this._spacingX = v;
        this.inited && this.updateList();
    }
    @property({ type: listTypeEnum }) private _listType: number = listTypeEnum.Horizontal;
    @property({ type: listTypeEnum }) get listType(): number {
        return this._listType;
    }
    set listType(v: number) {
        if (v === this._listType) return;
        this._listType = v;
        this.inited && this.updateList();
    }
    @property({ type: axisDirectionEnum }) private _axisDirection: number = axisDirectionEnum.Horizontal;
    @property({ type: axisDirectionEnum }) get axisDirection(): number {
        return this._axisDirection;
    }
    set axisDirection(v: number) {
        if (v === this._axisDirection) return;
        this._axisDirection = v;
        this.inited && this.updateList();
    }

    private scrollView: cc.ScrollView = null;
    private view: cc.Node = null;
    private container: cc.Node = null;
    private prefab: cc.Prefab = null;
    private itemWidth: number = 0;
    private itemHeight: number = 0;
    private inited = false;
    private itemList: T[] = [];
    private state: T["state"][] = [];

    protected async onLoad() {
        if (CC_EDITOR) return;
        this.scrollView = this.getComponent(cc.ScrollView);
        this.view = this.node.getChildByName("view");
        this.container = this.scrollView.content;
        this.node.on("scrolling", this.onScroll, this);
        try {
            this.prefab = await ResourceLoader.loadPrefab(this.itemName);
            // 这里需要判断节点是否已经销毁
            if (!cc.isValid(this.node)) return;
            this.itemHeight = this.prefab.data.height;
            this.itemWidth = this.prefab.data.width;
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

    private todoList: Map<string, Function> = new Map();

    setState(state: T["state"][]) {
        if (!this.inited) {
            this.todoList.set("setState", () => this.setState(state));
            return;
        }

        this.state = state;
        this.updateList();
    }

    setEnable(b: boolean) {
        this.scrollView.enabled = b;
    }

    clear() {
        this.setState([]);
    }

    /** 设置视图的坐标 */
    setContentPosition(pos: cc.Vec2) {
        if (!this.inited) {
            this.todoList.set("setContentPosition", () => {
                this.scrollView.setContentPosition(pos);
                this.updateList();
            });
            return;
        }
        this.scrollView.setContentPosition(pos);
        this.updateList();
    }

    // 滚动时判断当前可见的item，回收不可见item，并加载可见item
    private onScroll() {
        if (!this.inited) {
            this.todoList.set("onScroll", () => this.onScroll());
            return;
        }
        this.updateList(true);
    }

    private updateList(scrollMode: boolean = false) {
        this.syncContainerSize();
        this.refreshVisibleItem(scrollMode);
    }

    private refreshVisibleItem(scrollMode: boolean) {
        const visibleIndex = this.getVisibleItemIndex();
        for (let i = 0; i < this.state.length; i++) {
            const item = this.itemList[i];
            if (i >= visibleIndex[0] && i <= visibleIndex[1]) {
                if (!item) {
                    const comp = ResourceLoader.getNodeSync(IocContainer.get(this.itemName), this.prefab);
                    this.container.addChild(comp.node);
                    this.itemList[i] = comp;
                    comp.node.setPosition(this.getItemPosition(i));
                    comp.setState(this.state[i]);
                } else {
                    item.node.setPosition(this.getItemPosition(i));
                    if (!scrollMode) {
                        item.setState(this.state[i]);
                    }
                }
            } else {
                if (item) {
                    item.recycle();
                    this.itemList[i] = null;
                }
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

    private getItemPosition(i: number): cc.Vec2 {
        const viewWidth = this.view.width;
        const viewHeight = this.view.height;
        switch (this.listType) {
            case listTypeEnum.Horizontal: {
                const x = this.paddingLeft + i * (this.itemWidth + this.spacingX) + this.itemWidth * 0.5;
                const y = -this.paddingTop - this.itemHeight * 0.5;
                return cc.v2(x, y);
            }
            case listTypeEnum.Vertical: {
                const x = this.paddingLeft;
                const y = -this.paddingTop - i * (this.itemHeight + this.spacingY) - this.itemHeight * 0.5;
                return cc.v2(x, y);
            }
            case listTypeEnum.Grid: {
                switch (this.axisDirection) {
                    case axisDirectionEnum.Horizontal: {
                        const column = Math.floor(
                            (viewWidth - this.paddingLeft - this.paddingRight + this.spacingX) /
                                (this.itemWidth + this.spacingX)
                        );
                        const x =
                            this.paddingLeft + (i % column) * (this.itemWidth + this.spacingX) + this.itemWidth * 0.5;
                        const y =
                            -this.paddingTop -
                            Math.floor(i / column) * (this.itemHeight + this.spacingY) -
                            this.itemHeight * 0.5;
                        return cc.v2(x, y);
                    }
                    case axisDirectionEnum.Vertical: {
                        const row = Math.floor(
                            (viewHeight - this.paddingTop - this.paddingBottom + this.spacingY) /
                                (this.itemHeight + this.spacingY)
                        );
                        const x =
                            this.paddingLeft +
                            Math.floor(i / row) * (this.itemWidth + this.spacingX) +
                            this.itemWidth * 0.5;
                        const y =
                            -this.paddingTop - (i % row) * (this.itemHeight + this.spacingY) - this.itemHeight * 0.5;
                        return cc.v2(x, y);
                    }
                }
            }
        }
    }

    private syncContainerSize() {
        // 调整container的锚点
        switch (this.listType) {
            case listTypeEnum.Horizontal: {
                this.container.setAnchorPoint(0, 1);
                break;
            }
            case listTypeEnum.Vertical: {
                this.container.setAnchorPoint(0.5, 1);
                break;
            }
            case listTypeEnum.Grid: {
                switch (this.axisDirection) {
                    case axisDirectionEnum.Horizontal: {
                        this.container.setAnchorPoint(0, 1);
                        break;
                    }
                    case axisDirectionEnum.Vertical: {
                        this.container.setAnchorPoint(0, 0.5);
                        break;
                    }
                }
                break;
            }
        }
        // 调整container的大小
        const itemWidth = this.itemWidth;
        const itemHeight = this.itemHeight;
        let containerWidth = 0;
        let containerHeight = 0;
        switch (this.listType) {
            case listTypeEnum.Horizontal: {
                containerWidth =
                    itemWidth * this.state.length +
                    this.spacingX * (this.state.length - 1) +
                    this.paddingLeft +
                    this.paddingRight;
                containerHeight = itemHeight + this.paddingTop + this.paddingBottom;
                break;
            }
            case listTypeEnum.Vertical: {
                containerWidth = itemWidth + this.paddingLeft + this.paddingRight;
                containerHeight =
                    itemHeight * this.state.length +
                    this.spacingY * (this.state.length - 1) +
                    this.paddingTop +
                    this.paddingBottom;
                break;
            }
            case listTypeEnum.Grid: {
                switch (this.axisDirection) {
                    case axisDirectionEnum.Horizontal: {
                        containerWidth = this.view.width;
                        const column = Math.floor(
                            (this.view.width - this.paddingLeft - this.paddingRight + this.spacingX) /
                                (this.itemWidth + this.spacingX)
                        );
                        let row = this.state.length / column;
                        containerHeight =
                            itemHeight * (row === Math.floor(row) ? row : row + 1) +
                            this.spacingY * (row === Math.floor(row) ? row - 1 : row - 2) +
                            this.paddingTop +
                            this.paddingBottom;
                        break;
                    }
                    case axisDirectionEnum.Vertical: {
                        const row = Math.floor(
                            (this.view.height - this.paddingTop - this.paddingBottom + this.spacingY) /
                                (this.itemHeight + this.spacingY)
                        );
                        containerWidth =
                            itemWidth * this.state.length +
                            this.spacingX * (this.state.length - 1) +
                            this.paddingLeft +
                            this.paddingRight;
                        containerWidth /= row;
                        containerHeight = this.view.height;
                        break;
                    }
                }
                break;
            }
        }
        this.container.width = containerWidth;
        this.container.height = containerHeight;
    }

    private getVisibleItemIndex(): number[] {
        const containerX = this.container.x;
        const containerY = this.container.y;
        const viewWidth = this.view.width;
        const viewHeight = this.view.height;
        switch (this.listType) {
            case listTypeEnum.Horizontal: {
                const left = -containerX - this.paddingLeft - viewWidth * 0.5;
                const right = -containerX + viewWidth * 0.5 + this.paddingRight;
                const leftIndex = Math.floor(left / (this.itemWidth + this.spacingX));
                const rightIndex = Math.ceil(right / (this.itemWidth + this.spacingX));
                return [leftIndex - 1, rightIndex + 1];
            }
            case listTypeEnum.Vertical: {
                const top = containerY - viewHeight * 0.5 + this.paddingTop;
                const bottom = containerY + viewHeight * 0.5 + this.paddingBottom;
                const topIndex = Math.floor(top / (this.itemHeight + this.spacingY));
                const bottomIndex = Math.ceil(bottom / (this.itemHeight + this.spacingY));
                return [topIndex - 1, bottomIndex + 1];
            }
            case listTypeEnum.Grid: {
                switch (this.axisDirection) {
                    case axisDirectionEnum.Horizontal: {
                        const column = Math.floor(
                            (viewWidth - this.paddingLeft - this.paddingRight + this.spacingX) /
                                (this.itemWidth + this.spacingX)
                        );
                        const top = containerY - viewHeight * 0.5 + this.paddingTop;
                        const bottom = containerY + viewHeight * 0.5 + this.paddingBottom;
                        const topIndex = Math.floor(top / (this.itemHeight + this.spacingY));
                        const bottomIndex = Math.ceil(bottom / (this.itemHeight + this.spacingY));
                        return [(topIndex - 1) * column, (bottomIndex + 1) * column];
                    }
                    case axisDirectionEnum.Vertical: {
                        const row = Math.floor(
                            (viewHeight - this.paddingTop - this.paddingBottom + this.spacingY) /
                                (this.itemHeight + this.spacingY)
                        );
                        const left = -containerX - this.paddingLeft - viewWidth * 0.5;
                        const right = -containerX + viewWidth * 0.5 + this.paddingRight;
                        const leftIndex = Math.floor(left / (this.itemWidth + this.spacingX));
                        const rightIndex = Math.ceil(right / (this.itemWidth + this.spacingX));
                        return [(leftIndex - 1) * row, (rightIndex + 1) * row];
                    }
                }
            }
        }
    }
}
