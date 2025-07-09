export class TriggerMaxCountLimit {

    title = "最大释放次数限制检查"

    constructor() {
        // this.addInput("trigger", "boolean")
        this.addOutput("trigger", "boolean")
        this.addProperty("count", "1")
        this.addWidget(
            "text",
            "次数",
            this.properties.count,
            { property: "count" }
        )
    }
}