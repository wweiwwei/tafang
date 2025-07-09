import { autowired, registerClass } from "../../../framework/Decorator";
import UIButton from "../../../framework/ui/UIButton";
import UIImage from "../../../framework/ui/UIImage";
import UILabel from "../../../framework/ui/UILabel";
import UIList from "../../../framework/ui/UIList";
import UIListItem from "../../../framework/ui/UIListItem";
import Item from "../../entity/Item";
import ListItemHeroItem from "./ListItemHeroItem";
import ListItemItem from "./ListItemItem";

const { ccclass, property } = cc._decorator;
@registerClass("ListItemHandbook2")
@ccclass
export default class ListItemHandbook2 extends UIListItem {
    static _poolSize: number = 16;
    @autowired(UIButton) debrisBtn: UIButton = null;
    // @autowired(UIButton) itemBtn: UIButton = null;
    @autowired(UIImage) exclamation: UIImage = null;
    @autowired(UIImage) containerBg: UIImage = null;
    @autowired(UIList) item: UIList<ListItemItem> = null; // 装备和战车的头像
    @autowired(UIImage) star: UIImage = null;
    @autowired(UIList) debrisItem: UIList<ListItemHeroItem> = null;
    @autowired(UILabel) hero_name: UILabel = null;
    @autowired(UILabel) btnText: UILabel = null;
    state: {
        id: number;
        refreshFunc?: () => void;
        page: number; // 0-英雄 1-装备 2-战车部件
        item?: any;
    };
    /**可获得积分 */
    private points: number = 0;
    protected onInited(): void {
        /**领取英雄积分 */
        this.debrisBtn.onClick = async () => {
            await GModel.collection.obtainPoint(this.state.id);
            this.state.refreshFunc();
            const config = {
                imgName: this.star.imgName,
                count: this.points,
            };
            GTip.showFlyHandbookStar(this.star.node.convertToWorldSpaceAR(cc.v2()), config);
        };
    }
    setState(state: this["state"]): void {
        this.state = state;
        this.commonSetup();
        if (this.state.page === 0) {
            this.star.imgName = "hero_Point coin";
            const heroInfo = GModel.hero.getHeroByUniqueId(this.state.id);
            let state = { id: this.state.id, uniqueId: this.state.id, status: 3, cb: () => {} };
            this.hero_name.setText([heroInfo !== undefined ? heroInfo.getTbl().name : "_rs???"]);
            this.debrisItem.setState([state]);
        } else if (this.state.page === 1) {
            this.star.imgName = "hero_Point coin2";
            let state = { item: null, handbookItem: this.state.item, status: 1, page: 0 };
            this.item.setState([state]);
        } else if (this.state.page === 2) {
            this.star.imgName = "hero_Point coin2";
            let state = { item: null, handbookItem: this.state.item, status: 1, page: 1 };
            this.item.setState([state]);
        }
    }
    commonSetup() {
        let own = null;
        let hasGet = GModel.collection.getCollectionHasGet(this.state.id);
        let canObtainPoint: boolean = false;
        let btnText: string[] = ["_rs"];
        let itemTbl = null; // 图鉴表信息
        if (this.state.page === 0) {
            own = GModel.hero.getHeroByUniqueId(this.state.id);
            if (own) {
                canObtainPoint = own.star > GModel.collection.getCollectionHasGet(this.state.id);
                itemTbl = GTable.getList("HeroCollectionPointTbl").find((t) => t.page === 0 && t.star === own.star);
            }
        } else if (this.state.page === 1) {
            own = GModel.hero.getEquipmentById(this.state.id);
            if (own) {
                let rank: number = own.getHasGetMaxRank(this.state.id);
                own.storage.forEach((t) => {
                    if (t.count !== 0 && t.rank > rank) rank = t.rank;
                });
                itemTbl = GTable.getList("HeroCollectionPointTbl").find((t) => t.page === 1 && t.star === rank);
                canObtainPoint = rank > hasGet;
            }
        } else if (this.state.page === 2) {
            own = GModel.car.getCarEquipmentById(this.state.id);
            if (own) {
                let level: number = own.getHasGetMaxLevel(this.state.id);
                itemTbl = GTable.getList("HeroCollectionPointTbl").find((t) => t.page === 2 && t.star === level);
                canObtainPoint = level > hasGet;
            }
        }
        if (own) {
            this.hero_name.node.active = !canObtainPoint;
            this.debrisBtn.node.active = canObtainPoint;
            this.star.node.active = true;
            this.exclamation.node.active = canObtainPoint;
            this.debrisBtn.setGrey(!canObtainPoint);
            this.points = itemTbl.point[this.state.item.quality];
            btnText = ["_rs+" + this.points];
        } else {
            this.hero_name.node.active = true;
            this.exclamation.node.active = false;
            this.debrisBtn.node.active = false;
            // this.debrisBtn.setGrey(true);
        }
        if (this.state.page === 1 || this.state.page === 2) {
            // if (own) {
            // } else {
            //     GUtils.ui.setAllChildSpGray(this.itemBtn.node);
            // }
            // this.itemBtn.interactable = false;
            // this.itemImg.imgName = this.state.item.img;
            this.hero_name.setText([own !== undefined ? this.state.item.name : "_rs???"]);
        }
        this.btnText.setText(btnText);
    }
}
