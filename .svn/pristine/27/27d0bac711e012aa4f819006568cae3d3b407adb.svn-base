{
    skill1.skillCategory = "main";
    skill1.animation = "skill";
    skill1.trigger = trigger.coldDown(Number(tbl.param1));
    skill1.searchTarget = target.enemyTeam.nearestLock();
    skill1.range = 1000;
    let tK0 = template.waitKeyFrame().index(0);
    let tFire = template.lifeRecover().value(tbl.param2).addEffect(effect.effectName("repairerman_skillattack"));
    tFire.target = target.selfTeam;
    let tAttackBuff = template
        .addBuff()
        .kind(property.attack)
        .value(tbl.param3)
        .duration(Number(tbl.param4))
        .showPercent(true);
    tFire.afterHit = tAttackBuff;
    let tWaitEnd = template.waitAnimationEnd();
    skill1.next = tK0;
    tK0.next = tFire;
    tFire.next = tWaitEnd;
}
