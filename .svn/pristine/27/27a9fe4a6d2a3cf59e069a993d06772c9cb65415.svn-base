import WindowCommonTip from "../../module/common/WindowCommonTip";
import BaseSDK from "../base/BaseSDK";
import MiniGameSdkShared from "../shared/MiniGameSdkShared";
import { SdkReportEventName, VideoTypeText } from "../shared/SdkReportEventName";

export default class ZSWechatSDK extends BaseSDK {
    isTest: boolean = false;
    sdkInit(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            MiniGameSdkShared.registWxShareFunc();
            GLog.debug("ZSWechatSDK init");
            wx.ZSOpenCore.getInitData({
                success: (res) => {
                    this.initData = res;
                    GLog.debug("ZSWechatSDK getInitData success", res);
                    GLog.debug("ZSWechatSDK getInitData success json: ", JSON.stringify(res));
                    //res为回调成功返回的数据
                    const device = this.initData.terminalType == 3 ? 8 : this.initData.terminalType;
                    const initParam = {
                        env: "jjww",
                        appKey: this.param.Appkey,
                        appSecret: this.param.Appsecrect,
                        channelNo: this.param.ChannelNo,
                        packageNo: this.param.PackageNo,
                        ip: this.initData.ip,
                        osVersion: this.initData.osVersion,
                        networkState: this.initData.networkState,
                        wifiName: this.initData.wifiName,
                        terminalType: this.initData.terminalType,
                        appVersion: this.initData.appVersion,
                        device,
                        platformPublickey: this.param.PlatformPublickey,
                        packageName: this.param.PackageName,
                    };
                    GLog.debug("ZSWechatSDK init param", JSON.stringify(initParam));
                    wx.ZSOpenCore.init(initParam);
                },
                fail: (err) => {
                    GLog.debug("ZSWechatSDK getInitData fail", err);
                    GWindow.open(WindowCommonTip, { tip: ["_rsSDK初始化失败"] });
                    //err为回调失败返回的数据
                },
            });

            wx.ZSOpenCore.ready(() => {
                GLog.debug("ZSWechatSDK ready");
                resolve();
            });
        });
    }
    async report(data: SdkReportEventName) {
        switch (data.kind) {
            case "captainRank":
            case "vipLv":
            case "showVideo":
            case "showVideoSuccess":
            case "showVideoFail":
            case "guide":
            case "wechatShareApp":
            case "wechatShareTimeLine":
                this.handleOtherEventReport(data);
                break;
            case "mainStage":
                this.handlePlayEventReport(data);
                break;
            case "login":
                if (this.loginData.data.isregist === "true") {
                    this.handleRegisterReport();
                }
                break;
            case "sdkInit":
            case "sdkLogin":
            case "loadResource":
            case "enterMainScene":
                this.handleActiveReport(data);
                break;
            case "roleLogin":
                this.handleLoginReport();
                break;
            case "newRole":
                this.handleRegisterRoleReport();
                break;
            case "payItemReceive":
                const { cpOrderNO } = await HttpServer.request("game/zsCpOrderId", { orderId: data.data.orderId });
                GLog.debug(`ZSWechatSDK payItemReceive cpOrderNO:${cpOrderNO} orderId:${data.data.orderId}`);
                this.handlePayReport(2, data.data.itemId, cpOrderNO);
                break;
        }
    }

    private async handlePlayEventReport(data: SdkReportEventName) {
        if (data.kind === "mainStage") {
            const playEventParam = {
                url: this.param.url,
                sign: this.param.sign,
                eventName: "task",
                properties: {
                    open_id: this.loginData.data.openid,
                    user_id: this.getPlayerIdString(),
                    role_id: this.getRoleIdString(),
                    lv_name: "草原任务",
                    lv: data.data.stageIndex.toString(),
                    server_id: HttpServer.gameServerCode,
                    server_name: HttpServer.gameServerName,
                    channelsub_id: this.param.PackageNo,
                    recordtime: Math.round(Date.now() / 1000),
                },
            };
            GLog.debug("ZSWechatSDK playEvent", playEventParam);
            GLog.debug("ZSWechatSDK playEvent json:", JSON.stringify(playEventParam));
            wx.ZSOpenCore.playEvent({
                ...playEventParam,
                success: (res) => {
                    GLog.debug("ZSWechatSDK playEvent success", res);
                },
                fail: (err) => {
                    GLog.debug("ZSWechatSDK playEvent fail", err);
                },
            });
        }
    }

    private async handleActiveReport(data: SdkReportEventName) {
        let osarr = ["Android", "IOS", "pc"];
        let idfa =
            this.initData.terminalType && this.initData.terminalType === 1
                ? null
                : "00D5BA84-EF0F-4886-9CC2-3EF0DCD43A08";
        let os = osarr[this.initData.terminalType - 1];
        const scene_id = wx.getLaunchOptionsSync().scene;
        GLog.debug("ZSWechatSDK getSceneId", scene_id);
        const report = (node_id: string) => {
            const activeEventParam = {
                url: this.param.url,
                sign: this.param.sign,
                properties: {
                    device_id: this.initData.machineCode,
                    node_id,
                    device_type: this.initData.machineModel,
                    os: os,
                    os_version: this.initData.osVersion,
                    ip: this.initData.ip,
                    wifi_name: this.initData.wifiName,
                    imei: this.initData.imei,
                    oaid: this.initData.oaidCode,
                    idfa: idfa,
                    server_id: HttpServer.gameServerCode || 0,
                    server_name: HttpServer.gameServerName,
                    channelsub_id: this.param.PackageNo,
                    extra_data: JSON.stringify({ scene_id: scene_id }),
                    recordtime: Math.round(Date.now() / 1000),
                },
            };
            GLog.debug("ZSWechatSDK activeEvent", activeEventParam);
            GLog.debug("ZSWechatSDK activeEvent json:", JSON.stringify(activeEventParam));
            wx.ZSOpenCore.activeEvent({
                ...activeEventParam,
                success: (res) => {
                    GLog.debug("ZSWechatSDK activeEvent success", res);
                },
                fail: (err) => {
                    GLog.debug("ZSWechatSDK activeEvent fail", err);
                },
            });
        };
        if (data.kind === "sdkInit") {
            report("1-启动");
            report("10-登录页加载资源开始");
            report("11-登录页加载资源达到50%");
            report("12-登录页加载资源达到100%");
            report("50-进入登录页");
            report("60-点击授权");
            report("70-初始化登录");
        } else if (data.kind === "loadResource") {
            if (data.data.percent === 0) {
                report("80-进入游戏加载资源开始");
            } else if (data.data.percent === 50) {
                report("81-进入游戏加载资源达到50%");
            } else if (data.data.percent === 100) {
                report("82-进入游戏加载资源达到100%");
            }
        } else if (data.kind === "enterMainScene") {
            report("100-登录成功进入游戏");
        }
    }

    private async handleRegisterReport() {
        let osarr = ["Android", "IOS", "pc"];
        let idfa =
            this.initData.terminalType && this.initData.terminalType === 1
                ? null
                : "00D5BA84-EF0F-4886-9CC2-3EF0DCD43A08";
        let os = osarr[this.initData.terminalType - 1];
        const scene_id = wx.getLaunchOptionsSync().scene;
        const registerEventParam = {
            url: this.param.url,
            sign: this.param.sign,
            properties: {
                open_id: this.loginData.data.openid,
                user_id: this.getPlayerIdString(),
                device_id: this.initData.machineCode,
                device_type: this.initData.machineModel,
                os: os,
                os_version: this.initData.osVersion,
                ip: this.initData.ip,
                wifi_name: this.initData.wifiName,
                imei: this.initData.imei,
                oaid: this.initData.oaidCode,
                idfa: idfa,
                server_id: HttpServer.gameServerCode || 0,
                server_name: HttpServer.gameServerName,
                channelsub_id: this.param.PackageNo,
                extra_data: JSON.stringify({ scene_id: scene_id }),
                recordtime: Math.round(Date.now() / 1000),
            },
        };
        GLog.debug("ZSWechatSDK registerEvent", registerEventParam);
        GLog.debug("ZSWechatSDK registerEvent json:", JSON.stringify(registerEventParam));
        wx.ZSOpenCore.registerReport({
            success: (res) => {
                GLog.debug("ZSWechatSDK registerReport success", res);
            },
            fail: (err) => {
                GLog.debug("ZSWechatSDK registerReport fail", err);
            },
        });
        wx.ZSOpenCore.registerEvent({
            ...registerEventParam,
            success: (res) => {
                GLog.debug("ZSWechatSDK registerEvent success", res);
            },
            fail: (err) => {
                GLog.debug("ZSWechatSDK registerEvent fail", err);
            },
        });
    }
    private async handleRegisterRoleReport() {
        let osarr = ["Android", "IOS", "pc"];
        let idfa =
            this.initData.terminalType && this.initData.terminalType === 1
                ? null
                : "00D5BA84-EF0F-4886-9CC2-3EF0DCD43A08";
        let os = osarr[this.initData.terminalType - 1];
        const scene_id = wx.getLaunchOptionsSync().scene;
        const roleRegisterEventParam = {
            url: this.param.url,
            sign: this.param.sign,
            properties: {
                open_id: this.loginData.data.openid,
                user_id: this.getPlayerIdString(),
                role_id: this.getRoleIdString(),
                device_id: this.initData.machineCode,
                device_type: this.initData.machineModel,
                os: os,
                os_version: this.initData.osVersion,
                ip: this.initData.ip,
                wifi_name: this.initData.wifiName,
                imei: this.initData.imei,
                oaid: this.initData.oaidCode,
                idfa: idfa,
                server_id: HttpServer.gameServerCode || 0,
                server_name: HttpServer.gameServerName,
                channelsub_id: this.param.PackageNo,
                extra_data: JSON.stringify({ scene_id: scene_id }),
                recordtime: Math.round(Date.now() / 1000),
            },
        };
        GLog.debug("ZSWechatSDK roleRegisterEvent", roleRegisterEventParam);
        GLog.debug("ZSWechatSDK roleRegisterEvent json:", JSON.stringify(roleRegisterEventParam));
        wx.ZSOpenCore.roleRegisterEvent({
            ...roleRegisterEventParam,
            success: (res) => {
                GLog.debug("ZSWechatSDK roleRegisterEvent success", res);
            },
            fail: (err) => {
                GLog.debug("ZSWechatSDK roleRegisterEvent fail", err);
            },
        });
    }

    private getPlayerIdString() {
        return HttpServer.playerInfo.playerId && HttpServer.playerInfo.playerId.toString();
    }
    private getRoleIdString() {
        return HttpServer.roleId && HttpServer.roleId.toString();
    }
    private async handleLoginReport() {
        let osarr = ["Android", "IOS", "pc"];
        let idfa =
            this.initData.terminalType && this.initData.terminalType === 1
                ? null
                : "00D5BA84-EF0F-4886-9CC2-3EF0DCD43A08";
        let os = osarr[this.initData.terminalType - 1];
        const scene_id = wx.getLaunchOptionsSync().scene;
        const loginEventParam = {
            url: this.param.url,
            sign: this.param.sign,
            properties: {
                open_id: this.loginData.data.openid,
                user_id: this.getPlayerIdString(),
                role_id: this.getRoleIdString(),
                device_id: this.initData.machineCode,
                device_type: this.initData.machineModel,
                os: os,
                os_version: this.initData.osVersion,
                ip: this.initData.ip,
                wifi_name: this.initData.wifiName,
                imei: this.initData.imei,
                oaid: this.initData.oaidCode,
                idfa: idfa,
                server_id: HttpServer.gameServerCode || 0,
                server_name: HttpServer.gameServerName,
                channelsub_id: this.param.PackageNo,
                extra_data: JSON.stringify({ scene_id: scene_id }),
                recordtime: Math.round(Date.now() / 1000),
            },
        };
        GLog.debug("ZSWechatSDK loginEvent", loginEventParam);
        GLog.debug("ZSWechatSDK loginEvent json:", JSON.stringify(loginEventParam));
        wx.ZSOpenCore.loginEvent({
            ...loginEventParam,
            success: (res) => {
                GLog.debug("ZSWechatSDK loginEvent success", res);
            },
            fail: (err) => {
                GLog.debug("ZSWechatSDK loginEvent fail", err);
            },
        });
    }
    private async handlePayReport(status: number, itemId: number, order_id: string) {
        const tbl = GTable.getById("ChargeTbl", itemId);
        let idfa =
            this.initData.terminalType && this.initData.terminalType === 1
                ? null
                : "00D5BA84-EF0F-4886-9CC2-3EF0DCD43A08";
        const payEventParam = {
            url: this.param.url,
            sign: this.param.sign,
            properties: {
                order_id,
                open_id: this.loginData.data.openid,
                user_id: this.getPlayerIdString(),
                role_id: this.getRoleIdString(),
                goods_id: itemId.toString(),
                goods_name: GLang.getText(tbl.name),
                pay_amt: tbl.cny,
                order_status: status,
                device_id: this.initData.machineCode,
                ip: this.initData.ip,
                imei: this.initData.imei,
                oaid: this.initData.oaidCode,
                idfa: idfa,
                server_id: HttpServer.gameServerCode || 0,
                server_name: HttpServer.gameServerName,
                channelsub_id: this.param.PackageNo,
                recordtime: Math.round(Date.now() / 1000),
            },
        };
        GLog.debug("ZSWechatSDK payEvent", payEventParam);
        GLog.debug("ZSWechatSDK payEvent json:", JSON.stringify(payEventParam));
        wx.ZSOpenCore.payEvent({
            ...payEventParam,
            success: (res) => {
                GLog.debug("ZSWechatSDK payEvent success", res);
            },
            fail: (err) => {
                GLog.debug("ZSWechatSDK payEvent fail", err);
            },
        });
    }

    private async handleOtherEventReport(
        data:
            | SdkReportEventName
            | { kind: "online_platform" }
            | { kind: "onHide" }
            | { kind: "video1"; data: { videoType: string } }
    ) {
        let properties: {};
        let eventName: string;
        switch (data.kind) {
            case "captainRank":
                properties = {
                    open_id: this.loginData.data.openid,
                    user_id: this.getPlayerIdString(),
                    role_id: this.getRoleIdString(),
                    lv: data.data.lv.toString(),
                };
                eventName = "role_lv";
                break;
            case "vipLv":
                properties = {
                    open_id: this.loginData.data.openid,
                    user_id: this.getPlayerIdString(),
                    lv: data.data.lv.toString(),
                };
                eventName = "vip_lv";
                break;
            case "onHide":
                properties = {
                    open_id: this.loginData.data.openid,
                    user_id: this.getPlayerIdString(),
                    role_id: this.getRoleIdString(),
                    duration: Math.round(GState.thisLinkOnlineTime),
                };
                // 重置掉
                GState.thisLinkOnlineTime = 0;
                eventName = "logout";
                break;
            case "online_platform":
                const online = await GApi.game.onlineCount();
                properties = {
                    online,
                };
                eventName = "online_platform";
                break;
            case "showVideo":
            case "showVideoSuccess":
            case "showVideoFail":
            case "video1":
                if (this.param.adUnitId) {
                    const recordMap = {
                        showVideo: 0,
                        showVideoSuccess: 2,
                        video1: 1,
                        showVideoFail: 3,
                    };
                    if (data.kind === "showVideo") {
                        this.handleOtherEventReport({ ...data, kind: "video1" });
                    }
                    // todo ad_unit_id需要等广告功能开通之后才有
                    properties = {
                        user_id: this.getPlayerIdString(),
                        open_id: this.loginData.data.openid,
                        role_id: this.getRoleIdString(),
                        ad_unit_id: this.param.adUnitId,
                        ad_unit_name: VideoTypeText[data.data.videoType] || data.data.videoType,
                        record_type: recordMap[data.kind],
                    };
                    eventName = "ad";
                }
                break;
            case "wechatShareApp":
            case "wechatShareTimeLine":
                const dataMap = {
                    wechatShareApp: {
                        share_id: 1,
                        share_name: "转发",
                    },
                    wechatShareTimeLine: {
                        share_id: 2,
                        share_name: "分享到朋友圈",
                    },
                };
                properties = {
                    user_id: this.getPlayerIdString(),
                    open_id: this.loginData.data.openid,
                    role_id: this.getRoleIdString(),
                    ...dataMap[data.kind],
                };
                eventName = "share";
                break;
            case "guide":
                properties = {
                    user_id: this.getPlayerIdString(),
                    open_id: this.loginData.data.openid,
                    role_id: this.getRoleIdString(),
                    interface_name: "新手引导",
                    event_name: GLang.getText(GTable.getById("GuideContentTbl", data.data.guideId).content),
                    extra_data: JSON.stringify({ interface_id: 1, event_id: data.data.guideId }),
                };
                eventName = "click";
                break;
        }
        const otherEventParam = {
            url: this.param.url,
            sign: this.param.sign,
            eventName: eventName,
            properties: {
                ...properties,
                server_id: HttpServer.gameServerCode || 0,
                server_name: HttpServer.gameServerName,
                channelsub_id: this.param.PackageNo,
                recordtime: Math.round(Date.now() / 1000),
            },
        };
        GLog.debug("ZSWechatSDK otherEvent", otherEventParam);
        GLog.debug("ZSWechatSDK otherEvent json:", JSON.stringify(otherEventParam));
        wx.ZSOpenCore.otherEvent({
            ...otherEventParam,
            success: (res) => {
                GLog.debug("ZSWechatSDK otherEvent success", res);
            },
            fail: (err) => {
                GLog.debug("ZSWechatSDK otherEvent fail", err);
            },
        });
    }
    /** SDK初始化参数 */
    private param = {
        Appkey: "5018c0ZWXOgiK61HwrEKKbyoREACBEUF",
        Appsecrect: "gppbMY5SJSQHJwth6y9QUUEFrzFQzTO2",
        PlatformPublickey:
            "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAl0SH7VloUuaEO7KNEzO9jzdDrgm7ObO1Mf3gY3IussTJ8Qp5pyiqz1EXqJCyDl03bOvxE8IpjkcvGVxkFNJHEYTWxDGhnBKn9fnkz7MN3bL8YPbf2bSW9Nx05zw++K545GdIsG3ydsxc4ZchHgnLt67vlkAGyKstkcGbTYfA+V+bG14ySCzPrmtszm562WBYmRVK8KL0KLzudZAbGasMeE/rByVeY+GjYpZcVdsxoKnRhQEJwsvj21RhgS7V25wGLA3ZnBxeNsgKoeupb2vQ8nAyzjxNRgTwe8kXFLyjHbLITrKtiytXQim04qgCbdku1ZL0kk7CSAkwWZ/Jqk6R2wIDAQAB",
        PackageNo: "50184001001",
        ChannelNo: "50184001",
        PackageName: "com.jlttgame.official",
        OfferId: "1450066058",
        ZoneId: "t001",
        url: "https://jlttrpt.anhaoyougm.com",
        sign: "B5BF23jhF7sdf1F9D3DDCA6F52AE332ASSEE9EF198hIO5B",
        adUnitId: "adunit-2aad890280f790be",
    };

    /** SDK初始化之后返回的数据 */
    private initData: {
        /** IMEI号 */
        imei: string;
        /** 客户端IP */
        ip: string;
        /** 机器码 */
        machineCode: string;
        /** 设备识别码OAID */
        oaidCode: string;
        /** 终端系统版本 */
        osVersion: string;
        /** 机型 */
        machineModel: string;
        /** 网络标识0-WIFI；1-2G；2-3G；3-4G；4-5G */
        networkState: string;
        /** 无线网络SSID名称 */
        wifiName: string;
        /** 包名 */
        packageName: string;
        /** 终端类型，1-android，2-ios，3-pc */
        terminalType: number;
        /** app版本号（微信小游戏版本号，且上线后才有数据，否则返回为空） */
        appVersion: string;
    };

    /** SDK登录后返回的数据 */
    private loginData: {
        /** 开发者服务器返回的 HTTP 状态码、微信错误码 */
        statusCode: number;

        data: {
            /** 业务接口访问凭证 */
            access_token: string;
            /** access_token过期时间，单位秒 */
            expires_in: string;
            /** token类型 */
            token_type: string;
            /** 用作刷新：access_token，refresh_token 过期时间大于 access_token */
            refresh_token: string;
            /** access_token作用域 */
            scope: string;
            /** 响应编码，0代表成功 */
            code: number;
            /** 业务处理标识，true-业务处理成功，false-业务处理失败 */
            success: boolean;
            /** 错误信息描述 */
            error: string;
            /** 玩家对应平台OpenId */
            openid: string;
            /** 第三方登录时候的，第三方的openid，base64编码 */
            thirdpartyOpenId: string;
            /** 玩家昵称 */
            nickname: string;
            /** 是否发生注册 */
            isregist: string;
            /** 玩家头像 */
            picture: string;
            /** 服务器响应时间 */
            responseTime: string;
        };
    };

    constructor() {
        super();
        console.log("ZSWechatSDK constructor");
    }

    private intervalId = 0;

    msgCheck(content: string) {
        return new Promise<boolean>((resolve, reject) => {
            wx.ZSOpenCore.msgCheck({
                content,
                scene: 1,
                success: (res) => {
                    GLog.debug("ZSWechatSDK msgCheck success", res);
                    // res为成功回调返回的数据
                    // if (res.success && res.data) {
                    // }
                    resolve(true);
                },
                fail: (err) => {
                    // err为失败回调返回的数据
                    GLog.debug("ZSWechatSDK msgCheck fail", err);
                    resolve(false);
                },
            });
        });
    }
    shockScreen(): void {
        wx.ZSOpenCore.shockScreen();
    }
    copyToClipboard(text: string): void {
        MiniGameSdkShared.setClipboardData(text);
    }

    payImpl(
        itemId: number,
        extra: string
    ): Promise<{
        orderId: string;
    }> {
        return new Promise<{
            orderId: string;
        }>((resolve, reject) => {
            const tbl = GTable.getById("ChargeTbl", itemId);
            const price = tbl.cny;
            const device = this.initData.terminalType == 3 ? 8 : this.initData.terminalType;
            const payParam = {
                isPloy: 0,
                platformType: 0,
                orderNO: `${HttpServer.roleId}_${Date.now()}`,
                amount: price / 100,
                productId: itemId.toString(),
                quantity: 1,
                name: GLang.getText(tbl.name),
                desc: GLang.getText(tbl.description),
                device,
                extData: JSON.stringify({
                    itemId: itemId,
                    roleId: HttpServer.roleId,
                    extra,
                }),
                notifyUrl: `${HttpServer.address}payment/zs`,
                extInfo: {
                    mode: "game",
                    env: 1,
                    offerId: this.param.OfferId,
                    currencyType: "CNY",
                    platform: "android",
                    buyQuantity: price / 10,
                    zoneId: this.param.ZoneId,
                },
                iosExtInfo: {
                    productName: GLang.getText(tbl.name),
                    sendMessagePath: "",
                    sendMessageImg: "",
                },
            };
            GLog.debug("ZSWechatSDK pay", payParam);
            GLog.debug("ZSWechatSDK pay json: ", JSON.stringify(payParam));
            wx.ZSOpenCore.pay({
                ...payParam,
                success: (res) => {
                    this.handlePayReport(1, itemId, payParam.orderNO);
                    GLog.debug("ZSWechatSDK pay success", res);
                    //res为成功回调返回的数据
                    resolve({ orderId: payParam.orderNO });
                },
                fail: (err) => {
                    GLog.debug("ZSWechatSDK pay fail", err);
                    reject(err);
                    //err为失败回调返回的数据
                },
            });
            wx.ZSOpenCore.payReport({
                OrderNo: payParam.orderNO,
                Amount: price / 100,
                success: (res) => {
                    GLog.debug("ZSWechatSDK payReport success", res);
                },
                fail: (err) => {
                    GLog.debug("ZSWechatSDK payReport fail", err);
                },
            });
            this.handlePayReport(0, itemId, payParam.orderNO);
        });
    }
    currencyCode: CurrencyCode = "cny";

    async showVideoImpl(videoType: string): Promise<void> {
        return MiniGameSdkShared.miniGameshowRewardVideo(videoType, this.param.adUnitId);
    }

    async enterMainScene(): Promise<void> {
        MiniGameSdkShared.miniGameinitRewardVideo(this.param.adUnitId);
    }

    sdkLogin() {
        return new Promise<void>((resolve, reject) => {
            wx.ZSOpenCore.login({
                success: (res) => {
                    this.loginData = res;
                    this.sdkChannel = "ZSWeChat";
                    this.sdkUid = this.loginData.data.openid;
                    this.sdkExtra = this.loginData.data.openid;
                    this.extraInfo = JSON.stringify({
                        loginData: this.loginData,
                        initData: this.initData,
                    });
                    this.extraParam = JSON.stringify({
                        access_token: this.loginData.data.access_token,
                    });

                    GLog.debug("ZSWechatSDK login success", res);
                    wx.ZSOpenCore.keepScreenon({
                        success: (res) => {
                            GLog.debug("ZSWechatSDK keepScreenon success", res);
                        },
                        fail: (err) => {
                            GLog.debug("ZSWechatSDK keepScreenon fail", err);
                        },
                    });
                    wx.ZSOpenCore.listenHide(() => {
                        GLog.debug("ZSWechatSDK onHide listen");
                        this.handleOtherEventReport({
                            kind: "onHide",
                        });
                    });
                    //res 为登录成功返回的数据
                    clearInterval(this.intervalId);
                    this.intervalId = setInterval(() => {
                        this.handleOtherEventReport({ kind: "online_platform" });
                    }, 60000);
                    resolve();
                },
                fail: (err) => {
                    GLog.debug("ZSWechatSDK login fail", err);
                    GWindow.open(WindowCommonTip, { tip: ["_rsSDK登录失败"] });
                    //err为登录失败返回的数据
                    reject();
                },
            });
        });
    }

    getPackageName(): string {
        return "com.tata.zswechat";
    }
}
declare global {
    /** 全局变量微信 */
    const wx: {
        ZSOpenCore: any;
        getLaunchOptionsSync(): {
            path: string;
            scene: number;
            query: any;
            shareTicket: string;
        };
    };
}
