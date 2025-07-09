export class BattleDamageExemptBuilder {
    _mustHit: boolean = false;
    /** 必定命中 */
    mustHit(): this {
        this._mustHit = true;
        return this;
    }
    _mustCrit: boolean = false;
    /** 必定暴击 */
    mustCrit(): this {
        this._mustCrit = true;
        return this;
    }
    _mustPenetrate: boolean = false;
    /** 必定破击 */
    mustPenetrate(): this {
        this._mustPenetrate = true;
        return this;
    }
    _mustSplash: boolean = false;
    /** 必定溅射 */
    mustSplash(): this {
        this._mustSplash = true;
        return this;
    }
    _neverCrit: boolean = false;
    /** 暴击无效 */
    neverCrit(): this {
        this._neverCrit = true;
        return this;
    }
    _neverPenetrate: boolean = false;
    /** 破击无效 */
    neverPenetrate(): this {
        this._neverPenetrate = true;
        return this;
    }
    _neverBlock: boolean = false;
    /** 格挡无效 */
    neverBlock(): this {
        this._neverBlock = true;
        return this;
    }
    _neverSplash: boolean = false;
    /** 溅射无效 */
    neverSplash(): this {
        this._neverSplash = true;
        return this;
    }
    _ignoreDamageDefense: boolean = false;
    /** 无视增减伤 */
    ignoreDamageDefense(): this {
        this._ignoreDamageDefense = true;
        return this;
    }
    _ignoreSpecialDamageDefense: boolean = false;
    /** 无视特殊增减伤 */
    ignoreSpecialDamageDefense(): this {
        this._ignoreSpecialDamageDefense = true;
        return this;
    }
    _ignoreFixDamageDefense: boolean = false;
    /** 无视固定增减伤 */
    ignoreFixDamageDefense(): this {
        this._ignoreFixDamageDefense = true;
        return this;
    }
    _ignoreMultiDefendShield: boolean = false;
    /** 无视多重减伤护盾 */
    ignoreMultiDefendShield(): this {
        this._ignoreMultiDefendShield = true;
        return this;
    }
    _ignoreDefendShield: boolean = false;
    /** 无视减伤护盾 */
    ignoreDefendShield(): this {
        this._ignoreDefendShield = true;
        return this;
    }
    _ignoreLifeShield: boolean = false;
    /** 无视生命护盾 */
    ignoreLifeShield(): this {
        this._ignoreLifeShield = true;
        return this;
    }
    _ignoreSpellShield: boolean = false;
    /** 无视法术护盾 */
    ignoreSpellShield(): this {
        this._ignoreSpellShield = true;
        return this;
    }
    _ignoreNormalAttackShield: boolean = false;
    /** 无视普攻护盾 */
    ignoreNormalAttackShield(): this {
        this._ignoreNormalAttackShield = true;
        return this;
    }
    _ignoreReactiveShield: boolean = false;
    /** 无视反应护盾 */
    ignoreReactiveShield(): this {
        this._ignoreReactiveShield = true;
        return this;
    }
    _ignoreArmor: boolean = false;
    /** 忽视部分防御 */
    ignoreArmor(): this {
        this._ignoreArmor = true;
        return this;
    }
    _armorRatio: number = 1;
    /** 防御生效比例，需要配合忽视部分防御使用，默认是1，也就是100%，如果向让英雄忽视75%防御，则让防御只有25%效果，也就是填写0.25 */
    armorRatio(ratio: number): this {
        this._armorRatio = ratio;
        return this;
    }

    build() {
        return {
            mustHit: this._mustHit,
            mustCrit: this._mustCrit,
            mustPenetrate: this._mustPenetrate,
            mustSplash: this._mustSplash,
            neverCrit: this._neverCrit,
            neverPenetrate: this._neverPenetrate,
            neverBlock: this._neverBlock,
            neverSplash: this._neverSplash,
            ignoreDamageDefense: this._ignoreDamageDefense,
            ignoreSpecialDamageDefense: this._ignoreSpecialDamageDefense,
            ignoreFixDamageDefense: this._ignoreFixDamageDefense,
            ignoreMultiDefendShield: this._ignoreMultiDefendShield,
            ignoreDefendShield: this._ignoreDefendShield,
            ignoreLifeShield: this._ignoreLifeShield,
            ignoreSpellShield: this._ignoreSpellShield,
            ignoreNormalAttackShield: this._ignoreNormalAttackShield,
            ignoreReactiveShield: this._ignoreReactiveShield,
            ignoreArmor: this._ignoreArmor,
            armorRatio: this._armorRatio,
        };
    }
}
