export class And {

    title = "并且"

    constructor() {
        this.addInput("condition1", "boolean")
        this.addInput("condition2", "boolean")
        this.addOutput("ok", "boolean")
        // this.addOutput("fail", "boolean")
    }
}