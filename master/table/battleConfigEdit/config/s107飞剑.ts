{
    skill1.skillCategory = "main";
    skill1.animation = "skill";
    skill1.trigger = trigger.coldDown(Number(tbl.param1));
    skill1.searchTarget = target.enemyTeam.nearestLock();
    skill1.range = 800;

    let damageRatio = Number(tbl.param2);

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
    let tFire = template
        .damage()
        .tag("skill")
        .value("self.attack*" + damageRatio)
        .addEffect(
            effect.offset(0, 0).effectName("Skill_Knife").effectAnimation("attack").positionType("scene").scale(1)
        );
    tFire.target = target.enemyTeam.centerRect(1000, 600);
    skill1.next = tK0;
    tK0.next = tFire;
    tFire.next = tWaitEnd;
}
