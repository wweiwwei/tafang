import EventBus from "../../framework/event/EventBus";
import { FriendInfo } from "../entity/FriendInfo";
import { PlayerChatMessage } from "../entity/PlayerChatMessage";
import EventName from "../event/EventName";

export class ChatModel {
    private _worldCache: PlayerChatMessage[] = [];
    private _privateCache: { [role: number]: PlayerChatMessage[] } = {};

    /** 发送到世界频道 */
    async sendWorld(msg: string) {
        const ok = await GSDK.msgCheck(msg);
        if (ok) {
            ChatServer.sendWorld(msg);
        } else {
            GTip.showTip(["_rs含有违规内容"]);
        }
    }
    /** 发送私聊 */
    async sendPrivate(roldId: number, msg: string) {
        const ok = await GSDK.msgCheck(msg);
        if (ok) {
            ChatServer.sendPrivate(roldId, msg);
        } else {
            GTip.showTip(["_rs含有违规内容"]);
        }
    }
    /** 删除私聊记录 */
    deletePrivateChat(roleId: number) {
        ChatServer.deletePrivateChat(roleId);
        delete this._privateCache[roleId];
    }
    /** 获取世界聊天信息 */
    async getWorldMessage(): Promise<{ data: PlayerChatMessage; info: FriendInfo }[]> {
        const infos = await GModel.friend.getRoleInfo(this._worldCache.map((x) => x.roleId));
        return this._worldCache.map((x, i) => {
            return {
                data: x,
                info: infos[i],
            };
        });
    }
    /** 获取私聊信息
     * @param channel 私聊频道，也就是目标玩家的id
     */
    async getPrivateMessage(channel: number): Promise<{ data: PlayerChatMessage; info: FriendInfo }[]> {
        if (!this._privateCache[channel]) return [];
        const infos = await GModel.friend.getRoleInfo(this._privateCache[channel].map((x) => x.roleId));
        return this._privateCache[channel].map((x, i) => {
            return {
                data: x,
                info: infos[i],
            };
        });
    }
    /** 私聊列表，另外有最后一条信息的记录，按照最后一条消息的时间排序 */
    async getPrivateList(): Promise<{ info: FriendInfo; lastMsg: PlayerChatMessage }[]> {
        const infos = await GModel.friend.getRoleInfo(Object.keys(this._privateCache).map((x) => Number(x)));
        const res = Object.keys(this._privateCache).map((x, i) => {
            return {
                info: infos[i],
                lastMsg: this._privateCache[x][this._privateCache[x].length - 1],
            };
        });
        res.sort((a, b) => {
            return b.lastMsg.time - a.lastMsg.time;
        });
        return res;
    }

    /** 收到信息时的通知 */
    async onChatMessage(data: { kind: number; channel?: number; data: PlayerChatMessage }) {
        const blackList = GModel.friend.getFriendState().blackList;
        if (blackList.includes(data.data.roleId)) {
            return;
        }
        if (data.kind === 1) {
            // 世界聊天
            if (this._worldCache.some((d) => d.uuid === data.data.uuid)) {
                return;
            }
            const info = await GModel.friend.getRoleInfo([data.data.roleId]);
            this._worldCache.push(data.data);
            if (this._worldCache.length > 300) {
                this._worldCache = this._worldCache.slice(100);
            }
            EventBus.emit(EventName.receiveWorldMsg, { data: data.data, info: info[0] });
        } else if (data.kind === 2) {
            // 私聊
            const info = await GModel.friend.getRoleInfo([data.data.roleId]);
            if (!this._privateCache[data.channel]) {
                this._privateCache[data.channel] = [];
            }
            if (this._privateCache[data.channel].some((d) => d.uuid === data.data.uuid)) {
                return;
            }
            this._privateCache[data.channel].push(data.data);
            EventBus.emit(EventName.receivePrivateMsg, { data: data.data, info: info[0] }, data.channel);
        } else if (data.kind === -1) {
            // 错误信息
            GTip.showTip(["_rs" + data.data.msg]);
        }
    }
}
