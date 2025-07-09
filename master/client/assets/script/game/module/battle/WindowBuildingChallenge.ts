import { autowired, message, registerClass } from "../../../framework/Decorator";
import UIButton from "../../../framework/ui/UIButton";
import UIImage from "../../../framework/ui/UIImage";
import UILabel from "../../../framework/ui/UILabel";
import UIList from "../../../framework/ui/UIList";
import UISpine from "../../../framework/ui/UISpine";
import UIWindow from "../../../framework/ui/UIWindow";
import { WindowOpenAnimationEnum, WindowOpenOption } from "../../../framework/ui/GWindow";
import ListItemItem from "../common/ListItemItem";

const { ccclass, property } = cc._decorator;

@registerClass("WindowBuildingChallenge")
@ccclass
export default class WindowBuildingChallenge extends UIWindow {
    static defaultOpentOption: Partial<WindowOpenOption> = {
        animation: WindowOpenAnimationEnum.default,
    };
    _windowParam: {
        id: number;
    };
    _returnValue: any;
    /**掉落列表 */
    @autowired(UIList) droppedList: UIList<ListItemItem> = null;
    /**守卫图片 */
    @autowired(UISpine) guard: UISpine = null;
    /**房间名 */
    @autowired(UILabel) roomName: UILabel = null;
    /**房间图片 */
    @autowired(UIImage) room: UIImage = null;
    /**守卫名 */
    @autowired(UILabel) guardName: UILabel = null;
    /**守卫战力 */
    @autowired(UILabel) guardPower: UILabel = null;
    /**房间简介 */
    @autowired(UILabel) roomInfo: UILabel = null;
    /**挑战按钮 */
    @autowired(UIButton) challenge: UIButton = null;
    @autowired(UIButton) closeBtn: UIButton = null;

    protected onInited(): void {
        this.closeBtn.onClick = () => {
            this.close();
        };
        this.challenge.onClick = async () => {
            const success = await GModel.facility.occupyFacility(this._windowParam.id);
            if (success) {
                this.close();
            }
        };
        this.windowInit();
        this.refreshList();
    }
    /**窗口初始化 */
    windowInit() {
        let facility = GModel.facility.getFacilityById(this._windowParam.id);
        const waveTbl = GTable.getById("MonsterWaveTbl", facility.getTbl().guard);
        const list = [waveTbl.wave1, waveTbl.wave2, waveTbl.wave3, waveTbl.wave4, waveTbl.wave5].filter(
            (t) => t.length > 0
        );
        const lastList = list[list.length - 1];
        const bossId = lastList[lastList.length - 1];
        let boss = GTable.getById("MonsterTbl", bossId);
        this.room.imgName = facility.getTbl().image;
        this.guardName.setText([boss.name]);
        let tbl = GTable.getList("SpineInfoTbl").find((t) => t.spine === boss.img);
        tbl && (this.guard.node.scale = tbl.uiScale);
        this.guard.setSpine(boss.img, "default", "idle");
        this.roomName.setText([facility.getTbl().name]);
        const bp = GModel.facility.getFacilityGuardBattlePoint(this._windowParam.id);
        this.guardPower.setText([`_rs${GUtils.ui.getNumberString(bp, 1)}`]);
        this.roomInfo.setText([facility.getTbl().description]);
    }
    /**刷新掉落列表 */
    refreshList() {
        let facility = GModel.facility.getFacilityById(this._windowParam.id);
        let state = facility.getUnlockReward().map((t) => {
            return { equipment: null, carEquipment: null, item: t, status: 0 };
        });
        this.droppedList.setState(state);
    }
}
