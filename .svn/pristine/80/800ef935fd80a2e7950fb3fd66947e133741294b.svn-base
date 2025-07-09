{
    skill1.skillCategory = "main";
    skill1.animation = "skill";
    skill1.trigger = trigger.coldDown(Number(tbl.param1));
    skill1.searchTarget = target.enemyTeam.nearestLock();
    skill1.range = 800;
    let iceCount = 1;
    let iceDamage = "self.attack";
    let icenRange = 100;
    let hasSplitIce = false;
    let splitIceDamage = "0";
    let hasIceRoad = false;
    let iceRoadBuff = "0";
    let hasFrozen = false;
    let frozenTime = 0;
    let hasDotDamage = false;
    let dotDamage = "0";
    // 天赋1
    if (condition.checkFlag("2002")) {
        iceCount = iceCount + 1;
        iceDamage = iceDamage + "-self.attack*0.2";
    } else if (condition.checkFlag("2003")) {
        iceCount = iceCount + 2;
        iceDamage = iceDamage + "-self.attack*0.3";
    } else if (condition.checkFlag("2004")) {
        iceCount = iceCount + 3;
        iceDamage = iceDamage + "-self.attack*0.4";
    }
    // 天赋2
    if (condition.checkFlag("2005")) {
        icenRange = icenRange * 1.1;
    } else if (condition.checkFlag("2006")) {
        icenRange = icenRange * 1.2;
    } else if (condition.checkFlag("2007")) {
        icenRange = icenRange * 1.3;
    } else if (condition.checkFlag("2008")) {
        icenRange = icenRange * 1.4;
    }
    // 天赋3
    if (condition.checkFlag("2009")) {
        hasSplitIce = true;
        splitIceDamage = "self.attack*0.1";
    } else if (condition.checkFlag("2010")) {
        hasSplitIce = true;
        splitIceDamage = "self.attack*0.2";
    } else if (condition.checkFlag("2011")) {
        hasSplitIce = true;
        splitIceDamage = "self.attack*0.3";
    } else if (condition.checkFlag("2012")) {
        hasSplitIce = true;
        splitIceDamage = "self.attack*0.4";
    }
    // 天赋4
    if (condition.checkFlag("2013")) {
        hasIceRoad = true;
        iceRoadBuff = "-target.moveSpeed*0.1";
    } else if (condition.checkFlag("2014")) {
        hasIceRoad = true;
        iceRoadBuff = "-target.moveSpeed*0.2";
    } else if (condition.checkFlag("2015")) {
        hasIceRoad = true;
        iceRoadBuff = "-target.moveSpeed*0.3";
    } else if (condition.checkFlag("2016")) {
        hasIceRoad = true;
        iceRoadBuff = "-target.moveSpeed*0.4";
    }
    // 天赋5
    if (condition.checkFlag("2017")) {
        hasFrozen = true;
        frozenTime = 1000;
    } else if (condition.checkFlag("2018")) {
        hasFrozen = true;
        frozenTime = 1500;
    } else if (condition.checkFlag("2019")) {
        hasFrozen = true;
        frozenTime = 2000;
    } else if (condition.checkFlag("2020")) {
        hasFrozen = true;
        frozenTime = 3000;
    }
    // 天赋6
    if (condition.checkFlag("2021")) {
        hasDotDamage = true;
        dotDamage = "target.maxHp*0.01";
    } else if (condition.checkFlag("2022")) {
        hasDotDamage = true;
        dotDamage = "target.maxHp*0.015";
    } else if (condition.checkFlag("2023")) {
        hasDotDamage = true;
        dotDamage = "target.maxHp*0.02";
    } else if (condition.checkFlag("2024")) {
        hasDotDamage = true;
        dotDamage = "target.maxHp*0.025";
    }
    // 等待事件帧
    let tK0 = template.waitKeyFrame().index(0);
    // 等待动作结束
    let tWaitEnd = template.waitAnimationEnd();
    let tFire = template
        .explosion()
        .range(icenRange)
        .addEffect(effect.offset(0, 0).effectName("Skill_Frost").effectAnimation("attack").scale(1));
    tFire.target = target.enemyTeam.random(iceCount);
    let tExplosionHit = template.damage().value(iceDamage);
    let tSlowBuff = template
        .addBuff()
        .kind(property.moveSpeed)
        .value("-target.moveSpeed*0.3")
        .duration(5000)
        .showPercent(true);
    tFire.afterHit = tExplosionHit;
    tExplosionHit.afterHit = tSlowBuff;
    skill1.next = tK0;
    tK0.next = tFire;
    tFire.next = tWaitEnd;
}
