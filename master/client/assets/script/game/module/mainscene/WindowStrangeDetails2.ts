import { autowired, registerClass } from "../../../framework/Decorator";
import { WindowOpenAnimationEnum, WindowOpenOption } from "../../../framework/ui/GWindow";
import UIButton from "../../../framework/ui/UIButton";
import UIImage from "../../../framework/ui/UIImage";
import UILabel from "../../../framework/ui/UILabel";
import UIList from "../../../framework/ui/UIList";
import UIWindow from "../../../framework/ui/UIWindow";
import ListItemEquipmentDetailsProperty from "./ListItemEquipmentDetailsProperty";
import ListItemHeroDetail from "./ListItemHeroDetail";

const { ccclass, property } = cc._decorator;
@registerClass("WindowStrangeDetails2")
@ccclass
export default class WindowStrangeDetails2 extends UIWindow {
    static defaultOpentOption: Partial<WindowOpenOption> = {
        animation: WindowOpenAnimationEnum.default,
    };
    _windowParam: { id: number };
    _returnValue: {
        part?: number;
        id?: number;
    };

    @autowired(UIButton) closeBtn: UIButton = null;

    @autowired(UIList) uiList: UIList<ListItemHeroDetail> = null;
    @autowired(UIList) property: UIList<ListItemEquipmentDetailsProperty> = null;
    @autowired(UILabel) name1: UILabel = null;
    @autowired(UILabel) quality: UILabel = null;
    @autowired(UILabel) desc: UILabel = null;
    @autowired(UILabel) text1: UILabel = null;
    @autowired(cc.Node) colors: cc.Node = null;
    @autowired(UIButton) upStar: UIButton = null;

    @autowired(UILabel) property0: UILabel = null;
    @autowired(UILabel) property1: UILabel = null;
    @autowired(UILabel) property2: UILabel = null;
    @autowired(UILabel) property3: UILabel = null;

    @autowired(UIImage) equipment_detailbg: UIImage = null;
    private nodeList: cc.Node[] = [];
    //改
    private propertys: UILabel[] = [];
    protected onInited(): void {
        this.closeBtn.setTransition(false);
        this.closeBtn.onClick = () => {
            this.close();
        };
        this.upStar.onClick = () => {
            // todo 升星功能
            GTip.showTip(["_rs开发中"]);
        };
        let it = GTable.getById("ItemTbl", this._windowParam.id);

        for (let i = 0; i < 4; i++) {
            this.propertys.push(this[`property${i}`]);
        }
        console.log(this.propertys, 22222);
        let tbls = GTable.getList("FossilComboTbl").filter((t) => t.itemId === this._windowParam.id);
        //this.title.setText([GLang.code.ui.stange_star], [GLang.code.ui.property]);
        let color = tbls[0].combo;
        //let gray = cc.color(182, 169, 163, 255);
        const node: cc.Node = this.colors.getChildByName("UILabel");
        // color.forEach((c, i) => {
        //     const copy = cc.instantiate(node);
        //     copy.getComponent(UILabel).setText([GConstant.colorLabel[c]]);
        //     copy.color = GConstant.itemColor[c];
        //     copy.setParent(this.colors);
        //     this.nodeList.push(copy);
        // });
        let formation = GModel.fossil.getFormation();
        let gray = cc.color(182, 169, 163, 255);
        let quality = -1;
        if (!GModel.fossil.isStarActiveById(this._windowParam.id)) {
            this.propertys.forEach((la) => (la.node.color = gray));
        } else {
            quality = GUtils.array.min(formation.map((t) => GTable.getById("ItemTbl", t).quality));
        }
        this.propertys.forEach((la, i) => {
            let des = tbls[i].property
                .map((p, n) => [
                    [GIndex.battle.propertyText(p[0])],
                    [`_rs+${p[1]}`],
                    n < tbls[i].property.length - 1 ? ["_rs，"] : [],
                ])
                .reduce((p, c) => p.concat(c), []);
            la.setText([GLang.code.ui.map_unlock_level, `_rs${i + 1}`], ["_rs："], ...des);
            if (i > quality) la.node.color = gray;
        });

        this.uiList.setState([
            {
                id: this._windowParam.id,
                quailtyImg: GConstant.itemQualityBg[it.quality],
                icon: it.img,
                isHave: true,
            },
        ]);

        let obj: { text1: string; text2: string }[] = [];

        this.property.setState(obj);

        this.name1.setText([it.name]);
        this.colors.parent.active = false;
        this.quality.setText(["_rs品质：" + GConstant.qualityName[it.quality]]);
        this.equipment_detailbg.imgName = GConstant.equipmentQuality[it.quality];
        this.desc.setText([it.description]);

        if (GTable.getList("FossilComboTbl").filter((t) => t.itemId === this._windowParam.id).length > 1) {
            this.text1.setText(["_rs神器技能"]);
            this.colors.parent.active = true;
            let tbls = GTable.getList("FossilComboTbl").filter((t) => t.itemId === this._windowParam.id);
            let color = tbls[0].combo;
            const node: cc.Node = this.colors.getChildByName("UIImage");
            node.active = false;
            color.forEach((c, i) => {
                const copy = cc.instantiate(node);
                // copy.getComponent(UILabel).setText([GConstant.colorLabel[c]]);
                copy.color = GConstant.itemColor[c];
                copy.setParent(this.colors);
                copy.active = true;
                this.nodeList.push(copy);
            });

            let fossilTbl = GTable.getById("FossilComboTbl", tbls[0].id);
            fossilTbl.property.forEach((d, index) => {
                obj.push({
                    text1: GIndex.battle.propertyText(d[0]),
                    text2: "_rs+" + d[1],
                });
            });
        } else if (GTable.getById("FossilTbl", this._windowParam.id)) {
            this.text1.setText(["_rs玉石"]);
            let fossilTbl = GTable.getById("FossilTbl", this._windowParam.id);
            fossilTbl.property.forEach((d, index) => {
                obj.push({
                    text1: GIndex.battle.propertyText(d[0]),
                    text2: "_rs+" + d[1],
                });
            });
        }
    }

    protected onDestroy(): void {
        this.nodeList.forEach((node) => node.destroy());
    }

    propertyLabelText(des: string[][]): string[][] {
        return des
            .map((p, n) => {
                let value: string[];
                if (p[1].endsWith("%")) {
                    value = ["_rs+" + p[1]];
                } else {
                    const showFunc = GIndex.battle.propertyShowMethod(p[0])[p[1]];
                    value = ["_rs+" + showFunc];
                }
                return [[GIndex.battle.propertyText(p[0])], value, n < des.length - 1 ? ["_rs，"] : []];
            })
            .reduce((p, c) => p.concat(c), []);
    }
}
