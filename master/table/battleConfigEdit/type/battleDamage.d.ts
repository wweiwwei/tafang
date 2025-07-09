declare class BattleDamageExemptBuilder {
    /** 必定命中 */
    mustHit(): this;
    /** 必定暴击 */
    mustCrit(): this;
    /** 必定破击 */
    mustPenetrate(): this;
    /** 必定溅射 */
    mustSplash(): this;
    /** 暴击无效 */
    neverCrit(): this;
    /** 破击无效 */
    neverPenetrate(): this;
    /** 格挡无效 */
    neverBlock(): this;
    /** 溅射无效 */
    neverSplash(): this;
    /** 无视增减伤 */
    ignoreDamageDefense(): this;
    /** 无视特殊增减伤 */
    ignoreSpecialDamageDefense(): this;
    /** 无视固定增减伤 */
    ignoreFixDamageDefense(): this;
    /** 无视多重减伤护盾 */
    ignoreMultiDefendShield(): this;
    /** 无视减伤护盾 */
    ignoreDefendShield(): this;
    /** 无视生命护盾 */
    ignoreLifeShield(): this;
    /** 无视法术护盾 */
    ignoreSpellShield(): this;
    /** 无视普攻护盾 */
    ignoreNormalAttackShield(): this;
    /** 无视反应护盾 */
    ignoreReactiveShield(): this;
    /** 忽视部分防御 */
    ignoreArmor(): this;
    /** 防御生效比例，需要配合忽视部分防御使用，默认是1，也就是100%，如果向让英雄忽视75%防御，则让防御只有25%效果，也就是填写0.25 */
    armorRatio(ratio: number): this;
}

declare class BattleBulletBuilder {
    /** 可选，子弹多少秒达到，默认是1 */
    time(s: number): this;
    /** 必填，子弹的图像是什么，可以填写spine名或图片名 */
    img(img: string): this;
    /** 可选，缩放比例，默认是1 */
    scale(s: number): this;
    /** 可选，spine皮肤，默认是default */
    skin(s: string): this;
    /** 可选，spine动画，默认是general_tail */
    animation(s: string): this;
}

declare let damage: {
    /** 获取豁免构建对象 */
    exempt(): BattleDamageExemptBuilder;
    /** 获取子弹构建对象 */
    bullet(): BattleBulletBuilder;
};
