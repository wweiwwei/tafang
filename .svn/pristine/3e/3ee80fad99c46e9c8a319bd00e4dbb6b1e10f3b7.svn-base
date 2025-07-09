export class SkillLoop {

    title = "技能流程循环"

    constructor() {
        this.addInput("prev", "skillProcess")
        this.addInput("loop", "skillProcess")
        this.addOutput("next", "skillProcess")

        this.addProperty("count", 1, "number")
        this.addWidget(
            "number",
            "循环次数",
            this.properties.count,
            { property: "count" }
        )


    }
}