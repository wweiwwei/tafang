import { autowired, message, registerClass } from "../../../framework/Decorator";
import UIButton from "../../../framework/ui/UIButton";
import UIImage from "../../../framework/ui/UIImage";
import UILabel from "../../../framework/ui/UILabel";
import UIScrollList from "../../../framework/ui/UIScrollList";
import UIWindow from "../../../framework/ui/UIWindow";
import { WindowOpenAnimationEnum, WindowOpenOption } from "../../../framework/ui/GWindow";
import { CarEquipmentWrapper } from "../../entity/CarEquipment";
import { EquipmentWrapper } from "../../entity/Equipment";
import EventName from "../../event/EventName";
import ListItemEquipment from "./ListItemEquipment";

const { ccclass, property } = cc._decorator;
@registerClass("WindowChangeEquipment")
@ccclass
export default class WindowChangeEquipment extends UIWindow {
    static defaultOpentOption: Partial<WindowOpenOption> = {
        animation: WindowOpenAnimationEnum.default,
    };
    _windowParam: {
        uniqueId: number;
        index: number;
    };
    _returnValue: { equipment: EquipmentWrapper; carEquipment: CarEquipmentWrapper } = {
        equipment: null,
        carEquipment: null,
    };
    /**战力 */
    @autowired(UILabel) power: UILabel = null;
    /**战力 */
    @autowired(UILabel) powerlabel: UILabel = null;
    /**装备 */
    @autowired(UIImage) equipment: UIImage = null;
    /**装备框 */
    @autowired(UIImage) equipmentbg: UIImage = null;
    @autowired(UILabel) equipmentName: UILabel = null;
    /**无装备 */
    @autowired(UILabel) none: UILabel = null;
    /**装备列表 */
    @autowired(UIScrollList) equipmentList: UIScrollList<ListItemEquipment> = null;
    @autowired(UIButton) closeBtn: UIButton = null;
    protected onInited(): void {
        this.closeBtn.onClick = () => {
            this._windowParam.uniqueId !== -1
                ? (this._returnValue.equipment = GModel.hero
                      .getHeroByUniqueId(this._windowParam.uniqueId)
                      .getEquipmentWrapperByPart(this._windowParam.index))
                : (this._returnValue.carEquipment =
                      GModel.car.getBattleCar().equipment[this._windowParam.index] === null
                          ? null
                          : GModel.car
                                .getCarEquipmentById(GModel.car.getBattleCar().equipment[this._windowParam.index].id)
                                .getEquipmentWrapperList()
                                .find((t) => t.equiped));
            this.close();
        };
        this.refreshEquipment();
    }
    @message([EventName.stateKey.hero, EventName.stateKey.equipment])
    refreshEquipment() {
        if (this._windowParam.uniqueId !== -1) {
            let hero = GModel.hero.getHeroByUniqueId(this._windowParam.uniqueId);
            if (hero.equipment[this._windowParam.index] !== null) {
                let tbl = GTable.getById("HeroEquipmentTbl", hero.equipment[this._windowParam.index].id);
                this.power.setText([
                    "_rs" +
                        GModel.hero
                            .getEquipmentById(hero.equipment[this._windowParam.index].id)
                            .getBattlePoint(hero.equipment[this._windowParam.index].level),
                ]);
                this.equipment.imgName = tbl.img;
                this.equipmentbg.imgName = GConstant.quality[tbl.quality];
                this.equipmentName.setText([tbl.name]);
                this.none.node.active = false;
                this.power.node.active = true;
                this.powerlabel.node.active = true;
                this.equipmentbg.node.active = true;
            } else {
                this.power.node.active = false;
                this.powerlabel.node.active = false;
                this.equipmentbg.node.active = false;
                this.none.node.active = true;
                this.equipmentName.setText([GLang.code.ui.equipment]);
            }
            /**获取该部位所有装备wrapper类 */
            let list = GModel.hero
                .getAllEquipment()
                .filter((t) => t.getPart() === this._windowParam.index)
                .map((t) => t.getEquipmentWrapperList());
            //战力-未装备-装备
            //[id,id,id,id]
            /**[[{id1,heroid1,level,1},{id1,heroid2,level,1},{id1,heroid-1,level1,count},{id1,heroid-1,level2,count}],
             * [{id2,heroid1,level,1}]]*/
            /**扁平化处理 */
            let arr = list.reduce((acc, cur) => acc.concat(cur), []);
            arr.sort((a, b) => {
                if (a.getBattlePoint() === b.getBattlePoint()) {
                    return a.heroUniqueId - b.heroUniqueId;
                } else {
                    return b.getBattlePoint() - a.getBattlePoint();
                }
            });
            let state = arr.map((t) => {
                let cb = async () => {
                    /**改变的战力数值
                     * 特殊处理：卸下装备、当前有无装备*/
                    // let count =
                    //     t.heroUniqueId === this._windowParam.uniqueId
                    //         ? -t.getBattlePoint()
                    //         : t.getBattlePoint() -
                    //           (GModel.hero.getHeroByUniqueId(this._windowParam.uniqueId).equipment[
                    //               this._windowParam.index
                    //           ]
                    //               ? GModel.hero
                    //                     .getHeroByUniqueId(this._windowParam.uniqueId)
                    //                     .getEquipmentWrapperByPart(this._windowParam.index)
                    //                     .getBattlePoint()
                    //               : 0);
                    await GModel.hero.replaceEquipment(
                        this._windowParam.uniqueId,
                        t.getPart(),
                        t.heroUniqueId === this._windowParam.uniqueId
                            ? null
                            : {
                                  id: t.id,
                                  level: t.level,
                                  rank: t.rank,
                              },
                        t.heroUniqueId
                    );
                    this._returnValue.equipment = GModel.hero
                        .getHeroByUniqueId(this._windowParam.uniqueId)
                        .getEquipmentWrapperByPart(t.getPart());
                    this.close();
                };
                return {
                    herouid: this._windowParam.uniqueId,
                    equipmentWrapper: t,
                    carEquipment: null,
                    cb,
                    status: hero.equipment[this._windowParam.index] === null,
                };
            });
            this.equipmentList.setState(state);
        } else {
            let equipment = GModel.car.getBattleCar().equipment;
            if (equipment[this._windowParam.index]) {
                let carEquipment = GModel.car.getCarEquipmentById(equipment[this._windowParam.index].id);
                this.power.setText(["_rs" + carEquipment.getBattlePoint(equipment[this._windowParam.index].level)]);
                this.equipmentbg.imgName = GConstant.quality[carEquipment.getTbl().quality];
                this.equipment.imgName = carEquipment.getTbl().img;
                this.equipmentName.setText([carEquipment.getTbl().name]);
                this.none.node.active = false;
            } else {
                this.none.node.active = true;
                this.power.node.active = false;
                this.powerlabel.node.active = false;
                this.equipmentbg.node.active = false;
            }
            let state = GModel.car
                .getAllCarEquipment()
                .filter((t) => t.getPart() === this._windowParam.index)
                .map((t) => t.getEquipmentWrapperList())
                .reduce((acc, cur) => acc.concat(cur), [])
                .sort((a, b) => {
                    return b.getBattlePoint() - a.getBattlePoint();
                })
                .map((t) => {
                    let cb = async () => {
                        let count = t.equiped
                            ? -t.getBattlePoint()
                            : t.getBattlePoint() -
                              (equipment[this._windowParam.index]
                                  ? GModel.car
                                        .getCarEquipmentById(equipment[this._windowParam.index].id)
                                        .getBattlePoint(equipment[this._windowParam.index].level)
                                  : 0);
                        equipment[this._windowParam.index] =
                            t.equiped && t.id === equipment[this._windowParam.index].id
                                ? null
                                : { id: t.id, level: t.level };
                        await GModel.car.setCarEquipment(equipment);
                        GTip.showPower([
                            [GLang.code.ui.hero_power],
                            ["_rs" + (count > 0 ? "+" + count.toString() : count)],
                        ]);
                        this._returnValue.carEquipment = equipment[this._windowParam.index]
                            ? GModel.car
                                  .getCarEquipmentById(t.id)
                                  .getEquipmentWrapperList()
                                  .find((v) => v.equiped)
                            : null;
                        this.close();
                    };
                    return { herouid: -1, equipmentWrapper: null, carEquipment: t, cb, status: !t.equiped };
                });
            this.equipmentList.setState(state);
        }
    }
}
