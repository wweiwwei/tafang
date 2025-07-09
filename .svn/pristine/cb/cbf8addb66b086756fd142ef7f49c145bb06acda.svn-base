import { BattleBattleStageContext } from "../../Processor/BattleBattleStageContext";
import { BattleDamage } from "../../Entity/BattleDamage";
import { BattleProperty } from "./BattleProperty";
import { BattleHeal } from "../../Entity/BattleHeal";
import { BattleEnergyRecover } from "../../Entity/BattleEnergyRecover";
import { BattleEnergyReduce } from "../../Entity/BattleEnergyReduce";
import { BattleEvent } from "../../Event/BattleEvent";
import { BattleDisplayEvent } from "../../Display/BattleDisplayEvent";

export class BattlePropertyManager {
    constructor(public ctx: BattleBattleStageContext) {
        // todo初始化tag
        if (this.ctx.object.objectType === GConstant.battle.battleObjectType.monster) {
            const tbl = GTable.getById("MonsterTbl", this.ctx.object.id);
            this.heroTag = tbl.tag.map((e) => e);
        }
        this.nextLifeRecoverFrame = ctx.data.frame + GConstant.battle.logicTickRate;
    }

    private nextLifeRecoverFrame = 0;

    onEnter() {
        this.ctx.data.eventBus.on(this.ctx.object.uid, "addBuff", this);
        this.ctx.data.eventBus.on(this.ctx.object.uid, "removeBuff", this);
    }

    onQuit() {
        this.ctx.data.eventBus.off(this.ctx.object.uid, "addBuff", this);
        this.ctx.data.eventBus.off(this.ctx.object.uid, "removeBuff", this);
    }

    handleEvent(e: BattleEvent<"addBuff">) {
        if (e.data.buff.property === "level") {
            this._basePropertyDirty = true;
            this._finalPropertyDirty = true;
        } else {
            this._finalPropertyDirty = true;
        }
    }

    hp: number;
    energy: number;
    hurt: number;

    private _basePropertyDirty: boolean = true;
    /** 基本属性 */
    private _basePropertyCache: BattleProperty;

    private _finalPropertyDirty: boolean = true;
    /** 最终属性 */
    private _finalPropertyCache: BattleProperty;

    initProperty() {
        this.hp = this.finalProperty.maxHp;
        this.energy = this.finalProperty.initialEnergy;
        this.hurt = 0;
        this._basePropertyDirty = true;
        this._finalPropertyDirty = true;
    }

    setFinalPropertyDirty() {
        this._finalPropertyDirty = true;
        this.ctx.object.fsmManager.needRefreshSpeed();
    }

    private refreshBaseProperty() {
        this._basePropertyDirty = false;
        const p = BattleProperty.copy(this.ctx.object.info.property);
        p.ctx = this.ctx.object;
        this.ctx.object.info.talent.forEach((tId) => {
            const tbl = GTable.getById("PlayerSkillTalentTbl", tId);
            tbl.property.forEach(([k, v]) => {
                BattleProperty.addProperty(p, k, Number(v));
            });
        });
        this._basePropertyCache = p;
    }
    getEquipmentEffect(): { property: string; value: number }[] {
        const res: { property: string; value: number }[] = [];
        this.ctx.data.rogueEquipmentManager.storage.forEach((id) => {
            const tbl = GTable.getById("RogueEquipmentTbl", id);
            if (tbl.kind === 1) {
                tbl.property.forEach(([p, v]) => {
                    res.push({ property: p, value: AstUtil.eval(v, [{ self: this.baseProperty }]) });
                });
            }
        });
        return res;
    }

    getRoguePassiveEffect(): { property: string; value: number }[] {
        if (!this.ctx.object.skillManager) return [];
        const res: { property: string; value: number }[] = [];
        this.ctx.object.skillManager.roguePassiveSkill.forEach((s) => {
            const tbl = GTable.getById("RogueSkillTbl", s.id);
            tbl.property.forEach(([p, v]) => {
                res.push({ property: p, value: AstUtil.eval(v, [{ lv: s.level }]) });
            });
        });
        return res;
    }

