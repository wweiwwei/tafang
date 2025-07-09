import { autowired, message, registerClass } from "../../../framework/Decorator";
import { GameDate } from "../../../framework/date/GameDate";
import { WindowOpenAnimationEnum, WindowOpenOption } from "../../../framework/ui/GWindow";
import UIButton from "../../../framework/ui/UIButton";
import UIImage from "../../../framework/ui/UIImage";
import UILabel from "../../../framework/ui/UILabel";
import UIList from "../../../framework/ui/UIList";
import UIScrollList from "../../../framework/ui/UIScrollList";
import UIWindow from "../../../framework/ui/UIWindow";
import Item from "../../entity/Item";
import Mission from "../../entity/Mission";
import EventName from "../../event/EventName";
import ListItemRankRewardItem from "../arena/ListItemRankRewardItem";
import ListItemPackItem from "../common/ListItemPackItem";
import ListItemRankList from "../common/ListItemRankList";
import ListItemUserInfoItem from "../common/ListItemUserInfoItem";
import ListItemImpactMission from "./ListItemImpactMission";
import WindowRule from "./WindowRule";

const { ccclass, property } = cc._decorator;
@registerClass("WindowImpact")
@ccclass
export default class WindowImpact extends UIWindow {
    static defaultOpentOption: Partial<WindowOpenOption> = {
        animation: WindowOpenAnimationEnum.default,
    };
    /**0-挑战，1-招募，2-装备，3-竞技场 */
    _windowParam: { status: number };
    _returnValue: any;
    /**任务列表 */
    @autowired(UIScrollList) rankList: UIScrollList<ListItemRankList> = null;
    @autowired(UIScrollList) missionList: UIScrollList<ListItemImpactMission> = null;
    @autowired(UIScrollList) packList: UIScrollList<ListItemPackItem> = null;
    @autowired(UIScrollList) rewardList: UIScrollList<ListItemRankRewardItem> = null;
    @autowired(UIButton) closeBtn: UIButton = null;
    /**活动周期 */
    @autowired(UILabel) titleTime: UILabel = null;
    @autowired(UILabel) title: UILabel = null;
    /**轮次 */
    @autowired(UILabel) round: UILabel = null;
    @autowired(cc.Node) missionNode: cc.Node = null;
    @autowired(cc.Node) rankNode: cc.Node = null;
    /**自己 */
    @autowired(UILabel) rank: UILabel = null;
    @autowired(UIImage) rankImg: UIImage = null;
    @autowired(UILabel) score: UILabel = null;
    @autowired(UILabel) count: UILabel = null;
    @autowired(UIList) userInfo: UIList<ListItemUserInfoItem> = null;

    /**规则 */
    @autowired(UIButton) exclamation: UIButton = null;
    @autowired(UIImage) missionExclamation: UIImage = null;
    @autowired(UIImage) bannar: UIImage = null;

    @autowired(UIButton) missionbtn: UIButton = null;
    @autowired(UIButton) rankbtn: UIButton = null;
    @autowired(UIButton) rewardbtn: UIButton = null;
    @autowired(UIButton) packbtn: UIButton = null;

    private page: number = 0;

    protected onInited(): void {
        this.closeBtn.onClick = () => {
            this.close();
        };

        this.exclamation.onClick = () => {
            let ruleId = 0;
            switch (this._windowParam.status) {
                case 0:
                    ruleId = GIndex.id.ruleId.challengeImpact;
                    break;
                case 1:
                    ruleId = GIndex.id.ruleId.heroImpact;
                    break;
                case 2:
                    ruleId = GIndex.id.ruleId.equipImpact;
                    break;
                case 3:
                    ruleId = GIndex.id.ruleId.arenaImpact;
                    break;

                default:
                    break;
            }
            GWindow.open(WindowRule, { ruleId });
        };
        let btnlist = [this.missionbtn, this.rankbtn, this.rewardbtn, this.packbtn];
        btnlist.forEach(
            (btn, i) =>
                (btn.onClick = () => {
                    this.page = i;
                    this.refreshPage();
                })
        );
        this.windowInit();
        this.refreshPage();
    }
    refreshPage() {
        this.missionNode.active = this.page === 0 || this.page === 3;
        this.rankNode.active = this.page === 1 || this.page === 2;
        this.missionList.node.active = this.page === 0;
        this.rankList.node.active = this.page === 1;
        this.rewardList.node.active = this.page === 2;
        this.packList.node.active = this.page === 3;
        this.missionbtn.bg.imgName = this.page === 0 ? "hero_list_chosen" : "hero_list_unchosen";
        this.rankbtn.bg.imgName = this.page === 1 ? "hero_list_chosen" : "hero_list_unchosen";
        this.rewardbtn.bg.imgName = this.page === 2 ? "hero_list_chosen" : "hero_list_unchosen";
        this.packbtn.bg.imgName = this.page === 3 ? "hero_list_chosen" : "hero_list_unchosen";
        this.round.node.active = this.page === 0;
    }

