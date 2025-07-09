export class DurationFix {

    title = "持续固定时间"

    constructor() {
        this.addOutput("duration", "duration")

        this.addProperty("duration", 100)
        this.addWidget(
            "text",
            "持续时间(毫秒)",
            this.properties.duration,
            { property: "duration" }
        )

    }
}

