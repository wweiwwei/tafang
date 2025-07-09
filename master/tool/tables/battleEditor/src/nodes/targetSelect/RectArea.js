export class RectArea {

    title = "矩形区域"

    constructor() {
        this.addOutput("target", "targetSelectProcess")

        this.addProperty("horizontal", 3)
        this.addWidget(
            "number",
            "横向长度",
            this.properties.horizontal,
            { property: "horizontal" }
        )

        this.addProperty("vertical", 2)
        this.addWidget(
            "number",
            "纵向长度",
            this.properties.vertical,
            { property: "vertical" }
        )

        this.addProperty("maxDistance", 1)
        this.addWidget(
            "number",
            "最大射程",
            this.properties.maxDistance,
            { property: "maxDistance" }
        )

        this.addProperty("straightLine", false, "toggle")
        this.addWidget(
            "toggle",
            "直线限制",
            this.properties.straightLine,
            { property: "straightLine" }
        )
    }
}

