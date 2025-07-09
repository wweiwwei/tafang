export class ShowEffect {

    title = "展示特效"

    constructor() {
        this.addInput("presentation", "presentation")

        
        this.addProperty("positionType", effectTargetType[0], "enum", { values: effectTargetType })
        this.addWidget(
            "combo",
            "参照位置",
            this.properties.positionType,
            { property: "positionType", values: effectTargetType }
        )

        this.addProperty("offset", "")
        this.addWidget(
            "text",
            "位置偏移",
            this.properties.offset,
            { property: "offset" }
        )

        this.addProperty("parentType", effectParentType[0], "enum", {values:effectParentType})
        this.addWidget(
            "combo",
            "挂载对象",
            this.properties.parentType,
            { property: "parentType" , values: effectParentType}
        )

        this.addProperty("effect", "")
        this.addWidget(
            "text",
            "特效",
            this.properties.effect,
            { property: "effect" }
        )

        this.addProperty("animation", "")
        this.addWidget(
            "text",
            "特效动画",
            this.properties.animation,
            { property: "animation" }
        )

        this.addProperty("scale", "1")
        this.addWidget(
            "text",
            "放大倍率",
            this.properties.scale,
            { property: "scale" }
        )



    }
}