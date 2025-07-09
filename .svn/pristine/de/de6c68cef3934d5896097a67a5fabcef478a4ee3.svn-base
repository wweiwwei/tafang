import { WindowOpenAnimationEnum } from "../../framework/ui/GWindow";
import BattleFactory from "../battleLogic/Utils/BattleFactory";
import WindowBattleScene from "../module/battle/WindowBattleScene";
import WindowMapEdit from "../module/battle/WindowMapEdit";
import WindowBanquet from "../module/mainscene/WindowBanquet";
import WindowImpact from "../module/mainscene/WindowImpact";
import WindowRole from "../module/mainscene/WindowRole";
import WindowWar from "../module/mainscene/WindowWar";
import WindowAutoSetting from "../module/mainsceneNew/WindowAutoSetting";
import WindowMainSceneUIView from "../module/mainsceneNew/WindowMainSceneUIView";
import WindowSelectManyProp from "../module/mainsceneNew/WindowSelectManyProp";
import WindowSelectProp from "../module/mainsceneNew/WindowSelectProp";
import WindowSetRank from "../module/mainsceneNew/WindowSetRank";
import WindowUpdateEquipment from "../module/mainsceneNew/WindowUpdateEquipment";
import WindowMine from "../module/mine/WindowMine";
import WindowGMConsole from "../module/test/WindowGMConsole";
import WindowTestRoad from "../module/test/WindowTestRoad";
import WindowTestRushEffect from "../module/test/WindowTestRushEffect";
import WindowTowerScene from "../module/tower/WindowTowerScene";
import GMCommandHandler from "./GMCommandHandler";

export default class Test {
    /** 生存者debug */
    sDebug = false;
    fDebug = false;
    hDebug = false;
    colisionDebug = false;
    testTalent: number[] = [];
    async gmToggle() {
        if (GWindow.get(WindowGMConsole)) {
            GWindow.close(WindowGMConsole);
        } else {
            GWindow.open(WindowGMConsole, null, { animation: WindowOpenAnimationEnum.no });
        }
    }

    async gmCommand(command: string) {
        const list = command.trim().split(" ");
        return await GMCommandHandler[list[0]](...list.slice(1));
    }

    async testBattle() {
        GWindow.open(WindowBattleScene);
    }

    async testBattleServer() {
        const attackTeam = BattleFactory.getPlayerPvpTeam(GState.data);
        const defendTeam = BattleFactory.getPlayerPvpTeam(GState.data);
        const uuid = "abdc12131";
        const seed = Date.now() % 1000000;
        const res = await GUtils.http.post("http://localhost:13101/battle/pvp", {
            attackTeam,
            defendTeam,
            uuid,
            seed,
        });
        console.log(res);
    }

    openvaf() {
        GWindow.open(WindowUpdateEquipment);
    }

    async openWindowMine() {
        GWindow.open(WindowMine);
    }

    async triggerGuide(p1, p2, p3) {
        GModel.guide.triggerDialogue(p1, p2, p3);
    }

    async testOrder(itemId: number, extra: string) {
        await GApi.charge.testPay({ itemId, extra });
    }

    testWs() {
        const socket = new WebSocket("ws://localhost:9501/ws/t001?sessionkey=46485468adsa"); // 替换为你的 WebSocket 服务器地址和路径

        socket.onopen = function () {
            console.log("WebSocket连接已打开");
            // 每秒发送一次消息
            setInterval(function () {
                socket.send(JSON.stringify({ requestId: 1, path: "guide/complete", param: { id: 1 } }));
            }, 1000);
        };

        socket.onmessage = function (event) {
            console.log("接收到消息:", event.data);
        };

        setTimeout(function () {
            socket.close();
        }, 3300);

        socket.onclose = function (event) {
            console.log("WebSocket连接已关闭");
        };
    }

    testOpenMainView() {
        GWindow.open(WindowMainSceneUIView);
    }

    async autoTest1() {
        await GWindow.open(WindowTowerScene);
    }

    openStoneSetting() {
        let temp = GModel.playerEquipment.temp();
        if (temp.length > 0) {
            if (temp.length == 1) {
                GWindow.open(WindowSelectProp, { part: GModel.playerEquipment.temp()[0].tbl().part });
            } else {
                GWindow.open(WindowSelectManyProp, { playerEquipments: temp });
            }
        } else {
            GWindow.open(WindowAutoSetting);
        }
    }

    showWindowSetRank() {
        GWindow.open(WindowSetRank);
    }

    openMainSceneUi() {
        GWindow.open(WindowMainSceneUIView);
    }

    async openTower() {
        GWindow.open(WindowTowerScene);
    }
    editMap(mapName: string) {
        const windowContainer = cc.find("Canvas/window");
        windowContainer.children.forEach((n) => (n.active = false));
        GWindow.open(WindowMapEdit, { mapName });
    }
    async openMine() {
        GWindow.open(WindowMine);
    }

    openRole() {
        GWindow.open(WindowRole);
    }
    openCareer() {
        // GWindow.open(WindowCareerChanging);
    }

    openBanque() {
        GWindow.open(WindowBanquet);
    }

    openImpact() {
        GWindow.open(WindowImpact, { status: 0 });
    }

    openWar() {
        GWindow.open(WindowWar);
    }

    testShowBp(t: number) {
        if (t === 1) {
            GTip.showBattlePointChange(52110, 45625, [], [], false);
        } else if (t === 2) {
            GTip.showBattlePointChange(52110, 75625, [], [], false);
        }
    }

    testAttack() {
        const api = GBattleApiManager.getBattleStageApi(0);
        if (api) {
            api.playerAttack();
        }
    }

    testAuto() {
        const api = GBattleApiManager.getBattleStageApi(0);
        if (api) {
            api.setAutoAttack();
        }
    }

    testRush(spine: string) {
        GWindow.open(WindowTestRushEffect, { spine });
    }
    road(id: number) {
        GWindow.open(WindowTestRoad, { id });
    }
}

window["GTest"] = new Test();

declare global {
    /** 测试模块 */
    const GTest: Test;
}
