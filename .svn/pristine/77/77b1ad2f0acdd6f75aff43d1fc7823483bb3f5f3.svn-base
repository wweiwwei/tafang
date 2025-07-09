{
    skill1.skillCategory = "normalAttack";
    skill1.animation = "attack";
    skill1.trigger = trigger.normalAttack();
    skill1.searchTarget = target.enemyTeam.near(1);

    let damageRatio = Number(tbl.param1);
    let count = Number(tbl.param2);

    //#include s1
    //#include s2
    //#include s3
    //#include s4
    //#include s5
    //#include s6

    let tFire = template
        .laser()
        .onlyEnemy()
        .effectName("lamp_generaltail")
        .effectAnimation("general_tail")
        .scale(1)
        .duration(600)
        .wait(0)
        .count(count)
        .interval(100);
    tFire.target = target.enemyTeam.nearestLock();
    let tAfterBulletHit = template
        .damage()
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
