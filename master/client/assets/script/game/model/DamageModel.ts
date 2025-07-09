import { GameDate } from "../../framework/date/GameDate";
import WindowBattleScene from "../module/battle/WindowBattleScene";
import WindowBattleStageInfo from "../module/battle/WindowBattleStageInfo";
import WindowDamage from "../module/mainscene/WindowDamage";
import WindowInstance from "../module/tower/WindowInstance";

export default class DamageModel {
    getReward(ids: number[]) {
        return GApi.damageChallenge.getReward({ ids });
    }

    async challenge(kind: number) {
        GWindow.close(WindowInstance);
        GWindow.close(WindowDamage);
        GModel.battle.hideMainUI();
        const processor = GModel.battle.createDamageChallengeBattle(kind);
        const end = async () => {
            // GModel.stage.battleSceneMainLoop();
            GModel.battle.showMainUI();
            GWindow.get(WindowBattleStageInfo).toStageMode();
            GWindow.open(WindowInstance);
            GWindow.open(WindowDamage, { page: kind - 1 });
            let data = processor.getTotalDamage();
            if (data > (kind === 1 ? GState.data.damageData.myDamage : GState.data.damageData.myMulDamage))
                await GApi.damageChallenge.report({ count: data, kind });
        };
        GWindow.get(WindowBattleStageInfo).toDamageMode(end);
        await GWindow.get(WindowBattleScene).battle(processor);
        end();
    }

    canChallenge(kind: number) {
        let date = new GameDate();
        let day = date.getDay();
        return day === 0 || GConfig.damageChallenge.dayOfWeek[kind - 1].includes(day);
    }
}
