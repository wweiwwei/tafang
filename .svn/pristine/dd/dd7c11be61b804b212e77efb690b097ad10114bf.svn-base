export class GameUtils {
    restart() {
        if (cc.sys.isBrowser) {
            document.location.reload();
        } else if (cc.sys.isNative) {
            cc.game.restart();
        } else if (cc.sys.platform === cc.sys.WECHAT_GAME) {
            // @ts-ignore
            wx.restartMiniProgram();
        } else if (cc.sys.platform === cc.sys.BYTEDANCE_GAME) {
            // @ts-ignore
            tt.restartMiniProgramSync();
        }
    }
}
