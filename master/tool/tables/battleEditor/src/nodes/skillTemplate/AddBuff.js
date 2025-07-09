export class AddBuff {

    title = "附加Buff"

    constructor() {
        this.addInput("prev", "skillProcess")
        this.addInput("target", "battleObjectArray")
        this.addInput("duration", "duration")
        this.addOutput("next", "skillProcess")
        this.addOutput("presentation", "presentation")

        this.addProperty("heroProperty", "attack")
        this.addWidget(
            "text",
            "属性",
            this.properties.heroProperty,
            { property: "heroProperty" }
        )
        this.addProperty("dynamic", false, "toggle")
        this.addWidget(
            "toggle",
            "动态计算",
            this.properties.dynamic,
            { property: "dynamic" }
        )
        this.addProperty("dispelable", true, "toggle")
        this.addWidget(
            "toggle",
            "可驱散",
            this.properties.dispelable,
            { property: "dispelable" }
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

        this.addProperty("effect", "")
        this.addWidget(
            "text",
            "持续特效",
            this.properties.effect,
            { property: "effect" }
        )
        
        this.addProperty("showPercent", true, "toggle")
        this.addWidget(
            "toggle",
            "百分比显示",
            this.properties.showPercent,
            { property: "showPercent" }
        )

    }
}

