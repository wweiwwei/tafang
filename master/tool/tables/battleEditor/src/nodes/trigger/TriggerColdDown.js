export class TriggerColdDown {

    title = "冷却时间触发"

    constructor() {
        this.addOutput("trigger", "boolean")

        this.addProperty("time", "1000")
        this.addWidget(
            "text",
            "冷却时间（毫秒）",
            this.properties.time,
            { property: "time" }
        )
    }
}