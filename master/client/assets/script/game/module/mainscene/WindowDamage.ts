import { autowired, message, registerClass } from "../../../framework/Decorator";
import { WindowOpenAnimationEnum, WindowOpenOption } from "../../../framework/ui/GWindow";
import UIButton from "../../../framework/ui/UIButton";
import UIImage from "../../../framework/ui/UIImage";
import UILabel from "../../../framework/ui/UILabel";
import UIList from "../../../framework/ui/UIList";
import UIWindow from "../../../framework/ui/UIWindow";
import Item from "../../entity/Item";
import EventName from "../../event/EventName";
import WindowCongratulation from "../common/WindowCongratulation";
import ListItemDamageReward from "./ListItemDamageReward";
import ListItemUIMonster from "./ListItemUIMonster";
import WindowDamageReward from "./WindowDamageReward";

const { ccclass, property } = cc._decorator;

@registerClass("WindowDamage")
@ccclass
export default class WindowDamage extends UIWindow {
    static defaultOpentOption: Partial<WindowOpenOption> = {
        animation: WindowOpenAnimationEnum.default,
    };
    _windowParam: { page: number };
    _returnValue: any;

    @autowired(UIButton) btn_one: UIButton = null;
    @autowired(UIImage) exclamation1: UIImage = null;
    @autowired(UIButton) btn_mul: UIButton = null;
    @autowired(UIImage) exclamation2: UIImage = null;
    @autowired(UIImage) bg: UIImage = null;
    @autowired(UIButton) rule: UIButton = null;
    @autowired(UILabel) info: UILabel = null;
    @autowired(UILabel) title: UILabel = null;
    @autowired(UILabel) bossName: UILabel = null;
    @autowired(UIList) boss: UIList<ListItemUIMonster> = null;
    @autowired(UILabel) damage: UILabel = null;
    @autowired(UILabel) rank: UILabel = null;
    @autowired(cc.ProgressBar) damageBar: cc.ProgressBar = null;
    @autowired(UIList) chestList: UIList<ListItemDamageReward> = null;
    @autowired(UIButton) challenge: UIButton = null;
    @autowired(UIImage) exclamation: UIImage = null;
    @autowired(UILabel) refresh: UILabel = null;
    // @autowired(UIList) bottomMenu: UIList<ListItemBottomMenu> = null;
    @autowired(UIButton) return: UIButton = null;
    @autowired(UIButton) rewardBtn: UIButton = null;
    @autowired(UIButton) rankingBtn: UIButton = null;

