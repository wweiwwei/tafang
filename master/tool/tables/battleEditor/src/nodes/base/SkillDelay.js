export class SkillDelay {

    title = "技能延迟"

    constructor() {
        this.addInput("prev", "skillProcess")
        this.addOutput("next", "skillProcess")

        this.addProperty("duration", 100, "number")
        this.addWidget(
            "number",
            "持续时间(毫秒)",
            this.properties.duration,
            { property: "duration" }
        )

        this.addOutput("presentation", "presentation")
    }
}
