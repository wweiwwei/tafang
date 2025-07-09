import { autowired, message, registerClass } from "../../../framework/Decorator";
import UIImage from "../../../framework/ui/UIImage";
import UILabel from "../../../framework/ui/UILabel";
import UIList from "../../../framework/ui/UIList";
import UIListItem from "../../../framework/ui/UIListItem";
import UILongTouchButton from "../../../framework/ui/UILongTouchButton";
import { EnumFacilityType } from "../../config/GEnum";
import Facility from "../../entity/Facility";
import Item from "../../entity/Item";
import EventName from "../../event/EventName";
import ListItemStarItem from "../common/ListItemStarItem";
import ListItemCost from "../hero/ListItemCost";

const { ccclass, property } = cc._decorator;

@registerClass("ListItemProduct")
@ccclass
export default class ListItemProduct extends UIListItem {
    @autowired(UILongTouchButton) upDate: UILongTouchButton = null;
    /**图片 */
    @autowired(UIImage) ability_img: UIImage = null;
    /**文本 */
    @autowired(UILabel) ability: UILabel = null;
    /**等级 */
    @autowired(UILabel) level: UILabel = null;
    /**升级消耗材料数量 */
    @autowired(UIList) costList: UIList<ListItemCost> = null;
    /**升级增量 */
    @autowired(UILabel) productionCount: UILabel = null;
    /**增量产物 */
    @autowired(UIImage) production: UIImage = null;
    /**获得增量 */
    @autowired(UIImage) earnimg: UIImage = null;
    /**升级按钮红点 */
    @autowired(UIImage) exclamation: UIImage = null;
    /**增量加成 */
    @autowired(UILabel) plus: UILabel = null;
    /**升星解锁提示 */
    @autowired(cc.Node) tip: cc.Node = null;
    /**升级进度 */
    @autowired(cc.ProgressBar) productProgress: cc.ProgressBar = null;
    @autowired(cc.Node) levelup: cc.Node = null;
    @autowired(UIList) starup: UIList<ListItemStarItem> = null;
    private costItem: Item[] = [];
    state: {
        index: number;
        id: number;
    };

    private config = {
        [EnumFacilityType.material]: {
            imgName: "building_increase_production",
            property1: "ui/production",
            property2: "produce",
        },
        [EnumFacilityType.dormitory]: {
            imgName: "building_add__fatigue",
            property1: "ui/facility_fatigue",
            property2: "fatigueRecover",
        },
        [EnumFacilityType.restaurant]: {
            imgName: "building_add__satiety",
            property1: "ui/building_recovery_satiety",
            property2: "satietyRecover",
        },
        [EnumFacilityType.hospital]: {
            imgName: "building_add__health",
            property1: "ui/facility_health",
            property2: "illnessRecover",
        },
        [EnumFacilityType.captain]: {
            imgName: "building_increase_production",
            property1: "ui/production",
            property2: "produce",
        },
        [EnumFacilityType.greenhouse]: {
            imgName: "building_increase_production",
            property1: "ui/production",
            property2: "produce",
        },
    };
    private facility: Facility;
    setState(state: this["state"]): void {
        this.state = state;
        let facility = GModel.facility.getFacilityById(this.state.id);
        let kind = facility.getKind();
        this.refresh();
        this.upDate
            .getComponentInChildren(UILabel)
            .setText([this.state.index === 1 ? GLang.code.ui.hero_update : GLang.code.ui.hero_upstar]);
        this.upDate.onStart = () => {
            this.facility = facility;
        };
        this.upDate.onEnd = () => {
            let lvchange = facility.lv - this.facility.lv >= 10;
            let starchange = facility.star - this.facility.star >= 5;
            let img: string;
            if (lvchange || starchange) {
                img =
                    kind === EnumFacilityType.material || kind === EnumFacilityType.greenhouse
                        ? Item.getImg(this.facility.produce())
                        : this.config[this.facility.getKind()].imgName;
                GTip.showProductinoImprove(
                    img,
                    [[this.config[kind].property1]],
                    kind === EnumFacilityType.material || kind === EnumFacilityType.greenhouse
                        ? facility[this.config[kind].property2]().count
                        : facility[this.config[kind].property2](),
                    kind === EnumFacilityType.material || kind === EnumFacilityType.greenhouse
                        ? this.facility[this.config[kind].property2]().count
                        : this.facility[this.config[kind].property2]()
                );
            }
        };
        this.upDate.onClick = async () => {
            let facility = GModel.facility.getFacilityById(this.state.id);
            if (this.state.index === 1) {
                await GModel.facility.upgradeFacility(this.state.id);
                const f = GModel.facility.getFacilityById(this.state.id);
                if (f.lv % 10 === 0) {
                    this.showEffect();
                }
            } else {
                if (GModel.player.checkSystemUnlock(GConstant.systemId.facilityUpstar, true, facility.rank)) {
                    await GModel.facility.upgradeFacilityStar(this.state.id);
                    facility.star !== GModel.facility.getFacilityById(facility.id).star && this.showEffect();
                }
            }
            this.upDate.getComponent(cc.Animation).play();
        };
    }
    showEffect() {
        this.node
            .getChildByName("content")
            .getChildByName("bg")
            .getChildByName("UpGrade_earnimg")
            .getComponent(cc.Animation)
            .play();
    }
    @message([EventName.stateKey.facility])
    refresh() {
        let facility = GModel.facility.getFacilityById(this.state.id);
        let gray: boolean;
        if (this.state.index === 1) {
            this.initLevel();
            gray = facility.isLvLimit();
            this.productProgress.progress = (facility.lv % 10) / 10;
            this.exclamation.node.active = facility.canUpgrade();
            this.costList.node.active = !gray;
        }
        if (this.state.index === 2) {
            gray = facility.isMaxStar() && GModel.facility.getFacilityById(GConstant.captainId).rank < 5;
            this.costList.node.active = !gray;
            this.initStar();
            this.levelup.active = false;
            this.exclamation.node.active = facility.canUpstar();
        }
        this.production.node.active = !gray;
        this.upDate.setGrey(gray);
        if (gray) {
            this.production.node.active = false;
            this.productionCount.setText([GLang.code.ui.building_unlock_level, "_rs" + (facility.rank + 1)]);
        } else {
            if (facility.isMaxStar()) {
                this.upDate.node.active = false;
                this.earnimg.node.active = false;
            }
            let state = this.costItem.map((t) => {
                let item = t;
                let storage = GModel.knapsack.getStorageById(t.id);
                let require = t.count;
                return { item, storage, require };
            });
            this.costList.setState(state);
        }
    }

