import { memory } from "../../framework/Decorator";
import { EnumHeroProperty } from "../config/GEnum";
import Item from "./Item";

export class BattleCar {
    /** 战车id */
    id: number;
    /** 战车等级 */
    level: number;
    /** 战车装备，如果没有装备值为null */
    equipment: { id: number; level: number }[];

    get rank() {
        return 0;
    }
    get star() {
        return 0;
    }
    /**获取表数据 */
    private getTbl() {
        const tbl = GTable.getById("CarTbl", this.id);
        return tbl;
    }
    /**获取下一等级 */
    getNextLevel() {
        const res = GUtils.ts.shallowCopy(this);
        res.level += 1;
        return res;
    }
    /** 获取战车品质 */
    getQuality() {
        return this.getTbl().quality;
    }

    /** 获取战车名称 */
    getName() {
        return this.getTbl().name;
    }

    /** 获取战车描述 */
    getDescription() {
        return this.getTbl().description;
    }

    /** 获取战车技能表 */
    getMainSkillTbl() {
        return GTable.getById("CarSkillTbl", this.getTbl().mainSkill);
    }
    /** 获取属性 */
    @memory
    getProperty(key: EnumHeroProperty): number {
        return Math.round(this.baseCalculate(key));
    }

    /** 基础属性计算 */
    baseCalculate(key: EnumHeroProperty): number {
        // todo 计算升阶和装备属性
        const tbl = this.getTbl();
        switch (key) {
            case "attack":
            case "armor":
            case "maxHp": {
                const f = tbl[key];
                const env = [{ lv: this.level }];
                return AstUtil.eval(f, env);
            }
            case "maxEnergy":
            case "initialEnergy":
            case "killEnergy":
            case "energyRecover":
            case "hitEnergyRecover":
            case "hit":
            case "dodge":
            case "critical":
            case "criticalImmune":
            case "criticalDamage":
            case "criticalResistant":
            case "damage":
            case "defence":
            case "block":
            case "penetrate":
            case "blockDefence":
            case "penetrateDamage":
            case "fixDamage":
            case "fixDefense":
            case "ignoreDodge":
            case "revive":
                return GIndex.battle.battleDefault(key);
            case "healFactor":
                return 10000;
            case "recoverFactor":
                return 10000;
            case "moveSpeed":
                return 0;
            case "normalAttackSpeed":
                return 10000;
            case "normalAttackRange":
                return 0;
            case "normalAttackInterval":
                return 0;
            default:
                throw new Error("illegal property key " + key);
        }
    }

    /** 获取战车升级需求，达到最大等级时返回null */
    getUpgradeRequire(): Item[] | null {
        const tbl = GTable.getList("CarLevelTbl").find((t) => t.level[0] <= this.level && t.level[1] >= this.level);
        if (tbl) {
            const env = [{ lv: this.level }];
            return [
                new Item(GConstant.carExpId, AstUtil.eval(tbl.require, env)),
                new Item(GIndex.id.coinId, AstUtil.eval(tbl.coinCost, env)),
            ];
        } else {
            return null;
        }
    }
}
