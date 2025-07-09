import WindowBattleScene from "../../game/module/battle/WindowBattleScene";

export default class CameraHelper {
    mainCamera: cc.Camera;
    battleCamera: cc.Camera;
    battleCamera2: cc.Camera;

    /** 震屏 */
    shockScreen() {
        if (GWindow.isAnyWindowOpening()) return;
        this.pauseFollow = true;
        cc.tween(this.battleCamera.node)
            .to(0.1, { x: GUtils.random.nextInt(-50, 50), y: GUtils.random.nextInt(-50, 50) })
            .to(0.1, { x: GUtils.random.nextInt(-50, 50), y: GUtils.random.nextInt(-50, 50) })
            .to(0.05, { x: 0, y: 0 })
            .start();
        // 保险起见这里使用setTimeout
        setTimeout(() => {
            this.pauseFollow = false;
        }, 250);
        GSDK.shockScreen();
    }
    private pauseFollow = false;

    /** 跟随 */
    follow(node: cc.Node) {
        if (this.pauseFollow) return;
        GCamera.battleCamera.node.position = node.position;
    }

    /** 镜头切换到主场景模式 */
    mainScene() {
        this.battleCamera.rect = cc.rect(0, 0, 1, 1);
        this.battleCamera2.enabled = false;
    }
    /** 镜头切换到pvp模式 */
    pvp() {
        this.battleCamera.rect = cc.rect(0, 0, 1, 0.5);
        this.battleCamera2.rect = cc.rect(0, 0.5, 1, 0.5);
        this.battleCamera2.enabled = true;
    }
}

window["GCamera"] = new CameraHelper();
declare global {
    const GCamera: CameraHelper;
}