    initLevel() {
        let facility = GModel.facility.getFacilityById(this.state.id);
        this.costItem = facility.isLvLimit() ? null : facility.lvUpgradeCost();
        this.level.setText(["_rsLv." + facility.lv]);
        const c = this.config[facility.getKind()];
        let count: number;
        this.production.imgName = facility.getLevelValue()[0] == 1 ? Item.getImg(facility.produce()) : c.imgName;
        if (facility.getKind() != 2) {
            this.ability_img.imgName = c.imgName;
            let maxValue = facility.getNextFacility().getMaxLevel();
            this.earnimg.imgName =
                maxValue[0] === 1 ? Item.getImg(facility.produce()) : GConstant.facilityLvReward[maxValue[0]].imgName;
            this.plus.setText([
                "_rs" + (maxValue[1] === 1 ? "+" : "x") + (maxValue[1] === 1 ? maxValue[2] : 1 + maxValue[2] / 10000),
            ]);
            count = facility.getNextFacility().getLevelValue()[1] - facility.getLevelValue()[1];
            // this.ability.setText([GConstant.facilityLvReward[facility.getLevelValue()[0]].property]);
            this.ability.setText([facility.getTbl().level1Name]);
            this.productionCount.setText(count > 0 ? ["_rs+" + GUtils.ui.getFixed(count, 2)] : ["_rs"]);
        } else {
            GTip.showTip(["_rs正在开发中"]);
        }
    }

    initStar() {
        let facility = GModel.facility.getFacilityById(this.state.id);
        let check = GModel.player.checkSystemUnlock(GConstant.systemId.facilityUpstar, false, facility.rank);
        this.tip.active = !check;
        this.earnimg.node.active = check;
        this.ability.node.active = check;
        this.level.node.active = check;
        this.upDate.node.active = check;
        this.starup.node.active = check;
        this.costList.node.active = check;
        if (check) {
            this.node.getChildByName("content").getChildByName("bg").color = cc.color(255, 255, 255, 255);
            let starReward = facility.getStarValue();
            if (starReward.length > 0) {
                this.ability_img.imgName =
                    starReward[0] === 1
                        ? "building_multiple_production"
                        : GConstant.facilityLvReward[starReward[0]].imgName;
                this.earnimg.imgName =
                    starReward[0] === 1
                        ? Item.getImg(facility.produce())
                        : GConstant.facilityLvReward[starReward[0]].imgName;
                this.plus.setText([
                    "_rs" +
                        (starReward[1] === 1 ? "+" : "x") +
                        (starReward[1] === 1 ? starReward[2] : 1 + starReward[2] / 10000),
                ]);
            }
            this.costItem = facility.isMaxStar() ? null : facility.upgradeStartCost();
            this.level.setText(["_rsLv." + facility.star]);
            // this.ability.setText([
            //     starReward[0] === 1
            //         ? GLang.code.ui.building_multiple_production
            //         : GConstant.facilityLvReward[starReward[0]].property,
            // ]);
            this.ability.setText([facility.getTbl().level2Name]);
            let starState: { level: number; status: number }[] = [];
            for (let i = 0; i < 5; i++) {
                starState.push({ level: 0, status: 1 });
            }
            for (let j = 0; j <= facility.star; j++) {
                if (j > 0) {
                    j % 5 === 0 ? starState[4].level++ : starState[(j % 5) - 1].level++;
                }
            }
            this.starup.setState(starState);
        } else {
            this.node.getChildByName("content").getChildByName("bg").color = cc.color(155, 155, 155, 255);
            let limit = GTable.getById("SystemUnlockTbl", GConstant.systemId.facilityUpstar).condition[1];
            this.tip
                .getChildByName("label")
                .getComponent(UILabel)
                .setText([GLang.code.ui.facility_unlock_tip, "_rs" + limit]);
        }
    }
}
