export class SkillConditionBranch {
    title = "技能条件分支";

    constructor() {
        this.addProperty("condition", "");
        this.addWidget("text", "条件", this.properties.condition, { property: "condition" });

        this.addInput("prev", "skillProcess");
        this.addOutput("ok", "skillProcess");
        this.addOutput("fail", "skillProcess");
    }
}
