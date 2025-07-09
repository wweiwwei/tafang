import { BaseGameServerNotify, GameErrorInfo, GameServerApi } from "./GApi";
import WindowCommonConfirm from "../module/common/WindowCommonConfirm";
import ResourceLoader from "../../framework/ResourceLoader";

export class GServer {
    private ws: WebSocket;
    private cbMap: Map<number, Function> = new Map();

    private _requstId = 1;
    private wsOpenTime: number = 0;
    private wsTotalDowloadLength: number = 0;
    private wsTotalUploadLength: number = 0;
    private wsUri: string = "";
    /** 重连是否失败（可能已停服或者异地登录，不再重连） */
    private linkFail: boolean = false;

    apiVersion: number = 0;
    /** 连接是否存活 */
    wsLive = false;

    private wsInfo() {
        return `ws open:${Math.round((Date.now() - this.wsOpenTime) / 1000)}s wsTotalUploadLength:${
            this.wsTotalUploadLength / 1024
        }kb  wsTotalDowloadLength:${this.wsTotalDowloadLength / 1024}kb`;
    }

    constructor() {
        // 构建GApi
        const p1 = new Proxy(
            {},
            {
                get: (target, path1, receiver) => {
                    const p2 = new Proxy(
                        {},
                        {
                            get: (target, path2, receiver) => {
                                return (param: any, option: any = {}) => {
                                    // @ts-ignore
                                    return this.request(`${path1}/${path2}`, param, option);
                                };
                            },
                        }
                    );
                    return p2;
                },
            }
        );
        window["GApi"] = p1;
    }

    /** 登录 */
    async login() {
        GLog.debug("游戏服务器登录", HttpServer.gameServerUrl);
        await this.initGameServerConnection(HttpServer.gameServerUrl);
        GLog.debug("游戏服务器登录成功");
    }

    private async initGameServerConnection(gameServerUrl: string) {
        GLog.debug(`game server link init url ${gameServerUrl}`);
        await this.initWebSocket(gameServerUrl);
        await this.initCache();
    }

    private initWebSocket(wsUri: string) {
        return new Promise<void>((resolve, reject) => {
            this.wsUri = wsUri;
            if ((cc.sys.isNative && cc.sys.os === cc.sys.OS_ANDROID) || (cc.sys.isNative && CC_PREVIEW)) {
                // @ts-ignore
                this.ws = new WebSocket(wsUri, [], ResourceLoader.internalResource.wssCacert.nativeUrl);
            } else {
                this.ws = new WebSocket(wsUri);
            }
            this.ws.onopen = (evt) => {
                this.wsOpenTime = Date.now();
                this.wsTotalDowloadLength = 0;
                this.wsTotalUploadLength = 0;
                this.wsLive = true;
                GLog.debug(`game server link inited url: ${wsUri}`);
                resolve();
            };
            this.ws.onclose = async (evt) => {
                this.wsLive = false;
                if (this.linkFail) return;
                GLog.debug("game server link closed", evt);
                try {
                    await this.initWebSocket(this.wsUri);
                } catch (e) {
                    this.linkFail = true;
                    const ok = await GWindow.open(WindowCommonConfirm, { tip: [GLang.code.ui.ws_close], zIndex: 100 });
                    if (ok) {
                        GUtils.game.restart();
                    } else {
                        cc.game.end();
                    }
                }
            };
            this.ws.onmessage = (evt) => {
                // GLog.debug('game server link message', evt.data);
                this.wsTotalDowloadLength += evt.data.length;
                const data = JSON.parse(GUtils.secure.Base64Decode(evt.data));
                if (data.path !== "time") GLog.debug("game server link message", data);
                if (data.requestId) {
                    // 由客户端请求服务器返回的数据
                    const cb = this.cbMap.get(data.requestId);
                    if (cb) {
                        this.cbMap.delete(data.requestId);
                        cb(data);
                    } else {
                        GLog.error(`game server link requestId:${data.requestId} callback not found`);
                    }
                } else {
                    // 服务器主动发送的数据
                    this.handleServerMessage(data);
                }
            };
            this.ws.onerror = (evt) => {
                GLog.error("game server link error", evt);
                reject();
            };
            return this.ws;
        });
    }

    private handleServerMessage(m: BaseGameServerNotify) {
        // 处理服务器主动发送的数据
        if (m.kind === "cache") {
            // 如果是缓存刷新，默认是部分刷新
            GState.handleUpdateMessage(m);
        } else if (m.kind === "error") {
            GTip.showTip(["_rs" + m.data.msg]);
        }
    }

    /**
     * 向服务器发起请求
     *  @param path 请求的路由
     *  @param param 请求的参数
     * */
    request(path: string, param: any): Promise<any> {
        return new Promise((resolve, reject) => {
            const requestId = this._requstId++;
            const begin = Date.now();
            this.cbMap.set(requestId, (data: any) => {
                if (data.errInfo.code == 0) {
                    GLog.debug(`ws delay:${Date.now() - begin}ms requestId:${requestId} path:${path}`, data);
                    resolve(data.data);
                } else {
                    GLog.debug("ws reject:" + data.errInfo.msg);
                    GTip.showTip(["_rs" + data.errInfo.msg]);
                    reject(data.errInfo);
                }
            });
            // todo 加密信息
            const msg = JSON.stringify({ path, requestId, param });
            GLog.debug("game server link send message", msg);
            this.wsTotalUploadLength += msg.length;
            this.ws.send(GUtils.secure.Base64Encode(msg));
        });
    }

    initCache() {
        return new Promise(async (resolve, reject) => {
            GApi.game.initCache({ key: Object.keys(GState.data) }).then((initConfig) => {
                if (initConfig) {
                    this.apiVersion = initConfig.apiVersion;
                }
            });
            GState.waitInitCache(resolve);
        });
    }
}
declare global {
    /** 游戏服务器通讯模块 */
    const GServer: GServer;
    /** 游戏服务器接口 */
    const GApi: GameServerApi;
}
window["GServer"] = new GServer();
