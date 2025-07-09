import { autowired, registerClass } from "../../../framework/Decorator";
import UIImage from "../../../framework/ui/UIImage";
import UILabel from "../../../framework/ui/UILabel";
import UIListItem from "../../../framework/ui/UIListItem";

const { ccclass, property } = cc._decorator;
@registerClass("ListItemRankList")
@ccclass
export default class ListItemRankList extends UIListItem {
    /**玩家名 */
    @autowired(UILabel) userName: UILabel = null;
    /**玩家战力 */
    @autowired(UILabel) power: UILabel = null;
    /**积分或层数 */
    @autowired(UILabel) score: UILabel = null;
    /**数量 */
    @autowired(UILabel) count: UILabel = null;
    /**排名 */
    @autowired(UILabel) rank: UILabel = null;
    /**头像 */
    @autowired(UIImage) avatar: UIImage = null;
    /**积分图片 */
    @autowired(UIImage) scoreImg: UIImage = null;
    /**排名图片 */
    @autowired(UIImage) rankImg: UIImage = null;
    /**背景图 */
    @autowired(UIImage) bg: UIImage = null;
    state: { rank: number; name: string; level: number; status: number };
    setState(state: this["state"]): void {
        this.state = state;
        this.avatar.imgName = "Role_mermaid_head";
        this.power.setText(["_rs"]);
        this.rankImg.node.active = this.state.rank <= 3;
        this.state.rank <= 3 && (this.rankImg.imgName = GConstant.rankImg[this.state.rank - 1]);
        this.rank.setText(["_rs" + this.state.rank]);
        this.userName.setText(["_rs" + this.state.name]);
        this.state.name === HttpServer.playerInfo.playerName && (this.bg.imgName = GConstant.rankBg.self);
        if (this.state.status === 0) {
            this.scoreImg.node.active = false;
            this.score.setText([GLang.code.ui.number_of_tower]);
            this.count.setText(["_rs" + this.state.level]);
        } else {
            this.scoreImg.node.active = true;
            this.score.setText([GLang.code.ui.points]);
        }
    }
}
