import ResourceLoader from "../../framework/ResourceLoader";
import EventBus from "../../framework/event/EventBus";
import EventName from "../event/EventName";

const { ccclass, property } = cc._decorator;

@ccclass
export default class GameScene extends cc.Component {
    protected async onLoad() {
        GCamera.mainCamera = this.node.getChildByName("Main Camera").getComponent(cc.Camera);
        GCamera.battleCamera = this.node.getChildByName("battleCamera").getComponent(cc.Camera);
        GCamera.battleCamera2 = this.node.getChildByName("battleCamera2").getComponent(cc.Camera);
        GCamera.mainScene();
        GSDK.report({ kind: "enterMainScene", data: {} });
        await GSDK.enterMainScene();
        this.node.getChildByName("inputBlock").addComponent(SceneLoadingTip);
        // if (GModel.guide.getHasComplete().length === 0 && !GModel.localStorage.skipGuide) {
        //     await GWindow.open(WindowStory);
        // } else {
        // await GWindow.goToMain();
        // }
        // await GModel.battle.offlineBattle();
        // 加载战斗图集
        ResourceLoader.damageTextAtlas = await ResourceLoader.loadAtlas("battle_text");
        if (GModel.guide.isFirstBattle()) {
            await GModel.guide.beginGuideBattle();
        }
        await GWindow.goToMain();
        // GModel.stage.battleSceneMainLoop();
        GWindow.offlineSettled = true;
        // if (GModel.facility.captainRank() >= 3) {
        //     await GWindow.open(WindowNotice);
        // }
        await GModel.charge.checkMonthReward();
        GModel.charge.checkReward();
        EventBus.on(
            EventName.stateKey.charge,
            () => {
                GModel.charge.checkReward();
            },
            this
        );
        // GWindow.open(WindowBattleScene);
        // await GModel.guide.loginCheckTrigger();
        // ChatServer.login();
        // this.schedule(() => {
        //     GModel.weakGuide.checkWeakGuide();
        // }, 1);
    }
}

class SceneLoadingTip extends cc.Component {
    protected onEnable(): void {
        this.node.children.forEach((n) => (n.active = false));
        this.scheduleOnce(() => {
            this.node.children.forEach((n) => (n.active = true));
        }, 1);
    }

    protected onDisable(): void {
        this.unscheduleAllCallbacks();
    }
}
