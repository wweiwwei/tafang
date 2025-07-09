{
    skill1.skillCategory = "ex";
    skill1.trigger = trigger.ex("self.sp.freezeColdDown");
    skill1.searchTarget = target.enemyTeam;
    skill1.range = 1000;
    let tFire = template
        .addBuff()
        .kind(property.moveSpeed)
        .value("-target.moveSpeed * 10")
        .duration("self.sp.freezeDuration")
        .showPercent(true)
        .addEffect(effect.offset(0, -50).positionType("self").effectName("kinggod_skillattack"));
    tFire.target = target.enemyTeam;
    skill1.next = tFire;
}
