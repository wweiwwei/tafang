{
    skill1.skillCategory = "independent";
    skill1.trigger = trigger.independent(tbl.param1);
    skill1.searchTarget = target.enemyTeam.near(1);
    skill1.range = 1000;
    let tFire = template
        .damage()
        .tag("skill")
        .tag(tbl.param5)
        .value("self.attack*" + tbl.param2 + "+self.sp.s4")
        .addEffect(
            effect
                .offset(0, 0)
                .effectName("Divine_skilltail")
                .effectAnimation("general_tail")
                .positionType("target")
                .scale(0.5)
        );
    tFire.target = target.enemyTeam.random(tbl.param3);
    skill1.next = tFire;
}
