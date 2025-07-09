import { autowired, message, registerClass } from "../../../framework/Decorator";
import ResourceLoader from "../../../framework/ResourceLoader";
import { GameDate } from "../../../framework/date/GameDate";
import UILabel from "../../../framework/ui/UILabel";
import UIList from "../../../framework/ui/UIList";
import UIWindow from "../../../framework/ui/UIWindow";
import Survivor from "../../entity/Survivor";
import EventName from "../../event/EventName";
import ListItemBubble from "./ListItemBubble";
import ListItemFacility from "./ListItemFacility";
import SceneControl from "./SceneControl";
import SceneHeroControl from "./SceneHeroControl";
import SurvivorControl from "./SurvivorControl";

const { ccclass, property } = cc._decorator;

@registerClass("WindowFacilityMap", {
    // sceneWindow: {
    //     kind: "main",
    //     openIndex: 0,
    // },
})
@ccclass
export default class WindowFacilityMap extends UIWindow {
    _windowParam: any;
    _returnValue: any;

    static _poolSize: number = 1;

    @autowired(cc.Node) buildContainer: cc.Node = null;
    @autowired(cc.Node) survivorlayer: cc.Node = null;
    @autowired(cc.Node) survivorlayer2: cc.Node = null;
    @autowired(cc.Node) buildlayer: cc.Node = null;
    @autowired(cc.Node) sceneHeroLayer: cc.Node = null;
    @autowired(UIList) bubbleList: UIList<ListItemBubble> = null;

    sceneControl: SceneControl = null;
    survivorControl: SurvivorControl = null;
    sceneHeroControl: SceneHeroControl = null;
    private pathDebug = false;
    private buildNodeMap: { [buildId: number]: ListItemFacility } = {};
    time = null;
    protected onEnable(): void {
        const anim = this.node.getComponent(cc.Animation);
        const s = anim.getAnimationState("DayandNight_Ani");
        anim.play("DayandNight_Ani", (GameDate.gameSeconds() + 540) / 12);
        // GameDate.gameDayProgress() === 6 / 24 && anim.play("DayandNight_Ani", 0);
        // GameDate.gameDayProgress() === 22 / 24 && anim.play("DayandNight_Ani", 40);
        s.speed = 1 / 12;
        // this.time = setInterval(() => {
        //     console.log("anitime-------" + (GameDate.gameSeconds() + 420) / 12);
        //     console.log("seconds-------" + GameDate.gameSeconds());
        // }, 1000);
    }
    // protected onDestroy(): void {
    //     clearInterval(this.time);
    //     this.time = null;
    // }
    protected async onInjected() {
        GWindow.addBlock();
        this.node.zIndex = -1;
        this.node.setPosition(cc.v2());
        this.showPathDebug();
        this.sceneControl = this.addComponent(SceneControl);
        this.survivorControl = this.addComponent(SurvivorControl);
        this.node.getChildByName("nameLabel").children.forEach((l) => {
            const area = Number(l.name);
            const label = l.getComponent(UILabel);
            const tbl = GTable.getList("FacilityTbl").find((t) => t.posId === area);
            if (tbl) {
                label.setText([tbl.name]);
            } else {
                GLog.warn("建筑名称显示 ", area + "对应的建筑不存在");
            }
        });
        let buildNodeMap: { [buildId: number]: ListItemFacility } = {};
        const pList = GTable.getList("FacilityTbl").map(async (t) => {
            const comp = await ResourceLoader.getNode(ListItemFacility);
            comp.setState({ id: t.id });
            this.buildContainer.addChild(comp.node);
            await comp.initFacility();
            buildNodeMap[t.id] = comp;
        });
        await Promise.all(pList);
        this.node.getChildByName("reachPoint").children.forEach((n) => {
            const posId = Number(n.name);
            const id = GTable.getList("FacilityTbl").find((t) => t.posId === posId).id;
            GModel.facility.positionInfo.get(id).pos = [n.x, n.y];
            GModel.facility.positionInfo.get(id).rect = this.node
                .getChildByName("touch")
                .getChildByName(n.name)
                .getBoundingBox();
        });
        this.buildNodeMap = buildNodeMap;
        this.sceneControl.initEvent();
        this.survivorControl.setSurvivorContainer(this.survivorlayer, this.survivorlayer2);
        await this.survivorControl.initSurvivor();
        this.bubbleInit();
        this.sceneHeroControl = this.addComponent(SceneHeroControl);
        this.sceneHeroControl.setContainer(this.sceneHeroLayer);
        await this.sceneHeroControl.initHero();
        GWindow.subBlock();
    }
    @message([EventName.stateKey.facilityStorage, EventName.stateKey.facility])
    bubbleInit() {
        this.bubbleList.setState(
            GModel.facility
                .getAllFacility()
                .filter((f) => f.id !== GConstant.captainId)
                .map((f) => {
                    const posId = GTable.getById("FacilityTbl", f.id).posId;
                    return {
                        id: f.id,
                        position: this.node.getChildByName("bubble").getChildByName(posId.toString()).getPosition(),
                    };
                })
        );
    }
    showPathDebug() {
        if (this.pathDebug) {
            const path = this.node.getChildByName("path");
            const data = path.children.map((n) => {
                return { pos: [n.x, n.y], name: n.name };
            });
            GUtils.array
                .groupToMap(data, (d) => d.name.split("_")[0])
                .forEach((v, k) => {
                    const area = k.split("-").join("|");
                    v.sort((a, b) => {
                        return Number(a.name.split("_")[1]) - Number(b.name.split("_")[1]);
                    });
                    GLog.debug(
                        `scene path debug info [${area}] = ${v
                            .map((d) => `${Math.floor(d.pos[0])},${Math.floor(d.pos[1])}`)
                            .join("|")}`
                    );
                });
        }
    }

    @message([EventName.openFacilityDetail])
    openFacilityDetail(id: number) {
        this.sceneControl.handleOpenFacility(id);
    }

    @message([EventName.addSurvivor])
    addSurvivor(s: Survivor) {
        this.survivorControl.addSurvivor(s);
    }

    @message([EventName.removeSurvivor])
    removeSurvivor(s: Survivor) {
        this.survivorControl.removeSurvivor(s);
    }

    @message([EventName.removeSceneHero])
    removeSceneHero(uniqueId: number) {
        this.sceneHeroControl.removeHero(uniqueId);
    }

    @message([EventName.addSceneHero])
    addSceneHero(uniqueId: number) {
        this.sceneHeroControl.addHero(uniqueId);
    }

    @message([EventName.focusFacility])
    focusFacility(id: number, scaleVal: number = 2) {
        this.sceneControl.focusFacility(id, scaleVal);
    }

    @message([EventName.followSurvivor])
    followSurvivor(uid: number) {
        const node = this.survivorControl.getSurvivorNode(uid);
        this.sceneControl.followNode(node);
    }
}
