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

    let tFire = template
        .dotArea()
        .effectName("Electrostatic_skillattack")
        .effectAnimation("skillattack")
        .scale(1)
        .rectMode()
        .onlyEnemy()
        .duration(5000);
    let tExplosionHit = template
        .damage()
        .tag("skill")
        .value("self.attack*" + damageRatio);
    tFire.effectList = [tExplosionHit];
    tFire.intervalList = [500];
    tFire.heightList = [280];
    tFire.widthList = [340];
    tFire.target = target.enemyTeam.nearestLock();

    // 等待事件帧
    let tK0 = template.waitKeyFrame().index(0);
    // 等待动作结束
    let tWaitEnd = template.waitAnimationEnd();
    skill1.next = tK0;
    tK0.next = tFire;
    tFire.next = tWaitEnd;
}
