{
    skill1.skillCategory = "independent";
    skill1.trigger = trigger.independent(tbl.param1);
    skill1.searchTarget = target.enemyTeam.near(1);
    skill1.range = 1000;
    let tFire = template
        .fireBullet()
        .img("blades_skilltail")
        .speed(1000)
        .scale(1)
        .count(tbl.param3)
        .curveType(3)
        .curveParam(0)
        .penetrateMode(true)
        .penetrateCount(999)
        .penetrateInterval(1000)
        .penetrateRect([50, 50, 50, 50])
        .penetrateDuration(tbl.param4);
    tFire.target = target.enemyTeam.near(1);
    let tAfterBulletHit = template
        .damage()
        .value("self.attack*" + tbl.param2 + "+self.sp.s5")
        .tag("skill")
        .tag(tbl.param5)
        .addEffect(effect.offset(0, 20).effectName("dolphin_generaltail").effectAnimation("skillattack"));
    tFire.afterHit = tAfterBulletHit;
    skill1.next = tFire;
}
