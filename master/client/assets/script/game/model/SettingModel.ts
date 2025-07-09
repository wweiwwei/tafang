export default class SettingModel {
    init() {
        if (GModel.localStorage.music === undefined) {
            GModel.localStorage.music = true;
        }
        if (GModel.localStorage.sound === undefined) {
            GModel.localStorage.sound = true;
        }
        if (GModel.localStorage.autoSell === undefined) {
            GModel.localStorage.autoSell = true;
        }
    }
    /** 音乐是否开启 */
    musicSetting() {
        return GModel.localStorage.music;
    }

    /** 音效是否开启 */
    soundSetting() {
        return GModel.localStorage.sound;
    }

    /** 切换音乐状态 */
    switchMusic() {
        GModel.localStorage.music = !GModel.localStorage.music;
        if (GModel.localStorage.music) {
            GAudio.resumeMusic();
        } else {
            GAudio.stopMusic();
        }
    }

    /** 切换音效状态 */
    switchSound() {
        GModel.localStorage.sound = !GModel.localStorage.sound;
    }
}
