{
    skill1.skillCategory = "main";
    skill1.animation = "skill";
    skill1.trigger = trigger.coldDown(Number(tbl.param1));
    skill1.searchTarget = target.enemyTeam.nearestLock();
    skill1.range = 800;

    let damageRatio = Number(tbl.param2);
    let interval = Number(tbl.param3);

    //#include s1
    //#include s2
    //#include s3
    //#include s4
    //#include s5
    //#include s6

    let tFire = template
        .laser()
        .onlyEnemy()
        .effectName("Skill_laser")
        .effectAnimation("attack")
        .scale(1)
        .duration(5200)
        .wait(1500)
        .count(9999)
        .interval(interval);
    tFire.target = target.enemyTeam.nearestLock();
    let tAfterBulletHit = template
        .damage()
        .tag("skill")
        .value("self.attack*" + damageRatio)
        .addEffect(
            effect
                .offset(spineTbl.hitEffectOffset[0], spineTbl.hitEffectOffset[1])
                .effectName("lamp_generaltail")
                .withDirection(true)
        );
    tFire.afterHit = tAfterBulletHit;
    // 等待事件帧
    let tK0 = template.waitKeyFrame().index(0);
    // 等待动作结束
    let tWaitEnd = template.waitAnimationEnd();
    skill1.next = tK0;
    tK0.next = tFire;
    tFire.next = tWaitEnd;
}
