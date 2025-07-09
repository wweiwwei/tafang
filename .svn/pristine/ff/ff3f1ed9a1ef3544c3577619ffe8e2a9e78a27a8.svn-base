import ResourceLoader from "./ResourceLoader";

export default class AudioHelper {
    /** 播放音效 */
    async playEffect(name: string) {
        if (!GModel.setting.soundSetting()) return;
        const sound = await ResourceLoader.asyncLoad("sound", name, cc.AudioClip);
        cc.audioEngine.play(sound, false, this.getVolume(name));
    }

    /** 播放背景音乐 */
    async playMusic(name: string) {
        if (this.currentMusic === name && cc.audioEngine.isMusicPlaying()) return;
        this.currentMusic = name;
        if (!GModel.setting.musicSetting()) return;
        const music = await ResourceLoader.asyncLoad("sound", name, cc.AudioClip);
        cc.audioEngine.playMusic(music, true);
        cc.audioEngine.setMusicVolume(this.getVolume(name));
    }

    private getVolume(name: string) {
        if (!GTable.hasInited) return 1;
        return GTable.getList("MusicInfoTbl").find((t) => t.music === name).volume || 1;
    }

    private currentMusic: string = "";

    stopAll() {
        cc.audioEngine.stopAll();
    }

    stopAllEffects() {
        cc.audioEngine.stopAllEffects();
    }

    pauseMusic() {
        cc.audioEngine.pauseMusic();
    }

    resumeMusic() {
        if (cc.audioEngine.isMusicPlaying()) {
            cc.audioEngine.resumeMusic();
        } else {
            this.playMusic(this.currentMusic);
        }
    }

    stopMusic() {
        cc.audioEngine.stopMusic();
    }
}
window["GAudio"] = new AudioHelper();
declare global {
    const GAudio: AudioHelper;
}
