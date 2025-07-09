import { BattleDisplayEvent } from "../../Display/BattleDisplayEvent";
import { BattleBattleStageContext } from "../../Processor/BattleBattleStageContext";
import { BattleSkillTemplateAddBuffBuilder } from "../../Skill/Builder/Template/BattleSkillTemplateAddBuffBuilder";
import { BattleEffect } from "../Effect/BattleEffect";
import { BattleBuff } from "./BattleBuff";

export class BattleBuffManager {
    constructor(public ctx: BattleBattleStageContext) {}

    // 全部buff
    buff: BattleBuff[] = [];
    /** 最终属性是不是动态的 */
    isDynamic() {
        return this.buff.some((b) => b.dynamic);
    }

    /** buff效果，被动buff和主动buff */
    effect(): { property: string; value: number }[] {
        const res = this.buff.map((b) => b.effect());
        const gp = this.ctx.data.globalPropertyManager.finalProperty;
        if (gp.antiSpeed > 0) {
            const baseP = this.ctx.object.propertyManager.baseProperty;
            res.push({ property: "moveSpeed", value: -Math.round(baseP.moveSpeed * gp.antiSpeed * 0.0001) });
        }
        return res;
    }

    /** 移除buff */
    removeBuff(b: BattleBuff) {
        b.onRemove();
        this.buff = this.buff.filter((x) => x !== b);
        this.ctx.object.propertyManager.setFinalPropertyDirty();
        this.ctx.data.pushDisplayEvent(new BattleDisplayEvent("refreshBuff", { obj: this.ctx.object }));
    }

    getDurationEffectList(): BattleEffect[] {
        return GUtils.array.flatMap(this.buff, (b) => b.getDurationEffectList());
    }

    /** 附加buff */
    addBuff(ctx: BattleBattleStageContext, builder: BattleSkillTemplateAddBuffBuilder) {
        const b = new BattleBuff(this.ctx.object, ctx, builder);
        const exist = this.buff.find((a) => a.buffKey === b.buffKey);
        if (exist) {
            exist.addLayer();
            this.ctx.data.pushDisplayEvent(
                new BattleDisplayEvent("showBuffAdd", { obj: this.ctx.object, data: exist })
            );
        } else {
            b.onAdd();
            this.buff.push(b);
            this.ctx.data.pushDisplayEvent(new BattleDisplayEvent("showBuffAdd", { obj: this.ctx.object, data: b }));
        }
        this.ctx.object.propertyManager.setFinalPropertyDirty();
        this.ctx.data.pushDisplayEvent(new BattleDisplayEvent("refreshBuff", { obj: this.ctx.object }));
    }

    /** 驱散 */
    dispel() {
        const needRemove = this.buff.filter((b) => b.dispelable);
        needRemove.forEach((b) => b.onRemove());
        this.buff = this.buff.filter((b) => !b.dispelable);
        this.ctx.object.propertyManager.setFinalPropertyDirty();
        this.ctx.data.pushDisplayEvent(new BattleDisplayEvent("refreshBuff", { obj: this.ctx.object }));
    }

    tick() {
        const frame = this.ctx.data.frame;
        const needRemove = this.buff.filter((b) => b.endFrame <= frame);
        if (needRemove.length === 0) return;
        needRemove.forEach((b) => b.onRemove());
        this.buff = this.buff.filter((b) => b.endFrame > frame);
        this.ctx.object.propertyManager.setFinalPropertyDirty();
        this.ctx.data.pushDisplayEvent(new BattleDisplayEvent("refreshBuff", { obj: this.ctx.object }));
    }
}
