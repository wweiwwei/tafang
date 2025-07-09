{
    skill1.skillCategory = "independent";
    skill1.trigger = trigger.independent(tbl.param1);
    skill1.searchTarget = target.enemyTeam.near(1);
    skill1.range = 1000;
    let tFire = template
        .fireBullet()
        .img("Poisoning_Skill")
        .speed(300)
        .scale(1.5)
        .curveType(2)
        .curveParam(250)
        .lockRotate(true)
        .penetrateMode(true)
        .penetrateCount(999)
        .penetrateInterval(tbl.param3)
        .penetrateRect([100, 100, 200, 0])
        .penetrateDuration(4000);
    tFire.target = target.enemyTeam.random(1);
    let tAfterBulletHit = template
        .damage()
        .tag("skill")
        .tag(tbl.param5)
        .value("self.attack*" + tbl.param2 + "+self.sp.s11");
    tAfterBulletHit.afterHit = template
        .addState()
        .kind(state.poison)
        .value("self.attack*" + tbl.param2)
        .duration(4000);
    tFire.afterHit = tAfterBulletHit;
    skill1.next = tFire;
}
