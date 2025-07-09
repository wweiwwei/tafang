export default class EnemyModel {
    /** 获取外敌队伍 */
    getEnemyTeam() {
        return GState.data.enemyTeam;
    }
    /** 剩余挑战次数 */
    remainChallenge() {
        return GConfig.enemy.challengeLimit - GState.data.enemyData.hasWin.length;
    }
    /** 剩余免费刷新次数 */
    freeRefreshRemain() {
        const remain = GConfig.enemy.freeRefresh - GState.data.enemyData.refresh;
        return remain > 0 ? remain : 0;
    }

    /** 挑战敌人 */
    async challenge(uid: number): Promise<boolean> {
        const info = await GApi.enemy.teamInfo({ uid });
        // todo 调起战斗
        await GApi.enemy.challenge({ uid });
        return true;
    }

    /** 刷新敌人 */
    async refreshEnemy() {
        if (this.remainChallenge() <= 0) return;
        if (this.freeRefreshRemain() <= 0) {
            await GSDK.showVideo("enemy_refresh");
        }
        await GApi.enemy.refreshEnemy();
    }
}
