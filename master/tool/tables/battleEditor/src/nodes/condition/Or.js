export class Or {

    title = "或者"

    constructor() {
        this.addInput("condition1", "boolean")
        this.addInput("condition2", "boolean")
        this.addOutput("ok", "boolean")
        // this.addOutput("fail", "boolean")
    }
}