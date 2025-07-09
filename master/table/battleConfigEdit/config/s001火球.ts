{
    skill1.skillCategory = "main";
    skill1.animation = "skill";
    skill1.trigger = trigger.coldDown(Number(tbl.param1));
    skill1.searchTarget = target.enemyTeam.nearestLock();
    skill1.range = 800;
    let fireBallCount = 1;
    let fireBallDamage = "self.attack";
    let canExplosion = false;
    let fireBallExplosionDamage = "0";
    let fireBallExplosionRange = 100;
    let canAddBurn = false;
    let canAddDamageBuff = false;
    let burnTime = 0;
    let damageBuff = 0;
    // 天赋1
    if (condition.checkFlag("1002")) {
        fireBallCount = fireBallCount + 1;
        fireBallDamage = fireBallDamage + "-self.attack*0.2";
    } else if (condition.checkFlag("1003")) {
        fireBallCount = fireBallCount + 2;
        fireBallDamage = fireBallDamage + "-self.attack*0.3";
    } else if (condition.checkFlag("1004")) {
        fireBallCount = fireBallCount + 3;
        fireBallDamage = fireBallDamage + "-self.attack*0.4";
    }
    // 天赋2
    if (condition.checkFlag("1005")) {
        fireBallDamage = fireBallDamage + "+self.attack*0.1";
    } else if (condition.checkFlag("1006")) {
        fireBallDamage = fireBallDamage + "+self.attack*0.2";
    } else if (condition.checkFlag("1007")) {
        fireBallDamage = fireBallDamage + "+self.attack*0.3";
    } else if (condition.checkFlag("1008")) {
        fireBallDamage = fireBallDamage + "+self.attack*0.4";
    }
    // 天赋3
    if (condition.checkFlag("1009")) {
        canExplosion = true;
        fireBallExplosionDamage = "self.attack*0.1";
    } else if (condition.checkFlag("1010")) {
        canExplosion = true;
        fireBallExplosionDamage = "self.attack*0.2";
    } else if (condition.checkFlag("1011")) {
        canExplosion = true;
        fireBallExplosionDamage = "self.attack*0.3";
    } else if (condition.checkFlag("1012")) {
        canExplosion = true;
        fireBallExplosionDamage = "self.attack*0.4";
    }
    // 天赋4
    if (condition.checkFlag("1013")) {
        fireBallExplosionRange = fireBallExplosionRange * 1.2;
    } else if (condition.checkFlag("1014")) {
        fireBallExplosionRange = fireBallExplosionRange * 1.3;
    } else if (condition.checkFlag("1015")) {
        fireBallExplosionRange = fireBallExplosionRange * 1.4;
    } else if (condition.checkFlag("1016")) {
        fireBallExplosionRange = fireBallExplosionRange * 1.5;
    }
    // 天赋5
    if (condition.checkFlag("1017")) {
        canAddBurn = true;
        burnTime = 1000;
    } else if (condition.checkFlag("1018")) {
        canAddBurn = true;
        burnTime = 2000;
    } else if (condition.checkFlag("1019")) {
        canAddBurn = true;
        burnTime = 3000;
    } else if (condition.checkFlag("1020")) {
        canAddBurn = true;
        burnTime = 4000;
    }
    // 天赋6
    if (condition.checkFlag("1021")) {
        canAddDamageBuff = true;
        damageBuff = 500;
    } else if (condition.checkFlag("1022")) {
        canAddDamageBuff = true;
        damageBuff = 1000;
    } else if (condition.checkFlag("1023")) {
        canAddDamageBuff = true;
        damageBuff = 1500;
    } else if (condition.checkFlag("1024")) {
        canAddDamageBuff = true;
        damageBuff = 2000;
    }
    // 等待事件帧
    let tK0 = template.waitKeyFrame().index(0);
    // 等待动作结束
    let tWaitEnd = template.waitAnimationEnd();
    // 发射火球
    let tFire = template
        .fireBullet()
        .img("Fireball_Skill")
        .count(fireBallCount)
        .speed(1500)
        .scale(1)
        .curveType(2)
        .curveParam(0);
    tFire.target = target.enemyTeam.nearestLock();
    // 技能主流程
    skill1.next = tK0;
    tK0.next = tFire;
    tFire.next = tWaitEnd;
    // 火球伤害
    let tAfterBulletHit = template
        .damage()
        .value(fireBallDamage)
        .addEffect(effect.offset(0, 20).effectName("BodyHit_witch").effectAnimation("skillattack"));
    tFire.afterHit = tAfterBulletHit;

    let tExplode = template.explosion().range(fireBallExplosionRange).onlyEnemy();
    let tExplodeDamage = template.damage().value(fireBallExplosionDamage);
    let tBurn = template.addState().kind(state.burn).duration(burnTime).value("self.attack*0.1");
    let tDamageBuff = template.addBuff().kind(property.defence).value(-damageBuff).duration(burnTime);
    if (canExplosion) {
        tAfterBulletHit.afterHit = tExplode;
        tExplode.afterHit = tExplodeDamage;
    }
    if (canAddBurn) {
        if (canExplosion) {
            tExplode.next = tBurn;
        } else {
            tAfterBulletHit.afterHit = tBurn;
        }
        if (canAddDamageBuff) {
            tBurn.afterHit = tDamageBuff;
        }
    }
}
