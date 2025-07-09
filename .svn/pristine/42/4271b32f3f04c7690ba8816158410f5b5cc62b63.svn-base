import { autowired, registerClass } from "../../../framework/Decorator";
import ResourceLoader from "../../../framework/ResourceLoader";
import UIImage from "../../../framework/ui/UIImage";
import UIListItem from "../../../framework/ui/UIListItem";
import UISpine from "../../../framework/ui/UISpine";
import { BattleBullet } from "../../battleLogic/Object/Bullet/BattleBullet";

const { ccclass, property } = cc._decorator;

@registerClass("ListItemBattleBullet")
@ccclass
export default class ListItemBattleBullet extends UIListItem {
    @autowired(UISpine) spine: UISpine = null;
    @autowired(UIImage) img: UIImage = null;

    static _poolSize: number = 20;

    state: {
        data: BattleBullet;
    };
    setState(state: this["state"]): void {
        this.state = state;
        this.initBullet();
        this.setAnimationSpeed(1);
    }
    setAnimationSpeed(ts: number) {
        this.spine.timeScale = ts * GModel.battle.getBattleSpeed();
    }

    initBullet() {
        const data = this.state.data;
        this.node.position = cc.v3(data.position[0], data.position[1]);
        this.spine.timeScale = 1;
        if (ResourceLoader.isSpineExist(data.img)) {
            this.spine.node.scale = data.bulletScale * 0.5;
            this.spine.setSpine(data.img, "default", "general_tail");
            this.spine.loop = true;
            this.spine.node.active = true;
            this.img.node.active = false;
        } else {
            this.img.node.scale = data.bulletScale;
            this.img.imgName = data.img;
            this.img.node.active = true;
            this.spine.node.active = false;
        }
        this.addCollision();
    }

    private async addCollision() {
        if (GTest.colisionDebug) {
            if (!this.state.data.getCollide()) return;
            const [left, right, top, bottom] = this.state.data.getCollide();
            this.img.node.scale = 1;
            this.img.imgName = "white_Mask";
            this.img.node.active = true;
            await GUtils.http.delay(100);
            this.img.node.width = left + right;
            this.img.node.height = bottom + top;
            this.img.node.opacity = 125;
            this.img.node.anchorX = 0;
            this.img.node.anchorY = 0;
            this.img.node.x = -left;
            this.img.node.y = -bottom;
        }
    }

    refresh() {
        const data = this.state.data;
        this.node.position = cc.v3(data.position[0], data.position[1]);
        const direction = data.direction;
        // this.node.scaleX = 1;
        this.node.angle = this.getAngle(direction);
        // console.log(this.getAngle(direction));
    }

    getAngle(direction: number[]) {
        return this.state.data.builder._lockRotate ? 0 : (Math.atan2(direction[1], direction[0]) * 180) / Math.PI;
    }

    private cacheTimeScale: number = 1;

    pause() {
        this.cacheTimeScale = this.spine.timeScale;
        this.spine.timeScale = 0;
    }

    continue() {
        this.spine.timeScale = this.cacheTimeScale;
    }
}
