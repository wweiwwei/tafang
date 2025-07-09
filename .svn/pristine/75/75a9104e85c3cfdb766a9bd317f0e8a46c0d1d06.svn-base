import { BattleBattleStageObject } from "../Object/BattleStage/BattleBattleStageObject";
import { BattleProperty } from "../Object/BattleStage/BattleProperty";
import { BattleBattleStageContext } from "../Processor/BattleBattleStageContext";

export class BattleDamage {
    constructor() {}
    /** 取消事件 */
    public withoutEvent: boolean = false;
    /** 伤害文本设置 */
    public damageText: string;
    // 来源信息
    /** 伤害来源 */
    public source: BattleBattleStageObject;
    /** 伤害目标 */
    public target: BattleBattleStageObject;
    /** 基础伤害数值 */
    private baseValue: number;
    /** 命中偏移量 */
    private hitBias: number;
    /** 暴击偏移 */
    private critBias: number;
    /** 连击偏移 */
    private comboBias: number;
    /** 击晕偏移 */
    private stunBias: number;
    /** 暴击伤害系数 */
    private critDamage: number;
    /** 增伤 */
    private damage: number;
    /** 吸血 */
    private lifeSteal: number;
    /** 特殊增伤 */
    private specialDamage: number;
    /** 特殊攻击增加 */
    private specialAttack: number;
    /** 伤害tag */
    public tag: string[];
    /** 破击率 */
    private penetrate: number;
    /** 破击格挡判定的随机量 */
    private penetrateRandom: number;
    /** 破击增伤 */
    private penetrateDamage: number;
    /** 固定增伤 */
    private fixDamage: number;
    /** 无视闪避偏移 */
    private ignoreDodgeBias: number;
    /** 豁免机制 */
    private exempt: {
        /** 必定命中 */
        mustHit?: boolean;
        /** 必定暴击 */
        mustCrit?: boolean;
        /** 必定破击 */
        mustPenetrate?: boolean;
        /** 必定溅射 */
        mustSplash?: boolean;
        /** 暴击无效 */
        neverCrit?: boolean;
        /** 破击无效 */
        neverPenetrate?: boolean;
        /** 格挡无效 */
        neverBlock?: boolean;
        /** 溅射无效 */
        neverSplash?: boolean;
        /** 无视增减伤 */
        ignoreDamageDefense?: boolean;
        /** 无视特殊增减伤 */
        ignoreSpecialDamageDefense?: boolean;
        /** 无视固定增减伤 */
        ignoreFixDamageDefense?: boolean;
        /** 无视多重减伤护盾 */
        ignoreMultiDefendShield?: boolean;
        /** 无视减伤护盾 */
        ignoreDefendShield?: boolean;
        /** 无视生命护盾 */
        ignoreLifeShield?: boolean;
        /** 无视法术护盾 */
        ignoreSpellShield?: boolean;
        /** 无视普攻护盾 */
        ignoreNormalAttackShield?: boolean;
        /** 无视反应护盾 */
        ignoreReactiveShield?: boolean;
        /** 无视防御 */
        ignoreArmor?: boolean;
    };
    /** 来源是否溅射 */
    public isSplash: boolean;

    // 后续结果
    /** 是否命中 */
    public isHit: boolean;
    /** 是否暴击 */
    public isCrit: boolean;
    /** 是否破击 */
    public isPenetrate: boolean;
    /** 是否格挡 */
    public isBlock: boolean;
    /** 是否连击 */
    public isCombo: boolean;
    /** 展示连击标志 */
    public showCombo: boolean;
    /** 是否击晕 */
    public isStun: boolean;
    /** 最终伤害值 */
    public value: number;
    /** 生命值损伤 */
    public hpHurt: number;
    /** 是否击杀 */
    public isKill: boolean;
    /** 原生命值 */
    public originHp: number;
    /** 最终生命值 */
    public finalHp: number;
    /** 最终吸血 */
    public finalLifeSteal: number;

    /** 燃烧和毒的伤害的豁免设定 */
    static dotExempt = {
        mustHit: true,
        neverCrit: true,
        neverPenetrate: true,
        neverBlock: true,
        neverSplash: true,
        ignoreDamageDefense: true,
        ignoreSpecialDamageDefense: true,
        ignoreFixDamageDefense: true,
        ignoreMultiDefendShield: true,
        ignoreDefendShield: true,
        ignoreNormalAttackShield: true,
        ignoreReactiveShield: true,
        ignoreArmor: true,
    };

