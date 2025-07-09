export class PresentationGroup {

    title = "展示效果组合"

    constructor() {
        this.addOutput("presentation1", "presentation")
        this.addOutput("presentation2", "presentation")
        this.addOutput("presentation3", "presentation")
        this.addInput("presentation", "presentation")
    }
}