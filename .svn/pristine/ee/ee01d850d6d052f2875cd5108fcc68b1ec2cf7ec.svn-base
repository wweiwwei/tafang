import { autowired, message, registerClass } from "../../../framework/Decorator";
import ResourceLoader from "../../../framework/ResourceLoader";
import { WindowOpenAnimationEnum, WindowOpenOption } from "../../../framework/ui/GWindow";
import UIButton from "../../../framework/ui/UIButton";
import UIWindow from "../../../framework/ui/UIWindow";
import EventName from "../../event/EventName";
import ListItemPropHandbook from "./ListItemPropHandbook";

const { ccclass, property } = cc._decorator;

@registerClass("WindowPropHandbook", { preloadPrefab: ["ListItemPropHandbook"] })
@ccclass
export default class WindowPropHandbook extends UIWindow {
    static defaultOpentOption: Partial<WindowOpenOption> = {
        animation: WindowOpenAnimationEnum.default,
    };
    @autowired(UIButton) closeBtn: UIButton = null;
    /**list */
    @autowired(cc.ScrollView) scrollList: cc.ScrollView = null;

    /**画线 */
    @autowired(cc.Graphics) graphics2: cc.Graphics = null;
    /**分割线 */
    @autowired(cc.Node) lines: cc.Node = null;
    /**图标 */
    @autowired(cc.Node) icons: cc.Node = null;
    /**等级 */
    @autowired(cc.Node) levels: cc.Node = null;

    private currentTreeNode: Map<number, cc.Node[]> = new Map();
    private currentTreeDepth: number;
    private treeMap: Map<number, PlayerSkillTalentTbl[]>;

    private colletionData: {
        /** 装备id */
        equipmentId: number;
        /** 天赋id */
        talentId: number;
        /** 状态：未激活、可激活、已激活 */
        state: "notActive" | "canActive" | "hasActive";
    }[] = null;
    static talentTree = {
        top: 80, //树顶部间距
        bottom: 0, //树底部间距
        width: 120, //左右层级间距
        height: 150, //上下层级间距
    };

    _windowParam: {
        /**部位 */
        part: number;
    };
    _returnValue: any;

    protected onInited(): void {
        let color = new cc.Color();
        color.fromHEX("#704C40");
        this.graphics2.strokeColor = color;

        this.evenTree();
        this.closeBtn.onClick = () => {
            this.close();
        };
        this.closeBtn.setTransition(false);

        this.DrawLine();
        this.initTree();
        this.refTree();

        this.scrollList.node.on("scrolling", this.refTree, this);
    }

    @message([EventName.stateKey.equipmentCollection])
    evenTree() {
        this.colletionData = GModel.defendTower.getColletionData(this._windowParam.part);
        this.DrawLine();
        this.initTree();
        this.refTree();
    }

    getTbl(id) {
        return GTable.getById("PlayerSkillTalentTbl", id);
    }

