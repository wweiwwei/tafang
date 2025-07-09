{
    skill1.skillCategory = "independent";
    skill1.trigger = trigger.independent(tbl.param1);
    skill1.searchTarget = target.enemyTeam.near(1);
    skill1.range = 1000;
    let tFire = template
        .explosion()
        .range(200)
        .addEffect(
            effect
                .offset(0, 0)
                .effectName("Vine_skilltail")
                .effectAnimation("general_tail")
                .positionType("scene")
                .scale(1)
        );
    let tDamage = template
        .damage()
        .tag("skill")
        .tag(tbl.param5)
        .value("self.attack*" + tbl.param2 + "+self.sp.s13");
    tFire.afterHit = tDamage;
    tFire.target = target.enemyTeam.random(tbl.param3);
    skill1.next = tFire;
}
