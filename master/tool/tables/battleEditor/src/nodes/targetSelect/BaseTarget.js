export class BaseTarget {

    title = "基础目标"

    constructor() {
        this.addOutput("target", "battleObjectArray")

        this.addProperty("baseTarget", skillBaseTarget[0], "enum", { values: skillBaseTarget })
        this.addWidget(
            "combo",
            "基础目标",
            this.properties.baseTarget,
            { property: "baseTarget", values: skillBaseTarget }
        )

    }
}

