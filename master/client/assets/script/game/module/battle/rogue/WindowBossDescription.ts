import { autowired, registerClass } from "../../../../framework/Decorator";
import { WindowOpenAnimationEnum, WindowOpenOption } from "../../../../framework/ui/GWindow";
import UIButton from "../../../../framework/ui/UIButton";
import UIImage from "../../../../framework/ui/UIImage";
import UILabel from "../../../../framework/ui/UILabel";
import UIList from "../../../../framework/ui/UIList";
import UIWindow from "../../../../framework/ui/UIWindow";
import ListItemBossTag from "./ListItemBossTag";

const { ccclass, property } = cc._decorator;
@registerClass("WindowBossDescription")
@ccclass
export default class WindowBossDescription extends UIWindow {
    static defaultOpentOption: Partial<WindowOpenOption> = {
        animation: WindowOpenAnimationEnum.default,
    };
    _windowParam: {
        index: number;
    };
    _returnValue: any;

    @autowired(UIButton) closeBtn: UIButton = null;
    @autowired(UIImage) icon: UIImage = null;
    @autowired(UILabel) nameLab: UILabel = null;
    @autowired(UILabel) descLab: UILabel = null;
    @autowired(UIList) tagList: UIList<ListItemBossTag> = null;
    protected onInited(): void {
        this.closeBtn.onClick = () => {
            this.close();
        };
        const api = GBattleApiManager.getBattleStageApi(0);
        if (!api) return;
        const waveId = api.getWaveId();
        const waveTbl = GTable.getById("MonsterWaveTbl", waveId);
        const tbl = GTable.getById("BattleRogueBossTbl", waveTbl.boss);
        this.icon.imgName = tbl.img;
        this.nameLab.setText([tbl.name]);
        this.descLab.setText([tbl.description]);
        this.tagList.setState(
            tbl.tagText.map((t) => {
                return {
                    text: [t],
                };
            })
        );
    }

    protected update(dt: number): void {
        const api = GBattleApiManager.getBattleStageApi(0);
        if (!api) this.close();
    }
}
