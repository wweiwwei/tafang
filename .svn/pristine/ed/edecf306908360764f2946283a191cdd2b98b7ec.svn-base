{
    skill1.skillCategory = "artifact";
    skill1.trigger = trigger.independent(tbl.param1);
    skill1.searchTarget = target.enemyTeam.near(1);
    skill1.range = 1000;
    let tBuff = template.addBuff().kind(property.attack).value("self.attack*0.15").duration(5000).showPercent(true);
    tBuff.target = target.self;
    let tFire = template
        .damage()
        .delay(500)
        .tag("skill")
        .tag(tbl.param5)
        .value("target.isBossOrElite()?0:1000000000")
        .addEffect(
            effect
                .offset(0, 0)
                .effectName("Ribbon_skillattack")
                .effectAnimation("skillattack")
                .positionType("target")
                .scale(2)
        );
    tFire.target = target.enemyTeam.random(tbl.param2);
    skill1.next = tBuff;
    tBuff.next = tFire;
}
