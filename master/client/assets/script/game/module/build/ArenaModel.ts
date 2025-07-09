import EventBus from "../../../framework/event/EventBus";
import { BattleProcessor } from "../../battleLogic/Processor/BattleProcessor";
import { BattleProcessorBuilder } from "../../battleLogic/Processor/BattleProcessorBuilder";
import Item from "../../entity/Item";
import EventName from "../../event/EventName";
import WindowBattleScene from "../battle/WindowBattleScene";
import WindowSettlement from "../battle/WindowSettlement";
import WindowCommonConfirm from "../common/WindowCommonConfirm";

export default class ArenaModel {
    /** 玩家信息 */
    info() {
        return GApi.arena.info();
    }

    /**购买挑战券 */
    async buyTicket() {
        let data = await GWindow.open(WindowCommonConfirm, {
            tip: [GLang.code.ui.challenge_buy_text, "_rs" + GConfig.arena.cost[(await this.info()).todayBuy]],
        });
        if (data) {
            GApi.arena.buyTicket();
        }
    }
    /** 发起挑战 */
    async challenge(targetRoleId: number) {
        const res = await GApi.arena.challenge({ targetRoleId });
        const processor = new BattleProcessorBuilder()
            .setAttackTeam(res.attackTeam)
            .pvp(res.defendTeam)
            .setCommandGetter(() => [])
            .setMapId("map_deck")
            .setSeed(res.seed)
            .setTickLimit(GConfig.battle.arenaTimeLimit * GConstant.battle.logicTickRate)
            .build();
        const [attackRoleInfo, defendRoleInfo] = await GModel.friend.getRoleInfo([HttpServer.roleId, targetRoleId]);
        processor.attackRoleInfo = attackRoleInfo;
        processor.defendRoleInfo = defendRoleInfo;
        await GWindow.open(WindowBattleScene, {
            startOnInit: true,
            processor: processor,
            battleType: "arena",
        });
        GAudio.playMusic("main");
        GWindow.open(WindowSettlement, {
            isWin: res.win,
            reward: [new Item(GIndex.id.challengeIntergral, res.point)],
            text: [[GLang.code.ui.victory_conclusion3]],
        });
        EventBus.emit(EventName.refreshChallengeList, true);
        EventBus.emit(EventName.arenaAfterChallenge);
    }

    /** 排行榜 */
    async top() {
        const list = await GApi.arena.top();
        const info = await GModel.friend.getRoleInfo(list.map((e) => e.roleId));
        return list.map((e, i) => {
            return {
                ...e,
                info: info[i],
            };
        });
    }

    /** 历史记录 */
    async history() {
        const list = await GApi.arena.history();
        list.reverse();
        const info = await GModel.friend.getRoleInfo(
            list.map((e) => (e.teamSide === 0 ? e.defendRoleId : e.attackRoleId))
        );
        return list.map((e, i) => {
            return {
                ...e,
                info: info[i],
            };
        });
    }

    /** 挑战列表 */
    async challengeList() {
        const list = await GApi.arena.challengeList();
        const info = await GModel.friend.getRoleInfo(list.map((e) => e.roleId));
        return list.map((e, i) => {
            return {
                ...e,
                info: info[i],
            };
        });
    }

    /** 刷新挑战列表 */
    async refreshChallengeList() {
        const list = await GApi.arena.refreshChallengeList({ click: true });
        const info = await GModel.friend.getRoleInfo(list.map((e) => e.roleId));
        return list.map((e, i) => {
            return {
                ...e,
                info: info[i],
            };
        });
    }
}
