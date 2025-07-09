import { autowired, message, registerClass } from "../../../framework/Decorator";
import { WindowOpenAnimationEnum, WindowOpenOption } from "../../../framework/ui/GWindow";
import UIButton from "../../../framework/ui/UIButton";
import UIImage from "../../../framework/ui/UIImage";
import UILabel from "../../../framework/ui/UILabel";
import UIList from "../../../framework/ui/UIList";
import UIListItem from "../../../framework/ui/UIListItem";
import UIWindow from "../../../framework/ui/UIWindow";
import Item from "../../entity/Item";
import { PlayerEquipment } from "../../entity/PlayerEquipment";
import EventName from "../../event/EventName";
import ListItemItem from "../common/ListItemItem";
import ListItemPropItem from "../mainsceneNew/ListItemPropItem";

const { ccclass, property } = cc._decorator;
@registerClass("WindowPropHandbookDetails")
@ccclass
export default class WindowPropHandbookDetails extends UIWindow {
    static defaultOpentOption: Partial<WindowOpenOption> = {
        animation: WindowOpenAnimationEnum.default,
    };
    _windowParam: {
        part: number;
        equipmentId: number;
        skillTalentTblId: number;
    };
    _returnValue: any;

    @autowired(UIButton) closeBtn: UIButton = null;

    @autowired(UILabel) title: UILabel = null;
    /** */
    @autowired(UIList) uiList: UIList<ListItemPropItem> = null;
    /**名称文本 */
    @autowired(UILabel) nameLab: UILabel = null;
    /**技能描述 */
    @autowired(UILabel) skillTips: UILabel = null;
    /**打开条件 */
    @autowired(UILabel) openRequire: UILabel = null;
    @autowired(UIButton) btn: UIButton = null;
    @autowired(UIImage) bg: UIImage = null;
    @autowired(UIImage) image: UIImage = null;
    @autowired(UILabel) count: UILabel = null;
    @autowired(cc.Node) checked: cc.Node = null;

    protected onInited(): void {
        this.closeBtn.onClick = () => {
            this.close();
        };
        this.closeBtn.setTransition(false);

        let tbl = GTable.getById("PlayerSkillTalentTbl", this._windowParam.skillTalentTblId);

        this.skillTips.setText([tbl.description]);
        let e: PlayerEquipment = new PlayerEquipment();
        e.uid = 1;
        e.id = this._windowParam.equipmentId;
        e.level = 1;
        e.baseProperty = [];
        e.stat = [];
        this.title.setText([e.tbl().type]);
        this.nameLab.setText(["_rs["], ["ui/quality_label_" + e.tbl().quality], ["_rs]"], [e.tbl().name]);
        this.nameLab.node.color = GConstant.equipQuality[e.tbl().quality];

        this.openRequire.setText([GLang.code.ui.PropHandbookDetails_openRequire, "_rs" + tbl.unlock]);

        this.uiList.setState([{ playerEquipment: e, showStar: tbl.rank, showQuality: true }]);
        // this.showItem();
    }
    @message([EventName.stateKey.equipmentCollection])
    showItem() {
        let colletionData = GModel.defendTower.getColletionData(this._windowParam.part).find((d) => {
            return d.talentId == this._windowParam.skillTalentTblId;
        });
        this.btn.onClick = () => {
            if (colletionData.state == "canActive") GModel.defendTower.activateColletion(this._windowParam.equipmentId);
        };
        const item = new Item(GIndex.id.diamondId, 100);

        this.bg.imgName = GConstant.itemQualityBg[Item.getQuality(item)];
        this.image.imgName = Item.getImg(item);
        this.count.setText(["_rs" + item.count]);
        this.checked.active = colletionData.state === "hasActive";
    }
}
