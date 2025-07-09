import { autowired, message, registerClass } from "../../../framework/Decorator";
import ResourceLoader from "../../../framework/ResourceLoader";
import UIListItem from "../../../framework/ui/UIListItem";
import UIWindow from "../../../framework/ui/UIWindow";
import { BattleProcessor } from "../../battleLogic/Processor/BattleProcessor";
import BattleSceneControl from "./battleScene/BattleSceneControl";
import BattleSceneDisplay from "./battleScene/BattleSceneDisplay";
import ListItemBattleBullet from "./ListItemBattleBullet";
import ListItemBattleEffectArea from "./ListItemBattleEffectArea";
import ListItemBattleObject from "./ListItemBattleObject";

const { ccclass, property } = cc._decorator;

@registerClass("ListItemBattleScenePvp")
@ccclass
export default class ListItemBattleScenePvp extends UIListItem {
    /** 角色场景 */
    @autowired(cc.Node) scene: cc.Node = null;
    /** 战斗角色容器 */
    @autowired(cc.Node) objectContainer: cc.Node = null;
    /** 生命条容器 */
    @autowired(cc.Node) barContainer: cc.Node = null;
    /** 子弹容器 */
    @autowired(cc.Node) bulletContainer: cc.Node = null;
    /** 掉落物容器 */
    @autowired(cc.Node) dropContainer: cc.Node = null;
    /** 特效容器 */
    @autowired(cc.Node) effectContainer: cc.Node = null;
    /** 效果区域容器 */
    @autowired(cc.Node) areaContainer: cc.Node = null;
    /** 效果区域容器 */
    @autowired(cc.Node) areaContainer2: cc.Node = null;
    /** 伤害文本容器 */
    @autowired(cc.Node) damageTextContainer: cc.Node = null;
    /** 释放主要技能时的黑色遮罩 */
    @autowired(cc.Node) skillMask: cc.Node = null;
    /** 主要技能释放时角色所处于的图层 */
    @autowired(cc.Node) skillObjectContainer: cc.Node = null;
    /** 场景背景 */
    @autowired(cc.Node) sceneBg: cc.Node = null;
    /** 容器 */
    @autowired(cc.Node) content: cc.Node = null;
    /** 前景层 */
    @autowired(cc.Node) front: cc.Node = null;

    /** 这是几号战场 */
    battleSceneIndex = 0;

    /** 角色的map */
    objectMap: Map<number, ListItemBattleObject> = new Map();
    /** 子弹的map */
    bulletMap: Map<number, ListItemBattleBullet> = new Map();
    /** 效果区域的map */
    areaMap: Map<number, ListItemBattleEffectArea> = new Map();

    displayComp: BattleSceneDisplay = null;
    controlComp: BattleSceneControl = null;
    _windowParam: {
        index: number;
        processor: BattleProcessor;
    };
    state: {
        index: number;
        processor: BattleProcessor;
    };
    async setState(state: this["state"]) {
        this.state = state;
        this._windowParam = state;
        this.battleSceneIndex = this.state.index;
        this.controlComp = this.node.addComponent(BattleSceneControl);
        this.controlComp.initEvent(this);
        this.displayComp = this.node.addComponent(BattleSceneDisplay);
        this.displayComp.initDisplay(this);
        this.skillMask.active = false;
        this.node.zIndex = -2;
        await this.loadBg(this.state.processor.mapId);
        GBattleApiManager.beginBattle(this.state.processor, this.battleSceneIndex);
        GBattleApiManager.getBattleStageApi(this.battleSceneIndex)
            .getAllObject()
            .forEach((obj) => {
                this.displayComp.addObject({ obj });
            });
    }

    protected onRecycle(): void {
        this.clearBattle();
    }

    /** 清除战斗 */
    clearBattle() {
        this.displayComp.onClearBattle();
        this.unscheduleAllCallbacks();
        // GBattleApiManager.clearBattle(this.battleSceneIndex);
        this.objectMap.forEach((comp) => {
            comp.recycle();
        });
        this.objectMap.clear();
        this.bulletMap.forEach((comp) => {
            comp.recycle();
        });
        this.bulletMap.clear();
        this.areaMap.forEach((comp) => {
            comp.recycle();
        });
        this.areaMap.clear();
    }
    getGroup() {
        return this.battleSceneIndex >= 2 ? "battle2" : "battle";
    }
    async loadBg(id: number) {
        if (
            this.sceneBg.children.length === 0 ||
            (this.sceneBg.children.length > 0 && this.sceneBg.children[0].name !== img)
        ) {
            const bgPrefab = await ResourceLoader.loadPrefab(img);
            const sceneInfo = GTable.getList("BattleSceneInfoTbl").find((t) => t.prefab === img);
            this.controlComp.setMap(sceneInfo);
            // GAudio.playMusic(sceneInfo.music);
            const bgNode = cc.instantiate(bgPrefab);
            GUtils.ui.setGroup(bgNode, this.getGroup());
            bgNode.getChildByName("map").scale = sceneInfo.scale;
            this.sceneBg.removeAllChildren();
            this.sceneBg.addChild(bgNode);

            const tbl = GTable.getList("BattleSceneInfoTbl").find((t) => t.prefab === img);
            const pList = tbl.towerBase.map(async (d) => {
                let [prefab, xStr, yStr, scaleStr] = d;
                let x = Number(xStr) || 0;
                let y = Number(yStr) || 0;
                let scale = Number(scaleStr) || 1;
                const towerBase = await ResourceLoader.loadPrefab(prefab);
                const towerBaseNode = cc.instantiate(towerBase);
                GUtils.ui.setGroup(towerBaseNode, this.getGroup());
                towerBaseNode.parent = bgNode;
                towerBaseNode.setPosition(cc.v2(x, y));
                towerBaseNode.scale = scale;
            });
            await Promise.all(pList);
        }
    }

    tick() {
        const api = GBattleApiManager.getBattleStageApi(this.battleSceneIndex);
        this.objectMap.forEach((comp) => {
            comp.refresh();
        });
        this.bulletMap.forEach((comp) => {
            comp.refresh();
        });
        this.areaMap.forEach((comp) => {
            comp.refresh();
        });
        const eventList = api.getAndClearDisplayEvent();
        eventList.forEach((e) => {
            GBattleApiManager.displayApi[this.battleSceneIndex][e.eventType](e.data);
        });
    }

    protected update(dt: number) {
        if (this.displayComp) this.displayComp.nextDamageText();
    }
}
