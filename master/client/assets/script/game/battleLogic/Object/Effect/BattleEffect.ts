export class BattleEffect {
    position: { x: number; y: number };
    effectAnimation: string;
    effectName: string;
    scaleX: number = 1;
    scaleY: number = 1;
    angle: number = 0;
    loop: boolean = false;
    needDestroy: boolean = false;
}
