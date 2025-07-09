{
    skill1.skillCategory = "independent";
    skill1.trigger = trigger.independent(tbl.param1);
    skill1.searchTarget = target.enemyTeam.near(1);
    skill1.range = 1000;
    let tFire = template
        .dotArea()
        .effectName("IceStorms_skilltail")
        .effectAnimation("general_tail")
        .scale(1)
        .rectMode()
        .onlyEnemy()
        .layer(2)
        .duration(6866);
    let tExplosionHit = template
        .damage()
        .tag("skill")
        .tag(tbl.param5)
        .value("self.attack*" + tbl.param2 + "+self.sp.s9");
    tFire.effectList = [tExplosionHit];
    tFire.intervalList = [Number(tbl.param4)];
    tFire.heightList = [200];
    tFire.widthList = [400];
    tFire.target = target.enemyTeam.random(tbl.param3);
    skill1.next = tFire;
}