    static createDamage(
        p: BattleProperty,
        o: BattleBattleStageObject,
        ctx: BattleBattleStageContext,
        value: number,
        tag: string[],
        exempt: any,
        isSplash: boolean
    ) {
        const d = new BattleDamage();
        d.source = ctx.object;
        d.target = o;
        d.baseValue = value;
        d.hitBias = p.hit + ctx.data.sr.nextInt(0, 9999);
        d.tag = tag.map((t) => t);
        // if (d.tag.includes("normalAttack")) {
        d.critBias = p.critical + ctx.data.sr.nextInt(0, 9999);
        // } else {
        //     d.critBias = 0;
        // }
        d.critDamage = p.criticalDamage;
        d.damage = p.damage;
        d.tag = tag;
        const damageTagDamage = d.tag.map((t) => p.specialDamage[t] ?? 0).reduce((a, b) => a + b, 0);
        const heroTagDamage = d.target.propertyManager.heroTag
            .map((t) => p.specialDamageByHeroTag[t] ?? 0)
            .reduce((a, b) => a + b, 0);
        d.specialDamage = damageTagDamage + heroTagDamage;
        const damageTagAttack = d.tag.map((t) => p.specialAttack[t] ?? 0).reduce((a, b) => a + b, 0);
        d.specialAttack = damageTagAttack;
        d.penetrate = p.penetrate;
        d.penetrateRandom = ctx.data.sr.nextInt(0, 9999);
        d.penetrateDamage = p.penetrateDamage;
        d.fixDamage = p.fixDamage;
        d.comboBias = tag.includes("normalAttack") ? p.combo + ctx.data.sr.nextInt(0, 9999) : 0;
        d.stunBias = tag.includes("normalAttack") ? p.stun + ctx.data.sr.nextInt(0, 9999) : 0;
        d.lifeSteal = tag.includes("normalAttack") ? p.lifeSteal : 0;
        d.ignoreDodgeBias = p.ignoreDodge + ctx.data.sr.nextInt(0, 9999);
        d.isSplash = isSplash;
        d.exempt = exempt;
        return d;
    }

    /** 伤害结算，会直接修改传入的伤害对象 */
    static damageSettleMent(d: BattleDamage, p: BattleProperty) {
        this.specialAttackSettlement(d, p);
        this.hitSettlement(d, p);
        if (!d.isHit) {
            d.value = 0;
            d.hpHurt = 0;
            return;
        }
        this.comboSettlement(d, p);
        this.stunSettlement(d, p);
        d.value = d.baseValue;
        // this.multiLayerDefendShieldSettlement(d, p);
        this.armorSettlement(d, p);
        this.damageDefendSettlement(d, p);
        this.specialDamageDefendSettlement(d, p);
        // this.defendShieldSettlement(d, p);
        this.critSettlement(d, p);
        // this.penetrateSettlement(d, p);
        this.fixDamageDefendSettlement(d, p);
        d.value = Math.ceil(d.value);
        d.value = d.value > 1 ? d.value : 1;
        d.hpHurt = d.value;
        // this.normalAttackShieldSettlement(d, p);
        // this.spellShieldSettlement(d, p);
        this.lifeShieldSettlement(d, p);
        this.lifeStealSettlement(d, p);
        // this.reactiveShieldSettlement(d, p);
    }

    private static armorSettlement(d: BattleDamage, p: BattleProperty) {
        if (d.exempt.ignoreArmor) return;
        d.value -= p.armor;
    }

    private static lifeStealSettlement(d: BattleDamage, p: BattleProperty) {
        const lifeSteal = d.lifeSteal - p.antiLifeSteal;
        d.finalLifeSteal = Math.round(lifeSteal > 0 ? d.hpHurt * lifeSteal * 0.0001 : 0);
    }

    /** 多层减伤护盾结算 */
    private static multiLayerDefendShieldSettlement(d: BattleDamage, p: BattleProperty) {
        if (d.exempt.ignoreMultiDefendShield) return;
        const sList = p.ctx.stateManager.getMultiLayerDefendShield();
        sList.forEach((s) => s.handleDamage(d));
    }

    /** 生命护盾结算 */
    private static lifeShieldSettlement(d: BattleDamage, p: BattleProperty) {
        if (d.exempt.ignoreLifeShield) return;
        const sList = p.ctx.stateManager.getLifeShield();
        sList.forEach((s) => s.handleDamage(d));
    }

    /** 减伤护盾结算 */
    private static defendShieldSettlement(d: BattleDamage, p: BattleProperty) {
        if (d.exempt.ignoreDefendShield) return;
        const sList = p.ctx.stateManager.getDefendShield();
        sList.forEach((s) => s.handleDamage(d));
    }

    /** 法术护盾结算 */
    private static spellShieldSettlement(d: BattleDamage, p: BattleProperty) {
        if (d.exempt.ignoreSpellShield) return;
        if (!d.tag.includes("spell")) return;
        const sList = p.ctx.stateManager.getSpellShield();
        sList.forEach((s) => s.handleDamage(d));
    }

    /** 普攻护盾结算 */
    private static normalAttackShieldSettlement(d: BattleDamage, p: BattleProperty) {
        if (d.exempt.ignoreNormalAttackShield) return;
        if (!d.tag.includes("normalAttack")) return;
        const sList = p.ctx.stateManager.getAttackShield();
        sList.forEach((s) => s.handleDamage(d));
    }

