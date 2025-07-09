import { autowired, message, registerClass } from "../../../framework/Decorator";
import { WindowOpenAnimationEnum, WindowOpenOption } from "../../../framework/ui/GWindow";
import UIButton from "../../../framework/ui/UIButton";
import UIImage from "../../../framework/ui/UIImage";
import UILabel from "../../../framework/ui/UILabel";
import UIList from "../../../framework/ui/UIList";
import UIWindow from "../../../framework/ui/UIWindow";
import EventName from "../../event/EventName";
import ListItemEquipProperty from "../hero/ListItemEquipProperty";
import ListItemImprove from "../hero/ListItemImprove";
import ListItemCareerMission from "./ListItemCareerMission";

const { ccclass, property } = cc._decorator;

@registerClass("WindowCareer")
@ccclass
export default class WindowCareer extends UIWindow {
    static defaultOpentOption: Partial<WindowOpenOption> = {
        animation: WindowOpenAnimationEnum.default,
    };
    _windowParam: { text1: string; oldval: number; newval: number };
    _returnValue: any;
    @autowired(UIButton) closeBtn: UIButton = null;
    /**描述 */
    @autowired(UILabel) preCareer: UILabel = null;
    /**下一级描述 */
    @autowired(UILabel) nextCareer: UILabel = null;
    @autowired(UIImage) preBg: UIImage = null;
    @autowired(UIImage) nextBg: UIImage = null;
    /**属性等级 */
    @autowired(UILabel) preLimit: UILabel = null;
    /**下一级属性等级 */
    @autowired(UILabel) nextLimit: UILabel = null;
    /**属性列表* */
    @autowired(UIList) property: UIList<ListItemImprove> = null;
    /**任务列表 */
    @autowired(UIList) mission: UIList<ListItemCareerMission> = null;
    /**渡劫按钮 */
    @autowired(UIButton) startBtn: UIButton = null;
    /**按钮红点提示 */
    @autowired(UIImage) startBtnRedTips: UIImage = null;
    @autowired(cc.Node) normal: cc.Node = null;
    @autowired(cc.Node) max: cc.Node = null;
    @autowired(UILabel) maxCareer: UILabel = null;
    @autowired(UILabel) maxLimit: UILabel = null;
    @autowired(UIList) maxProperty: UIList<ListItemEquipProperty> = null;

    // private haveGetArr = [];

    protected onInited(): void {
        this.closeBtn.setTransition(false);
        this.closeBtn.onClick = () => {
            this.close();
        };
        this.refItem1();
        this.refItem2();

        this.startBtn.onClick = async () => {
            const origin = GModel.battle.getBattlePoint();
            await GModel.player.upgradeRank();
            const after = GModel.battle.getBattlePoint();
            GTip.showBattlePointChange(origin, after, [], [], false);
        };
    }

    @message([EventName.stateKey.rank, EventName.stateKey.playerMission])
    refItem1() {
        this.max.active = GModel.player.IsMaxRank();
        this.normal.active = !GModel.player.IsMaxRank();
        let tbl = GTable.getList("PlayerRankTbl").find((t) => {
            if (t.rank == GState.data.rank) return t;
        });
        if (GModel.player.IsMaxRank()) {
            this.maxCareer.setText([tbl.careerName]);
            this.maxLimit.setText([GLang.code.ui.map_unlock_level, "_rs" + tbl.levelLimit]);
            let list1 = [];
            tbl.property.map((p, index) => {
                list1.push({
                    property: p[0],
                    value: (Number(p[1]) / 10000) * 100 + "%",
                    plus: 0,
                });
            });
            this.maxProperty.setState(list1);
            this.startBtnRedTips.node.active = false;
        } else {
            let preTbl = GModel.player.getRankTbl(GState.data.rank);
            let nexTbl = GModel.player.getRankTbl(GState.data.rank + 1);

            this.preCareer.setText([preTbl.careerName]);
            this.nextCareer.setText([nexTbl.careerName]);
            this.preBg.imgName = `mainscene_title_${GState.data.rank + 1}`;
            this.nextBg.imgName = `mainscene_title_${GState.data.rank + 2}`;
            this.preCareer.node.color = GConstant.playerTitleColor[GState.data.rank + 1];
            this.nextCareer.node.color = GConstant.playerTitleColor[GState.data.rank + 2];

            this.preLimit.setText([GLang.code.ui.map_unlock_level, "_rs" + preTbl.levelLimit]);
            this.nextLimit.setText([GLang.code.ui.map_unlock_level, "_rs" + nexTbl.levelLimit]);

            let list1 = [];
            preTbl.property.map((p, index) => {
                let nex = nexTbl.property[index];
                list1.push({
                    property: GIndex.battle.propertyText(p[0]),
                    oldval: (Number(p[1]) / 10000) * 100 + "%",
                    newval: (Number(nex[1]) / 10000) * 100 + "%",
                });
            });
            this.startBtnRedTips.node.active = GModel.player.getMission().every((m) => m.getState() === "hasGet");
            this.property.setState(list1);
        }
    }

    @message([EventName.stateKey.playerMission])
    refItem2() {
        let list2 = GModel.player
            .getMission()
            .map((d) => [{ id: d.id }])
            .reduce((p, c) => p.concat(c), []);
        this.mission.setState(list2);

        // this.haveGetArr = GModel.player
        //     .getMission()
        //     .map((d) => [GState.data.playerMission[d.id].hasGet])
        //     .reduce((p, c) => p.concat(c), []);
        // let getLength = 0;
        // this.haveGetArr.map((a) => {
        //     if (a == true) getLength++;
        // });
        // this.progressBar.progress = getLength / this.haveGetArr.length;
        // this.progressBarLabel.setText(["_rs" + getLength + "/" + this.haveGetArr.length]);
    }
}
