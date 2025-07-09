import { autowired, registerClass } from "../../../framework/Decorator";
import { WindowOpenAnimationEnum, WindowOpenOption } from "../../../framework/ui/GWindow";
import UIButton from "../../../framework/ui/UIButton";
import UIImage from "../../../framework/ui/UIImage";
import UILabel from "../../../framework/ui/UILabel";
import UIScrollList from "../../../framework/ui/UIScrollList";
import UIWindow from "../../../framework/ui/UIWindow";
import ListItemRankList from "../common/ListItemRankList";

const { ccclass, property } = cc._decorator;
@registerClass("WindowRankList")
@ccclass
export default class WindowRankList extends UIWindow {
    static defaultOpentOption: Partial<WindowOpenOption> = {
        animation: WindowOpenAnimationEnum.default,
        hideMainScene: true,
    };
    @autowired(UIScrollList) rankList: UIScrollList<ListItemRankList> = null;
    @autowired(UIButton) closeBtn: UIButton = null;
    @autowired(UILabel) restTime: UILabel = null;
    @autowired(UILabel) userName: UILabel = null;
    @autowired(UILabel) power: UILabel = null;
    @autowired(UILabel) count: UILabel = null;
    @autowired(UILabel) rank: UILabel = null;
    @autowired(UIImage) avatar: UIImage = null;
    @autowired(UIImage) rankImg: UIImage = null;
    @autowired(UIImage) bg: UIImage = null;
    _windowParam: { status: number /**0-爬塔,1-竞技场*/ };
    _returnValue: any;
    protected onInited(): void {
        this.closeBtn.onClick = () => {
            this.close();
        };
        this.avatar.imgName = "Role_mermaid_head";
        this.userName.setText(["_rs" + HttpServer.playerInfo.playerName]);
        this.power.setText(["_rs"]);
        this.count.setText(["_rs" + GModel.tower.level()]);
        this.initTowerList();
    }
    async initTowerList() {
        let arr = (await GModel.tower.rankList()).map((t) => {
            return { rank: t.rank, name: t.name, level: t.level, status: 0 };
        });
        this.rankList.setState(arr);
    }
    initArenaList() {}
}
