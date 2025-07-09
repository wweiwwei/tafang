{
    skill1.skillCategory = "main";
    skill1.animation = "skill";
    skill1.trigger = trigger.coldDown(Number(tbl.param1));
    skill1.searchTarget = target.enemyTeam.nearestLock();
    skill1.range = 500;

    let damageRatio = Number(tbl.param2);

    //#include s1
    //#include s2
    //#include s3
    //#include s4
    //#include s5
    //#include s6

    let tK0 = template.waitKeyFrame().index(0);
    let tFire = template
        .rectEffect()
        .width(500)
        .height(400)
        .count(5)
        .interval(265)
        .addEffectWithControl(effect.effectName("toaster_skilltail").effectAnimation("general_tail").offset(15, 30));
    tFire.target = target.enemyTeam.nearestLock();
    let tAfterBulletHit = template
        .damage()
        .tag("skill")
        .value("self.attack*" + damageRatio)
        .addEffect(
            effect.offset(spineTbl.hitEffectOffset[0], spineTbl.hitEffectOffset[1]).effectName(spineTbl.hitEffect)
        );
    tFire.afterHit = tAfterBulletHit;
    let tWaitEnd = template.waitAnimationEnd();
    skill1.next = tK0;
    tK0.next = tFire;
    tFire.next = tWaitEnd;
}
