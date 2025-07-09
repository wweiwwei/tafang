export class ContinuousSkill {

    title = "持续施法"

    constructor() {
        this.addInput("prev", "skillProcess")
        this.addInput("target", "battleObjectArray")
        this.addInput("duration", "duration")
        this.addOutput("afterHit", "skillProcess")
        this.addOutput("next", "skillProcess")
        this.addOutput("presentation", "presentation")

        this.addProperty("interval", "500")
        this.addWidget(
            "text",
            "效果间隔（毫秒）",
            this.properties.interval,
            { property: "interval" }
        )
    }
}

