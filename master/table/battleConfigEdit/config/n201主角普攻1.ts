{
    skill1.skillCategory = "normalAttack";
    skill1.animation = "attack";
    skill1.trigger = trigger.normalAttack();
    skill1.searchTarget = target.enemyTeam.nearAndEquipmentFirst(1);
    let tK0 = template.waitKeyFrame().index(0);
    let tFire = template
        .fireBullet()
        .img(spineTbl.bulletImg)
        .speed(spineTbl.bulletSpeed)
        .scale(spineTbl.bulletScale)
        .curveType(spineTbl.curveType)
        .curveParam(spineTbl.curveParam);
    tFire.target = target.enemyTeam.nearAndEquipmentFirst(1);
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
