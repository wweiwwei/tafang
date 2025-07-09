import { autowired, registerClass } from "../../../framework/Decorator";
import { WindowOpenAnimationEnum, WindowOpenOption } from "../../../framework/ui/GWindow";
import UIButton from "../../../framework/ui/UIButton";
import UIImage from "../../../framework/ui/UIImage";
import UILabel from "../../../framework/ui/UILabel";
import UIList from "../../../framework/ui/UIList";
import UIScrollList from "../../../framework/ui/UIScrollList";
import UIWindow from "../../../framework/ui/UIWindow";
import ListItemBottomMenu from "../common/ListItemBottomMenu";
import ListItemRankList from "../common/ListItemRankList";

const { ccclass, property } = cc._decorator;
@registerClass("WindowArenaList")
@ccclass
export default class WindowArenaList extends UIWindow {
    static defaultOpentOption: Partial<WindowOpenOption> = {
        animation: WindowOpenAnimationEnum.default,
        hideMainScene: true,
    };
    @autowired(UIScrollList) rankList: UIScrollList<ListItemRankList> = null;
    @autowired(UIButton) return: UIButton = null;
    /**挑战 */
    @autowired(UIButton) challenge: UIButton = null;
    /**剩余时间 */
    @autowired(UILabel) restTime: UILabel = null;
    /**玩家名 */
    @autowired(UILabel) userName: UILabel = null;
    /**玩家战力 */
    @autowired(UILabel) power: UILabel = null;
    /**数量 */
    @autowired(UILabel) count: UILabel = null;
    /**排名 */
    @autowired(UILabel) rank: UILabel = null;
    /**头像 */
    @autowired(UIImage) avatar: UIImage = null;
    /**排名图片 */
    @autowired(UIImage) rankImg: UIImage = null;
    @autowired(UIImage) bg: UIImage = null;
    /**底部菜单容器 */
    @autowired(UIList) bottomMenu: UIList<ListItemBottomMenu> = null;
    _windowParam: any;
    _returnValue: any;
    protected onInited(): void {
        this.return.onClick = () => {
            this.close();
        };
        this.avatar.imgName = "Role_mermaid_head";
        this.userName.setText(["_rs" + HttpServer.playerInfo.playerName]);
        this.power.setText(["_rs"]);
        this.initArenaList();
    }
    async initArenaList() {
        let arr = (await GModel.tower.rankList()).map((t) => {
            return { rank: t.rank, name: t.name, level: t.level, status: 1 };
        });
        this.rankList.setState(arr);
    }
    refreshBottom() {
        const tblList = GTable.getList("UIMainSceneTbl").filter((t) => t.position === 6);
        const state = tblList.map((t, i) => {
            let id = t.id;
            const cb = () => {
                switch (i) {
                    case 0:
                        // GWindow.open()
                        break;
                    case 1:
                        // GWindow.open()
                        break;
                    default:
                        break;
                }
                this.refreshBottom();
            };
            return { id, selected: false, cb, status: false, show: 0 };
        });
        this.bottomMenu.setState(state);
    }
}
