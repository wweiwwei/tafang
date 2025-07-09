export class ActivateHeroRelation {

    title = "激活英雄羁绊"

    constructor() {
        this.addInput("prev", "preBattleSkillProcess")
        this.addOutput("next", "preBattleSkillProcess")
        this.addOutput("presentation", "presentation")

        this.addProperty("relationId", "1001")
        this.addWidget(
            "text",
            "羁绊id",
            this.properties.relationId,
            { property: "relationId" }
        )
    }
}

