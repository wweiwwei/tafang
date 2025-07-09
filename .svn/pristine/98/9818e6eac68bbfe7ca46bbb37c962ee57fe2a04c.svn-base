export class Damage {

    title = "造成伤害"

    constructor() {

        this.addInput("prev", "skillProcess")
        this.addInput("target", "battleObjectArray")
        this.addInput("exempt", "exempt")
        this.addOutput("afterHit", "skillProcess")
        this.addOutput("next", "skillProcess")
        this.addOutput("presentation", "presentation")

        // this.addProperty("eventType", attackEventType[0], "enum", { values: attackEventType })
        // this.addWidget(
        //     "combo",
        //     "伤害事件",
        //     this.properties.eventType,
        //     { property: "eventType", values: attackEventType }
        // )

        this.addProperty("damageTag", "")
        this.addWidget(
            "text",
            "伤害tag",
            this.properties.damageTag,
            { property: "damageTag" }
        )


        this.addProperty("skillValue", "1000")
        this.addWidget(
            "text",
            "伤害数值",
            this.properties.skillValue,
            { property: "skillValue" }
        )

        this.addProperty("count", "1")
        this.addWidget(
            "text",
            "伤害次数",
            this.properties.count,
            { property: "count" }
        )

        this.addProperty("delay", "0")
        this.addWidget(
            "text",
            "延迟（毫秒）",
            this.properties.delay,
            { property: "delay" }
        )

        this.addProperty("damageText", "")
        this.addWidget(
            "text",
            "数字显示",
            this.properties.damageText,
            { property: "damageText" }
        )


    }
}

