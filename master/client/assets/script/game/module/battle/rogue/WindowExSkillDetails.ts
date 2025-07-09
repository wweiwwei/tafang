import { autowired, registerClass } from "../../../../framework/Decorator";
import { WindowOpenAnimationEnum, WindowOpenOption } from "../../../../framework/ui/GWindow";
import UIButton from "../../../../framework/ui/UIButton";
import UIImage from "../../../../framework/ui/UIImage";
import UILabel from "../../../../framework/ui/UILabel";
import UIList from "../../../../framework/ui/UIList";
import UIRichText from "../../../../framework/ui/UIRichText";
import UIWindow from "../../../../framework/ui/UIWindow";
import ListItemBattleExSkill from "./ListItemBattleExSkill";

const { ccclass, property } = cc._decorator;
@registerClass("WindowExSkillDetails")
@ccclass
export default class WindowExSkillDetails extends UIWindow {
    static defaultOpentOption: Partial<WindowOpenOption> = {
        animation: WindowOpenAnimationEnum.default,
    };
    _windowParam: {
        index: number;
    };
    _returnValue: any;

    @autowired(UIButton) closeBtn: UIButton = null;
    /**确认 */
    @autowired(UIButton) confirmBtn: UIButton = null;
    /**技能列表 */
    @autowired(UIList) skillList: UIList<ListItemBattleExSkill> = null;
    /**技能名称 */
    @autowired(UILabel) skillName: UILabel = null;
    /**技能描述 */
    @autowired(UIRichText) tips: UIRichText = null;
    /**修行类型 如体修 */
    @autowired(UIImage) typeIcon: UIImage = null;

    protected onInited(): void {
        const api = GBattleApiManager.getBattleStageApi(0);
        if (!api) return;
        const info = api.getExSkillInfo()[this._windowParam.index].info;
        const exSkillTbl = GTable.getById("RogueExSkillTbl", info.relateSkillId);
        const exLevelTbl = GTable.getList("RogueExSkillEnhanceTbl").find((t) => {
            return t.level === info.level && t.skillId === info.relateSkillId;
        });
        this.skillName.setText([exSkillTbl.name]);
        this.tips.setText([exLevelTbl.description]);
        this.typeIcon.imgName = GConstant.kindIcon[exSkillTbl.kind - 1];
        this.closeBtn.setTransition(false);
        this.closeBtn.onClick = () => {
            this.close();
        };
        this.confirmBtn.onClick = () => {
            this.close();
        };

        this.refreshList();
    }

    refreshList() {
        const api = GBattleApiManager.getBattleStageApi(0);
        if (!api) return;
        const exState = api.getExSkillInfo().map((data, index) => {
            const tbl = GTable.getById("RogueExSkillTbl", data.info.relateSkillId);
            return {
                img: tbl.img,
                id: data.info.relateSkillId,
                progress: data.progress,
                require: data.require,
                cb: () => {},
            };
        })[this._windowParam.index];
        this.skillList.setState([exState]);
    }

    protected update(dt: number): void {
        const api = GBattleApiManager.getBattleStageApi(0);
        if (!api) this.close();
    }
}
