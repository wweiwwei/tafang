import { autowired, message, registerClass } from "../../../framework/Decorator";
import EventBus from "../../../framework/event/EventBus";
import UIButton from "../../../framework/ui/UIButton";
import UIImage from "../../../framework/ui/UIImage";
import UILabel from "../../../framework/ui/UILabel";
import UIList from "../../../framework/ui/UIList";
import UIListItem from "../../../framework/ui/UIListItem";
import { EnumFacilityType } from "../../config/GEnum";
import Facility from "../../entity/Facility";
import Item from "../../entity/Item";
import EventName from "../../event/EventName";
import ListItemStarItem from "../common/ListItemStarItem";
import WindowAppointHero from "./WindowAppointHero";
import WindowFacilityList from "./WindowFacilityList";

const { ccclass, property } = cc._decorator;
@registerClass("ListItemFacilityItem")
@ccclass
export default class ListItemFacilityItem extends UIListItem {
    /**建筑图 */
    @autowired(UIImage) buildingbg: UIImage = null;
    /**建筑名 */
    @autowired(UILabel) buildingName: UILabel = null;
    /**布置英雄节点 */
    @autowired(cc.Node) heroItem: cc.Node = null;
    /**英雄框 */
    @autowired(UIImage) herobg: UIImage = null;
    /**英雄图片 */
    @autowired(UIImage) image: UIImage = null;
    /**英雄职业 */
    @autowired(UIImage) gift: UIImage = null;
    /**英雄等级 */
    @autowired(UILabel) level: UILabel = null;
    /**英雄星级 */
    @autowired(UIList) star: UIList<ListItemStarItem> = null;
    /**增加产量 */
    @autowired(UIImage) improvebg: UIImage = null;
    /**增加的产量 */
    @autowired(UILabel) improve: UILabel = null;
    /**未解锁 */
    @autowired(UILabel) not_unlock: UILabel = null;
    /**增加的产物图片 */
    @autowired(UIImage) product: UIImage = null;
    /**添加英雄按钮 */
    @autowired(UIButton) bg_btn: UIButton = null;
    /**添加 */
    @autowired(cc.Node) add: cc.Node = null;
    /**前往按钮 */
    @autowired(UIButton) goto: UIButton = null;
    /**前往按钮2 */
    @autowired(UIButton) goto2: UIButton = null;
    /**产量节点 */
    @autowired(cc.Node) layout: cc.Node = null;
    /**每分钟产量 */
    @autowired(UILabel) permin: UILabel = null;
    /**产物 */
    @autowired(UIImage) production: UIImage = null;
    /**解锁条件 */
    @autowired(UILabel) unlock: UILabel = null;
    /**未解锁节点 */
    @autowired(cc.Node) unlockTip: cc.Node = null;
    state: { id: number };
    private config = {
        [EnumFacilityType.dormitory]: {
            imgName: "building_add__fatigue",
            property: "fatigueRecover",
        },
        [EnumFacilityType.restaurant]: {
            imgName: "building_add__satiety",
            property: "satietyRecover",
        },
        [EnumFacilityType.hospital]: {
            imgName: "building_add__health",
            property: "illnessRecover",
        },
    };
    setState(state: this["state"]): void {
        this.state = state;
        this.windowInit();
    }
    @message([EventName.stateKey.facility])
    windowInit() {
        let facility = GModel.facility.getFacilityById(this.state.id);
        this.bg_btn.onClick = () => {
            GWindow.open(WindowAppointHero, { build: facility });
        };
        [this.goto, this.goto2].forEach((v, i) => {
            v.onClick = async () => {
                const closeWin = () => {
                    // todo 根据任务类型关闭窗口
                    GWindow.close(WindowFacilityList);
                };
                const currentScene = GWindow.currentScene;
                if (currentScene === "main") {
                    closeWin();
                    EventBus.emit(EventName.openFacilityDetail, facility.id);
                } else {
                    closeWin();
                    await GWindow.goToMain();
                    EventBus.emit(EventName.openFacilityDetail, facility.id);
                    // todo
                }
            };
        });
        this.goto2.node.active = facility.canUpgrade() || facility.canUpstar() || facility.canUprank();
        this.buildingName.setText([facility.getTbl().name], [facility.rank > 0 ? "_rs+" + facility.rank : "_rs"]);
        this.buildingbg.imgName = facility.getTbl().image2;
        this.bg_btn.interactable = facility.unlock;
        this.heroItem.active =
            facility.getTbl().enableHero === 1 &&
            facility.isFacilityUnlockable(false) &&
            GModel.player.checkSystemUnlock(GConstant.systemId.facilityAppointHero, false, facility.rank);
        this.gift.node.active = facility.hero != -1;
        this.level.node.active = facility.hero != -1;
        this.improvebg.node.active = facility.hero != -1;
        this.image.node.active = facility.hero != -1;
        this.star.node.active = facility.hero != -1 && GModel.hero.getHeroByUniqueId(facility.hero).star > 0;
        this.add.active = facility.hero == -1;
        this.layout.active = false;
        this.unlockTip.active = !facility.unlock;
        if (facility.unlock) {
            this.layout.active =
                facility.getKind() !== EnumFacilityType.captain && facility.getKind() !== EnumFacilityType.entrance;
            if (
                facility.getKind() === EnumFacilityType.dormitory ||
                facility.getKind() === EnumFacilityType.restaurant ||
                facility.getKind() === EnumFacilityType.hospital
            ) {
                this.permin.setText([
                    GLang.code.ui.minute,
                    "_rs" + facility[this.config[facility.getKind()].property]() + "/",
                ]);
                this.production.imgName = this.config[facility.getKind()].imgName;
            } else if (
                facility.getKind() === EnumFacilityType.material ||
                facility.getKind() === EnumFacilityType.greenhouse
            ) {
                this.permin.setText([GLang.code.ui.minute, "_rs" + facility.produce().count + "/"]);
                this.production.imgName = Item.getImg(facility.produce());
            }
            if (facility.getTbl().enableHero === 1) {
                if (facility.hero != -1) {
                    let hero = GModel.hero.getHeroByUniqueId(facility.hero);
                    this.herobg.imgName = GConstant.heroQuality[hero.getQuality()];
                    this.image.imgName = hero.getImg() + "_head";
                    this.gift.imgName = "hero_kind_" + hero.getKind();
                    this.level.setText(["_rslv." + hero.level]);
                    this.star.setState(hero.getStarItem(0));
                    this.improve.setText(...hero.getFacilityBuffString(facility.id));
                    this.product.imgName =
                        facility.getKind() === EnumFacilityType.hospital
                            ? "building_add__health"
                            : Item.getImg(facility.produce());
                } else {
                    this.herobg.imgName = GConstant.heroGreyBg;
                }
            }
        } else {
            GUtils.ui.setAllChildSpGray(this.heroItem);
            let unlockable = facility.isFacilityUnlockable(false);
            !unlockable && GUtils.ui.setAllChildSpGray(this.buildingbg.node);
            this.not_unlock.node.active = !unlockable;
            this.goto.node.active = unlockable;
            this.unlock.setText(
                unlockable
                    ? [GLang.code.ui.unlockable]
                    : [GLang.code.ui.facility_can_not_unlock, "_rs" + facility.getTbl().captainRankRequire]
            );
        }
    }
}
