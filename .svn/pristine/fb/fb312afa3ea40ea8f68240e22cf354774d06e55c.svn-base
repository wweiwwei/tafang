import { autowired, registerClass } from "../../../framework/Decorator";
import { WindowOpenAnimationEnum, WindowOpenOption } from "../../../framework/ui/GWindow";
import UIButton from "../../../framework/ui/UIButton";
import UILabel from "../../../framework/ui/UILabel";
import UIList from "../../../framework/ui/UIList";
import UIListItem from "../../../framework/ui/UIListItem";
import UIWindow from "../../../framework/ui/UIWindow";
import Equipment from "../../entity/Equipment";
import { StoneAutoSetting } from "../../model/StoneAutoSetting";
import { FriendData } from "../../server/GApi";
import ListItemAttributePopItem from "../mainscene/ListItemAttributePopItem";

const { ccclass, property } = cc._decorator;
@registerClass("WindowAutoSetting", { preloadPrefab: ["ListItemAttributePopItem"] })
@ccclass
export default class WindowAutoSetting extends UIWindow {
    static defaultOpentOption: Partial<WindowOpenOption> = {
        animation: WindowOpenAnimationEnum.default,
    };
    _windowParam: any;
    _returnValue: {
        setting: StoneAutoSetting;
        beginAuto: boolean;
    };

    /**打开筛选条件1*/
    @autowired(UIButton) openRequirement1Btn: UIButton = null;
    /**打开筛选条件2*/
    @autowired(UIButton) openRequirement2Btn: UIButton = null;

    /**加速*/
    @autowired(UIButton) speedUp: UIButton = null;
    /**挑战满*/
    @autowired(UIButton) highBpStop: UIButton = null;
    /**开始按钮*/
    @autowired(UIButton) startBtn: UIButton = null;
    /**关闭*/
    @autowired(UIButton) closeBtn: UIButton = null;
    /**装备品质 */
    @autowired(UIButton) listBox1Btn: UIButton = null;
    /**条件1右边条件 */
    @autowired(UIButton) listBox2Btn: UIButton = null;
    /**条件2右边条件 */
    @autowired(UIButton) listBox3Btn: UIButton = null;
    /**条件1左边条件 */
    @autowired(UIButton) listBox4Btn: UIButton = null;
    /**条件2右边条件 */
    @autowired(UIButton) listBox5Btn: UIButton = null;
    /**开启神石数量 */
    @autowired(UIButton) listBox6Btn: UIButton = null;
    /**品质下拉框 */
    @autowired(UIList) listBox1: UIList<ListItemAttributePopItem> = null;
    /**其他选项下拉框 */
    @autowired(UIList) listBox2: UIList<ListItemAttributePopItem> = null;
    /**二级弹窗 */
    @autowired(UIButton) listBoxRootBtn: UIButton = null;

    private filter1Open1: string = "_rs任意";
    private filter1Open2: string = "_rs任意";
    private filter2Open1: string = "_rs任意";
    private filter2Open2: string = "_rs任意";
    private requirement: string[] = []; //筛选条件
    private stoneAutoSetting: StoneAutoSetting = null;

    private openTwoListBoxInfo: { closeCb: Function; clickCb: Function } = { closeCb: null, clickCb: null };

    private listBoxPos = [
        { x: -129, y: 126 },
        { x: 129, y: 126 },
        { x: -129, y: 17 },
        { x: 129, y: 17 },
        { x: 129, y: -70 },
    ];

    closeListBox1() {
        this.listBox1.node.active = false;
        this.listBox1Btn.bg.node.angle = 0;
        this.listBox1.node.parent.active = false;
    }

    closeListBox2() {
        this.listBox2.node.active = false;
        if (this.openTwoListBoxInfo.closeCb) this.openTwoListBoxInfo.closeCb();
        this.listBox2.node.parent.active = false;
    }

