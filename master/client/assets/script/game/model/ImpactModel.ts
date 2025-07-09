import Mission from "../entity/Mission";

export default class ImpactModel {
    /**获取可见挑战任务 */
    getChallengeMission(): Mission[] {
        return Object.keys(GState.data.challengeMission)
            .map((id) => GState.data.challengeMission[id])
            .filter((m) => GTable.getById("RankMissionTbl", m.id).round === GState.data.impactData.challengeRound);
    }
    // /**获取可见招募任务 */
    // getRecruitMission(): Mission[] {
    //     return Object.keys(GState.data.recruitMission)
    //         .map((id) => GState.data.recruitMission[id])
    //         .filter((m) => GTable.getById("RankMissionTbl", m.id).round === GState.data.impactData.recruitRound);
    // }
    // /**获取可见招募任务 */
    // getEquipMission(): Mission[] {
    //     return Object.keys(GState.data.equipMission)
    //         .map((id) => GState.data.equipMission[id])
    //         .filter((m) => GTable.getById("RankMissionTbl", m.id).round === GState.data.impactData.equipRound);
    // }
    // /**获取可见竞技场任务 */
    // getArenaMission(): Mission[] {
    //     return Object.keys(GState.data.arenaMission)
    //         .map((id) => GState.data.arenaMission[id])
    //         .filter((m) => GTable.getById("RankMissionTbl", m.id).round === GState.data.impactData.arenaRound);
    // }
    /**获取任务奖励 */
    obtainMissionReward(id: number) {
        return GApi.impact.obtainMissionReward({ id });
    }
    /**是否有可领取任务 */
    canGetChallengeMission() {
        return this.getChallengeMission().some((m) => m.getState() === "complete");
    }
    // /**是否有可领取任务 */
    // canGetRecruitMission() {
    //     return this.getRecruitMission().some((m) => m.getState() === "complete");
    // }
}
