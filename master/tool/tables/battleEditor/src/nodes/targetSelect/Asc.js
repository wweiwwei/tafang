export class Asc {

    title = "升序"

    constructor() {
        this.addProperty("heroProperty", "attack")
        this.addOutput("process", "targetSelectProcess")
        this.addWidget(
            "text",
            "属性",
            this.properties.heroProperty,
            { property: "heroProperty" }
        )

    }
}
