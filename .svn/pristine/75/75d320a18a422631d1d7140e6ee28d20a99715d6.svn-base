import { BattleBattleStageObject } from "../../Object/BattleStage/BattleBattleStageObject";
import { BattleSkill } from "../BattleSkill";
import { BattleTargetSearch } from "../Target/BattleTargetSearch";
import { BattleSkillTemplateRectEffect } from "../Template/BattleSkillTemplateRectEffect";
import { BattleBulletBuilder } from "./Damage/BattleBulletBuilder";
import { BattleDamageExemptBuilder } from "./Damage/BattleDamageExemptBuilder";
import { BattleEffectBuilder } from "./Effect/BattleEffectBuilder";
import { BattleSkillBuilder } from "./Skill/BattleSkillBuilder";
import { BattleTargetBuilder } from "./Target/BattleTargetBuilder";
import { BattleSkillTemplateAddBuffBuilder } from "./Template/BattleSkillTemplateAddBuffBuilder";
import { BattleSkillTemplateAddStateBuilder } from "./Template/BattleSkillTemplateAddStateBuilder";
import { BattleSkillTemplateAuraBuilder } from "./Template/BattleSkillTemplateAuraBuilder";
import { BattleSkillTemplateDamageBuilder } from "./Template/BattleSkillTemplateDamageBuilder";
import { BattleSkillTemplateDispelBuilder } from "./Template/BattleSkillTemplateDispelBuilder";
import { BattleSkillTemplateDotAreaBuilder } from "./Template/BattleSkillTemplateDotAreaBuilder";
import { BattleSkillTemplateRectEffectBuilder } from "./Template/BattleSkillTemplateRectEffectBuilder";
import { BattleSkillTemplateEnergyRecoverBuilder } from "./Template/BattleSkillTemplateEnergyRecoverBuilder";
import { BattleSkillTemplateEnergyReduceBuilder } from "./Template/BattleSkillTemplateEnergyReduceBuilder";
import { BattleSkillTemplateEnergyTranslateBuilder } from "./Template/BattleSkillTemplateEnergyTranslateBuilder";
import { BattleSkillTemplateExplosionBuilder } from "./Template/BattleSkillTemplateExplosionBuilder";
import { BattleSkillTemplateFireBulletBuilder } from "./Template/BattleSkillTemplateFireBulletBuilder";
import { BattleSkillTemplateGroupBuilder } from "./Template/BattleSkillTemplateGroupBuilder";
import { BattleSkillTemplateHookDamageBuilder } from "./Template/BattleSkillTemplateHookDamageBuilder";
import { BattleSkillTemplateKeyFrameLoopBuilder } from "./Template/BattleSkillTemplateKeyFrameLoopBuilder";
import { BattleSkillTemplateLaserBuilder } from "./Template/BattleSkillTemplateLaserBuilder";
import { BattleSkillTemplateLifeRecoverBuilder } from "./Template/BattleSkillTemplateLifeRecoverBuilder";
import { BattleSkillTemplateLightningChainBuilder } from "./Template/BattleSkillTemplateLightningChainBuilder";
import { BattleSkillTemplateReviveBuilder } from "./Template/BattleSkillTemplateReviveBuilder";
import { BattleSkillTemplateWaitAnimationEndBuilder } from "./Template/BattleSkillTemplateWaitAnimationEndBuilder";
import { BattleSkillTemplateWaitKeyFrameBuilder } from "./Template/BattleSkillTemplateWaitKeyFrameBuilder";
import { BattleTriggerBuilder } from "./Trigger/BattleTriggerBuilder";
import { BattleSkillTemplateRepulseBuilder } from "./Template/BattleSkillTemplateRepulseBuilder";
import { BattleObjectInfoSkill } from "../../Object/BattleStage/BattleObjectInfo";

