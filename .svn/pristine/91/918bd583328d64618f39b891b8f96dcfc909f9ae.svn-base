import { autowired, message, registerClass } from "../../../framework/Decorator";
import ResourceLoader from "../../../framework/ResourceLoader";
import UIButton from "../../../framework/ui/UIButton";
import UIImage from "../../../framework/ui/UIImage";
import UILabel from "../../../framework/ui/UILabel";
import UISpine from "../../../framework/ui/UISpine";
import UIWindow from "../../../framework/ui/UIWindow";
import { WindowOpenAnimationEnum, WindowOpenOption } from "../../../framework/ui/GWindow";
import { EnumFacilityType } from "../../config/GEnum";
import Item from "../../entity/Item";
import EventName from "../../event/EventName";
import WindowAppointHero from "../build/WindowAppointHero";
import WindowItemDescription from "../common/WindowItemDescription";
const { ccclass, property } = cc._decorator;

@registerClass("WindowBuildingUpdate")
@ccclass
export default class WindowBuildingUpdate extends UIWindow {
    static defaultOpentOption: Partial<WindowOpenOption> = {
        animation: WindowOpenAnimationEnum.slide,
    };
    _windowParam: {
        id: number;
    };
    _returnValue: any;
    @autowired(UIButton) closeBtn: UIButton = null;
    /**升阶按钮 */
    @autowired(UIButton) upDate: UIButton = null;
    /**设置英雄按钮 */
    @autowired(UIButton) set_hero: UIButton = null;
    @autowired(UIButton) uprank: UIButton = null;
    /** 英雄spine */
    @autowired(UISpine) heroSpine: UISpine = null;
    /**英雄等级 */
    @autowired(UILabel) heroLevel: UILabel = null;
    /**英雄产量 */
    @autowired(UILabel) heroProduction: UILabel = null;
    /** 英雄产出物品*/
    @autowired(UIImage) heroGain: UIImage = null;
    /**感叹号 */
    @autowired(UIImage) exclamation: UIImage = null;
    /**消耗列表 */
    @autowired(cc.Node) costList: cc.Node = null;
    // /**消耗时间 */
    // @autowired(UILabel) costTime: UILabel = null;
    /**建筑条件 */
    @autowired(UILabel) conditionBuilding: UILabel = null;
    /**建筑等级条件 */
    @autowired(UILabel) conditionLabel: UILabel = null;
    /**建筑等级条件 */
    @autowired(cc.Node) tip: cc.Node = null;
    /**建筑图标 */
    @autowired(UIImage) buildingImg: UIImage = null;
    /**建筑阶数 */
    @autowired(UILabel) buildingRank: UILabel = null;
    /**建筑名 */
    @autowired(UILabel) buildingName: UILabel = null;
    /**任命员工 */
    @autowired(UIButton) appointHero: UIButton = null;
    /**可安排 */
    @autowired(UILabel) canAppoint: UILabel = null;
    /**等级 */
    @autowired(UILabel) locked: UILabel = null;
    @autowired(cc.Node) level: cc.Node = null;
    protected onInited(): void {
        this.node.getComponent(UIButton).setTransition(false);
        this.uprank.onClick = () => {
            this.close();
        };
        this.node.getComponent(UIButton).onClick = () => {
            this.close();
        };
        this.closeBtn.onClick = () => {
            this.close();
        };
        let facility = GModel.facility.getFacilityById(this._windowParam.id);
        this.appointHero.onClick = () => {
            GWindow.open(WindowAppointHero, { build: facility });
        };
        // if (facility.getTbl().enableHero) {
        //     facility.hero != -1
        //         ? this.heroLevel.setText(["_rs" + GModel.hero.getHeroByUniqueId(facility.hero).level])
        //         : this.heroLevel.setText(["_rs0"]);
        // }
        // this.heroProduction.setText([])
        // this.tip.active = canUpgrade;
        // if (!this.tip.active) {
        //     this.conditionBuilding.setText([GLang.code.table_facility.a1]);
        //     let count = facility.rank + 1;
        //     this.conditionLabel.setText(["_rs" + count]);
        // }
        // let cost = this.node.getChildByName("content");
        // let costList = cost.getChildByName("costList");
        this.initWindow();
        this.initHero();
        this.refreshCost();
    }
    @message([EventName.stateKey.facility])
    initWindow() {
        let facility = GModel.facility.getFacilityById(this._windowParam.id);
        this.buildingImg.imgName = GConstant.facility_icon[facility.getKind()];
        this.buildingName.setText([facility.getTbl().name]);
        this.buildingRank.setText(["_rs+" + facility.rank]);
        this.buildingRank.node.active = facility.rank > 0;
        this.conditionBuilding.setText([GLang.code.table_facility.a1]);
        let count = facility.rank + 1;
        this.conditionLabel.setText(["_rs" + count + "级"]);
        let canUpgrade = facility.canUprank();
        this.tip.active = facility.isNeedUpgradeCaptainRank();
        this.exclamation.node.active = canUpgrade;
        this.upDate.setGrey(!canUpgrade);
        this.upDate.onClick = async () => {
            if (!facility.isLvLimit()) {
                GTip.showTip([
                    GLang.code.ui.require_upgrade_facility_lv,
                    facility.getTbl().name,
                    facility.getTbl().level1Name,
                    "_rs" + facility.rankLevelLimit(),
                ]);
                return;
            }
            if (facility.isNeedUpgradeCaptainRank()) {
                GTip.showTip([GLang.code.ui.require_upgrade_captain]);
                return;
            }
            await GModel.facility.upgradeFacilityRank(this._windowParam.id);
            GTip.showUpgradeTip(
                [],
                [
                    [facility.getTbl().level1Name],
                    [GLang.code.ui.technology_limit, "_rs" + GConfig.facility.rankLevelLimit[facility.rank + 1]],
                ]
            );
        };
    }
    @message([EventName.stateKey.facility, EventName.stateKey.storage])
    initHero() {
        let facility = GModel.facility.getFacilityById(this._windowParam.id);
        this.set_hero.onClick = () => {
            GModel.player.checkSystemUnlock(GConstant.systemId.facilityAppointHero, true, facility.rank) &&
                GWindow.open(WindowAppointHero, { build: facility });
        };
        this.set_hero.node.active = facility.getTbl().enableHero > 0;
        this.heroGain.node.active = facility.hero > 0;
        this.locked.node.active = !GModel.player.checkSystemUnlock(
            GConstant.systemId.facilityAppointHero,
            false,
            facility.rank
        );
        this.locked.setText([
            GLang.code.ui.map_unlock_level,
            "_rs" + GTable.getById("SystemUnlockTbl", GConstant.systemId.facilityAppointHero).condition[1],
        ]);
        this.heroProduction.node.active = facility.hero > 0;
        this.level.active = facility.hero > 0;
        if (facility.hero > 0) {
            this.canAppoint.node.active = false;
            let hero = GModel.hero.getHeroByUniqueId(facility.hero);
            this.heroLevel.setText(["_rs" + hero.rank]);
            this.heroGain.imgName =
                facility.getKind() === EnumFacilityType.hospital
                    ? "building_add__health"
                    : Item.getImg(facility.produce());
            if (ResourceLoader.isSpineExist(hero.getImg())) {
                this.appointHero.node.children[0].active = false;
                this.appointHero.node.children[1].active = false;
                this.heroSpine.setSpine(hero.getTbl().img, "default", "idle");
                this.heroSpine.node.scale = 0.5;
                this.heroSpine.node.active = true;
            } else {
                this.appointHero.node.children[0].getComponent(UIImage).imgName = hero.getImg();
                this.heroSpine.node.active = false;
            }
            let allHero = GModel.hero.getAllHero();
            let buildHero = allHero.filter((hero) => hero.uniqueId == facility.hero)[0];
            this.heroProduction.setText(...buildHero.getFacilityBuffString(facility.id));
        } else {
            this.canAppoint.node.active = GModel.player.checkSystemUnlock(
                GConstant.systemId.facilityAppointHero,
                false,
                facility.rank
            );
            this.appointHero.node.children[0].active = true;
            this.appointHero.node.children[1].active = true;
            this.heroSpine.node.active = false;
        }
    }
    @message([EventName.stateKey.facility])
    refreshCost() {
        let facility = GModel.facility.getFacilityById(this._windowParam.id);
        this.costList.children.map((costItem) => (costItem.active = false));
        let costRank = facility.upgradeRankCost();
        if (costRank !== null) {
            for (let i: number = 0; i < costRank.length; i++) {
                let rankItem = costRank[i];
                let material = this.costList.getChildByName("material_" + i);
                let count = material.getChildByName("New Layout").getChildByName("count");
                let storage = material.getChildByName("New Layout").getChildByName("storage");
                let sto = GModel.knapsack.getStorageById(rankItem.id);
                storage.color = sto >= rankItem.count ? GConstant.costLabelColor.green : GConstant.costLabelColor.red;
                storage.getComponent(UILabel).setText(["_rs" + GUtils.ui.getNumberString(sto, 1)]);
                material.getComponent(UIImage).imgName = Item.getImg(rankItem);
                material.getComponent(UIButton).onClick = () => {
                    GWindow.open(WindowItemDescription, { item: rankItem });
                };
                count.getComponent(UILabel).setText(["_rs/" + GUtils.ui.getNumberString(rankItem.count, 1)]);
                material.active = true;
            }
        }
    }
}
