import ResourceLoader from "../../framework/ResourceLoader";

export class RoomServer {
    private ws: WebSocket;

    private wsOpenTime: number = 0;
    private wsTotalDowloadLength: number = 0;
    private wsTotalUploadLength: number = 0;
    private wsUri: string = "";
    // /** 重连是否失败（可能已停服或者异地登录，不再重连） */
    // private linkFail: boolean = false;

    apiVersion: number = 0;
    /** 连接是否存活 */
    wsLive = false;

    private wsInfo() {
        return `ws open:${Math.round((Date.now() - this.wsOpenTime) / 1000)}s wsTotalUploadLength:${
            this.wsTotalUploadLength / 1024
        }kb  wsTotalDowloadLength:${this.wsTotalDowloadLength / 1024}kb`;
    }

    async login() {
        const url = "ws://127.0.0.1:8080";
        GLog.debug("房间服务器登录", url);
        await this.initWebSocket(url);
    }

    private initWebSocket(wsUri: string) {
        return new Promise<void>((resolve, reject) => {
            this.wsUri = wsUri;
            if (cc.sys.isNative && cc.sys.os === cc.sys.OS_ANDROID) {
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
                GLog.debug(`room server link inited url: ${wsUri}`);
                resolve();
            };
            this.ws.onclose = async (evt) => {
                reject();
                this.wsLive = false;
                GLog.debug("room server link closed", evt);
                // if (this.linkFail) return;
                // try {
                //     await this.initWebSocket(this.wsUri);
                // } catch (e) {
                //     this.linkFail = true;
                // }
            };
            this.ws.onmessage = (evt) => {
                // GLog.debug('chat server link message', evt.data);
                this.wsTotalDowloadLength += evt.data.length;
                // 心跳包
                if (evt.data === "k") return;
                const data = JSON.parse(evt.data);
                GLog.verbose("room server link message", data);
                if (data.kind === "match") {
                    this.matchInfo = data.data;
                    if (this.waitMatchResolve) this.waitMatchResolve();
                } else if (data.kind === "command") {
                    this.commandList.push(data.data);
                    this.latestFrame = data.data.frame;
                }
            };
            this.ws.onerror = (evt) => {
                GLog.error("room server link error", evt);
                reject();
            };
            return this.ws;
        });
    }

    send(msg: string) {
        if (this.wsLive) {
            this.ws.send(msg);
        }
    }
    private matchInfo: {
        yourTeam: {
            roldId: number;
            index: number;
            info: string;
        };
        otherTeam: {
            roleId: number;
            index: number;
            info: string;
        };
        seed: number;
    };
    private commandList: {
        frame: number;
        command: string[];
    }[] = [];
    private latestFrame = -1;

    private waitMatchResolve: (() => void) | null = null;

    waitMatch(): Promise<void> {
        return new Promise((resolve, reject) => {
            if (this.matchInfo) {
                resolve();
            } else {
                this.waitMatchResolve = resolve;
            }
        });
    }

    getMatchInfo() {
        return this.matchInfo;
    }

    close() {
        try {
            this.ws.close();
        } catch {}
    }
    isFrameReady(frame: number) {
        return this.latestFrame >= frame;
    }
    getCommandList(index: number, frame: number): string {
        return this.commandList[frame].command[index];
    }
}
declare global {
    /** 游戏服务器通讯模块 */
    const RoomServer: RoomServer;
}
window["RoomServer"] = new RoomServer();
