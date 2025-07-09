import { autowired, message, registerClass } from "../../../framework/Decorator";
import ResourceLoader from "../../../framework/ResourceLoader";
import { WindowOpenAnimationEnum, WindowOpenOption } from "../../../framework/ui/GWindow";
import UIButton from "../../../framework/ui/UIButton";
import UIList from "../../../framework/ui/UIList";
import UIWindow from "../../../framework/ui/UIWindow";
import EventName from "../../event/EventName";
import ListItemBottomMenu from "../common/ListItemBottomMenu";
import ListItemMainSceneMenu from "../mainscene/ListItemMainSceneMenu";
import ListItemManorBuilding from "./ListItemManorBuilding";
import ListItemManorGrid from "./ListItemManorGrid";
import ManorControl from "./ManorControl";

const { ccclass, property } = cc._decorator;
@registerClass("WindowManorMap", { preloadPrefab: ["ListItemManorBuilding", "ListItemManorGrid"] })
@ccclass
export default class WindowManorMap extends UIWindow {
    static defaultOpentOption: Partial<WindowOpenOption> = {
        hideMainScene: true,
    };
    @autowired(UIButton) return: UIButton = null;
    @autowired(UIButton) edit: UIButton = null;
    @autowired(cc.Node) mainNode: cc.Node = null;
    @autowired(cc.Node) UINode: cc.Node = null;
    @autowired(cc.Node) building: cc.Node = null;
    @autowired(UIList) left: UIList<ListItemMainSceneMenu> = null;
    @autowired(UIList) right: UIList<ListItemMainSceneMenu> = null;
    @autowired(cc.Node) grid: cc.Node = null;
    @autowired(UIList) bottomMenu: UIList<ListItemBottomMenu> = null;
    _windowParam: any;
    _returnValue: any;
    manorControl: ManorControl = null;
    private buildings: Map<{ x: number; y: number }, ListItemManorBuilding> = new Map();
    private grids: ListItemManorGrid[][] = [];
    protected onInited(): void {
        this.return.onClick = () => {
            this.close();
        };
        this.manorControl = this.mainNode.addComponent(ManorControl);
        this.refreshGrid();
        this.initBuilding();
    }
    @message([EventName.stateKey.manorData])
    initBuilding() {
        let map = GModel.manor.getMap();
        Object.keys(map).forEach((id) => {
            map[Number(id)].forEach((pos) => {
                if (!this.buildings.has({ x: pos[0], y: pos[1] })) {
                    const comp = ResourceLoader.getNodeSyncWithPreload(ListItemManorBuilding);
                    comp.setState({ id: Number(id), status: "base" });
                    this.building.addChild(comp.node);
                    comp.node.setPosition(cc.v2(GModel.manor.blockPosToGamePos({ x: pos[0], y: pos[1] })));
                    comp.syncPos();
                    this.buildings.set({ x: pos[0], y: pos[1] }, comp);
                }
            });
        });
        console.log(this.buildings);
    }
    @message([EventName.refreshGrid])
    refreshGrid() {
        let map = GModel.manor.getIdleMatrix();
        for (let y = 0; y < GConstant.manorGrid.vertical; y++) {
            if (this.grids.length < GConstant.manorGrid.vertical) this.grids.push([]);
            for (let x = 0; x < GConstant.manorGrid.horizental; x++) {
                const comp = ResourceLoader.getNodeSyncWithPreload(ListItemManorGrid);
                let color = 0;
                if (this.manorControl.setArea.some((pos) => pos[0] === x && pos[1] === y)) {
                    color = map[y][x] ? 1 : 2;
                }
                comp.setState({ color });
                if (this.grids[y].length < GConstant.manorGrid.horizental) this.grids[y].push(comp);
                else this.grids[y][x] = comp;
                this.grid.addChild(comp.node);
            }
        }
    }

    @message([EventName.hideGrid])
    hideGrid() {
        this.grid.opacity = 0;
    }
    @message([EventName.showGrid])
    showGrid() {
        this.grid.opacity = 255;
    }

    protected onRecycle(): void {
        this.buildings.forEach((b) => b.recycle());
        this.grids.forEach((list) => list.forEach((b) => b.recycle()));
    }
}
