export class EnergyReduce {

    title = "怒气削减"

    constructor() {
        this.addInput("prev", "skillProcess")
        this.addInput("target", "battleObjectArray")
        this.addOutput("afterHit", "skillProcess")
        this.addOutput("next", "skillProcess")

        this.addProperty("skillValue", "1000")
        this.addWidget(
            "text",
            "削减数值",
            this.properties.skillValue,
            { property: "skillValue" }
        )

    }
}
