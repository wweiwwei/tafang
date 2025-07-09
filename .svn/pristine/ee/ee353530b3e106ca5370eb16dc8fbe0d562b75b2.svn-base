{
    skill1.skillCategory = "normalAttack";
    skill1.animation = "attack";
    skill1.trigger = trigger.normalAttack();
    skill1.searchTarget = target.enemyTeam.near(1);

    let damageRatio = Number(tbl.param1);
    let bounce = Number(tbl.param2);

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
    let tFire = template.lightningChain().bounce(bounce);
    tFire.target = target.enemyTeam.near(1);
    let tAfterBulletHit = template
        .damage()
        .value("self.attack*" + damageRatio)
        .addEffect(effect.offset(0, 0).effectName("Skill_Lightningchain").effectAnimation("hit"));
    tFire.afterHit = tAfterBulletHit;
    skill1.next = tK0;
    tK0.next = tFire;
    tFire.next = tWaitEnd;
}
