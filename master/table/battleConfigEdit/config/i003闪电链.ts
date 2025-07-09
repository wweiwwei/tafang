{
    skill1.skillCategory = "independent";
    skill1.trigger = trigger.independent(tbl.param1);
    skill1.searchTarget = target.enemyTeam.near(1);
    skill1.range = 1000;
    let tFire = template.lightningChain().bounce(tbl.param4);
    tFire.target = target.enemyTeam.random(tbl.param3);
    let tAfterBulletHit = template
        .damage()
        .value("self.attack*" + tbl.param2 + "+self.sp.s7")
        .tag("skill")
        .tag(tbl.param5)
        .addEffect(effect.offset(0, 0).effectName("Skill_Lightningchain").effectAnimation("hit"));
    tFire.afterHit = tAfterBulletHit;
    skill1.next = tFire;
}
