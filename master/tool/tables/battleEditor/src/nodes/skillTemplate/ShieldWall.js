export class ShieldWall {

    title = "盾墙"

    constructor() {
        this.addInput("prev", "skillProcess")
        this.addOutput("next", "skillProcess")
        this.addOutput("presentation", "presentation")
    }
}
