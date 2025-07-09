import { autowired, registerClass } from "../../../framework/Decorator";
import { GameDate } from "../../../framework/date/GameDate";
import UIButton from "../../../framework/ui/UIButton";
import UIImage from "../../../framework/ui/UIImage";
import UILabel from "../../../framework/ui/UILabel";
import UIListItem from "../../../framework/ui/UIListItem";

const { ccclass, property } = cc._decorator;

@registerClass("ListItemMainSceneMenu")
@ccclass
export default class ListItemMainSceneMenu extends UIListItem {
    @autowired(UIButton) btn: UIButton = null;
    @autowired(UIImage) icon: UIImage = null;
    @autowired(UIImage) exclamation: UIImage = null;
    @autowired(UILabel) label: UILabel = null;

    state: {
        id: number;
        label?: string;
        cb: () => void;
    };
    setState(state: this["state"]): void {
        this.state = state;
        // if (this.state.id === 1008 && !GModel.player.checkSystemUnlock(GConstant.systemId.turntable, false)) {
        //     this.node.active = false;
        // } else {
        //     this.node.active = true;
        // }
        switch (this.state.id) {
            case 1022:
                this.node.active = GModel.giftPack.getPackList().length > 0;
                break;
            case 1020:
                this.exclamation.node.active = !GState.data.chargeData.clearAd;
                break;
            case 1021:
                this.exclamation.node.active =
                    GState.data.chargeData.month1.remain <= 0 || !GState.data.chargeData.month2.active;
                break;
            case 1023:
                this.node.active = GState.data.chargeData.firstPackage.length < 3;
                break;
            default:
                break;
        }
        const tbl = GTable.getById("UIMainSceneTbl", this.state.id);
        // this.node.name = tbl.id.toString();
        this.label.setText([GTable.getById("UIMainSceneTbl", this.state.id).text]);
        // this.state.label && this.label.setText([this.state.label]);
        this.btn.onClick = this.state.cb;
        this.icon.imgName = tbl.img;
        // this.icon.imgName = "mainscene_btn_quick_heal";
    }
}