export class BattleBuilderEnv {
    private static availableEvent: (string | symbol)[] = [
        "hpZero",
        "beforeDamageSettle",
        "beforeReceiveDamageSettle",
        "afterDamageSettle",
        "afterReceiveDamageSettle",
        "hurt",
        "kill",
        "roundBegin",
        "roundEnd",
        "prepareMainSkill",
        "afterNormalAttack",
    ];
    private static availableState: (string | symbol)[] = [
        "stupor",
        "disarm",
        "silence",
        "invincible",
        "unyielding",
        "burn",
        "poison",
        "poisonWithExplosion",
        "healing",
        "energyLeak",
        "lifeShield",
    ];

    private static propertyKeys: (string | symbol)[] = [
        "hp",
        "energy",
        "hurt",
        "heroFlag",
        "star",
        "rank",
        "quality",
        "level",
        "hpRate",
        "energyRate",
        "heroIndex",
        "attack",
        "armor",
        "maxHp",
        "maxEnergy",
        "initialEnergy",
        "killEnergy",
        "energyRecover",
        "hitEnergyRecover",
        "hit",
        "dodge",
        "critical",
        "criticalImmune",
        "criticalDamage",
        "criticalResistant",
        "damage",
        "defence",
        "healFactor",
        "recoverFactor",
        "moveSpeed",
    ];
    private static getEventProxy() {
        return new Proxy(
            {},
            {
                get: (target, str, receiver) => {
                    if (!this.availableEvent.includes(str)) {
                        throw Error(`${str.toString()} is not valid event`);
                    }
                    return str;
                },
            }
        );
    }
    private static getPropertyProxy() {
        return new Proxy(
            {},
            {
                get: (target, str, receiver) => {
                    if (!this.propertyKeys.includes(str)) {
                        throw Error(`${str.toString()} is not valid property`);
                    }
                    return str;
                },
            }
        );
    }
    private static getStateProxy() {
        return new Proxy(
            {},
            {
                get: (target, str, receiver) => {
                    if (!this.availableState.includes(str)) {
                        throw Error(`${str.toString()} is not valid state`);
                    }
                    return str;
                },
            }
        );
    }
    private static getTargetProxy() {
        return new Proxy(
            {},
            {
                get: (target, str, receiver) => {
                    if (!BattleTargetBuilder.availableBaseTargets.includes(str as string)) {
                        throw Error(`${str.toString()} is not valid baseTarget`);
                    }
                    const baseTarget = str as string;
                    const _processList: { kind: string; param: any[] }[] = [];
                    const proxy = new Proxy(
                        {},
                        {
                            get: (target, kind, receiver) => {
                                if (kind === "build") {
                                    return () => {
                                        return new BattleTargetSearch(baseTarget, _processList);
                                    };
                                } else {
                                    return (...param: any[]) => {
                                        _processList.push({ kind: kind as string, param });
                                        return proxy;
                                    };
                                }
                            },
                        }
                    );
                    return proxy;
                },
            }
        );
    }
    private static getTriggerProxy() {
        return new Proxy(
            {},
            {
                get: (target, kind, receiver) => {
                    return (...param: any[]) => {
                        return new BattleTriggerBuilder(kind as string, param);
                    };
                },
            }
        );
    }
    private static getTemplateProxy() {
        return new Proxy(
            {},
            {
                get: (target, kind, receiver) => {
                    return (...param: any[]) => {
                        if (kind === "damage") {
                            return new BattleSkillTemplateDamageBuilder();
                        } else if (kind === "lifeRecover") {
                            return new BattleSkillTemplateLifeRecoverBuilder();
                        } else if (kind === "energyRecover") {
                            return new BattleSkillTemplateEnergyRecoverBuilder();
                        } else if (kind === "energyReduce") {
                            return new BattleSkillTemplateEnergyReduceBuilder();
                        } else if (kind === "energyTranslate") {
                            return new BattleSkillTemplateEnergyTranslateBuilder();
                        } else if (kind === "addState") {
                            return new BattleSkillTemplateAddStateBuilder();
                        } else if (kind === "addBuff") {
                            return new BattleSkillTemplateAddBuffBuilder();
                        } else if (kind === "aura") {
                            return new BattleSkillTemplateAuraBuilder();
                        } else if (kind === "hookDamage") {
                            return new BattleSkillTemplateHookDamageBuilder();
                        } else if (kind === "revive") {
                            return new BattleSkillTemplateReviveBuilder();
                        } else if (kind === "dispel") {
                            return new BattleSkillTemplateDispelBuilder();
                        } else if (kind === "group") {
                            return new BattleSkillTemplateGroupBuilder();
                        } else if (kind === "waitKeyFrame") {
                            return new BattleSkillTemplateWaitKeyFrameBuilder();
                        } else if (kind === "waitAnimationEnd") {
                            return new BattleSkillTemplateWaitAnimationEndBuilder();
                        } else if (kind === "keyFrameLoop") {
                            return new BattleSkillTemplateKeyFrameLoopBuilder();
                        } else if (kind === "fireBullet") {
                            return new BattleSkillTemplateFireBulletBuilder();
                        } else if (kind === "lightningChain") {
                            return new BattleSkillTemplateLightningChainBuilder();
                        } else if (kind === "explosion") {
                            return new BattleSkillTemplateExplosionBuilder();
                        } else if (kind === "rectEffect") {
                            return new BattleSkillTemplateRectEffectBuilder();
                        } else if (kind === "dotArea") {
                            return new BattleSkillTemplateDotAreaBuilder();
                        } else if (kind === "laser") {
                            return new BattleSkillTemplateLaserBuilder();
                        } else if (kind === "repulse") {
                            return new BattleSkillTemplateRepulseBuilder();
                        } else {
                            throw Error(`${kind.toString()} is not valid template`);
                        }
                    };
                },
            }
        );
    }
    static getSkills(
        id: number,
        skillInfo: BattleObjectInfoSkill,
        level: number,
        obj: BattleBattleStageObject,
        spineTbl: SpineInfoTbl
    ): BattleSkill[] {
        const tbl = GTable.getById("BattleSkillTbl", id);
        if (tbl.config.length === 0) return [];
        const list = [
            new BattleSkillBuilder(),
            new BattleSkillBuilder(),
            new BattleSkillBuilder(),
            new BattleSkillBuilder(),
            new BattleSkillBuilder(),
        ];
        const env = new BattleBuilderEnv(tbl, list[0], list[1], list[2], list[3], list[4], obj, spineTbl);
        let script = GTable.getBattleScript(tbl.config);
        obj.info.talent.forEach((tId) => {
            const talentTbl = GTable.getById("PlayerSkillTalentTbl", tId);
            if (
                talentTbl.scriptFrag.length > 0 &&
                talentTbl.slot.length > 0 &&
                talentTbl.templateLimit.includes(tbl.config)
            ) {
                script = script.replace(`//#include ${talentTbl.slot}`, talentTbl.scriptFrag + "\n");
            }
        });
        AstUtil.eval(script, [env]);
        return list.filter((b) => b.canBuild()).map((x) => x.build(obj, skillInfo, id, level));
    }