    @message([EventName.stateKey.impactData])
    windowInit() {
        let round = 0;
        let count = 0;
        switch (this._windowParam.status) {
            case 0:
                this.bannar.imgName = "impact_challenge_bannar";
                this.title.setText([GLang.code.ui.impact_challenge]);
                round = GState.data.impactData.challengeRound;
                count = GModel.stage.getAllStage()[0].stageIndex;
                break;
            case 1:
                this.bannar.imgName = "impact_recruit_bannar";
                this.title.setText([GLang.code.ui.impact_recruit]);
                round = GState.data.impactData.recruitRound;
                count = GState.data.impactData.heroTotal;
                break;
            case 2:
                this.bannar.imgName = "impact_equipment_banner";
                this.title.setText([GLang.code.ui.impact_equip]);
                round = GState.data.impactData.equipRound;
                count = GState.data.impactData.equipTotal;
                break;
            case 3:
                this.bannar.imgName = "impact_arena_banner";
                this.title.setText([GLang.code.ui.impact_arena]);
                round = GState.data.impactData.arenaRound;
                count = GState.data.impactData.arenaTotal;
                break;

            default:
                break;
        }
        let tbl = GTable.getList("RankMissionTbl");
        let tbls = tbl.filter((t) => t.page === this._windowParam.status);
        this.round.setText(
            [GLang.code.ui.impact_round],
            [`_rs${round}/${tbls.length > 0 ? GUtils.array.maxBy(tbls, (t) => t.round).round : 0}`]
        );
        this.userInfo.setState([
            {
                status: this._windowParam.status === 0 ? 0 : 4,
                roleIcon: GModel.player.roleIcon(),
                roleName: GModel.player.roleName(),
                battlePoint: GModel.battle.getBattlePoint(),
                headFrame: GModel.player.headFreame(),
                // switchRoleId: 0,
            },
        ]);
        this.score.setText([
            this._windowParam.status === 0
                ? GLang.code.ui.number_of_stage
                : this._windowParam.status === 3
                ? GLang.code.ui.points
                : GLang.code.ui.card_count,
        ]);
        this.count.setText(["_rs" + count]);
        this.refreshMission();
        this.refreshRank();
        this.refreshPack();
        this.refreshReward();
        this.refreshTime();
        this.schedule(this.refreshTime, 3600);
    }
    @message([
        EventName.stateKey.challengeMission,
        // EventName.stateKey.recruitMission,
        // EventName.stateKey.arenaMission,
        // EventName.stateKey.equipMission,
    ])
    refreshMission() {
        let state: Mission[];
        switch (this._windowParam.status) {
            case 0:
                state = GModel.impact.getChallengeMission();
                break;
            // case 1:
            //     state = GModel.impact.getRecruitMission();
            //     break;
            // case 2:
            //     state = GModel.impact.getEquipMission();
            //     break;
            // case 3:
            //     state = GModel.impact.getArenaMission();
            //     break;
            // default:
            //     break;
        }
        console.log("state =", state);
        this.missionList.setState(
            state.map((mission) => {
                return {
                    mission,
                    cb: () => {
                        this.close();
                    },
                };
            })
        );
        // this.missionExclamation.node.active = state.some((m) => m.getState() === "complete");
    }
    @message([EventName.stateKey.stage])
    async refreshRank() {
        let ranking;
        switch (this._windowParam.status) {
            case 0:
                ranking = await GModel.ranking.stageRanking();
                break;
            // case 1:
            //     ranking = await GModel.ranking.cardPoolRanking();
            //     break;
            // case 2:
            //     ranking = await GModel.ranking.equipmentCardPoolRanking();
            //     break;
            case 3:
                ranking = await GModel.ranking.arenaRanking();
                break;

            default:
                break;
        }
        let state = ranking.map((t) => {
            return {
                rank: t.rank,
                info: t.info,
                level: t.point,
                status: this._windowParam.status === 0 ? 0 : this._windowParam.status === 3 ? 1 : 4,
            };
        });
        this.rankList.setState(state);
        let self = state.find((s) => s.info.roleId === HttpServer.roleId);
        if (self) {
            this.rank.setText(["_rs" + self.rank]);
            this.rankImg.node.active = self.rank < 4;
            this.rankImg.imgName = GConstant.rankImg[self.rank - 1];
            this.count.setText(["_rs" + self.level]);
        } else {
            this.rankImg.node.active = false;
            this.rank.setText([GLang.code.ui.rank_no_rank]);
        }
    }
    refreshReward() {
        let state = GTable.getList("RankRewardTbl")
            .filter((t) => t.page === this._windowParam.status)
            .map((t) => {
                return { rank: t.rank, items: Item.fromItemArray(t.reward) };
            });
        this.rewardList.setState(state);
    }
    refreshPack() {
        let state = GTable.getList("RankPackTbl")
            .filter((t) => t.page === this._windowParam.status)
            .map((t) => {
                return { id: t.id };
            });
        this.packList.setState(state);
    }
    refreshTime() {
        let id;
        switch (this._windowParam.status) {
            case 0:
                id = GIndex.id.activities.impactChallenge;
                break;
            case 1:
                id = GIndex.id.activities.impactRecruit;
                break;
            case 2:
                id = GIndex.id.activities.impactEquip;
                break;
            case 3:
                id = GIndex.id.activities.impactArena;
                break;

            default:
                break;
        }
        let tbl = GTable.getById("ActivitiesTbl", id);
        let date =
            GState.data.impactData.beginTime +
            tbl.delay * GameDate.OneDay +
            GameDate.OneDay * tbl.lastDay -
            GameDate.now();
        let day = GUtils.date.formatRemainTime(date, "DD");
        let hour = GUtils.date.formatRemainTime(date, "hh");
        this.titleTime.setText([GLang.code.ui.impact_time, "_rs" + day, "_rs" + hour]);
    }
    protected onRecycle(): void {
        this.unscheduleAllCallbacks();
    }
}
