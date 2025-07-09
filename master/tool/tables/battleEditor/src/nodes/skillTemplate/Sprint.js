export class Sprint {

    title = "冲刺"

    constructor() {
        this.addInput("prev", "skillProcess")
        this.addInput("target", "battleObjectArray")
        this.addOutput("afterReach", "skillProcess")
        this.addOutput("next", "skillProcess")
        this.addOutput("presentation", "presentation")

        this.addProperty("immediate", false, "toggle")
        this.addWidget(
            "toggle",
            "瞬间到达",
            this.properties.immediate,
            { property: "immediate" }
        )
        this.addProperty("speed", "10000")
        this.addWidget(
            "text",
            "冲刺速度",
            this.properties.speed,
            { property: "speed" }
        )
    }
}

