import { autowired, registerClass } from "../../../framework/Decorator";
import { GameDate } from "../../../framework/date/GameDate";
import UIButton from "../../../framework/ui/UIButton";
import UIWindow from "../../../framework/ui/UIWindow";
import { WindowOpenAnimationEnum, WindowOpenOption } from "../../../framework/ui/GWindow";
import UILabel from "../../../framework/ui/UILabel";

const { ccclass, property } = cc._decorator;

@registerClass("WindowClock")
@ccclass
export default class WindowClock extends UIWindow {
    static defaultOpentOption: Partial<WindowOpenOption> = {
        animation: WindowOpenAnimationEnum.default,
    };
    _windowParam: any;
    _returnValue: any;

    @autowired(cc.Node) dayTag: cc.Node = null;
    @autowired(cc.Node) nightTag: cc.Node = null;
    @autowired(cc.Node) timerPoint: cc.Node = null;
    @autowired(UIButton) btnclose: UIButton = null;
    @autowired(cc.Node) nums: cc.Node = null;
    @autowired(cc.Node) clockapart: cc.Node = null;
    @autowired(UILabel) time: UILabel = null;

    protected onInited(): void {
        this.initWindow();
        this.initSchedule();
    }

    initWindow(): void {
        this.timerPoint.active = false;
        this.nightTag.active = false;
        this.btnclose.onClick = () => {
            this.close();
        };
    }

    initSchedule(): void {
        this.schedule(this.refreshTime, 1);
        this.refreshTime();
    }

    refreshTime() {
        // timeStandBy
        let angleNum = 0 - GameDate.gameSeconds();
        this.timerPoint.angle = angleNum * 0.5;
        this.timerPoint.active = true;

        // timeApart
        let apartTime = GameDate.gameTimeLight();
        let apartTag = GameDate.gameTimeTag();
        let numChilds = this.nums.children;
        numChilds.map((item) => {
            let itemNas = item.name;
            let itemNasIdx = Number(itemNas.split("_")[1]);
            if (apartTime.indexOf(itemNasIdx) >= 0) {
                item.color = cc.Color.WHITE;
            } else {
                item.color = cc.Color.BLACK.fromHEX("#4C3333");
            }
        });
        let tagChilds = this.clockapart.children;
        tagChilds.map((item) => {
            if (item.name == "cut_" + apartTag) item.active = false;
            else item.active = true;
        });

        // timeTag
        let hour = GameDate.gameHours();
        let isNight = hour >= 18 || hour < 6;
        this.nightTag.active = isNight;
        this.dayTag.active = !isNight;
        this.time.setText(["_rs" + GUtils.date.formatRemainTime(GameDate.nowUpdated() * 120, "hh:mm")]);
    }
}
