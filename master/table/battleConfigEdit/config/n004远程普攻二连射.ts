{
    skill1.skillCategory = "normalAttack";
    skill1.animation = "attack";
    skill1.trigger = trigger.normalAttack();
    skill1.searchTarget = target.enemyTeam.nearestLock();
    let tK0 = template.waitKeyFrame().index(0);
    let tFire = template
        .fireBullet()
        .img(spineTbl.bulletImg)
        .speed(spineTbl.bulletSpeed)
        .scale(spineTbl.bulletScale)
        .curveType(spineTbl.curveType)
        .curveParam(spineTbl.curveParam);
    tFire.target = target.enemyTeam.nearestLock();
    let tAfterBulletHit = template
        .damage()
        .value(tbl.param1)
        .tag("normalAttack")
        .addEffect(
            effect.offset(spineTbl.hitEffectOffset[0], spineTbl.hitEffectOffset[1]).effectName(spineTbl.hitEffect)
        );
    tFire.afterHit = tAfterBulletHit;
    let tK1 = template.waitKeyFrame().index(1);
    let tFire2 = template
        .fireBullet()
        .img(spineTbl.bulletImg)
        .speed(spineTbl.bulletSpeed)
        .scale(spineTbl.bulletScale)
        .curveType(spineTbl.curveType)
        .curveParam(spineTbl.curveParam);
    tFire2.target = target.enemyTeam.nearestLock();
    let tAfterBulletHit2 = template
        .damage()
        .value(tbl.param1)
        .tag("normalAttack")
        .addEffect(
            effect.offset(spineTbl.hitEffectOffset[0], spineTbl.hitEffectOffset[1]).effectName(spineTbl.hitEffect)
        );
    tFire2.afterHit = tAfterBulletHit2;
    let tWaitEnd = template.waitAnimationEnd();
    skill1.next = tK0;
    tK0.next = tFire;
    tFire.next = tK1;
    tK1.next = tFire2;
    tFire2.next = tWaitEnd;
}
