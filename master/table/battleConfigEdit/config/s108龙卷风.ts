{
    skill1.skillCategory = "main";
    skill1.animation = "skill";
    skill1.trigger = trigger.coldDown(Number(tbl.param1));
    skill1.searchTarget = target.enemyTeam.nearestLock();
    skill1.range = 800;

    let damageRatio = Number(tbl.param2);
    let repulse = 0;
    let volume = 2;
    let extraProbability = 0;

    //#include s1
    //#include s2
    //#include s3
    //#include s4
    //#include s5
    //#include s6

    let tK0 = template.waitKeyFrame().index(0);
    let tFire = template
        .fireBullet()
        .img("fan_skilltail")
        .speed(300)
        .scale(volume)
        .curveType(2)
        .curveParam(250)
        .lockRotate(true)
        .penetrateMode(true)
        .penetrateCount(999)
        .penetrateRect([100 * volume, 100 * volume, 180 * volume, 0 * volume])
        .penetrateDuration(4000);
    tFire.target = target.enemyTeam.near("data.sr.isHappen(" + extraProbability + ")?2:1");
    let tDamage = template
        .damage()
        .tag("skill")
        .value("self.attack*" + damageRatio)
        .addEffect(effect.offset(spineTbl.hitEffectOffset[0], spineTbl.hitEffectOffset[1]).effectName("BodyHit_witch"));
    tFire.afterHit = tDamage;
    if (repulse > 0) {
        let tRepulse = template.repulse().distance(repulse);
        tDamage.afterHit = tRepulse;
    }
    let tWaitEnd = template.waitAnimationEnd();
    skill1.next = tK0;
    tK0.next = tFire;
    tFire.next = tWaitEnd;
}
