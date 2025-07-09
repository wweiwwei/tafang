export class GlobalPropertyBuff {

    title = "全局属性buff"

    constructor() {
        this.addInput("prev", "globalSkillProcess")
        this.addOutput("next", "globalSkillProcess")

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