    protected onInited(): void {
        this.return.onClick = () => {
            this.close();
        };
        this.btn_one.onClick = () => {
            this.btn_one.bg.imgName = "new_common_correctBg";
            this.btn_mul.bg.imgName = "common_damage_bg1";
            // this.page = 0;
            this.initWindow();
        };
        this.btn_mul.onClick = () => {
            this.btn_mul.bg.imgName = "new_common_correctBg";
            this.btn_one.bg.imgName = "common_damage_bg1";
            // this.page = 1;
            this.initWindow();
        };
        this.rule.onClick = () => {};
        this.challenge.onClick = async () => {
            if (GModel.damage.canChallenge(this._windowParam.page + 1)) {
                await GModel.damage.challenge(this._windowParam.page + 1);
            } else {
                GTip.showTip([GLang.code.ui.not_today]);
            }
        };
        this.rewardBtn.onClick = () => {
            GWindow.open(WindowDamageReward, { kind: this._windowParam.page + 1 });
        };
        this.rankingBtn.onClick = () => {};
        this.initWindow();
        this.refreshBottom();
    }
    @message([EventName.stateKey.damageData])
    async initWindow() {
        const tbl = GTable.getList("DamageMonsterTbl").find((t) => t.kind === this._windowParam.page + 1);
        const rewardTbl = GTable.getList("DamageChallengeTbl").filter((t) => t.kind === this._windowParam.page + 1);
        // this.boss.setSpine(tbl.monsters, "default", "idle");
        this.refresh.setText([tbl.limitDesc]);
        this.boss.setState(
            tbl.monsters.map((id) => {
                return { id, scale: tbl.scale };
            })
        );
        this.bossName.setText([tbl.bossName]);
        this.info.setText([tbl.description]);
        this.title.setText([tbl.title]);
        this.damage.setText([
            GLang.code.ui.highest_damage,
            "_rs" +
                GUtils.ui.getNumberString(
                    this._windowParam.page === 0 ? GState.data.damageData.myDamage : GState.data.damageData.myMulDamage,
                    1
                ),
            "_rs" + GUtils.ui.getNumberString(rewardTbl[rewardTbl.length - 1].damage, 1),
        ]);
        // todo 排行处理
        // const ranking = await GModel.ranking.rankingByIndex(this._windowParam.page === 0 ? 5 : 6);
        // let self = ranking.find((s) => s.info.roleId === HttpServer.roleId);
        // this.rank.setText([GLang.code.ui.my_rank], [self ? "_rs" + self.rank : GLang.code.ui.rankList_not_in_rank]);
        this.rank.setText([GLang.code.ui.my_rank], [GLang.code.ui.rankList_not_in_rank]);
        this.exclamation1.node.active = rewardTbl.some(
            (t) => GState.data.damageData.myDamage >= t.damage && !GState.data.damageData.hasGetReward.includes(t.id)
        );
        this.exclamation2.node.active = rewardTbl.some(
            (t) => GState.data.damageData.myMulDamage >= t.damage && !GState.data.damageData.hasGetReward.includes(t.id)
        );
        // this.refreshTime();
        // this.schedule(this.refreshTime, 1);
        this.refreshChest();

        const canChallenge = GModel.damage.canChallenge(this._windowParam.page + 1);
        this.challenge.setGrey(!canChallenge);
    }
    refreshChest() {
        const tbl = GTable.getList("DamageChallengeTbl").filter((t) => t.kind === this._windowParam.page + 1);
        const damage =
            this._windowParam.page === 0 ? GState.data.damageData.myDamage : GState.data.damageData.myMulDamage;
        let ids = [];
        const cb = async () => {
            tbl.forEach((t) => {
                if (t.damage <= damage) {
                    ids.push(t.id);
                }
            });

            if (ids.length > 0 && ids.some((id) => !GState.data.damageData.hasGetReward.includes(id))) {
                let reward = await GModel.damage.getReward(ids);
                let finalReward = Item.combine(reward);
                GWindow.open(WindowCongratulation, { items: finalReward });
            }
        };
        let current = tbl.findIndex((t) => t.damage > damage);
        let filterTbl = tbl.filter((t, i) => {
            if (current === 0) return i < current + 3;
            else if (current === -1 || current >= tbl.length - 2) return i > tbl.length - 5;
            else if (current < 2) return i < current + 2;
            else return i < current + 2 && i > current - 3;
        });
        let state = filterTbl.map((t) => {
            return { id: t.id, cb };
        });

        this.chestList.setState(state);
        let layout = this.chestList.getComponent(cc.Layout);
        let perPix = 30000 / this.damageBar.totalLength;
        layout.paddingLeft = current < 2 && current !== -1 ? 166 : 0;
        this.damageBar.progress =
            (damage - (current < 2 ? 0 : filterTbl[0].damage) + (damage > 0 ? 10 * perPix : 0)) / 30000;
    }
    refreshBottom() {
        // const state = GTable.getList("UIMainSceneTbl")
        //     .filter((t) => t.position === 7)
        //     .map((t) => {
        //         let cb = () => {
        //             GModel.player.openWindowWithSystemUnlockCheck(t);
        //         };
        //         let selected = false;
        //         let show = 0;
        //         return { id: t.id, cb, selected, show, status: false };
        //     });
        // this.bottomMenu.setState(state);
    }
    // /**刷新时间 */
    // refreshTime() {
    //     let date = new GameDate();
    //     let day = date.getDay();
    //     this.refresh.node.active =
    //         day !== 0 && !GConfig.damageChallenge.dayOfWeek[this._windowParam.page].includes(day);
    //     let todayremain = date.todayRemainMillisecond();
    //     this.refresh.setText([
    //         GLang.code.ui.damage_refresh,
    //         "_rs" + GUtils.date.formatRemainTime(todayremain, "hh:mm:ss"),
    //     ]);
    // }
}
