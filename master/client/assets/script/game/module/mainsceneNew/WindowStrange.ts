import { autowired, message, registerClass } from "../../../framework/Decorator";
import ResourceLoader from "../../../framework/ResourceLoader";
import { WindowOpenAnimationEnum, WindowOpenOption } from "../../../framework/ui/GWindow";
import UIButton from "../../../framework/ui/UIButton";
import UIImage from "../../../framework/ui/UIImage";
import UILabel from "../../../framework/ui/UILabel";
import UIList from "../../../framework/ui/UIList";
import UIListItem from "../../../framework/ui/UIListItem";
import UIRichText from "../../../framework/ui/UIRichText";
import UIWindow from "../../../framework/ui/UIWindow";
import Item from "../../entity/Item";
import EventName from "../../event/EventName";
import ListItemFossil from "../common/ListItemFossil";
import ListItemFossilItem from "../mainscene/ListItemFossilItem";
import WindowStrangeKnapsack from "./WindowStrangeKnapsack";
import WindowStrangeProperty from "./WindowStrangeProperty";

const { ccclass, property } = cc._decorator;
@registerClass("WindowStrange")
@ccclass
export default class WindowStrange extends UIListItem {
    @autowired(UIButton) closeBtn: UIButton = null;
    @autowired(UIButton) rule: UIButton = null;
    @autowired(UIButton) propertyBtn: UIButton = null;
    @autowired(UIList) strangeList: UIList<ListItemFossil> = null;
    @autowired(UIButton) star: UIButton = null;
    @autowired(UILabel) level: UILabel = null;
    @autowired(UILabel) itemName: UILabel = null;
    @autowired(UILabel) fossilname: UILabel = null;
    @autowired(UIRichText) property: UIRichText = null;
    @autowired(cc.Node) VFX_saoguang: cc.Node = null;
    @autowired(cc.Node) Sparks: cc.Node = null;
    state: any;
    setState(state: this["state"]): void {
        this.state = state;
    }
    private fossils: cc.Node[] = [];
    private fossilItem: ListItemFossilItem[] = [];
    protected onInited(): void {
        // this.closeBtn.setTransition(false);
        // this.closeBtn.onClick = () => {
        //     this.close();
        // };
        let formation = GModel.fossil.getFormation();
        formation.forEach((id, i) => {
            this.fossils.push(this[`fossil${i}`]);
            // const comp = ResourceLoader.getNodeSyncWithPreload(ListItemFossilItem);
            // this.fossilItem.push(comp);
            // this.fossils[i].addChild(comp.node);
        });
        this.refreshFossil();
    }
    @message([EventName.stateKey.fossilData])
    refreshFossil() {
        let formation = GModel.fossil.getFormation();
        let fossilStar = GModel.fossil.getStar();
        // let activationArr=
        let tbl = GTable.getList("FossilComboTbl").find((t) => t.itemId === fossilStar);
        this.strangeList.setState(
            formation.map((id, i) => {
                let cb = () => {
                    if (id === -1) {
                        GWindow.open(WindowStrangeKnapsack, { status: 1, index: i });
                    } else {
                        this.refreshText(1, id);
                        GWindow.open(WindowStrangeProperty, { status: 1, id, index: i });
                    }
                };
                return { item: new Item(id, 0), cb, bottom: true, color: tbl ? tbl.combo[i] : null };
                // this.fossilItem[i].setState({ id, cb });
            })
        );
        let first = formation.find((f) => f !== -1);
        this.itemName.node.active = first !== undefined || fossilStar !== -1;
        this.property.node.active = first !== undefined || fossilStar !== -1;
        let anim = this.node.getChildByName("content").getComponent(cc.Animation);

        if (GModel.fossil.isStarActive()) {
            anim.play();
            this.VFX_saoguang.active = true;
            this.Sparks.active = true;
        } else {
            anim.stop();
            this.VFX_saoguang.active = false;
            this.Sparks.active = false;
        }
        if (first !== undefined || fossilStar !== -1) {
            fossilStar !== -1 ? this.refreshText(0, fossilStar) : this.refreshText(1, first);
        }
        this.star.bg.imgName = fossilStar === -1 ? "fossil_add_big" : GTable.getById("ItemTbl", fossilStar).img;
        this.fossilname.setText(
            fossilStar === -1 ? [GLang.code.ui.stange_star] : Item.getName(new Item(fossilStar, 1))
        );
        this.star.onClick = () => {
            if (fossilStar === -1) {
                GWindow.open(WindowStrangeKnapsack, { status: 0 });
            } else {
                this.refreshText(0, fossilStar);
                GWindow.open(WindowStrangeProperty, { status: 0, id: fossilStar });
            }
        };
    }
    refreshText(status: number, id: number) {
        let itemtbl = GTable.getById("ItemTbl", id);
        this.itemName.setText([itemtbl.name]);
        let text = status === 0 ? GModel.fossil.getStarPropertyDes() : GModel.fossil.getFossilPropertyDes(id);
        this.property.setText(...text);
    }
    protected onRecycle(): void {
        this.fossilItem.forEach((i) => i.recycle());
    }
}
