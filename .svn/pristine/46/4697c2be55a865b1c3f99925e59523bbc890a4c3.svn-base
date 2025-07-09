const { ccclass, property, menu } = cc._decorator;
@ccclass
@menu("UI/UISlider")
export default class UISlider extends cc.Component {
    @property(cc.ProgressBar) bar: cc.ProgressBar = null;
    @property(cc.Slider) slider: cc.Slider = null;

    private onSlide() {
        this.bar.progress = this.slider.progress;
        if (this.onProgress) this.onProgress(this.slider.progress);
    }

    onProgress: (progress: number) => void = null;

    setProgress(progress: number) {
        this.bar.progress = progress;
        this.slider.progress = progress;
    }
}
