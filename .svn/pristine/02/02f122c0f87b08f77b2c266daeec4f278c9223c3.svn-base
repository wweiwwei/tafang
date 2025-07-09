export class DurationEvent {

    title = "持续到事件发生"

    constructor() {
        this.addOutput("duration", "duration")

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

