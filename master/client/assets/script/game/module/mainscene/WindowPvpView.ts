import { autowired, registerClass } from "../../../framework/Decorator";
import { WindowOpenAnimationEnum, WindowOpenOption } from "../../../framework/ui/GWindow";
import UIButton from "../../../framework/ui/UIButton";
import UIImage from "../../../framework/ui/UIImage";
import UILabel from "../../../framework/ui/UILabel";
import UIList from "../../../framework/ui/UIList";
import UIListItem from "../../../framework/ui/UIListItem";
import UIWindow from "../../../framework/ui/UIWindow";
import WindowCommonConfirm from "../common/WindowCommonConfirm";
import ListItemPvpItem1 from "./ListItemPvpItem1";
import ListItemPvpSkill from "./ListItemPvpSkill";

const { ccclass, property } = cc._decorator;
@registerClass("WindowPvpView")
@ccclass
export default class WindowPvpView extends UIWindow {
    _windowParam: any;
    _returnValue: any;
    @autowired(UIButton) closeBtn: UIButton = null;

    /**怪物图 */
    @autowired(UIImage) bossImg: UIImage = null;
    /**怪物 */
    @autowired(UILabel) bossText: UILabel = null;
    /**时间 */
    @autowired(UILabel) bossTime: UILabel = null;
    /**怪物数量 */
    @autowired(UILabel) topMonsterNum: UILabel = null;
    /**怪物数量2 */
    @autowired(UILabel) downMonsterNum: UILabel = null;
    /**左边玩家名称 */
    @autowired(UILabel) leftPlayerName: UILabel = null;
    /**右边玩家名称 */
    @autowired(UILabel) rightPlayerName: UILabel = null;
    /**左边描述 */
    @autowired(UILabel) leftDescribe: UILabel = null;
    /**右边描述 */
    @autowired(UILabel) rightDescribe: UILabel = null;
    /**消耗 */
    @autowired(UILabel) costLabel: UILabel = null;
    /** 剩余 */
    @autowired(UILabel) remainLabel: UILabel = null;
    /**技能1 */
    @autowired(UIList) skill1: UIList<ListItemPvpSkill> = null;
    /**技能2 */
    @autowired(UIList) skill2: UIList<ListItemPvpSkill> = null;
    /**技能详情 */
    @autowired(UIList) skillDetails: UIList<ListItemPvpItem1> = null;
    /** 刷新按钮 */
    @autowired(UIButton) refreshBtn: UIButton = null;

    static defaultOpentOption: Partial<WindowOpenOption> = {
        animation: WindowOpenAnimationEnum.no,
    };
    protected onInited(): void {
        this.closeBtn.onClick = async () => {
            const ok = await GWindow.open(WindowCommonConfirm, {
                tip: ["_rs是否认输？"],
            });
            if (ok) {
                this.close();
                GBattlePvpManager.toMainScene();
            }
        };
        this.refreshBtn.onClick = () => {
            GBattlePvpManager.refreshCard();
        };
        // todo 显示玩家名
        this.refresh();
    }

    refresh() {
        // 刷新怪物数
        const api1 = GBattleApiManager.getBattleStageApi(1);
        const api2 = GBattleApiManager.getBattleStageApi(2);
        this.downMonsterNum.setText([`_rs怪物数量：${api1.getMonsterCount()}/200`]);
        this.topMonsterNum.setText([`_rs怪物数量：${api2.getMonsterCount()}/200`]);
        // 底端ui
        const skillMgr = api1.rogueSkillManager();
        const property = api1.globalProperty();
        this.costLabel.setText([`_rs${skillMgr.currentCost()}`]);
        this.remainLabel.setText([`_rs${property.coin}`]);
        // 可选卡片
        const cardList = skillMgr.currentCards;
        this.skillDetails.setState(
            cardList.map((id) => {
                return { id };
            })
        );
    }

    private _fixedUpdateInterval = 1 / 60;
    private _fixedUpdateTotal: number = 0;
    private _updateTotal: number = 0;
    protected fixedUpdate() {
        GBattlePvpManager.tick();
        this.refresh();
    }

    protected update(dt: number) {
        // this.followPlayer();
        this._updateTotal += dt;
        while (this._updateTotal - this._fixedUpdateTotal >= this._fixedUpdateInterval) {
            this._fixedUpdateTotal += this._fixedUpdateInterval;
            this.fixedUpdate();
        }
    }
}
