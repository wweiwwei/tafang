{
    skill1.skillCategory = "main";
    skill1.animation = "skill";
    skill1.trigger = trigger.coldDown(Number(tbl.param1));
    skill1.searchTarget = target.enemyTeam.nearestLock();
    skill1.range = Number(tbl.param4);

    let count = Number(tbl.param3);
    let damageRatio = Number(tbl.param2);
    let explosion = false;
    let explosionRange = 0;

    //#include s1
    //#include s2
    //#include s3
    //#include s4
    //#include s5
    //#include s6

    // 等待事件帧
    let tK0 = template.waitKeyFrame().index(0);
    // 等待动作结束
    let tWaitEnd = template.waitAnimationEnd();
    let tDamage = template
        .damage()
        .tag("skill")
        .value("self.attack*" + damageRatio);

    if (explosion) {
        let tExplosion = template.explosion().range(explosionRange);
        tExplosion.afterHit = tDamage;
        tExplosion.target = target.enemyTeam.range(skill1.range).near(count);
        skill1.next = tK0;
        tK0.next = tExplosion;
        tExplosion.next = tWaitEnd;
        tExplosion
            .addEffect(
                effect
                    .offset(0, 0)
                    .effectName("electric_skilltail")
                    .effectAnimation("general_tail")
                    .positionType("target")
                    .scale(1)
            )
            .delay(400);
    } else {
        tDamage.target = target.enemyTeam.range(skill1.range).near(count);
        skill1.next = tK0;
        tK0.next = tDamage;
        tDamage.next = tWaitEnd;
        tDamage
            .addEffect(
                effect
                    .offset(0, 0)
                    .effectName("electric_skilltail")
                    .effectAnimation("general_tail")
                    .positionType("target")
                    .scale(1)
            )
            .delay(400);
    }
}
