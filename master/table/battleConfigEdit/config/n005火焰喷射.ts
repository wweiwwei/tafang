{
    skill1.skillCategory = "normalAttack";
    skill1.animation = "attack";
    skill1.trigger = trigger.normalAttack();
    skill1.searchTarget = target.enemyTeam.nearestLock();

    let tK0 = template.waitKeyFrame().index(0);
    let tFire = template.rectEffect().width(400).height(400).count(1);
    tFire.target = target.enemyTeam.nearestLock();
    let tAfterBulletHit = template
        .damage()
        .value(tbl.param1)
        .tag("normalAttack")
        .addEffect(
            effect.offset(spineTbl.hitEffectOffset[0], spineTbl.hitEffectOffset[1]).effectName(spineTbl.hitEffect)
        );
    tFire.afterHit = tAfterBulletHit;
    let tWaitEnd = template.waitAnimationEnd();
    skill1.next = tK0;
    tK0.next = tFire;
    tFire.next = tWaitEnd;
}
