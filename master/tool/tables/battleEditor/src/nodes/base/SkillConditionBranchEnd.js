export class SkillConditionBranchEnd {

    title = "技能条件分支结束"

    constructor() {

        this.addInput("prev1", "skillProcess")
        this.addInput("prev2", "skillProcess")
        this.addOutput("next", "skillProcess")

    }
}