    getBossBuffEffect(): { property: string; value: number }[] {
        const res: { property: string; value: number }[] = [];
        this.ctx.data.rogueBossManager.getBuffList().forEach((b) => {
            res.push({ property: b.property, value: AstUtil.eval(b.value, [{ self: this.baseProperty }]) });
        });
        return res;
    }
    private refreshFinalProperty() {
        this._finalPropertyDirty = false;
        const res = BattleProperty.copy(this.baseProperty);
        const buffEffect = this.ctx.object.buffManager.effect();
        buffEffect.forEach((e) => {
            BattleProperty.addProperty(res, e.property, e.value);
        });
        if (this.ctx.object.objectType === GConstant.battle.battleObjectType.hero) {
            const buffEffect2 = this.getEquipmentEffect();
            buffEffect2.forEach((e) => {
                BattleProperty.addProperty(res, e.property, e.value);
            });
            const buffEffect3 = this.getRoguePassiveEffect();
            buffEffect3.forEach((e) => {
                BattleProperty.addProperty(res, e.property, e.value);
            });
            const buffEffect4 = this.getBossBuffEffect();
            buffEffect4.forEach((e) => {
                BattleProperty.addProperty(res, e.property, e.value);
            });
        }
        this._finalPropertyCache = res;
    }

    getPropertyByMode(mode: "base" | "final") {
        let p: BattleProperty;
        switch (mode) {
            case "base":
                p = this.baseProperty;
                break;
            case "final":
                p = this.finalProperty;
                break;
            default:
                new Error(`无效的属性模式 ${mode}`);
        }
        return p;
    }

    /** 基本属性 */
    get baseProperty(): BattleProperty {
        if (this._basePropertyDirty) {
            this.refreshBaseProperty();
        }
        return this._basePropertyCache;
    }

    /** 最终属性 */
    get finalProperty(): BattleProperty {
        if (this._finalPropertyDirty || this.ctx.object.buffManager.isDynamic()) {
            this.refreshFinalProperty();
        }
        return this._finalPropertyCache;
    }

    /** 消耗所有能量 */
    consumeAllEnergy() {
        this.energy = 0;
    }

    isEnergyFull() {
        return this.energy >= this.finalProperty.maxEnergy;
    }

    /** 获取一帧的移动量 */
    get tickSpeed() {
        const base = this.finalProperty.moveSpeed * GConstant.battle.logicTickSecond;
        // if (this.ctx.object.objectType === GConstant.battle.battleObjectType.monster) {
        //     if (this.ctx.data.sceneWalk) {
        //         return base + 125 / 60;
        //     }
        // }
        return base;
    }

    /** 角色flag */
    heroFlag: string[] = [];
    /** 角色tag */
    heroTag: string[] = [];

    isAlive = true;

    /** 处理伤害 */
    handleDamage(d: BattleDamage) {
        this.ctx.object.barHideTick = this.ctx.data.frame + GConstant.battle.lifeShowTick;
        this.ctx.object.attacker = d.source.uid;
        const p = this.finalProperty;
        BattleDamage.damageSettleMent(d, p);
        d.originHp = this.hp;
        this.hp -= d.hpHurt;
        if (this.hp <= 0) {
            // if (!this.ctx.data.ctx.bossMode && this.ctx.object.objectType === GConstant.battle.battleObjectType.hero) {
            //     // 非boss模式主角锁血
            //     this.hp = 1;
            //     d.isKill = false;
            // } else {
            this.hp = 0;
            d.isKill = true;
            this.isAlive = false;
            this.ctx.data.objectDie(this.ctx.object);
            // }
        } else {
            d.isKill = false;
        }
        d.finalHp = this.hp;
        // console.log(
        //     `damage log: frame ${this.ctx.data.frame} source ${d.source.uid} -> target ${d.target.uid} hit:${d.isHit} crit:${d.isCrit} damage value: ${d.value} hp: ${d.originHp} -> ${d.finalHp}`
        // );
        this.ctx.data.pushDisplayEvent(
            new BattleDisplayEvent("damage", {
                objectUid: this.ctx.object.uid,
                data: d,
            })
        );
        this.ctx.data.addStatistics(d.source.uid, "attack", d.value);
        this.ctx.data.addStatistics(d.target.uid, "defend", d.value);
        if (d.isKill) {
            // 击杀计数
            this.ctx.data.globalPropertyManager.listenEvent("kill", 1);
            if (d.isKill) {
                this.ctx.data.globalPropertyManager.listenEvent("critKill", 1);
            }
        }
    }

