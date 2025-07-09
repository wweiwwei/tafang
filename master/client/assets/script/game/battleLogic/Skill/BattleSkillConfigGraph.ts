export enum BattleSkillNodeType {
    SkillForeswing = "base/SkillForeswing",
    SkillPreBattle = "base/SkillPreBattle",
    SkillPreCalculate = "base/SkillPreCalculate",
    SkillGlobal = "base/SkillGlobal",
    SkillBackswing = "base/SkillBackswing",
    SkillBegin = "base/SkillBegin",

    ActivateHeroRelation = "skillTemplate/ActivateHeroRelation",
    SetFlag = "skillTemplate/SetFlag",

    Asc = "targetSelect/Asc",
    Desc = "targetSelect/Desc",
    Take = "targetSelect/Take",
    BaseTarget = "targetSelect/BaseTarget",
    Filter = "targetSelect/Filter",
    MaxBy = "targetSelect/MaxBy",
    MinBy = "targetSelect/MinBy",
    RandomTake = "targetSelect/RandomTake",
    Slice = "targetSelect/Slice",
    RectArea = "targetSelect/RectArea",
    TargetSelectGroup = "targetSelect/TargetSelectGroup",

    PrecalculatedBuff = "skillTemplate/PrecalculatedBuff",
    PassiveBuff = "skillTemplate/PassiveBuff",
    DurationSkillEnd = "duration/DurationSkillEnd",

    FireBullet = "skillTemplate/FireBullet",
}

/** 该对象会被共享，不应该保存任何状态 */
export class BattleSkillConfigGraph {
    skillType: "" | "normal" | "prebattle" | "reactive" | "car";

    links: { [linkId: number]: BattleSkillConfigLink } = {};
    nodes: { [id: number]: BattleSkillConfigNode } = {};
    get tbl() {
        return GTable.getById("BattleSkillTbl", this.id);
    }

    constructor(public id: number) {
        GLog.verbose("load battleSkillConfigGraph", id);
        const tbl = GTable.getById("BattleSkillTbl", id);
        if (tbl.config === "") {
            this.skillType = "prebattle";
            return;
        }
        const config: {
            links: any[][];
            nodes: BattleSkillConfigNode[];
        } = JSON.parse(GTable.getBattleConfig(tbl.config));
        config.links.forEach(([linkId, outputNodeId, ignore, inputNodeId]) => {
            this.links[linkId] = { linkId, outputNodeId, inputNodeId };
        });
        config.nodes.forEach((n) => {
            Reflect.setPrototypeOf(n, BattleSkillConfigNode.prototype);
            n.graph = this;
            this.nodes[n.id] = n;
        });
        if (config.nodes.find((n) => n.type === BattleSkillNodeType.SkillForeswing)) {
            this.skillType = "normal";
        } else if (id === 90002) {
            // todo
            this.skillType = "car";
        }
    }

    getNodeById(id: number): BattleSkillConfigNode {
        return this.nodes[id];
    }
    getLinkById(id: number): BattleSkillConfigLink {
        return this.links[id];
    }
    getNodeByType(type: string): BattleSkillConfigNode[] {
        return Object.keys(this.nodes)
            .filter((k) => {
                const id = Number(k);
                return this.getNodeById(id).type === type;
            })
            .map((k) => {
                const id = Number(k);
                return this.getNodeById(id);
            });
    }
}

export type BattleSkillConfigLink = {
    linkId: number;
    outputNodeId: number;
    inputNodeId: number;
};

export class BattleSkillConfigNode {
    id: number;
    inputs: {
        link: number | null;
        name: string;
    }[];
    outputs: {
        links: number[] | null;
        name: string;
    }[];
    properties: any;
    type: string;

    graph: BattleSkillConfigGraph;

    /** 没有输入时返回null */
    getInput(name: string): BattleSkillConfigNode | null {
        const data = this.inputs.find((i) => i.name === name);
        if (!data) return null;
        if (data.link == null) return null;
        const linkInfo = this.graph.getLinkById(data.link);
        const nodeId = linkInfo.outputNodeId;
        return this.graph.getNodeById(nodeId);
    }

    /** 没有输出时返回空数组 */
    getOutput(name: string): BattleSkillConfigNode[] {
        const data = this.outputs.find((i) => i.name === name);
        if (!data) return [];
        if (data.links == null) return [];
        const linkInfo = data.links.map((l) => this.graph.getLinkById(l));
        const nodeId = linkInfo.map((l) => l.inputNodeId);
        return nodeId.map((id) => this.graph.getNodeById(id));
    }

    /** 获取属性 */
    getProperties(key: string, spine: string = ""): any {
        const tbl = this.graph.tbl;
        const origin = this.properties[key];
        if (origin && origin.indexOf && origin.indexOf("$") > -1) {
            const index = Number(origin[1]);
            return tbl["param" + (index + 1)] + origin.slice(2);
        } else if (origin && origin.indexOf && origin.indexOf("#") > -1) {
            const tbl = GTable.getList("SpineInfoTbl").find((t) => t.spine === spine);
            return tbl[origin.slice(1)];
        }
        return origin;
    }

    /** 获取全部输入节点 */
    getAllInputNode(): BattleSkillConfigNode[] {
        if (!this.inputs) return [];
        return this.inputs
            .filter((i) => i.link !== null)
            .map((i) => {
                const linkInfo = this.graph.getLinkById(i.link);
                const nodeId = linkInfo.outputNodeId;
                return this.graph.getNodeById(nodeId);
            });
    }
}
