export class PresentationDelay {

    title = "展示效果延迟"

    constructor() {
        this.addInput("presentation", "presentation")
        this.addOutput("presentation", "presentation")
        this.addProperty("duration", 100, "number")
        this.addWidget(
            "number",
            "持续时间(毫秒)",
            this.properties.duration,
            { property: "duration" }
        )
    }
}
