import { autowired, message, registerClass } from "../../../framework/Decorator";
import UIButton from "../../../framework/ui/UIButton";
import UIImage from "../../../framework/ui/UIImage";
import UILabel from "../../../framework/ui/UILabel";
import UIScrollList from "../../../framework/ui/UIScrollList";
import UIWindow from "../../../framework/ui/UIWindow";
import { WindowOpenAnimationEnum, WindowOpenOption } from "../../../framework/ui/GWindow";
import { CarEquipmentWrapper } from "../../entity/CarEquipment";
import { EquipmentWrapper } from "../../entity/Equipment";
import Item from "../../entity/Item";
import EventName from "../../event/EventName";
import ListItemItem from "../common/ListItemItem";
import ListItemTree from "./ListItemTree";
import ResourceLoader from "../../../framework/ResourceLoader";

const { ccclass, property } = cc._decorator;
@registerClass("WindowTree2", { preloadPrefab: ["ListItemTree"] })
@ccclass
export default class WindowTree2 extends UIWindow {
    // static defaultOpentOption: Partial<WindowOpenOption> = {
    //     animation: WindowOpenAnimationEnum.no,
    // };
    _windowParam: number;
    _returnValue: any;
    /**list */
    @autowired(cc.ScrollView) scrollList: cc.ScrollView = null;

    /**分割线 */
    @autowired(cc.Node) lines: cc.Node = null;
    /**画线 */
    @autowired(cc.Graphics) graphics1: cc.Graphics = null;
    /**画线 */
    @autowired(cc.Graphics) graphics2: cc.Graphics = null;
    /**图标 */
    @autowired(cc.Node) icons: cc.Node = null;
    /**等级 */
    @autowired(cc.Node) levels: cc.Node = null;

    /**关闭 */
    @autowired(UIButton) return: UIButton = null;

    @autowired(UIButton) studyBtn: UIButton = null;
    @autowired(cc.Node) studyTips: cc.Node = null;

    private currentTreeNode: Map<number, cc.Node[]>;
    private currentTreeDepth: number;
    private showAllTree: boolean = false;
    private treeMap: Map<number, TechTreeTbl[]>;

    static talentTree = {
        top: 100, //科技树顶部间距
        bottom: 0, //科技树底部间距
        width: 126, //左右层级间距
        height: 200, //上下层级间距
    };

    private currentMaxRow: number;

    protected onInited(): void {
        this.return.onClick = () => {
            this.close();
        };
        this.DrawLine();
        this.initTree();
        this.currentTreeNode = new Map();
        this.refTree();

        this.scrollList.node.on("scrolling", this.refTree, this);
    }

    @message([EventName.stateKey.techData, EventName.stateKey.techTree])
    evenTree() {
        this.DrawLine();
        this.initTree();
        this.refTree();
    }

    initTree() {
        this.treeMap = new Map();
        GTable.getList("TechTreeTbl").forEach((tbl) => {
            const col = tbl.grid[0];
            if (!this.treeMap.get(col)) {
                this.treeMap.set(col, []);
            }
            this.treeMap.get(col).push(tbl);
        });

        let tbls: TechTreeTbl[] = GTable.getList("TechTreeTbl");

        let grid = 0;
        let currentTreeRow = 0;
        let maxTreeRow = tbls[tbls.length - 1].grid[0];
        for (let index = 0; index < tbls.length; index++) {
            const tbl: TechTreeTbl = tbls[index];
            if (grid == tbl.grid[0]) continue;

            let isUpdate = GState.data.techTree[tbl.id].canUnlock() && GState.data.techTree[tbl.id].level >= 1; //TalentEffectManager.s_instance.getTalentDataByIsUpdate(tbl.id);

            if (!isUpdate) {
                const tbl2: TechTreeTbl = tbls[index - 1];
                if (tbl2) {
                    grid = tbl2.grid[0];
                    currentTreeRow = grid - 1;
                } else {
                    grid = tbl.grid[0];
                    currentTreeRow = grid - 1;
                }
                break;
            }
        }

        this.scrollList.content.height = maxTreeRow * WindowTree2.talentTree.height + WindowTree2.talentTree.bottom;

        this.scrollList.content.y = currentTreeRow * WindowTree2.talentTree.height + this.scrollList.node.height / 2;
    }

    onDisable() {
        this.currentTreeNode.forEach((nodeList) => {
            nodeList.forEach((node) => {
                node.getComponent(ListItemTree).recycle();
            });
        });
    }

    drawColor(preId) {
        let isUpdate = GState.data.techTree[preId].canUnlock() && GState.data.techTree[preId].level >= 1; //TalentEffectManager.s_instance.getTalentDataByIsUpdate(preId);  //todo
        let color = new cc.Color();
        if (isUpdate) {
            color.fromHEX("#FFB43A");
            this.graphics2.strokeColor = color;
        } else {
            color.fromHEX("#694628");
            this.graphics2.strokeColor = color;
        }
    }