    /** 处理吸血 */
    handleLifeSteal(d: BattleDamage) {
        const p = this.finalProperty;
        if (this.hp >= p.maxHp) return;
        const h = BattleHeal.createHeal(this.ctx.object, this.ctx.object, d.finalLifeSteal, p);
        this.handleHeal(h);
        // this.hp += d.finalLifeSteal;
        // if (this.hp > p.maxHp) this.hp = p.maxHp;
        // this.ctx.data.addStatistics(d.source.uid, "heal", d.finalLifeSteal);
    }

    /** 处理生命恢复 */
    handleLifeRecover() {
        const p = this.finalProperty;
        if (p.lifeRecover <= 0) return;
        if (this.hp >= p.maxHp) return;
        let recover = p.lifeRecover;
        if (this.ctx.object.teamSide === 1) {
            recover -= this.ctx.data.globalPropertyManager.finalProperty.antiLifeRecover;
        }
        if (recover > 0) {
            const h = BattleHeal.createHeal(this.ctx.object, this.ctx.object, recover, p);
            this.handleHeal(h);
            // this.hp += recover;
            // if (this.hp > p.maxHp) this.hp = p.maxHp;
            // this.ctx.data.addStatistics(this.ctx.object.uid, "heal", recover);
        }
    }

    /** 处理治疗 */
    handleHeal(h: BattleHeal) {
        const p = this.finalProperty;
        BattleHeal.healSettlement(h, p);
        h.originHp = this.hp;
        this.hp += h.value;
        if (this.hp > p.maxHp) this.hp = p.maxHp;
        h.finalHp = this.hp;
        this.ctx.data.pushDisplayEvent(
            new BattleDisplayEvent("heal", {
                objectUid: this.ctx.object.uid,
                data: h,
            })
        );
        this.ctx.data.addStatistics(h.source.uid, "heal", h.value);
    }

    /** 处理能量恢复 */
    handleEnergyRecover(r: BattleEnergyRecover) {
        const p = this.finalProperty;
        BattleEnergyRecover.energyRecoverSettlement(r, p);
        r.originEnergy = this.energy;
        this.energy += r.value;
        if (this.energy > p.maxEnergy) this.energy = p.maxEnergy;
        r.finalEnergy = this.energy;
        this.ctx.data.pushDisplayEvent(
            new BattleDisplayEvent("energyRecover", {
                objectUid: this.ctx.object.uid,
                data: r,
            })
        );
    }

    /** 处理能量减少 */
    handleEnergyReduce(r: BattleEnergyReduce) {
        const p = this.finalProperty;
        BattleEnergyReduce.energyReduceSettlement(r, p);
        r.originEnergy = this.energy;
        this.energy -= r.value;
        if (this.energy < 0) this.energy = 0;
        r.finalEnergy = this.energy;
        this.ctx.data.pushDisplayEvent(
            new BattleDisplayEvent("energyReduce", {
                objectUid: this.ctx.object.uid,
                data: r,
            })
        );
    }

    /** 普攻能量恢复 */
    normalAttackEnergyRecover() {
        const p = this.finalProperty;
        this.energy += p.energyRecover;
        if (this.energy > p.maxEnergy) this.energy = p.maxEnergy;
    }

    /** 击杀能量恢复 */
    killEnergyRecover() {
        const p = this.finalProperty;
        this.energy += p.killEnergy;
        if (this.energy > p.maxEnergy) this.energy = p.maxEnergy;
    }

    tick() {
        if (this.ctx.data.frame >= this.nextLifeRecoverFrame) {
            this.nextLifeRecoverFrame = this.ctx.data.frame + GConstant.battle.logicTickRate;
            this.handleLifeRecover();
        }
    }
}
