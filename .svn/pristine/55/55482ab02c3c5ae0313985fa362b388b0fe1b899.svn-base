import ResourceLoader from "../../framework/ResourceLoader";
import { BattlePlayerCommand } from "../battleLogic/Processor/BattleCommandHandler";
import BattleFactory from "../battleLogic/Utils/BattleFactory";
import ListItemBattleScenePvp from "../module/battle/ListItemBattleScenePvp";
import WindowBattleScene from "../module/battle/WindowBattleScene";
import WindowBattleStageInfo from "../module/battle/WindowBattleStageInfo";
import WindowPvpView from "../module/mainscene/WindowPvpView";

/** pvp战斗管理类 */
export class BattlePvpManager {
    toMainScene() {
        this.battleEnd = true;
        RoomServer.close();
        GCamera.mainScene();
        GModel.battle.showMainUI();
        GWindow.show(WindowBattleStageInfo);
        GWindow.show(WindowBattleScene);
        this.sceneList.forEach((s) => {
            s.recycle();
        });
    }
    private sceneList: ListItemBattleScenePvp[] = [];

    async match() {
        await RoomServer.login();
        RoomServer.send(
            JSON.stringify({
                kind: "battleTeam",
                data: {
                    info: JSON.stringify(BattleFactory.getRabbitSheepTeam(GState.data)),
                },
            })
        );
        await RoomServer.waitMatch();
        this.toPvpScene();
    }
    async toPvpScene() {
        const matchInfo = RoomServer.getMatchInfo();
        this.battleEnd = false;
        this.kill1 = {};
        this.kill2 = {};
        GCamera.pvp();
        GModel.battle.hideMainUI();
        GWindow.hide(WindowBattleStageInfo);
        GWindow.hide(WindowBattleScene);
        const s1 = await ResourceLoader.getNode(ListItemBattleScenePvp);
        const s2 = await ResourceLoader.getNode(ListItemBattleScenePvp);
        s2.setGroup("battle2");
        s1.node.scaleY = 2;
        s2.node.scaleY = 2;
        this.sceneList = [s1, s2];
        const container = cc.find("Canvas/window");
        s1.node.parent = container;
        s2.node.parent = container;
        const p1 = GModel.battle.createPvpBattle(matchInfo.yourTeam.info, matchInfo.seed, (frame) => {
            const list: BattlePlayerCommand[] = JSON.parse(RoomServer.getCommandList(matchInfo.yourTeam.index, frame));
            if (this.kill2[frame] > 0) {
                list.push({
                    kind: "addGuideMonster",
                    data: { count: this.kill2[frame] * 2 },
                });
            }
            return list;
        });
        const p2 = GModel.battle.createPvpBattle(matchInfo.otherTeam.info, matchInfo.seed, (frame) => {
            const list: BattlePlayerCommand[] = JSON.parse(RoomServer.getCommandList(matchInfo.otherTeam.index, frame));
            if (this.kill1[frame] > 0) {
                list.push({
                    kind: "addGuideMonster",
                    data: { count: this.kill1[frame] * 2 },
                });
            }
            return list;
        });
        await s1.setState({ processor: p1, index: 1 });
        await s2.setState({ processor: p2, index: 2 });
        GWindow.open(WindowPvpView);
    }
    private battleEnd = false;
    private winIndex = 0;
    private kill1: {
        [frame: number]: number;
    } = {};
    private kill2: {
        [frame: number]: number;
    } = {};

    refreshCard() {
        RoomServer.send(
            JSON.stringify({
                kind: "command",
                data: {
                    list: JSON.stringify([
                        {
                            kind: "refreshCard",
                            data: {},
                        },
                    ]),
                },
            })
        );
    }

    chooseCard(id: number) {
        RoomServer.send(
            JSON.stringify({
                kind: "command",
                data: {
                    list: JSON.stringify([
                        {
                            kind: "chooseCard",
                            data: { id },
                        },
                    ]),
                },
            })
        );
    }

    tick() {
        if (this.battleEnd) {
            return;
        }
        const api1 = GBattleApiManager.getBattleStageApi(1);
        if (!RoomServer.isFrameReady(api1.getFrame() + 1)) {
            return;
        }
        if (api1.isBattleEnd()) {
            const isWin = api1.isBattleWin();
            this.battleEnd = true;
            this.winIndex = isWin ? 1 : 2;
            return;
        }
        api1.tick();
        this.sceneList[0].tick();

        const api2 = GBattleApiManager.getBattleStageApi(2);
        if (api2.isBattleEnd()) {
            const isWin = api2.isBattleWin();
            this.battleEnd = true;
            this.winIndex = isWin ? 2 : 1;
            return;
        }
        api2.tick();
        this.sceneList[1].tick();
        const kill1 = api1.globalProperty().frameMonsterKill;
        if (kill1 > 0) {
            // api2.addGuideMonster(kill1 * 2);
            this.kill1[api1.getFrame() + 1] = kill1;
        }
        const kill2 = api2.globalProperty().frameMonsterKill;
        if (kill2 > 0) {
            // api1.addGuideMonster(kill2 * 2);
            this.kill2[api2.getFrame() + 1] = kill2;
        }
    }
}

window["GBattlePvpManager"] = new BattlePvpManager();

declare global {
    /** PVP战斗管理 */
    const GBattlePvpManager: BattlePvpManager;
}
