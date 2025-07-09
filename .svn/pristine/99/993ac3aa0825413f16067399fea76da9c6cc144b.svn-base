import { autowired, message, registerClass } from "../../../framework/Decorator";
import UIButton from "../../../framework/ui/UIButton";
import UIImage from "../../../framework/ui/UIImage";
import UILabel from "../../../framework/ui/UILabel";
import UIRichText from "../../../framework/ui/UIRichText";
import UIWindow from "../../../framework/ui/UIWindow";

const { ccclass, property } = cc._decorator;

@registerClass("WindowTalent")
@ccclass
export default class WindowTalent extends UIWindow {
    _windowParam: { id: number };
    _returnValue: any;
    @autowired(UIImage) icon: UIImage = null;
    @autowired(UILabel) talentName: UILabel = null;
    @autowired(UILabel) level: UILabel = null;
    @autowired(UIRichText) description: UIRichText = null;
    @autowired(cc.ProgressBar) progress: cc.ProgressBar = null;
    @autowired(UILabel) progressLabel: UILabel = null;

    protected onInited(): void {
        this.node.getComponent(UIButton).onClick = () => {
            this.close();
        };
        this.node.getComponent(UIButton).setTransition(false);
        const talent = GState.data.careerTalent[this._windowParam.id];
        const require = GTable.getList("JobTalentLevelTbl").find((t) => t.level === talent.level).require;
        this.level.setText(["_rslv." + talent.level]);
        this.talentName.setText([talent.getTbl().talentName]);
        this.icon.imgName = talent.getTbl().img;
        this.description.setText([talent.getTbl().description, "_rs" + talent.getProperty()[0].value * 0.001]);
        this.progress.progress = talent.exp / require;
        this.progressLabel.setText([`_rs${talent.exp}/${require}`]);
    }
}
