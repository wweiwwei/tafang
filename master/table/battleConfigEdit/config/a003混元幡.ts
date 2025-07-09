{
    skill1.skillCategory = "artifact";
    skill1.trigger = trigger.independent(tbl.param1);
    skill1.searchTarget = target.enemyTeam.near(1);
    skill1.range = 1000;
    let tFire = template
        .damage()
        .tag("skill")
        .tag(tbl.param5)
        .value("target.isBossOrElite()?0:1000000000")
        .addEffect(
            effect
                .offset(0, 0)
                .effectName("Ribbon_skillattack")
                .effectAnimation("skillattack")
                .positionType("target")
                .scale(1)
        );
    tFire.target = target.enemyTeam.random(tbl.param2);
    skill1.next = tFire;
}
