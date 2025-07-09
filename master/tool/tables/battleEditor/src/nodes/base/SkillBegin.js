export class SkillBegin {

    title = "释放技能"

    constructor() {
        this.addInput("prev", "skillProcess")
        this.addOutput("next", "skillProcess")

        this.addOutput("presentation", "presentation")
    }
}