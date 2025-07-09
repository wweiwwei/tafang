import { GameDate } from "../../framework/date/GameDate";
import Item from "../entity/Item";
import WindowBattleScene from "../module/battle/WindowBattleScene";
import WindowBattleStageInfo from "../module/battle/WindowBattleStageInfo";
import WindowCongratulation from "../module/common/WindowCongratulation";
import WindowInstance from "../module/tower/WindowInstance";
import WindowTowerScene from "../module/tower/WindowTowerScene";

export default class TowerModel {
    /** 挑战 */
    async challengeTower(): Promise<boolean> {
        const tbl = GTable.getList("TowerChallengeTbl").find((t) => t.towerLv === this.level() + 1);
        if (!tbl) {
            // todo 提示没有下一层
            return false;
        }
        GWindow.close(WindowInstance);
        GWindow.close(WindowTowerScene);
        GModel.battle.hideMainUI();
        const processor = GModel.battle.createTowerBattle(tbl);
        const end = async () => {
            // GModel.stage.battleSceneMainLoop();
            GModel.battle.showMainUI();
            GWindow.get(WindowBattleStageInfo).toStageMode();
            GWindow.open(WindowInstance);
            GWindow.open(WindowTowerScene);
        };
        GWindow.get(WindowBattleStageInfo).toDamageMode(end);
        const win = await GWindow.get(WindowBattleScene).battle(processor);
        end();
        if (win) {
            const reward = await GApi.tower.challengeTower();
            // GWindow.open(WindowSettlement, {
            //     isWin: win,
            //     reward,
            //     tower: true,
            //     text: [[GLang.code.ui.victory_conclusion]],
            // });
            GWindow.open(WindowCongratulation, { items: reward });
            return true;
        } else {
            // GWindow.open(WindowSettlement, { isWin: win });
            return false;
        }
    }
    /** 领取挂机奖励 */
    collectAfkReward() {
        return GApi.tower.collectAfkReward();
    }

    /** 获取排名数据 */
    rankList() {
        return GApi.tower.rankList();
    }

    /** 获取挂机数据 */
    afkData() {
        return GState.data.towerAfkReward;
    }

    /** 获取当前层数 */
    level(): number {
        return GState.data.towerData.level;
    }
    getAfkTime() {
        const now = GameDate.nowUpdated();
        const time = now - this.afkData().beginStamp;
        return GUtils.date.formatRemainTime(time, "hh:mm:ss");
    }
    /** 已领取的等级奖励，数组中是层数，例如[5,10]代表5层和10层的奖励已经被领取 */
    hasGetReward(): number[] {
        return GState.data.towerData.hasGet;
    }

    /** 领取等级奖励 */
    obtainLevelReward(level: number): Promise<Item[]> {
        return GApi.tower.obtainLevelReward({ level });
    }

    /**获取最高层 */
    getMaxTower() {
        return GTable.getList("TowerChallengeTbl").length;
    }
}