    DrawLine() {
        this.graphics1.clear();
        this.graphics2.clear();
        const tbls: TechTreeTbl[] = GTable.getList("TechTreeTbl");

        tbls
            // .filter((i, index) => {
            //     return index <= 1;
            // }).
            .forEach((Currenttbl: TechTreeTbl, index: number) => {
                const thisRow = Currenttbl.grid[0];
                const thiscol = Currenttbl.grid[1];
                Currenttbl.pre.forEach((preId, index) => {
                    if (preId) {
                        const Pretbl = GTable.getById("TechTreeTbl", preId); //GameDataManager.s_instance.getConfigPool().getNewTalentEffectTblById(preId);

                        if (!Pretbl) {
                            console.error("can not find" + preId);
                            return;
                        }
                        const row = Pretbl.grid[0];
                        const col = Pretbl.grid[1];
                        const currentY = -WindowTree2.talentTree.height * (thisRow - 1) - WindowTree2.talentTree.top;
                        const currentX = WindowTree2.talentTree.width * (thiscol - 3);
                        this.graphics1.lineWidth = 15;
                        this.graphics1.moveTo(currentX, currentY);
                        this.graphics2.lineWidth = 12;
                        this.graphics2.moveTo(currentX, currentY);
                        const yOffset = currentY - (row - thisRow) * WindowTree2.talentTree.height;
                        const xOffset = currentX + (col - thiscol) * WindowTree2.talentTree.width;
                        const distance = Math.round(thisRow - row);
                        if (distance === 0) {
                            this.drawColor(Currenttbl.pre[0]);
                            this.graphics1.lineTo(xOffset, yOffset);
                            this.graphics2.lineTo(xOffset, yOffset);
                        } else {
                            this.drawColor(preId);
                            const middleY =
                                ((2 * distance - 1) / (2 * distance)) * WindowTree2.talentTree.height + currentY - 20;
                            const r = 20;
                            if (thiscol === col) {
                                // this.graphics1.lineTo(currentX, middleY);
                                // this.graphics1.lineTo(xOffset + r, middleY);
                                this.graphics1.lineTo(xOffset, yOffset);
                                // this.graphics2.lineTo(currentX, middleY);
                                // this.graphics2.lineTo(xOffset, middleY);
                                this.graphics2.lineTo(xOffset, yOffset);
                            } else if (thiscol > col) {
                                // 前置在左边
                                this.graphics1.lineTo(currentX, middleY);
                                this.graphics1.lineTo(xOffset + r, middleY);
                                this.graphics1.lineTo(xOffset + r, yOffset);

                                this.graphics2.lineTo(currentX, middleY);
                                this.graphics2.lineTo(xOffset + r, middleY);
                                this.graphics2.lineTo(xOffset + r, yOffset);
                            } else if (thiscol < col) {
                                // 前置在右边
                                this.graphics1.lineTo(currentX, middleY);
                                this.graphics1.lineTo(xOffset - r, middleY);
                                this.graphics1.lineTo(xOffset - r, yOffset);

                                this.graphics2.lineTo(currentX, middleY);
                                this.graphics2.lineTo(xOffset - r, middleY);
                                this.graphics2.lineTo(xOffset - r, yOffset);
                            }
                        }
                        this.graphics1.stroke();
                        this.graphics2.stroke();
                    }
                });
            });
    }

    refTree() {
        const y = this.scrollList.content.y;
        const depth = Math.round((y - this.scrollList.node.height) / WindowTree2.talentTree.height);
        if (this.currentTreeDepth === depth) return;
        this.currentTreeDepth = depth;
        // 回收视区外节点;
        this.currentTreeNode.forEach((nodeList, deep) => {
            if (deep < depth || deep > depth + 6) {
                nodeList.forEach((node) => {
                    node.getComponent(ListItemTree).recycle();
                });
                this.currentTreeNode.delete(deep);
            }
        });
        // 添加视区内节点
        for (let i = depth; i < depth + 7; i++) {
            const refNodeList: cc.Node[] = [];
            if (!this.currentTreeNode.get(i)) {
                const list = [];
                const Tbls = this.treeMap.get(i);
                if (Tbls) {
                    Tbls.forEach((tbl) => {
                        let trees = ResourceLoader.getNodeSyncWithPreload(ListItemTree);
                        trees.node.name = tbl.id.toString();
                        this.icons.addChild(trees.node);
                        trees.setState({ id: tbl.id, isSetPos: true });

                        list.push(trees.node);
                        refNodeList.push(trees.node);
                    });
                    this.currentTreeNode.set(i, list);
                }
            }
            refNodeList.forEach((node) => (node.active = true));
        }
    }
}
