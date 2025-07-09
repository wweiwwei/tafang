import ResourceLoader from "../../framework/ResourceLoader";
import EventBus from "../../framework/event/EventBus";
import { ConfigPool } from "../../framework/table/GTable";
import HotUpdateHelper from "../../framework/version/HotUpdateHelper";
import EventName from "../event/EventName";
import WindowLoadScene from "../module/loading/WindowLoadScene";
import { ChatServerManager } from "../server/ChatServer";

const { ccclass, property } = cc._decorator;

@ccclass
export default class LoadScene extends cc.Component {
    @property(cc.Asset) wssCacert: cc.Asset = null;
    async onLoad() {
        this.initGlobal();
        ResourceLoader.internalResource.wssCacert = this.wssCacert;
        cc.game.setFrameRate(60);
        const node = new cc.Node();
        node.addComponent(PermanentNode);
        node.name = "PermanentNode";
        node.parent = cc.director.getScene();
        // 初始化资源列表
        GLog.debug("init resource list");
        await ResourceLoader.init();
        GLog.debug("init resource list end");
        GWindow.open(WindowLoadScene);
        // 初始化sdk
        await GSDK.sdkInit();
        // sdk登录;
        await GSDK.sdkLogin();
        // http登录
        GLog.debug("http login");
        await HttpServer.login();
        EventBus.emit(EventName.refreshUserId);
        GLog.debug("http login end");
        // 热更新，如果发生了热更新则会重启游戏
        await HotUpdateHelper.updateGameResources();
        // // 多语言更新
        // await HotUpdateHelper.updateLangTable();
        // 表热更
        await HotUpdateHelper.updateGameTable();
        EventBus.emit(EventName.hideLoadProgress);
        await HttpServer.selectServer();
        EventBus.emit(EventName.refreshUserId);
        await GServer.login();
        GModel.init();
        if (HttpServer.newRole) {
            GSDK.report({
                kind: "newRole",
                data: {},
            });
        }
        GSDK.report({
            kind: "roleLogin",
            data: {},
        });
        EventBus.emit(EventName.setLoadProgress, [GLang.code.ui.loading_load_resource], 0);
        if (!CC_PREVIEW) await ResourceLoader.preload();
        if (CC_PREVIEW && GModel.localStorage.testPreload) await ResourceLoader.preload();
        await GWindow.clear();
        cc.director.loadScene("GameScene");
    }

    initGlobal() {
        if (!window["GTable"]) window["GTable"] = new ConfigPool();
        if (!window["ChatServer"]) window["ChatServer"] = new ChatServerManager();
    }
}

class PermanentNode extends cc.Component {
    onLoad() {
        cc.game.addPersistRootNode(this.node);
    }

    private _fixedUpdateInterval = 1 / 60;
    private _fixedUpdateTotal: number = 0;
    private _updateTotal: number = 0;

    fixedUpdate() {
        // GModel.battle.tickOffLineBattle();
    }

    protected update(dt: number): void {
        GState.updatedStampOffset += Math.round(dt * 1000);
        if (GServer.wsLive) {
            GState.totalOnlineTime += dt;
            GState.thisLinkOnlineTime += dt;
        }
        GTip.check();
        this._updateTotal += dt;
        while (this._updateTotal - this._fixedUpdateTotal >= this._fixedUpdateInterval) {
            this._fixedUpdateTotal += this._fixedUpdateInterval;
            this.fixedUpdate();
        }
    }
}
declare global {
    /** 游戏表格 */
    const GTable: ConfigPool;
    /** 聊天服务器 */
    const ChatServer: ChatServerManager;
}
