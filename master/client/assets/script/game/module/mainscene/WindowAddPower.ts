import { autowired, registerClass } from "../../../framework/Decorator";
import { WindowOpenAnimationEnum, WindowOpenOption } from "../../../framework/ui/GWindow";
import UIButton from "../../../framework/ui/UIButton";
import UILabel from "../../../framework/ui/UILabel";
import UIWindow from "../../../framework/ui/UIWindow";

const { ccclass, property } = cc._decorator;
@registerClass("WindowAddPower")
@ccclass
export default class WindowAddPower extends UIWindow {
    static defaultOpentOption: Partial<WindowOpenOption> = {
        animation: WindowOpenAnimationEnum.default,
    };
    _windowParam: any;
    _returnValue: any;

    @autowired(UIButton) closeBtn: UIButton = null;
    @autowired(UIButton) buyBtn: UIButton = null;
    @autowired(UIButton) adBtn: UIButton = null;
    @autowired(UILabel) sellCost: UILabel = null;
    @autowired(UILabel) adCost: UILabel = null;
    @autowired(UILabel) sellPowerText: UILabel = null;
    @autowired(UILabel) adPowerText: UILabel = null;

    protected onInited(): void {
        this.closeBtn.onClick = () => {
            this.close();
        };
        this.buyBtn.onClick = () => {
            GModel.power.diamondAddPower(100);
        };
        this.adBtn.onClick = async () => {
            await GSDK.showVideo("advertisement_point");
            GModel.power.videoAddPower();
        };
        this.sellCost.setText(["_rxX30"]);
        this.adCost.setText(["_rxX10"]);

        this.buyBtn.setGrey(GConfig.player.powerDiamond[1] - GState.data.powerData.todayDiamondPower == 0);
        this.adBtn.setGrey(GConfig.player.powerVideo[1] - GState.data.powerData.todayVideoPower == 0);

        this.sellPowerText.setText([
            "_rs今日剩余次数：" + (GConfig.player.powerDiamond[1] - GState.data.powerData.todayDiamondPower),
        ]);
        this.adPowerText.setText([
            "_rs今日剩余次数：" + (GConfig.player.powerVideo[1] - GState.data.powerData.todayVideoPower),
        ]);
    }
}
