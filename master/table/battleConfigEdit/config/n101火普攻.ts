{
    skill1.skillCategory = "normalAttack";
    skill1.animation = "attack";
    skill1.trigger = trigger.normalAttack();
    skill1.searchTarget = target.enemyTeam.near(1);

    let bulletCount = 1;
    let damageRatio = Number(tbl.param1);
    let explosionRange = 100;
    let explosionDamageRatio = 0;
    //#include s1
    //#include s2
    //#include s3
    //#include s4
    //#include s5
    //#include s6

    let tK0 = template.waitKeyFrame().index(0);
    let tFire = template
        .fireBullet()
        .img(spineTbl.bulletImg)
        .speed(spineTbl.bulletSpeed)
        .scale(spineTbl.bulletScale)
        .curveType(spineTbl.curveType)
        .curveParam(spineTbl.curveParam)
        .focusMode()
        .interval(100)
        .count(bulletCount);
    tFire.target = target.enemyTeam.near(1);
    let tAfterBulletHit = template
        .damage()
        .value("self.attack*" + damageRatio)
        .tag("normalAttack")
        .addEffect(
            effect.offset(spineTbl.hitEffectOffset[0], spineTbl.hitEffectOffset[1]).effectName(spineTbl.hitEffect)
        );
    tFire.afterHit = tAfterBulletHit;
    let tWaitEnd = template.waitAnimationEnd();
    skill1.next = tK0;
    tK0.next = tFire;
    tFire.next = tWaitEnd;
    if (explosionDamageRatio > 0) {
        let tExplosion = template.explosion().range(explosionRange);
        let tDamage2 = template.damage().value("self.attack*" + explosionDamageRatio);
        tAfterBulletHit.afterHit = tExplosion;
        tExplosion.afterHit = tDamage2;
    }
}
