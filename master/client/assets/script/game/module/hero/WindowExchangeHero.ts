import { autowired, registerClass } from "../../../framework/Decorator";
import UIWindow from "../../../framework/ui/UIWindow";
import { WindowOpenAnimationEnum, WindowOpenOption } from "../../../framework/ui/GWindow";
import ListItemExchangeHero from "./ListItemExchangeHero";
import UIButton from "../../../framework/ui/UIButton";
import UILabel from "../../../framework/ui/UILabel";
import UIScrollList from "../../../framework/ui/UIScrollList";
import UISlider from "../../../framework/ui/UISlider";
import WindowCongratulation from "../common/WindowCongratulation";
import Item from "../../entity/Item";

const { ccclass, property } = cc._decorator;

@registerClass("WindowExchangeHero")
@ccclass
export default class WindowExchangeHero extends UIWindow {
    static defaultOpentOption: Partial<WindowOpenOption> = {
        animation: WindowOpenAnimationEnum.default,
        hideMainScene: true,
    };
    _windowParam: {
        /**宝箱最大个数 */
        exchaneMax: number;
        /**宝箱id */
        itemId: number;
    };
    _returnValue: any;
    @autowired(UIButton) closeBtn: UIButton = null;
    @autowired(UILabel) tipsLabel: UILabel = null;
    @autowired(UIButton) reduceBtn: UIButton = null;
    @autowired(UIButton) addBtn: UIButton = null;
    @autowired(UIButton) exchangeBtn: UIButton = null;
    @autowired(UISlider) pb: UISlider = null;
    /**列表 */
    @autowired(UIScrollList) uiScrollList: UIScrollList<ListItemExchangeHero> = null;
    /**宝箱个数 */
    private exchaneNum: number = 1;
    private tagIndex: number = 0;
    private chestId: number = 0;
    protected onInited(): void {
        this.refItemList();
        this.closeBtn.onClick = () => {
            this.close();
        };
        this.reduceBtn.onClick = () => {
            this.onReduce();
        };
        this.addBtn.onClick = () => {
            this.onAdd();
        };
        this.exchangeBtn.onClick = () => {
            this.onExchange();
        };
        this.initPB();
        this.pb.onProgress = () => {
            this.exchaneNum = Math.round(this.pb.bar.progress * this._windowParam.exchaneMax);
            this.initPB();
        };
        let tbls = GTable.getList("OptionalChestPoolTbl");
        this.chestId = tbls[0].id;
    }

    initPB() {
        if (this.exchaneNum < 1) this.exchaneNum = 1;
        if (this.exchaneNum > this._windowParam.exchaneMax) this.exchaneNum = 1;

        this.pb.setProgress(this.exchaneNum / this._windowParam.exchaneMax);
        this.tipsLabel.setText(["_rs" + this.exchaneNum + "/" + this._windowParam.exchaneMax]);
    }
    onAdd(): void {
        this.exchaneNum++;
        this.initPB();
        this.tipsLabel.setText(["_rs" + this.exchaneNum + "/" + this._windowParam.exchaneMax]);
        this.pb.setProgress(this.exchaneNum / this._windowParam.exchaneMax);
    }
    onReduce(): void {
        this.exchaneNum--;
        this.initPB();
        this.tipsLabel.setText(["_rs" + this.exchaneNum + "/" + this._windowParam.exchaneMax]);
        this.pb.setProgress(this.exchaneNum / this._windowParam.exchaneMax);
    }
    onExchange(): void {
        GModel.knapsack.openChest(this.chestId, this.exchaneNum, this._windowParam.itemId).then((items: Item[]) => {
            this.close();
            GWindow.open(WindowCongratulation, { items: items });
        });
    }
    clickCallBack(index: number, chestId: number) {
        this.chestId = chestId;
        this.tagIndex = index;
        this.refItemList();
    }
    refItemList() {
        let data: {
            tagIndex: number;
            index: number;
            fragId: number;
            count: number;
            chestId: number;
            clickCB: Function;
        }[] = [];
        let tbls = GTable.getList("OptionalChestPoolTbl");
        tbls.forEach((element, index) => {
            data.push({
                tagIndex: this.tagIndex,
                index: index,
                chestId: element.id,
                fragId: element.reward[0],
                count: element.reward[1],
                clickCB: (index: number, chestId: number) => {
                    this.clickCallBack(index, chestId);
                },
            });
        });
        this.uiScrollList.setState(data);
    }
}
