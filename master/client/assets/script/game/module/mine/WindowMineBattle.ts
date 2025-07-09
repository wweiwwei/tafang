import { autowired, registerClass } from "../../../framework/Decorator";
import UIButton from "../../../framework/ui/UIButton";
import UILabel from "../../../framework/ui/UILabel";
import UIList from "../../../framework/ui/UIList";
import UISpine from "../../../framework/ui/UISpine";
import UIWindow from "../../../framework/ui/UIWindow";
import Item from "../../entity/Item";
import { MineAction } from "../../entity/MineAction";
import ListItemItem from "../common/ListItemItem";

const { ccclass, property } = cc._decorator;
@registerClass("WindowMineBattle")
@ccclass
export default class WindowMineBattle extends UIWindow {
    @autowired(UILabel) time: UILabel = null;
    @autowired(UIButton) getIncome: UIButton = null;
    @autowired(UIButton) closeBtn: UIButton = null;
    @autowired(UIButton) challenge: UIButton = null;
    @autowired(UIList) rewardList: UIList<ListItemItem> = null;
    @autowired(UILabel) bossName: UILabel = null;
    @autowired(UILabel) bossPower: UILabel = null;

    /**守卫图片 */
    @autowired(UISpine) guard: UISpine = null;
    _windowParam: {
        id: number;
    };
    _returnValue: MineAction[] = [];
    protected onInited(): void {
        this.closeBtn.onClick = () => {
            this.close();
        };
        this.challenge.onClick = async () => {
            // let func = async () => {
            //     const newAs = await GModel.mine.mineBattle(a.data.uniqueId);
            //     this.tackleMineAction(newAs);
            // };
            this._returnValue = await GModel.mine.mineBattle(this._windowParam.id);
            this.close();
        };
        const brick = GModel.mine.getBrickByUniqueId(this._windowParam.id);
        const tblId = brick.rewardId;
        const tbl = GTable.getById("MineBattleMapTbl", tblId);
        // let boss = GTable.getById(
        //     "MonsterTbl",
        //     GTable.getById("MonsterWaveTbl", tbl.guard).wave1[
        //         GTable.getById("MonsterWaveTbl", tbl.guard).wave1.length - 1
        //     ]
        // );
        // 设置信息
        this.bossName.setText([tbl.name]);
        // this.bossPower.setText([boss.name]);
        this.guard.setSpine(
            GTable.getById("MonsterTbl", GTable.getById("MonsterWaveTbl", tbl.guard).wave5[0]).img,
            "default",
            "idle"
        );
        const rewardListState = [];
        tbl.reward.forEach((t) => {
            rewardListState.push({ item: new Item(t[0], t[1]), status: 1 });
        });
        this.rewardList.setState(rewardListState);
        // this.getIncome.onClick = async () => {
        //     let reward = await GModel.tower.collectAfkReward();
        //     reward.map((t) => {
        //         GTip.showFlyReward(this.incomeList.node.children[0].convertToWorldSpaceAR(cc.v2()), new Item(t.id, 10));
        //     });
        //     this.close();
        // };
        // this.refreshTime();
        // this.schedule(this.refreshTime, 1);
        // let arr = GModel.tower.afkData().reward.map((t) => {
        //     return { item: t, equipment: null, carEquipment: null, status: 0 };
        // });
        // this.incomeList.setState(arr);
    }
    protected onRecycle(): void {
        this.unscheduleAllCallbacks();
    }
    /**刷新时间 */
    // refreshTime() {
    //     this.time.setText([GLang.code.ui.map_income_title, "_rs" + GModel.tower.getAfkTime()]);
    // }
}
