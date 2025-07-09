export class Aura {

    title = "光环"

    constructor() {
        this.addInput("prev", "preBattleSkillProcess")
        this.addInput("target", "battleObjectArray")
        this.addOutput("next", "preBattleSkillProcess")

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
        this.addProperty("enemy", false, "toggle")
        this.addWidget(
            "toggle",
            "针对敌方",
            this.properties.enemy,
            { property: "enemy" }
        )
    }
}