    initTree() {
        this.treeMap = new Map();
        this.colletionData.forEach((d) => {
            // if (this.getTbl(d.talentId)) {
            const col = this.getTbl(d.talentId).grid[0];
            if (!this.treeMap.get(col)) {
                this.treeMap.set(col, []);
            }
            this.treeMap.get(col).push(this.getTbl(d.talentId));
            // }
        });

        let grid = 0;
        let currentTreeRow = 0;
        const talentTblList = GTable.getList("PlayerSkillTalentTbl").filter((t) => t.part === this._windowParam.part);
        let maxTreeRow = GUtils.array.maxBy(talentTblList, (t) => t.grid[0]).grid[0];
        for (let index = 0; index < this.colletionData.length; index++) {
            const tbl: PlayerSkillTalentTbl = this.getTbl(this.colletionData[index].talentId);
            if (grid == tbl.grid[0]) continue;

            let data = this.colletionData.find((d) => {
                d.talentId == tbl.id;
            });
            let isUpdate = data && GState.data.techTree[tbl.id].level >= 1;

            if (!isUpdate) {
                const tbl2: PlayerSkillTalentTbl = talentTblList[index - 1];
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

        this.scrollList.content.height =
            maxTreeRow * WindowPropHandbook.talentTree.height + WindowPropHandbook.talentTree.bottom;

        this.scrollList.content.y =
            currentTreeRow * WindowPropHandbook.talentTree.height + this.scrollList.node.height / 2;
    }

    onDisable() {
        this.currentTreeNode.forEach((nodeList) => {
            nodeList.forEach((node) => {
                node.getComponent(ListItemPropHandbook).recycle();
            });
        });
    }

    // drawColor(preId) {
    //     let data = this.colletionData.find((d) => {
    //         d.talentId == preId;
    //     });
    //     let isUpdate = data && data.state == "hasActive" && GState.data.techTree[preId].level >= 1;
    //     let color = new cc.Color();
    //     if (isUpdate) {
    //         color.fromHEX("##704C40");
    //         this.graphics2.strokeColor = color;
    //     } else {
    //         color.fromHEX("##704C40");
    //         this.graphics2.strokeColor = color;
    //     }
    // }

    DrawLine() {
        this.graphics2.clear();
        const tbls: PlayerSkillTalentTbl[] = GTable.getList("PlayerSkillTalentTbl").filter(
            (t) => t.part === this._windowParam.part
        );

        tbls.forEach((Currenttbl: PlayerSkillTalentTbl, index: number) => {
            const thisRow = Currenttbl.grid[0];
            const thiscol = Currenttbl.grid[1];
            Currenttbl.pre.forEach((preId, index) => {
                if (preId) {
                    const Pretbl = GTable.getById("PlayerSkillTalentTbl", preId);

                    if (!Pretbl) {
                        console.error("can not find" + preId);
                        return;
                    }
                    const row = Pretbl.grid[0];
                    const col = Pretbl.grid[1];
                    const currentY =
                        -WindowPropHandbook.talentTree.height * (thisRow - 1) - WindowPropHandbook.talentTree.top;
                    const currentX = WindowPropHandbook.talentTree.width * (thiscol - 3);
                    this.graphics2.lineWidth = 5;
                    this.graphics2.moveTo(currentX, currentY + 35); //路线长度
                    const yOffset = currentY - (row - thisRow) * WindowPropHandbook.talentTree.height * 0.45;
                    const xOffset = currentX + (col - thiscol) * WindowPropHandbook.talentTree.width;
                    const distance = Math.round(thisRow - row);
                    if (distance === 0) {
                        // this.drawColor(Currenttbl.pre[0]);
                        this.graphics2.lineTo(xOffset, yOffset);
                    } else {
                        // this.drawColor(preId);
                        const middleY =
                            ((2 * distance - 1) / (2 * distance)) * WindowPropHandbook.talentTree.height +
                            currentY -
                            20;
                        const r = 2;
                        if (thiscol === col) {
                            this.graphics2.lineTo(xOffset, yOffset);
                        }
                        // else if (thiscol > col) {
                        //     this.graphics2.lineTo(currentX, middleY); //左横线
                        //     this.graphics2.lineTo(xOffset, middleY); //又横线
                        //     this.graphics2.lineTo(xOffset, yOffset); //中心竖线
                        // } else if (thiscol < col) {
                        //     this.graphics2.lineTo(currentX, middleY);
                        //     this.graphics2.lineTo(xOffset, middleY);
                        //     this.graphics2.lineTo(xOffset, yOffset);
                        // }
                        else if (thiscol > col) {
                            // 前置在左边
                            this.graphics2.lineTo(currentX, middleY - r);
                            this.graphics2.arc(currentX - r, middleY - r, r, 0, 0.5 * Math.PI, true);
                            this.graphics2.lineTo(xOffset, middleY);
                            this.graphics2.arc(xOffset + r, middleY + r, r, -0.5 * Math.PI, -1 * Math.PI, false);
                            this.graphics2.lineTo(xOffset, yOffset);
                        } else if (thiscol < col) {
                            // 前置在右边
                            this.graphics2.lineTo(currentX, middleY - r);
                            this.graphics2.arc(currentX + r, middleY - r, r, Math.PI, 0.5 * Math.PI, false);
                            this.graphics2.lineTo(xOffset, middleY);
                            this.graphics2.arc(xOffset - r, middleY + r, r, -0.5 * Math.PI, 0, true);
                            this.graphics2.lineTo(xOffset, yOffset);
                        }
                    }
                    this.graphics2.stroke();
                }
            });
        });
    }

    refTree() {
        // return;
        const y = this.scrollList.content.y;
        const depth = Math.round((y - this.scrollList.node.height) / WindowPropHandbook.talentTree.height);
        if (this.currentTreeDepth === depth) return;
        this.currentTreeDepth = depth;
        // 回收视区外节点;
        this.currentTreeNode.forEach((nodeList, deep) => {
            if (deep < depth || deep > depth + 8) {
                nodeList.forEach((node) => {
                    node.getComponent(ListItemPropHandbook).recycle();
                });
                this.currentTreeNode.delete(deep);
            }
        });
        // 添加视区内节点
        for (let i = depth; i < depth + 9; i++) {
            const refNodeList: cc.Node[] = [];
            if (!this.currentTreeNode.get(i)) {
                const list = [];
                const Tbls = this.treeMap.get(i);
                if (Tbls) {
                    Tbls.forEach((tbl) => {
                        let tempRes = ResourceLoader.getNodeSyncWithPreload(ListItemPropHandbook);
                        tempRes.node.name = tbl.id.toString();
                        this.icons.addChild(tempRes.node);
                        tempRes.setState({ id: tbl.id, part: this._windowParam.part, isSetPos: true });

                        list.push(tempRes.node);
                        refNodeList.push(tempRes.node);
                    });
                    this.currentTreeNode.set(i, list);
                }
            }
            refNodeList.forEach((node) => (node.active = true));
        }
    }
}
