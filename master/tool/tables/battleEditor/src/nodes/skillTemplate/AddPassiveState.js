export class AddPassiveState {

    title = "附加被动状态"

    constructor() {
        this.addInput("prev", "preBattleSkillProcess")
        this.addInput("target", "battleObjectArray")
        this.addInput("duration", "duration")
        this.addOutput("next", "preBattleSkillProcess")
        this.addOutput("presentation", "presentation")
        this.addOutput("afterHit", "skillProcess")

        this.addProperty("stateType", battleStateType[0], "enum", { values: battleStateType })
        this.addWidget(
            "combo",
            "状态类型",
            this.properties.stateType,
            { property: "stateType", values: battleStateType }
        )

        this.addProperty("skillValue", "200")
        this.addWidget(
            "text",
            "技能数值",
            this.properties.skillValue,
            { property: "skillValue" }
        )

        this.addProperty("interval", "1000")
        this.addWidget(
            "text",
            "间隔时间（毫秒）",
            this.properties.interval,
            { property: "interval" }
        )

        this.addProperty("maxLayer", "1")
        this.addWidget(
            "text",
            "最大层数",
            this.properties.maxLayer,
            { property: "maxLayer" }
        )

        this.addProperty("tag", "")
        this.addWidget(
            "text",
            "伤害tag",
            this.properties.tag,
            { property: "tag" }
        )


    }
}