    constructor(
        public tbl: BattleSkillTbl,
        public skill1: BattleSkillBuilder,
        public skill2: BattleSkillBuilder,
        public skill3: BattleSkillBuilder,
        public skill4: BattleSkillBuilder,
        public skill5: BattleSkillBuilder,
        public _contextObj: BattleBattleStageObject,
        public spineTbl: SpineInfoTbl
    ) {}
    /** 事件 */
    event = BattleBuilderEnv.getEventProxy();
    /** 属性 */
    property = BattleBuilderEnv.getPropertyProxy();
    /** 状态 */
    state = BattleBuilderEnv.getStateProxy();
    /** 目标机制 */
    target = BattleBuilderEnv.getTargetProxy();
    /** 触发机制 */
    trigger = BattleBuilderEnv.getTriggerProxy();
    /** 技能模板 */
    template = BattleBuilderEnv.getTemplateProxy();
    /** 伤害设置模板 */
    damage = {
        exempt() {
            return new BattleDamageExemptBuilder();
        },
        bullet() {
            return new BattleBulletBuilder();
        },
    };
    /** 特效模板 */
    get effect() {
        return new BattleEffectBuilder();
    }

    get condition() {
        return {
            checkFlag: (flag: string) => {
                return this._contextObj.propertyManager.heroFlag.includes(flag);
            },
        };
    }
}
