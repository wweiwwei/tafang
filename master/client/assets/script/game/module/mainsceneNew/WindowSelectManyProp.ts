import { autowired, message, registerClass } from "../../../framework/Decorator";
import { WindowOpenAnimationEnum, WindowOpenOption } from "../../../framework/ui/GWindow";
import UIButton from "../../../framework/ui/UIButton";
import UIScrollList from "../../../framework/ui/UIScrollList";
import UIWindow from "../../../framework/ui/UIWindow";
import { PlayerEquipment } from "../../entity/PlayerEquipment";
import EventName from "../../event/EventName";
import ListItemPropItem from "./ListItemPropItem";
import WindowDecomposeTips from "./WindowDecomposeTips";
import WindowSelectProp from "./WindowSelectProp";

const { ccclass, property } = cc._decorator;
@registerClass("WindowSelectManyProp")
@ccclass
export default class WindowSelectManyProp extends UIWindow {
    _windowParam: {
        // playerEquipments: PlayerEquipment[];
    };
    _returnValue: any;
    static defaultOpentOption: Partial<WindowOpenOption> = {
        animation: WindowOpenAnimationEnum.default,
    };
    /**last部件内容 */
    @autowired(UIScrollList) UIScrollList: UIScrollList<ListItemPropItem> = null;
    @autowired(UIButton) closeBtn: UIButton = null;
    @autowired(UIButton) allSellBtn: UIButton = null;

    private isUpLevelEquipmeent: boolean = false;

    protected onInited(): void {
        this.closeBtn.onClick = () => {
            this.close();
        };

        this.allSellBtn.onClick = () => {
            this.checkIsUpLevel(); //todo 分解所有有问题
            if (this.isUpLevelEquipmeent) {
                GWindow.open(WindowDecomposeTips, {
                    text: ["_rs有可增加战力的装备，是否全部出售?"],
                    cb: () => {
                        GModel.playerEquipment.sellAll();
                        this.close();
                    },
                });
            } else {
                GModel.playerEquipment.sellAll();
                this.close();
            }
        };
        this.refitem();
    }

    checkIsUpLevel() {
        let temp = GModel.playerEquipment.temp();

        for (let i = 0; i < temp.length; i++) {
            let o = temp[i];
            let part = o.tbl().part;
            let lastPlayerEquipment: PlayerEquipment = GModel.playerEquipment.equipment[part];
            o.propertyString().base.forEach((element) => {
                if (lastPlayerEquipment) {
                    let a = lastPlayerEquipment.propertyString().base.map((d) => {
                        if (d.property == element.property) return d;
                    });

                    if (a[0] && a[0].property == element.property)
                        if (Number(element.value) > Number(a[0].value)) {
                            this.isUpLevelEquipmeent = true;
                        } else if (Number(element.value) < Number(a[0].value)) {
                        }
                }
            });

            o.propertyString().stat.forEach((element) => {
                if (lastPlayerEquipment) {
                    let a = lastPlayerEquipment.propertyString().stat.map((d) => {
                        if (d.property == element.property) return d;
                    });

                    if (a[0] && a[0].property == element.property)
                        if (Number(element.value) > Number(a[0].value)) {
                            this.isUpLevelEquipmeent = true;
                        } else if (Number(element.value) < Number(a[0].value)) {
                        }
                }
            });

            if (this.isUpLevelEquipmeent) {
                break;
            }
        }
    }

    @message([EventName.stateKey.playerEquipment])
    refitem() {
        let temp = GModel.playerEquipment.temp();
        let arr = temp.map((element, index) => {
            return {
                playerEquipment: element,
                clickCB: (tempIndex: number) => {
                    GWindow.open(WindowSelectProp);
                },
                tempIndex: index,
                isContrast: true,
            };
        });

        this.UIScrollList.setState(arr);

        if (temp.length == 0) {
            this.close();
        }
    }
}