    /** 反应护盾结算 */
    private static reactiveShieldSettlement(d: BattleDamage, p: BattleProperty) {
        if (d.exempt.ignoreReactiveShield) return;
        const sList = p.ctx.stateManager.getSpellShield();
        sList.forEach((s) => s.handleDamage(d));
    }

    /** 命中结算 */
    private static hitSettlement(d: BattleDamage, p: BattleProperty) {
        d.isHit = d.exempt.mustHit || d.ignoreDodgeBias >= 10000 || d.hitBias - p.dodge >= 10000;
        if (d.isHit) {
            d.value = 0;
            d.hpHurt = 0;
        }
    }

    /** 增减伤结算 */
    private static damageDefendSettlement(d: BattleDamage, p: BattleProperty) {
        if (d.exempt.ignoreDamageDefense) return;
        const gp = p.ctx.ctx.data.globalPropertyManager.finalProperty;
        const isDeBuff = gp.antiSpeed > 0 || p.ctx.ctx.object.hasDebuff();
        const isSlow = gp.antiSpeed > 0 || p.ctx.ctx.object.isSlow();
        const extraDamage = gp.extraDamage + (isDeBuff ? gp.debuffExtraDamage : 0) + (isSlow ? gp.slowExtraDamage : 0);
        const rate = (10000 + d.damage + extraDamage - p.defence) * 0.0001;
        d.value *= rate > 0 ? rate : 0;
    }

    /** 特殊伤害结算 */
    private static specialDamageDefendSettlement(d: BattleDamage, p: BattleProperty) {
        if (d.exempt.ignoreSpecialDamageDefense) return;
        const damageTagDefense = d.tag.map((t) => p.specialDefence[t] ?? 0).reduce((a, b) => a + b, 0);
        const heroTagDefence = d.source.propertyManager.heroTag
            .map((t) => p.specialDefenceByHeroTag[t] ?? 0)
            .reduce((a, b) => a + b, 0);
        const rate = (10000 + d.specialDamage - damageTagDefense - heroTagDefence) * 0.0001;
        d.value *= rate > 0 ? rate : 0;
    }
    /** 特殊伤害结算 */
    private static specialAttackSettlement(d: BattleDamage, p: BattleProperty) {
        d.value += d.specialAttack;
    }
    /** 暴击结算 */
    private static critSettlement(d: BattleDamage, p: BattleProperty) {
        if (d.exempt.neverCrit) {
            d.isCrit = false;
            return;
        }
        // if (d.tag.includes("normalAttack")) {
        const gp = p.ctx.ctx.data.globalPropertyManager.finalProperty;
        const isDeBuff = gp.antiSpeed > 0 || p.ctx.ctx.object.hasDebuff();
        const isSlow = gp.antiSpeed > 0 || p.ctx.ctx.object.isSlow();
        const extraCrit = gp.extraCrit + (isDeBuff ? gp.debuffExtraCrit : 0) + (isSlow ? gp.slowExtraCrit : 0);
        d.isCrit = d.exempt.mustCrit || d.critBias + extraCrit - p.criticalImmune >= 10000;
        // } else {
        //     d.isCrit = false;
        // }
        if (d.isCrit) {
            const extraCritDamage =
                gp.extraCritDamage + (isDeBuff ? gp.debuffExtraCritDamage : 0) + (isSlow ? gp.slowExtraCritDamage : 0);
            const rate = (d.critDamage + extraCritDamage - p.criticalResistant) * 0.0001;
            d.value *= rate > 1 ? rate : 1;
        }
    }
    /** 连击结算 */
    private static comboSettlement(d: BattleDamage, p: BattleProperty) {
        d.isCombo = d.comboBias - p.antiCombo >= 10000;
    }
    /** 击晕结算 */
    private static stunSettlement(d: BattleDamage, p: BattleProperty) {
        d.isStun = d.stunBias - p.antiStun >= 10000;
    }
    /** 破击格挡结算 */
    private static penetrateSettlement(d: BattleDamage, p: BattleProperty) {
        if (d.exempt.mustPenetrate || d.penetrate > p.block) {
            d.isPenetrate = !d.exempt.neverPenetrate && d.penetrateRandom + d.penetrate - p.block >= 10000;
            d.isBlock = false;
        } else {
            d.isPenetrate = false;
            d.isBlock = !d.exempt.neverBlock && d.penetrateRandom + p.block - d.penetrate >= 10000;
        }
        if (d.isPenetrate) {
            const rate = (10000 + d.penetrateDamage) * 0.0001;
            d.value *= rate > 1 ? rate : 1;
        }
        if (d.isBlock) {
            const rate = (10000 - p.blockDefence) * 0.0001;
            d.value *= rate > 0 ? rate : 0;
        }
    }

    /** 固定增减伤结算 */
    private static fixDamageDefendSettlement(d: BattleDamage, p: BattleProperty) {
        if (d.exempt.ignoreFixDamageDefense) return;
        d.value += d.fixDamage - p.fixDefense;
    }
}
