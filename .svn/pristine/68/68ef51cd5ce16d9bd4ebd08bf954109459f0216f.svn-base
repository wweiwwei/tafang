import { BattleDisplayEvent } from "../../Display/BattleDisplayEvent";
import { BattleBattleStageContext } from "../../Processor/BattleBattleStageContext";
import { BattleSkillTemplateFireBulletBuilder } from "../../Skill/Builder/Template/BattleSkillTemplateFireBulletBuilder";
import { BattleBulletAgentBezier } from "./BattleBulletAgentBezier";
import { BattleBulletAgentLine } from "./BattleBulletAgentLine";
import { BattleBulletAgentPenetrateLine } from "./BattleBulletAgentPenetrateLine";
import { BattleBulletAgentPenetratePath } from "./BattleBulletAgentPenetratePath";

export interface IBattleBulletAgent {
    init(ctx: BattleBullet): void;
    update(ctx: BattleBullet): void;
    getCollide(ctx: BattleBullet): number[];
}

export class BattleBullet {
    public bulletScale = 1;
    public img: string;
    constructor(
        public uid: number,
        public ctx: BattleBattleStageContext,
        public builder: BattleSkillTemplateFireBulletBuilder,
        public targetUid: number,
        public position: number[],
        public hitCallBack: (uid: number) => void,
        public indexInfo: {
            index: number;
            total: number;
        }
    ) {
        this.bulletScale = Number(builder._scale);
        this.img = builder._img;
        this.beginPosition = position.map((e) => e);
        this.position = this.beginPosition.map((e) => e);
        if (this.builder._penetrateMode) {
            if (this.builder._curveType == "2") {
                this.agent = new BattleBulletAgentPenetrateLine();
            } else if (this.builder._curveType == "3") {
                this.agent = new BattleBulletAgentPenetratePath();
            }
        } else if (this.builder._curveType == "1") {
            this.agent = new BattleBulletAgentBezier();
        } else if (this.builder._curveType == "2") {
            this.agent = new BattleBulletAgentLine();
        } else {
            throw new Error(`无法识别的曲线类型 ${this.builder._curveType}`);
        }
        this.agent.init(this);
    }

    private agent: IBattleBulletAgent;

    /** 子弹的朝向，有多少个方向待确定 */
    direction: number[];

    cachePosition: number[];
    beginPosition: number[];

    estimateFrame: number;
    hasRunFrame: number = 0;

    tick() {
        // todo 击中盾墙销毁子弹
        this.hasRunFrame++;
        this.agent.update(this);
    }

    hit() {
        // 打中了
        this.hitCallBack(this.targetUid);
        this.ctx.data.bulletMap.delete(this.uid);
        this.ctx.data.pushDisplayEvent(new BattleDisplayEvent("removeBullet", { bullet: this }));
    }

    getCollide() {
        return this.agent.getCollide(this);
    }
}
