export class Dash {

    title = "冲撞"

    constructor() {
        this.addInput("prev", "skillProcess")
        this.addInput("target", "battleObjectArray")
        this.addOutput("afterHit", "skillProcess")
        this.addOutput("next", "skillProcess")
        this.addOutput("presentation", "presentation")

        this.addProperty("distance", "10000")
        this.addWidget(
            "text",
            "冲撞距离",
            this.properties.distance,
            { property: "distance" }
        )
    }
}

