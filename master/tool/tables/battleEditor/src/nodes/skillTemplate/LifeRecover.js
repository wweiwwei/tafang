export class LifeRecover {

    title = "生命恢复"

    constructor() {
        this.addInput("prev", "skillProcess")
        this.addInput("target", "battleObjectArray")
        this.addOutput("afterHit", "skillProcess")
        this.addOutput("next", "skillProcess")
        this.addOutput("presentation", "presentation")


        this.addProperty("skillValue", "1000")
        this.addWidget(
            "text",
            "恢复数值",
            this.properties.skillValue,
            { property: "skillValue" }
        )

    }
}
