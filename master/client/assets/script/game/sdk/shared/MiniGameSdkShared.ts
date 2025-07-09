export default class MiniGameSdkShared {
    private static adRewardVideo: any = null;
    private static adRewardVideoSuccessFunc = null;
    private static adRewardVideoFailFunc = null;

    static miniGameinitRewardVideo(adUnitId: string) {
        // if (adUnitId) this.adUnitId = adUnitId;
        if (!this.adRewardVideo) {
            if (cc.sys.platform === cc.sys.WECHAT_GAME) {
                //@ts-ignore
                this.adRewardVideo = wx.createRewardedVideoAd({
                    adUnitId,
                });
            } else if (cc.sys.platform === cc.sys.BYTEDANCE_GAME) {
                //@ts-ignore
                this.adRewardVideo = tt.createRewardedVideoAd({
                    adUnitId,
                });
            }

            this.adRewardVideo.onError((err) => {
                GLog.info("初始化报错", err);
            });

            this.adRewardVideo.onClose((res) => {
                GLog.info("视频播放完成");

                if (res && res.isEnded) {
                    if (this.adRewardVideoSuccessFunc) this.adRewardVideoSuccessFunc();
                } else {
                    if (this.adRewardVideoFailFunc) this.adRewardVideoFailFunc();
                }
                this.adRewardVideoSuccessFunc = null;
                this.adRewardVideoFailFunc = null;
                this.adRewardVideo.load();
                // SoundTool.playMusic(GameDef.SoundBgm, true);
            });

            //最佳实践
            this.adRewardVideo.onLoad(() => {
                GLog.info("广告加载完成");
            });
            this.adRewardVideo.load();
        }
    }

    static miniGameshowRewardVideo(videoType: string, adUnitId: string) {
        return new Promise<void>((resolve, reject) => {
            let port: any = null;
            if (cc.sys.platform === cc.sys.WECHAT_GAME) {
                //@ts-ignore
                port = wx;
            } else if (cc.sys.platform === cc.sys.BYTEDANCE_GAME) {
                //@ts-ignore
                port = tt;
            }
            if (!this.adRewardVideo) {
                this.miniGameinitRewardVideo(adUnitId);
                port.showToast({
                    title: "广告组件出现问题,请重新点击",
                    duration: 2000,
                    icon: "none",
                });
                return;
            }
            this.adRewardVideoSuccessFunc = () => {
                resolve();
            };
            this.adRewardVideoFailFunc = () => {
                reject();
            };
            this.adRewardVideo
                .show()
                .then(() => {
                    GLog.info("广告显示成功");
                })
                .catch((err) => {
                    GLog.info("广告组件出现问题", err);
                    // if (SDKManager.failFunc) SDKManager.failFunc();
                    //@ts-ignore
                    port.showToast({
                        title: "广告组件出现问题,正在重新加载",
                        duration: 2000,
                        icon: "none",
                    });
                    // 可以手动加载一次
                    this.adRewardVideo.load().then(() => {
                        GLog.info("手动加载成功");
                        // 加载成功后需要再显示广告
                        return this.adRewardVideo.show();
                    });
                });
        });
    }

    static setClipboardData(data: string) {
        let port: any = null;
        if (cc.sys.platform === cc.sys.WECHAT_GAME) {
            //@ts-ignore
            port = wx;
        } else if (cc.sys.platform === cc.sys.BYTEDANCE_GAME) {
            //@ts-ignore
            port = tt;
        }
        port.setClipboardData({
            data,
            success(res) {
                port.getClipboardData({
                    success(res) {
                        GLog.info(res.data); // data
                        GTip.showTip(["_rs复制成功"]);
                    },
                });
            },
        });
    }

    private static imgUrl: string = "";
    private static shareString: string = "";
    static registWxShareFunc() {
        this.shareDataFunction();
        //@ts-ignore
        // wx.onShareAppMessage(() => {
        //     const _promise = new Promise((resolve) => {
        //         this.shareDataFunction();
        //         setTimeout(() => {
        //             resolve({
        //                 title: this.shareString,
        //                 imageUrl: this.imgUrl,
        //             });
        //         }, 2000);
        //     });
        //     let share = {
        //         title: this.shareString,
        //         imageUrl: this.imgUrl,
        //         _promise,
        //     };
        //     //@ts-ignore
        //     let data = wx.uma.trackShare(share);
        //     return data;
        // });
        wx.onShareAppMessage(function () {
            // 用户点击了“转发”按钮
            GSDK.report({
                kind: "wechatShareApp",
                data: {},
            });
            return {
                title: "2023年我最爱的游戏！",
            };
        });

        //@ts-ignore
        // wx.onShareTimeline(() => {
        //     const promise = new Promise((resolve) => {
        //         this.shareDataFunction();
        //         setTimeout(() => {
        //             resolve({
        //                 title: this.shareString,
        //             });
        //         }, 2000);
        //     });
        //     return {
        //         title: "2023年入坑的第一款模拟经营。",
        //         promise,
        //     };
        // });
        wx.onShareTimeline(() => {
            // 转发到朋友圈
            GSDK.report({
                kind: "wechatShareTimeLine",
                data: {},
            });
            return {
                title: "2023年我最爱的游戏！",
            };
        });
        //@ts-ignore
        wx.showShareMenu({
            withShareTicket: true,
            menus: ["shareAppMessage", "shareTimeline"],
        });
    }

    private static shareDataFunction() {
        let number = GUtils.random.nextInt(1, 2);
        if (number == 1) {
            this.imgUrl =
                "https://mmocgame.qpic.cn/wechatgame/6oQWdDaibTzMotxty7bmxloHsQw8uaTlpiaDu9ycu3Lf6FoibGDU9rSNhfIVXBhIxyX/0";
            this.shareString = "2023年我最爱的游戏！";
        } else {
            this.imgUrl =
                "https://mmocgame.qpic.cn/wechatgame/6oQWdDaibTzNd4AGjQgfYsia5Kr38l7pHDpvMoQ5rQDGxkOPfjz1UKJaa4N1rx0afn/0";
            this.shareString = "模拟经营就这味儿正！";
        }
    }
}
