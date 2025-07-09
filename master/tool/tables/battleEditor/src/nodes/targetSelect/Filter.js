export class Filter {

    title = "筛选"

    constructor() {
        this.addOutput("process", "targetSelectProcess")
        this.addProperty("condition", "")
        this.addWidget(
            "text",
            "条件",
            this.properties.condition,
            { property: "condition" }
        )

    }
}