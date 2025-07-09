{
    skill1.skillCategory = "normalAttack";
    skill1.animation = "attack";
    skill1.trigger = trigger.normalAttack();
    skill1.searchTarget = target.enemyWall;
    let tK0 = template.waitKeyFrame().index(0);
    let tAttack = template
        .damage()
        .value(tbl.param1)
        .tag("normalAttack")
        .addEffect(
            effect.offset(spineTbl.hitEffectOffset[0], spineTbl.hitEffectOffset[1]).effectName(spineTbl.hitEffect)
        );
    tAttack.target = target.enemyWall;
    let tWaitEnd = template.waitAnimationEnd();
    skill1.next = tK0;
    tK0.next = tAttack;
    tAttack.next = tWaitEnd;
}
