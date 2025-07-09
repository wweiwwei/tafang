{
    skill1.skillCategory = "normalAttack";
    skill1.animation = "attack";
    skill1.trigger = trigger.normalAttack();
    skill1.searchTarget = target.enemyTeam.near(1);

    let bulletCount = Number(tbl.param2);
    let damageRatio = Number(tbl.param1);
    let explosionRange = 50;
    let explosionProbability = 0;
    //#include s1
    //#include s2
    //#include s3
    //#include s4
    //#include s5
    //#include s6

    // 等待事件帧
    let tK0 = template.waitKeyFrame().index(0);
    // 等待动作结束
    let tWaitEnd = template.waitAnimationEnd();
    let tDamage = template.damage().value("self.attack*" + damageRatio);
    tDamage.target = target.enemyTeam.range(skill1.range).near(bulletCount);
    skill1.next = tK0;
    tK0.next = tDamage;
    tDamage.next = tWaitEnd;
    tDamage.addEffect(
        effect.offset(0, 0).effectName("fan_generaltail").effectAnimation("skillattack").positionType("target").scale(1)
    );
    if (explosionProbability > 0) {
        let tExplosion = template.explosion().range(explosionRange);
        let tDamage2 = template.damage().value("self.attack*0.4");
        tDamage.afterHit = tExplosion;
        tExplosion.afterHit = tDamage2;
        tDamage.afterHitProbability = explosionProbability;
    }
}