    onInited(): void {
        this.listBoxRootBtn.setTransition(false);
        let tbls = GTable.getList("EquipmentStatTbl");
        new Set(tbls.map((d) => d.property)).forEach((a) => this.requirement.push(a));

        this._returnValue = {
            setting: GModel.stone.stoneAuto(),
            beginAuto: GModel.stone.isAuto(),
        };
        this.listBoxRootBtn.node.active = false;
        this.stoneAutoSetting = JSON.parse(JSON.stringify(GModel.stone.stoneAuto()));

        // this.filter1Open2 = this.stoneAutoSetting.filter1[0];
        // this.filter1Open2 = this.stoneAutoSetting.filter1[1];
        // this.filter1Open1 = this.stoneAutoSetting.filter2[0] ? this.stoneAutoSetting.filter2[0] : "_rs任意";
        // this.filter2Open2 = this.stoneAutoSetting.filter2[1];

        this.initUi();
        this.onEven();
    }

    onEven() {
        this.closeBtn.setTransition(false);
        this.closeBtn.onClick = () => {
            this.close();
        };

        this.listBoxRootBtn.onClick = () => {
            this.closeListBox1();
            this.closeListBox2();
        };

        this.startBtn.onClick = () => {
            GModel.stone.isAuto() ? this.onStopBtn() : this.onStartBtn();
        };

        this.speedUp.onClick = () => {
            this.stoneAutoSetting.accelerate = !this.stoneAutoSetting.accelerate;
            this.speedUp.bg.node.active = this.stoneAutoSetting.accelerate;
        };
        this.highBpStop.onClick = () => {
            this.stoneAutoSetting.highBpStop = !this.stoneAutoSetting.highBpStop;
            this.highBpStop.bg.node.active = this.stoneAutoSetting.highBpStop;
        };

        this.listBox1Btn.onClick = () => {
            this.listBox1Btn.bg.node.angle = 180;
            this.listBox2.node.active = false;
            this.listBox1.node.active = true;
            this.listBox1.node.parent.active = true;

            let state = [];
            for (let i = 0; i < 8; i++) {
                state.push({
                    text: "ui/autoSettingQuality" + i,
                    cb: (name) => {
                        this.listBox1Btn.bg.node.angle = 0;
                        this.listBox1.node.parent.active = false;
                        this.listBox1.node.active = false;
                        this.stoneAutoSetting.autoSellQuality = Number(name);
                        this.listBox1Btn.text.setText(["ui/autoSettingQuality" + Number(name)]);
                        this.listBox1Btn.text.node.color =
                            GConstant.equipQuality[this.stoneAutoSetting.autoSellQuality];
                    },
                    name: i,
                    color: GConstant.equipQuality[i],
                });
            }
            this.listBox1.setState(state);
        };

        this.listBox2Btn.onClick = () => {
            this.listBox2Btn.bg.node.angle = 180;
            this.listBox1.node.active = false;
            this.listBox2.node.active = true;
            this.listBox2.node.parent.active = true;

            this.listBox2.node.setPosition(this.listBoxPos[0].x, this.listBoxPos[0].y);
            let arr = this.requirement.filter((str, index) => str != this.filter1Open1 && str != this.filter1Open2);
            arr.unshift("any");
            this.listBox2.setState(
                arr.map((a) => {
                    return {
                        text: a === "any" ? "_rs任意" : GIndex.battle.propertyText(a),
                        cb: () => {
                            this.listBox2Btn.bg.node.angle = 0;
                            this.listBox2.node.active = false;
                            this.listBox2.node.parent.active = false;
                            this.stoneAutoSetting.filter1[0] = a;
                            this.listBox2Btn.text.setText([a === "any" ? "_rs任意" : GIndex.battle.propertyText(a)]);
                            this.filter1Open1 = a;
                        },
                        name: a,
                    };
                })
            );

            this.openTwoListBoxInfo.closeCb = () => {
                this.listBox2Btn.bg.node.angle = 0;
                this.listBox2.node.parent.active = false;
            };
        };

        this.listBox3Btn.onClick = () => {
            this.listBox2Btn.bg.node.angle = 180;
            this.listBox1.node.active = false;
            this.listBox2.node.active = true;
            this.listBox2.node.parent.active = true;

            this.listBox2.node.setPosition(this.listBoxPos[1].x, this.listBoxPos[1].y);
            let arr = this.requirement.filter((str) => str != this.filter1Open1 && str != this.filter1Open2);

            arr.unshift("any");
            this.listBox2.setState(
                arr.map((a) => {
                    return {
                        text: a === "any" ? "_rs任意" : GIndex.battle.propertyText(a),
                        cb: () => {
                            this.listBox3Btn.bg.node.angle = 0;
                            this.listBox2.node.active = false;
                            this.listBox2.node.parent.active = false;
                            this.stoneAutoSetting.filter1[1] = a;
                            this.listBox3Btn.text.setText([a === "any" ? "_rs任意" : GIndex.battle.propertyText(a)]);
                            this.filter1Open2 = a;
                        },
                        name: a,
                    };
                })
            );
            this.openTwoListBoxInfo.closeCb = () => {
                this.listBox3Btn.bg.node.angle = 0;
                this.listBox2.node.parent.active = false;
            };
        };

        this.listBox4Btn.onClick = () => {
            this.listBox2Btn.bg.node.angle = 180;
            this.listBox1.node.active = false;
            this.listBox2.node.active = true;
            this.listBox2.node.parent.active = true;

            this.listBox2.node.setPosition(this.listBoxPos[2].x, this.listBoxPos[2].y);
            let arr = this.requirement.filter((str) => str != this.filter2Open2 && str != this.filter2Open1);
            arr.unshift("any");
            this.listBox2.setState(
                arr.map((a) => {
                    return {
                        text: a === "any" ? "_rs任意" : GIndex.battle.propertyText(a),
                        cb: () => {
                            this.listBox4Btn.bg.node.angle = 0;
                            this.listBox2.node.active = false;
                            this.listBox2.node.parent.active = false;
                            this.stoneAutoSetting.filter2[0] = a;
                            this.listBox4Btn.text.setText([a === "any" ? "_rs任意" : GIndex.battle.propertyText(a)]);
                            this.filter2Open1 = a;
                        },
                        name: a,
                    };
                })
            );

            this.openTwoListBoxInfo.closeCb = () => {
                this.listBox4Btn.bg.node.angle = 0;
                this.listBox2.node.parent.active = false;
            };
        };

        this.listBox5Btn.onClick = () => {
            this.listBox2Btn.bg.node.angle = 180;
            this.listBox1.node.active = false;
            this.listBox2.node.active = true;
            this.listBox2.node.parent.active = true;

            this.listBox2.node.setPosition(this.listBoxPos[3].x, this.listBoxPos[3].y);
            let arr = this.requirement.filter((str) => str != this.filter2Open1 && str != this.filter2Open2);
            arr.unshift("any");
            this.listBox2.setState(
                arr.map((a) => {
                    return {
                        text: a === "any" ? "_rs任意" : GIndex.battle.propertyText(a),
                        cb: () => {
                            this.listBox5Btn.bg.node.angle = 0;
                            this.listBox2.node.active = false;
                            this.listBox2.node.parent.active = false;
                            this.stoneAutoSetting.filter2[1] = a;
                            this.listBox5Btn.text.setText([a === "any" ? "_rs任意" : GIndex.battle.propertyText(a)]);
                            this.filter2Open2 = a;
                        },
                        name: a,
                    };
                })
            );

            this.openTwoListBoxInfo.closeCb = () => {
                this.listBox5Btn.bg.node.angle = 0;
                this.listBox2.node.parent.active = false;
            };
        };

        this.listBox6Btn.onClick = () => {
            this.listBox2Btn.bg.node.angle = 180;
            this.listBox1.node.active = false;
            this.listBox2.node.active = true;
            this.listBox2.node.parent.active = true;

            this.listBox2.node.setPosition(this.listBoxPos[4].x, this.listBoxPos[4].y);
            const curLevel = GModel.stone.stone().level;
            let dataList = GTable.getList("StoneLevelTbl").map((t) => {
                return {
                    count: t.openCount,
                    level: t.level,
                    unlock: curLevel >= t.level,
                };
            });
            const set = new Set<number>();
            dataList = dataList.filter((d) => {
                if (set.has(d.count)) {
                    return false;
                }
                set.add(d.count);
                return true;
            });
            const a = dataList.map((d, i) => {
                return {
                    text: "_rs" + d.count + "次",
                    cb: () => {
                        if (d.unlock) {
                            this.listBox6Btn.bg.node.angle = 0;
                            this.listBox2.node.active = false;
                            this.listBox2.node.parent.active = false;
                            this.stoneAutoSetting.openCount = d.count;
                            this.listBox6Btn.text.setText(["_rs" + this.stoneAutoSetting.openCount + "次"]);
                        } else {
                            GTip.showTip([`_rs时光机等级到达${d.level}解锁`]);
                        }
                    },
                    name: d.count.toString(),
                    color: d.unlock ? cc.Color.WHITE : cc.Color.GRAY,
                };
            });
            this.listBox2.setState(a);

            this.openTwoListBoxInfo.closeCb = () => {
                this.listBox6Btn.bg.node.angle = 0;
                this.listBox2.node.parent.active = false;
            };
        };

        this.openRequirement1Btn.onClick = () => {
            this.stoneAutoSetting.filter1Open = !this.stoneAutoSetting.filter1Open;
            this.stoneAutoSetting.filter1Open = this.stoneAutoSetting.filter1Open;
            this.openRequirement1Btn.bg.node.active = this.stoneAutoSetting.filter1Open;
        };
        this.openRequirement2Btn.onClick = () => {
            this.stoneAutoSetting.filter2Open = !this.stoneAutoSetting.filter2Open;
            this.stoneAutoSetting.filter2Open = this.stoneAutoSetting.filter2Open;
            this.openRequirement2Btn.bg.node.active = this.stoneAutoSetting.filter2Open;
        };
    }

