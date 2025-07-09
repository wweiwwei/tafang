import { CareerTalent } from "../entity/CareerTalent";

export default class CareerModel {
    transfer(id: number) {
        return GApi.career.transfer({ id });
    }
    reset() {
        return GApi.career.reset();
    }
    /**职业天赋 */
    getTalent(): CareerTalent[] {
        return Object.keys(GState.data.careerTalent).map((key) => GState.data.careerTalent[key]);
    }
    /**技能 属性名与多语言绑定，不能修改*/
    getSkill(id: number) {
        let tbl = GTable.getById("JobChangeTbl", id);
        return { normal: tbl.normalAttack, active: tbl.mainSkill, passive: tbl.skill };
    }
    /**随机学习 */
    studyTalent(free: boolean) {
        return GApi.career.studyTalent({ free });
    }
}
