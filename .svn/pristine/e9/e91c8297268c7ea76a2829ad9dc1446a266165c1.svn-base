export class Splash {

    title = "溅射"

    constructor() {
        this.addInput("prev", "preBattleSkillProcess")
        this.addOutput("next", "preBattleSkillProcess")
        this.addOutput("presentation", "presentation")

        this.addProperty("probability", "0.5")
        this.addWidget(
            "text",
            "溅射概率（0-1）",
            this.properties.probability,
            { property: "probability" }
        )

        this.addProperty("range", "5000")
        this.addWidget(
            "text",
            "溅射范围",
            this.properties.range,
            { property: "range" }
        )

        this.addProperty("value", "5000")
        this.addWidget(
            "text",
            "伤害比例",
            this.properties.value,
            { property: "value" }
        )


    }
}