    initUi() {
        this.listBox1Btn.text.setText(["ui/autoSettingQuality" + this.stoneAutoSetting.autoSellQuality]);
        this.listBox1Btn.text.node.color = GConstant.equipQuality[this.stoneAutoSetting.autoSellQuality];
        this.openRequirement1Btn.bg.node.active = this.stoneAutoSetting.filter1Open;
        this.openRequirement2Btn.bg.node.active = this.stoneAutoSetting.filter2Open;
        this.listBox2Btn.text.setText([
            this.stoneAutoSetting.filter1[0] != "any"
                ? GIndex.battle.propertyText(this.stoneAutoSetting.filter1[0])
                : "_rs任意",
        ]);
        this.listBox3Btn.text.setText([
            this.stoneAutoSetting.filter1[1] != "any"
                ? GIndex.battle.propertyText(this.stoneAutoSetting.filter1[1])
                : "_rs任意",
        ]);

        // console.log("this.stoneAutoSetting.filter2[0] =", this.stoneAutoSetting.filter2[0]);
        this.listBox4Btn.text.setText([
            this.stoneAutoSetting.filter2[0] != "any"
                ? GIndex.battle.propertyText(this.stoneAutoSetting.filter2[0])
                : "_rs任意",
        ]);
        this.listBox5Btn.text.setText([
            this.stoneAutoSetting.filter2[1] != "any"
                ? GIndex.battle.propertyText(this.stoneAutoSetting.filter2[1])
                : "_rs任意",
        ]);
        this.listBox6Btn.text.setText([
            this.stoneAutoSetting.openCount ? "_rs" + this.stoneAutoSetting.openCount + "次" : "_rs1次",
        ]);

        this.speedUp.bg.node.active = this.stoneAutoSetting.accelerate;
        this.highBpStop.bg.node.active = this.stoneAutoSetting.highBpStop;

        this.startBtn.text.setText([GModel.stone.isAuto() ? GLang.code.ui.stop : GLang.code.ui.start]);
    }

    onStartBtn() {
        // console.log(this.stoneAutoSetting);
        GModel.stone.changeAutoSetting(this.stoneAutoSetting);
        this._returnValue.setting = this.stoneAutoSetting;
        this._returnValue.beginAuto = true;
        this.close();
    }
    onStopBtn() {
        GModel.stone.changeAutoSetting(this.stoneAutoSetting);
        this._returnValue.setting = this.stoneAutoSetting;
        this._returnValue.beginAuto = false;
        this.close();
    }
}
