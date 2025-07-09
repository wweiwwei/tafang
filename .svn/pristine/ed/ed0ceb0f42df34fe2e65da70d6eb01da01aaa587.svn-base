import { autowired, message, registerClass } from "../../../framework/Decorator";
import UIButton from "../../../framework/ui/UIButton";
import UIWindow from "../../../framework/ui/UIWindow";
import EventName from "../../event/EventName";
import ListItemTree from "./ListItemTree";
import ResourceLoader from "../../../framework/ResourceLoader";
import UIImage from "../../../framework/ui/UIImage";
import UIList from "../../../framework/ui/UIList";
import ListItemCost from "../hero/ListItemCost";
import UILabel from "../../../framework/ui/UILabel";
import WindowTreeNodeInfo from "./WindowTreeNodeInfo";
import ListItemTreeProperty from "./ListItemTreeProperty";
import ListItemTreeProperty2 from "./ListItemTreeProperty2";
import { WindowOpenAnimationEnum, WindowOpenOption } from "../../../framework/ui/GWindow";
import Item from "../../entity/Item";
import UIListItem from "../../../framework/ui/UIListItem";
import EventBus from "../../../framework/event/EventBus";

const { ccclass, property } = cc._decorator;
@registerClass("WindowTree")
@ccclass
export default class WindowTree extends UIListItem {
    @autowired(UIButton) closeBtn: UIButton = null;

    /**科技节点 */
    @autowired(cc.Node) nodes: cc.Node = null;
    @autowired(cc.Node) back: cc.Node = null;
    @autowired(UILabel) techName: UILabel = null;
    @autowired(UILabel) level: UILabel = null;

    @autowired(UIButton) right: UIButton = null;
    @autowired(UIButton) left: UIButton = null;

    @autowired(UIList) property: UIList<ListItemTreeProperty> = null;
    @autowired(UIList) property2: UIList<ListItemTreeProperty2> = null;
    @autowired(UIButton) rule: UIButton = null;

    @autowired(UIButton) studyBtn: UIButton = null;
    @autowired(cc.Node) studyTips: cc.Node = null;
    @autowired(UIList) cost: UIList<ListItemCost> = null;

    private page = 0;
    private comps: ListItemTree[] = [];
    state: any;
    setState(state: this["state"]): void {
        this.state = state;
    }

    protected onInited(): void {
        // this.node.getComponent(UIButton).onClick = () => {
        //     this.close();
        // };
        this.node.getComponent(UIButton).setTransition(false);
        // this.closeBtn.setTransition(false);
        // this.closeBtn.onClick = () => {
        //     this.close();
        // };
        this.rule.onClick = () => {
            // GWindow.open(WindowRule, { ruleId: GIndex.id.ruleId.tree });
        };
        this.nodes.children.forEach((node, i) => {
            const comp = ResourceLoader.getNodeSyncWithPreload(ListItemTree);
            node.addChild(comp.node);
            this.comps.push(comp);
        });
        this.initProperty();
        this.initTree();
        this.windowInit();
    }

    @message([EventName.stateKey.techTree, EventName.stateKey.playerData, EventName.stateKey.level])
    initProperty() {
        this.property.setState(GModel.tree.getPropertyDescription());
        let state = GModel.player
            .getLevelProperty()
            .map((obj) => {
                return { property: obj.property, value: obj.value, status: 0 };
            })
            .concat(
                GModel.player.getRankProperty().map((obj) => {
                    return { property: obj.property, value: obj.value, status: 1 };
                })
            );
        this.property2.setState(state);
    }

    @message([
        EventName.stateKey.techTree,
        EventName.stateKey.techData,
        EventName.stateKey.level,
        EventName.stateKey.storage,
    ])
    windowInit() {
        let tbl = GModel.tree.getList();
        let cost: {
            item: Item;
            require: number;
            storage: number;
        }[];
        let rankTbl = GTable.getList("PlayerRankTbl").find((t) => t.rank == GState.data.rank);
        if (GModel.player.canPromote()) {
            cost = [
                {
                    item: new Item(GIndex.id.coinId, 1),
                    require: GTable.getList("PlayerLevelTbl").find((t) => t.level === GState.data.level).require,
                    storage: GModel.knapsack.getStorageById(GIndex.id.coinId),
                },
            ];
            this.studyBtn.onClick = async () => {
                if (!GModel.player.IsMaxRank() && GModel.player.level() >= rankTbl.levelLimit)
                    return GTip.showTip([
                        GLang.code.ui.need_break_to,
                        GTable.getList("PlayerRankTbl").find((t) => t.rank == GState.data.rank + 1).careerName,
                    ]);
                const origin = GModel.battle.getBattlePoint();
                await GModel.player.upgradeLevel();
                const after = GModel.battle.getBattlePoint();
                GTip.showBattlePointChange(origin, after, [], [], false);
                EventBus.emit(EventName.redTipRefresh);
            };
            this.studyBtn.text.setText([GLang.code.ui.promote]);
        } else {
            cost = GModel.tree
                .getNextTech()
                .uppdateCost()
                .map((c) => {
                    return {
                        item: c,
                        require: c.count,
                        storage: GModel.knapsack.getStorageById(c.id),
                    };
                });
            this.studyBtn.onClick = async () => {
                if (GModel.tree.getNextTech().canUpdate()) {
                    this.comps.find((t) => t.state.id === GModel.tree.getNextTech().id).playAni();
                    const origin = GModel.battle.getBattlePoint();
                    await GModel.tree.upDateTech();
                    const after = GModel.battle.getBattlePoint();
                    GTip.showBattlePointChange(origin, after, [], [], false);
                }
            };
            this.studyBtn.text.setText([GLang.code.ui.tree_nodeInfo_yj]);
        }
        this.cost.setState(cost);
        this.techName.setText([
            GTable.getList("PlayerLevelTbl").find((t) => t.level === GModel.player.level()).levelName,
        ]);
        this.studyBtn.setGrey(
            (!GModel.player.canPromote() ||
                GModel.player.level() >= rankTbl.levelLimit ||
                !GModel.knapsack.checkStorage([GModel.player.upgradeCost()], false)) &&
                !GModel.tree.getNextTech().canUpdate()
        );
        this.studyTips.active =
            (GModel.player.canPromote() &&
                GModel.player.level() < rankTbl.levelLimit &&
                GModel.knapsack.checkStorage([GModel.player.upgradeCost()], false)) ||
            (!GModel.player.canPromote() && GModel.tree.getNextTech().canUpdate());
        this.left.onClick = () => {
            this.page > 0 ? (this.page -= 1) : (this.page = tbl.length - 1);
            this.initTree();
            this.windowInit();
        };
        this.right.onClick = () => {
            this.page < tbl.length - 1 ? (this.page += 1) : (this.page = 0);
            this.initTree();
            this.windowInit();
        };
        this.level.setText(["_rslv." + GModel.player.level()]);
    }

    @message([EventName.stateKey.techTree, EventName.stateKey.techData, EventName.stateKey.level])
    initTree() {
        let tbl = GModel.tree.getList();
        this.comps.forEach((comp, i) => {
            comp.setState({
                id: tbl[i].id,
                isHideUpLvTime: true,
                cb: () => {
                    GWindow.open(WindowTreeNodeInfo, { id: tbl[i].id });
                },
            });
        });
    }

    protected onRecycle(): void {
        this.comps.forEach((element) => {
            element.recycle();
        });
    }
}
