{
    skill1.skillCategory = "independent";
    skill1.trigger = trigger.independent(tbl.param1);
    skill1.searchTarget = target.enemyTeam.near(1);
    skill1.range = 1000;
    let tFire = template
        .rectEffect()
        .width(500)
        .height(400)
        .count(5)
        .interval(265)
        .addEffectWithControl(effect.effectName("toaster_skilltail").effectAnimation("general_tail").offset(15, 30));
    tFire.target = target.enemyTeam.nearestLock();
    let tAfterBulletHit = template
        .damage()
        .tag("skill")
        .tag(tbl.param5)
        .value("self.attack*" + tbl.param2 + "+self.sp.s12")
        .addEffect(effect.offset(0, 20).effectName("BodyHit_witch").effectAnimation("skillattack"));
    tFire.afterHit = tAfterBulletHit;
    skill1.next = tFire;
}
