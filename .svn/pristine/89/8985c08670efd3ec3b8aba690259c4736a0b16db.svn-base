{
    skill1.skillCategory = "independent";
    skill1.trigger = trigger.independent(tbl.param1);
    skill1.searchTarget = target.enemyTeam.near(1);
    skill1.range = 1000;
    let volume = Number(tbl.param3);
    let tFire = template
        .fireBullet()
        .img("Knife_skilltail")
        .speed(1000)
        .scale(volume)
        .curveType(2)
        .curveParam(250)
        .lockRotate(false)
        .penetrateMode(true)
        .penetrateCount(999)
        .penetrateRect([100 * volume, 100 * volume, 100 * volume, 100 * volume])
        .penetrateDuration(4000);
    tFire.target = target.enemyTeam.random(tbl.param4);
    let tAfterBulletHit = template
        .damage()
        .value("self.attack*" + tbl.param2 + "+self.sp.s2")
        .tag("skill")
        .tag(tbl.param5)
        .addEffect(effect.offset(0, 20).effectName("dolphin_generaltail").effectAnimation("skillattack"));
    tFire.afterHit = tAfterBulletHit;
    skill1.next = tFire;
}
