import { autowired, message, registerClass } from "../../../framework/Decorator";
import UIButton from "../../../framework/ui/UIButton";
import UIImage from "../../../framework/ui/UIImage";
import UILabel from "../../../framework/ui/UILabel";
import UIList from "../../../framework/ui/UIList";
import UIListItem from "../../../framework/ui/UIListItem";
import EventName from "../../event/EventName";
import ListItemEquipProperty from "../hero/ListItemEquipProperty";
import ListItemHeroItem from "./ListItemHeroItem";

const { ccclass, property } = cc._decorator;
@registerClass("ListItemTrammels")
@ccclass
export default class ListItemTrammels extends UIListItem {
    @autowired(UIList) heroList: UIList<ListItemHeroItem> = null;
    @autowired(UIList) propertyList: UIList<ListItemEquipProperty> = null;
    @autowired(UIButton) active: UIButton = null;
    @autowired(UIImage) exclamation: UIImage = null;
    @autowired(UILabel) tip: UILabel = null;
    state: { id: number };
    setState(state: this["state"]): void {
        this.state = state;
        this.windowInit();
    }
    @message([EventName.stateKey.relation])
    windowInit() {
        let level = GModel.collection.getRelationLevel(this.state.id);
        if (level > 0) {
            this.tip.setText([GLang.code.ui.level_all_to_upgrade, "_rs" + (level + 1)]);
            this.active.node.getComponentInChildren(UILabel).setText([GLang.code.ui.hero_update]);
        } else {
            this.active.node.getComponentInChildren(UILabel).setText([GLang.code.ui.active]);
        }
        this.active.onClick = () => {
            GModel.collection.activateRelation(this.state.id);
        };
        this.propertyInit();
        this.heroInit();
    }
    propertyInit() {
        let level = GModel.collection.getRelationLevel(this.state.id);
        let arr2 = GModel.collection.getRelationBuffString(this.state.id, level).map((t, i) => {
            let plus = GModel.collection.getRelationBuffString(this.state.id, level + 1)[i].value;
            return { property: t.property, value: t.value, plus };
        });
        this.propertyList.setState(arr2);
    }
    heroInit() {
        let level = GModel.collection.getRelationLevel(this.state.id);
        let tbl = GTable.getById("RelationBuffTbl", this.state.id);
        let allhero = GModel.hero.getAllHero();
        let arr = tbl.relationId.map((t) => {
            let hero = allhero.find((v) => v.uniqueId === t);
            let uniqueId = -1;
            if (hero === undefined) {
                this.active.setGrey(true);
                this.exclamation.node.active = false;
            } else {
                uniqueId = hero.id;
                if (hero.star < level + 1) {
                    this.active.setGrey(true);
                    this.exclamation.node.active = false;
                }
            }
            return { id: t, uniqueId, status: 3, cb: () => {} };
        });
        this.heroList.setState(arr);
    }
}
