{
    skill1.skillCategory = "independent";
    skill1.trigger = trigger.independent(100);
    skill1.searchTarget = target.self;
    skill1.range = 1000;
    let tFire = template.explosion().range(200).onlySelf();
    tFire.target = target.self;
    let tAfterBulletHit = template
        .damage()
        .value(tbl.param1)
        .addEffect(effect.offset(0, 20).effectName("BodyHit_witch").effectAnimation("skillattack"));
    tFire.afterHit = tAfterBulletHit;
    skill1.next = tFire;
}
