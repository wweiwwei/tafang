export class Repulse {

    title = "击退"

    constructor() {
        this.addInput("prev", "skillProcess")
        this.addInput("target", "battleObjectArray")
        this.addOutput("next", "skillProcess")
        this.addOutput("presentation", "presentation")

        this.addProperty("distance", "200")
        this.addWidget(
            "text",
            "击退距离",
            this.properties.distance,
            { property: "distance" }
        )
        
        this.addProperty("speed", "500")
        this.addWidget(
            "text",
            "击退速度",
            this.properties.speed,
            { property: "speed" }
        )
    }
}

