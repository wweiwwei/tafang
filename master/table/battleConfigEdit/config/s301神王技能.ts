{
    skill1.skillCategory = "main";
    skill1.animation = "skill";
    skill1.trigger = trigger.coldDown(Number(tbl.param1));
    skill1.searchTarget = target.enemyTeam.near(1);
    skill1.range = 9999;

    // 等待事件帧
    let tKLoop = template.keyFrameLoop();
    // 等待动作结束
    let tWaitEnd = template.waitAnimationEnd();
    let tFire = template
        .damage()
        .tag("skill")
        .value(tbl.param2)
        .addEffect(effect.offset(0, -500).positionType("self").effectName("kinggod_skillattack"));
    tFire.target = target.enemyTeam;
    skill1.next = tKLoop;
    tKLoop.loop = tFire;
    tKLoop.next = tWaitEnd;
}
