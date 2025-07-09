import { autowired, message, registerClass } from "../../../framework/Decorator";
import { WindowOpenAnimationEnum, WindowOpenOption } from "../../../framework/ui/GWindow";
import UIButton from "../../../framework/ui/UIButton";
import UIList from "../../../framework/ui/UIList";
import UIScrollList from "../../../framework/ui/UIScrollList";
import UIWindow from "../../../framework/ui/UIWindow";
import Item from "../../entity/Item";
import EventName from "../../event/EventName";
import ListItemCost from "../hero/ListItemCost";
import ListItemCareerItem from "./ListItemCareerItem";
import ListItemCareerSkill from "./ListItemCareerSkill";
import ListItemTalent from "./ListItemTalent";
import WindowTalent from "./WindowTalent";

const { ccclass, property } = cc._decorator;

@registerClass("WindowCareer2")
@ccclass
export default class WindowCareer2 extends UIWindow {
    static defaultOpentOption: Partial<WindowOpenOption> = {
        animation: WindowOpenAnimationEnum.default,
    };
    _windowParam: any;
    _returnValue: any;
    @autowired(UIButton) closeBtn: UIButton = null;
    /**职业 */
    @autowired(UIList) career: UIList<ListItemCareerItem> = null;
    @autowired(UIButton) talentBtn: UIButton = null;
    @autowired(UIButton) skillBtn: UIButton = null;
    /**--------转职---------- */
    @autowired(cc.Node) transfer: cc.Node = null;
    @autowired(UIButton) transferBtn: UIButton = null;
    @autowired(UIList) transferCost: UIList<ListItemCost> = null;
    @autowired(UIScrollList) skillList: UIScrollList<ListItemCareerSkill> = null;
    /**--------天赋---------- */
    @autowired(cc.Node) talent: cc.Node = null;
    @autowired(UIList) talentList: UIList<ListItemTalent> = null;
    @autowired(UIButton) videoBtn: UIButton = null;
    @autowired(UIButton) studyBtn: UIButton = null;
    @autowired(UIList) studyCost: UIList<ListItemCost> = null;

    private page = 0;
    private id = 0;
    private index = -1;

    protected onInited(): void {
        this.closeBtn.setTransition(false);
        this.closeBtn.onClick = () => {
            this.close();
        };
        this.studyBtn.onClick = async () => {
            this.index = -1;
            this.initTalent();
            await this.studyFun(false);
        };
        this.id = GState.data.careerData.currentCareer;
        this.transferBtn.onClick = () => {
            if (this.id !== GState.data.careerData.currentCareer) GModel.career.transfer(this.id);
        };
        this.initCareer();
        this.skillBtn.onClick = () => {
            this.page = 0;
            this.initSkill();
            this.talentBtn.bg.imgName = "common_window_unchosen";
            this.skillBtn.bg.imgName = "common_window_chosen";
            this.transfer.active = true;
            this.talent.active = false;
        };
        this.talentBtn.onClick = () => {
            this.page = 1;
            this.initTalent();
            this.talentBtn.bg.imgName = "common_window_chosen";
            this.skillBtn.bg.imgName = "common_window_unchosen";
            this.transfer.active = false;
            this.talent.active = true;
        };
        this.videoBtn.onClick = async () => {
            this.index = -1;
            this.initTalent();
            await this.studyFun(true);
        };
        this.initSkill();
        this.initTalent();
    }

    @message([EventName.stateKey.careerData])
    initCareer() {
        let state = GTable.getList("JobChangeTbl").map((t) => {
            return {
                id: t.id,
                chosen: this.id === t.id,
                cb: () => {
                    this.id = t.id;
                    this.initSkill();
                    this.initCareer();
                },
            };
        });
        this.career.setState(state);
    }

    @message([EventName.stateKey.careerData])
    initSkill() {
        let skill = GModel.career.getSkill(this.id);
        let list: { id: number; kind: string }[] = [];
        for (const obj in skill) {
            if (Array.isArray(skill[obj]))
                skill[obj].forEach((id) => {
                    list.push({ id, kind: obj });
                });
            else list.push({ id: skill[obj], kind: obj });
        }
        let state = list.map((o) => {
            return { id: o.id, kind: o.kind };
        });
        this.skillList.setState(state);
        this.transferCost.setState([
            {
                item: new Item(GIndex.id.diamondId, 1),
                require: GConfig.job.resetCost,
                storage: GModel.knapsack.getStorageById(GIndex.id.diamondId),
            },
        ]);
        this.transferBtn.setGrey(this.id === GState.data.careerData.currentCareer);
    }

    initTalent() {
        let state = GModel.career.getTalent().map((t, i) => {
            return {
                id: t.id,
                cb: () => {
                    GWindow.open(WindowTalent, { id: t.id });
                },
                chosen: i === this.index,
            };
        });
        this.talentList.setState(state);
        let cost = GConfig.career.talentCost;
        this.studyCost.setState([
            { item: new Item(cost[0], 1), require: cost[1], storage: GModel.knapsack.getStorageById(cost[0]) },
        ]);
    }

    async studyFun(free: boolean) {
        const id = await GModel.career.studyTalent(free);
        const list = this.talentList.getItems();
        let count = 0;
        this.schedule(
            () => {
                if (count < 4) {
                    this.index = GUtils.random.nextInt(0, 15);
                    list[this.index].setChosen();
                    count++;
                } else {
                    this.index = GModel.career.getTalent().findIndex((t) => t.id === id);
                    list[this.index].playAni();
                    this.scheduleOnce(() => {
                        this.initTalent();
                    }, 1);
                }
            },
            0.4,
            5
        );
    }

    protected onRecycle(): void {
        this.unscheduleAllCallbacks();
    }
}
