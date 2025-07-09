export class SetFlag {

    title = "设置标志位"

    constructor() {
        this.addInput("prev", "preBattleSkillProcess")
        this.addOutput("next", "preBattleSkillProcess")
        this.addOutput("presentation", "presentation")

        this.addProperty("flagName", "archerTalent1")
        this.addWidget(
            "text",
            "标志位名称",
            this.properties.flagName,
            { property: "flagName" }
        )
    }
}

