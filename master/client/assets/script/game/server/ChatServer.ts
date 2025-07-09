import ResourceLoader from "../../framework/ResourceLoader";
import { GameDate } from "../../framework/date/GameDate";
import { DateUtil } from "../../framework/utils/DateUtils";

export class ChatServerManager {
    private ws: WebSocket;
    private wsOpenTime: number = 0;
    private wsTotalDowloadLength: number = 0;
    private wsTotalUploadLength: number = 0;
    private wsUri: string = "";
    /** 连接是否存活 */
    wsLive = false;
    /** 重连是否失败（可能已停服或者异地登录，不再重连） */
    private linkFail: boolean = false;
    /** 发送到世界频道 */
    sendWorld(msg: string) {
        if (this.wsLive) {
            this.ws.send(JSON.stringify({ kind: 1, msg }));
        } else {
            GTip.showTip(["_rs连接已断开"]);
        }
    }

    lastMsgStamp: number = 0;

    /** 发送私聊 */
    sendPrivate(roleId: number, msg: string) {
        if (this.wsLive) {
            this.ws.send(JSON.stringify({ kind: 2, roleId, msg }));
        } else {
            GTip.showTip(["_rs连接已断开"]);
        }
    }

    async login() {
        const url = HttpServer.getChatServerUrl();
        GLog.debug("聊天服务器登录", url);
        await this.initWebSocket(url);
        this.lastMsgStamp = GameDate.now();
        this.fetchHistoryMessage();
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
                GLog.debug(`chat server link inited url: ${wsUri}`);
                resolve();
            };
            this.ws.onclose = async (evt) => {
                this.wsLive = false;
                if (this.linkFail) return;
                GLog.debug("chat server link closed", evt);
                try {
                    await this.initWebSocket(this.wsUri);
                    this.fetchMessageByTime(this.lastMsgStamp, GameDate.now() + GameDate.OneWeek);
                } catch (e) {
                    this.linkFail = true;
                }
            };
            this.ws.onmessage = (evt) => {
                // GLog.debug('chat server link message', evt.data);
                this.wsTotalDowloadLength += evt.data.length;
                // 心跳包
                if (evt.data === "k") return;
                const data = JSON.parse(evt.data);
                GLog.debug("chat server link message", data);
                this.lastMsgStamp = GameDate.now();
                GModel.chat.onChatMessage(data);
            };
            this.ws.onerror = (evt) => {
                GLog.error("chat server link error", evt);
                reject();
            };
            return this.ws;
        });
    }

    private fetchHistoryMessage() {
        if (this.wsLive) {
            this.ws.send(JSON.stringify({ kind: 102 }));
        }
    }

    private fetchMessageByTime(begin: number, end: number) {
        if (this.wsLive) {
            this.ws.send(JSON.stringify({ kind: 101, begin, end }));
        }
    }

    deletePrivateChat(roleId: number) {
        if (this.wsLive) {
            this.ws.send(JSON.stringify({ kind: 103, roleId }));
        }
    }
}
