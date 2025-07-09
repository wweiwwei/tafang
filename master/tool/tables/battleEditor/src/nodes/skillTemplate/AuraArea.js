export class AuraArea {

    title = "光环区域"

    constructor() {
        this.addInput("prev", "skillProcess")
        this.addInput("target", "battleObjectArray")
        this.addInput("duration", "duration")
        this.addOutput("next", "skillProcess")
        this.addOutput("presentation", "presentation")

        this.addProperty("radius", "10000")
        this.addWidget(
            "text",
            "范围半径",
            this.properties.radius,
            { property: "radius" }
        )
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


