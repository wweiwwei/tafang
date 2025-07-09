export class TriggerEvent {

    title = "事件触发"

    constructor() {
        this.addOutput("trigger", "boolean")

        this.addProperty("event", "enter")
        this.addWidget(
            "text",
            "事件",
            this.properties.event,
            { property: "event" }
        )
        this.addProperty("tag", "")
        this.addWidget(
            "text",
            "事件Tag",
            this.properties.tag,
            { property: "tag" }
        )
        this.addProperty("count", "1")
        this.addWidget(
            "text",
            "发生次数",
            this.properties.count,
            { property: "count" }
        )
    }
}