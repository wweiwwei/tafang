export class Mirror {

    title = "镜像"

    constructor() {
        this.addInput("prev", "skillProcess")
        this.addInput("target", "battleObjectArray")
        this.addOutput("next", "skillProcess")
        this.addOutput("presentation", "presentation")

        this.addProperty("attack", "10000")
        this.addWidget(
            "text",
            "镜像攻击比例（万分比）",
            this.properties.attack,
            { property: "attack" }
        )
        this.addProperty("hp", "10000")
        this.addWidget(
            "text",
            "镜像血量比例（万分比）",
            this.properties.hp,
            { property: "hp" }
        )
    }
}

