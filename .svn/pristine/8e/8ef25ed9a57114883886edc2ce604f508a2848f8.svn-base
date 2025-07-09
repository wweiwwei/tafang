export class PrecalculatedBuff {

    title = "预计算buff"

    constructor() {
        this.addInput("prev", "preCalculateSkillProcess")
        // this.addInput("target", "battleObjectArray")
        this.addOutput("next", "preCalculateSkillProcess")
        // this.addOutput("presentation", "presentation")

        this.addProperty("heroProperty", "attack")
        this.addWidget(
            "text",
            "属性",
            this.properties.heroProperty,
            { property: "heroProperty" }
        )
        this.addProperty("skillValue", "1000")
        this.addWidget(
            "text",
            "buff数值",
            this.properties.skillValue,
            { property: "skillValue" }
        )
    }
}
