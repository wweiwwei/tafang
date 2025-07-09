export class Explosion {

    title = "爆炸（瞬发范围效果）"

    constructor() {

        this.addInput("prev", "skillProcess")
        this.addInput("target", "battleObjectArray")
        this.addOutput("afterHit", "skillProcess")
        this.addOutput("next", "skillProcess")
        this.addOutput("presentation", "presentation")

        this.addProperty("targetTeam", "enemyTeam")
        this.addWidget(
            "text",
            "目标阵营",
            this.properties.targetTeam,
            { property: "targetTeam" }
        )
        this.addProperty("delay", "0")
        this.addWidget(
            "text",
            "延迟（毫秒）",
            this.properties.delay,
            { property: "delay" }
        )
        this.addProperty("rangeType", "1")
        this.addWidget(
            "text",
            "范围类型",
            this.properties.rangeType,
            { property: "rangeType" }
        )

        this.addProperty("range", "200")
        this.addWidget(
            "text",
            "范围参数",
            this.properties.range,
            { property: "range" }
        )

    }
}

