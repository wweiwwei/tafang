export class PassiveBuff {

    title = "被动buff"

    constructor() {
        this.addInput("prev", "preBattleSkillProcess")
        this.addInput("target", "battleObjectArray")
        this.addOutput("next", "preBattleSkillProcess")
        this.addOutput("presentation", "presentation")

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
        this.addProperty("maxLayer", "1")
        this.addWidget(
            "text",
            "最大层数",
            this.properties.maxLayer,
            { property: "maxLayer" }
        )
    }
}

