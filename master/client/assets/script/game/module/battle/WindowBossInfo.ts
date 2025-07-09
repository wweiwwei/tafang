import { autowired, message, registerClass } from "../../../framework/Decorator";
import UIButton from "../../../framework/ui/UIButton";
import UIImage from "../../../framework/ui/UIImage";
import UILabel from "../../../framework/ui/UILabel";
import UIList from "../../../framework/ui/UIList";
import UIWindow from "../../../framework/ui/UIWindow";
import { WindowOpenAnimationEnum, WindowOpenOption } from "../../../framework/ui/GWindow";
import ListItemItem from "../common/ListItemItem";

const { ccclass, property } = cc._decorator;

@registerClass("WindowBossInfo")
@ccclass
export default class WindowBossInfo extends UIWindow {
    static defaultOpentOption: Partial<WindowOpenOption> = {
        animation: WindowOpenAnimationEnum.default,
    };
    _windowParam: {
        mapIndex: number;
    };
    _returnValue: any;
    /**掉落列表 */
    @autowired(UIList) droppedList: UIList<ListItemItem> = null;
    /**boss图片 */
    @autowired(UIImage) boss: UIImage = null;
    @autowired(UILabel) bossName: UILabel = null;
    @autowired(UILabel) bossLevel: UILabel = null;
    @autowired(UILabel) attack: UILabel = null;
    @autowired(UILabel) defend: UILabel = null;
    @autowired(UILabel) life: UILabel = null;
    @autowired(UIButton) closeBtn: UIButton = null;

    protected onInited(): void {
        this.closeBtn.onClick = () => {
            this.close();
        };
        this.windowInit();
        this.refreshList();
    }
    /**窗口初始化 */
    windowInit() {
        this.bossLevel.setText(["_rslv.10"]);
        this.bossName.setText(["_rs啊实打实的"]);
        this.attack.setText(["_rs100"]);
        this.defend.setText(["_rs100"]);
        this.life.setText(["_rs100"]);
    }
    /**刷新掉落列表 */
    refreshList() {
        let state = GModel.stage
            .getStageByMapIndex(this._windowParam.mapIndex)
            .firstClearReward()
            .map((t) => {
                return { item: t, equipment: null, status: 0 };
            });
        this.droppedList.setState(state);
    }
}
