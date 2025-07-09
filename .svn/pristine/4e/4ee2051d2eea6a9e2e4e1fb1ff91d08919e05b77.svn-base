import { debounce } from "../../framework/Decorator";
import EventBus from "../../framework/event/EventBus";
import Item from "../entity/Item";
import EventName from "../event/EventName";
class RedTipNode {
    constructor(public id: number) {}
    /** 当前红点数，0为无红点 */
    public count: number;
    /** 父节点列表，当该节点刷新时需要通知所有父节点 */
    public parentList: number[] = [];
    /** 刷新红点 */
    refresh() {
        const tbl = GTable.getById("UIRedTipTbl", this.id);
        let newCount = 0;
        if (tbl.systemId > 0) {
            // 系统未解锁，默认没有红点
            if (!GModel.player.checkSystemUnlock(tbl.systemId, false)) {
                this.count = newCount;
                return false;
            }
        }
        if (tbl.func.length > 0) {
            if (tbl.func.length === 1) {
                newCount = GModel.redTip.redFunc[tbl.func[0]]();
            } else {
                newCount = GModel.redTip.redFunc[tbl.func[0]](...tbl.func.slice(1));
            }
        } else if (tbl.child.length > 0) {
            newCount = tbl.child.map((id) => GModel.redTip.getRed(id)).reduce((a, b) => a + b, 0);
        }
        if (this.count != newCount) {
            this.count = newCount;
            return true;
        } else {
            return false;
        }
    }
}
export class RedTipModel {
    private redTipMap: Map<number, RedTipNode> = new Map();
    private refreshSet: Set<number> = new Set();
    private hasHandleSet: Set<number> = new Set();

    @debounce(100)
    private emitRedTip() {
        while (this.refreshSet.size !== this.hasHandleSet.size) {
            // 持续通知父节点直到顶层节点
            this.refreshSet.forEach((id) => {
                if (this.hasHandleSet.has(id)) return;
                this.hasHandleSet.add(id);
                const n = this.redTipMap.get(id);
                n.parentList.forEach((pid) => {
                    const p = this.redTipMap.get(pid);
                    const refresh = p.refresh();
                    if (refresh) {
                        this.refreshSet.add(pid);
                    }
                });
            });
        }
        this.refreshSet.clear();
        this.hasHandleSet.clear();
        EventBus.emit(EventName.redTipRefresh);
    }
    init() {
        GTable.getList("UIRedTipTbl").forEach((t) => {
            this.redTipMap.set(t.id, new RedTipNode(t.id));
        });
        GTable.getList("UIRedTipTbl").forEach((t) => {
            t.child.forEach((id) => {
                const n = this.redTipMap.get(id);
                n.parentList.push(t.id);
            });
        });
        GTable.getList("UIRedTipTbl").forEach((t) => {
            const refresh = () => {
                const n = this.redTipMap.get(t.id);
                const refresh = n.refresh();
                if (refresh) {
                    this.refreshSet.add(t.id);
                    this.emitRedTip();
                }
            };
            t.stateKey.forEach((key) => {
                if (EventName.stateKey[key]) {
                    EventBus.on(EventName.stateKey[key], refresh, this);
                } else {
                    GLog.warn("红点初始化错误，没有这个状态key", key);
                }
            });
            t.extraEvent.forEach((key) => {
                if (EventName[key]) {
                    EventBus.on(EventName[key], refresh, this);
                } else {
                    GLog.warn("红点初始化错误，没有这个事件", key);
                }
            });
        });
        setTimeout(() => {
            // 初始刷新
            this.redTipMap.forEach((n) => {
                const refresh = n.refresh();
                if (refresh) {
                    this.refreshSet.add(n.id);
                    this.emitRedTip();
                }
            });
        }, 1000);
    }
    /** 获取特定id的红点数 */
    getRed(id: number): number {
        if (this.redTipMap.has(id)) {
            return this.redTipMap.get(id).count;
        } else {
            return 0;
        }
    }

    redFunc: {
        [key: string]: (...args: string[]) => number;
    } = {
        /** 无尽红点 */
        infinite() {
            return GModel.infiniteBattle.hasRemainReward() ? 1 : 0;
        },
        /** 爬塔红点 */
        tower() {
            return 0;
        },
        /** 伤害挑战红点 */
        damage(kindStr: string) {
            return 0;
        },
        /** 科技树红点 */
        techTree() {
            let rankTbl = GTable.getList("PlayerRankTbl").find((t) => t.rank == GState.data.rank);
            const active =
                (GModel.player.canPromote() &&
                    GModel.player.level() < rankTbl.levelLimit &&
                    GModel.knapsack.checkStorage([GModel.player.upgradeCost()], false)) ||
                (!GModel.player.canPromote() && GModel.tree.getNextTech().canUpdate());
            // GModel.tree.getNextTech().canUpdate() ||
            // (GModel.player.canPromote() && GModel.knapsack.checkStorage([GModel.player.upgradeCost()], false));
            return active ? 1 : 0;
        },
        /** 精灵红点 */
        sprite() {
            let tbl = GTable.getList("MountPoolTbl")[0];
            let single = tbl.singlePrice;
            const active =
                GModel.player.checkSystemUnlock(GIndex.id.systemId.sprite, false) &&
                (GState.data.spritePool.video > 0 ||
                    GModel.knapsack.checkStorage([new Item(single[0], single[1])], false));
            return active ? 1 : 0;
        },
        /** 化石红点 */
        fossil() {
            const active = GModel.fossil.showRedTip();
            return active ? 1 : 0;
        },
        /** 塔升级 */
        upgradeTower() {
            return GModel.playerEquipment.canUpgradeTower() ? 1 : 0;
        },
        /** 塔洗练 */
        wash() {
            return GModel.playerEquipment.canWash() ? 1 : 0;
        },
    };
}
