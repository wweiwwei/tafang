import { autowired, message, registerClass } from "../../../framework/Decorator";
import { WindowOpenAnimationEnum, WindowOpenOption } from "../../../framework/ui/GWindow";
import UIButton from "../../../framework/ui/UIButton";
import UIImage from "../../../framework/ui/UIImage";
import UILabel from "../../../framework/ui/UILabel";
import UIList from "../../../framework/ui/UIList";
import UIRichText from "../../../framework/ui/UIRichText";
import UIScrollList from "../../../framework/ui/UIScrollList";
import UIWindow from "../../../framework/ui/UIWindow";
import EventName from "../../event/EventName";
import ListItemPlan from "./ListItemPlan";
import ListItemSkill from "./ListItemSkill";
import WindowCareer from "./WindowCareer";

const { ccclass, property } = cc._decorator;
@registerClass("WindowPlayer")
@ccclass
export default class WindowPlayer extends UIWindow {
    static defaultOpentOption: Partial<WindowOpenOption> = {
        animation: WindowOpenAnimationEnum.default,
    };
    _windowParam: {
        /**0-技能，1-同伴*/
        status: number;
    };
    _returnValue: any;
    @autowired(UILabel) title: UILabel = null;
    @autowired(UIButton) closeBtn: UIButton = null;
    /**-------------技能-------------- */
    @autowired(UIButton) changeBtn: UIButton = null;
    @autowired(UILabel) plan: UILabel = null;
    @autowired(UILabel) effect: UILabel = null;
    @autowired(UIList) formation: UIList<ListItemSkill> = null;
    @autowired(UIList) planList: UIList<ListItemPlan> = null;
    @autowired(UIScrollList) skills: UIScrollList<ListItemSkill> = null;
    @autowired(UIButton) formateAll: UIButton = null;
    @autowired(UIButton) strengthenAll: UIButton = null;
    @autowired(UIImage) exclamation1: UIImage = null;

    private strings = [GLang.code.ui.plan_one, GLang.code.ui.plan_two, GLang.code.ui.plan_three];
    protected onInited(): void {
        this._windowParam.status === 0 ? this.initSkills() : this.initPets();
        this.refreshFormation();
        this.refreshSkills();
        this.closeBtn.onClick = () => {
            this.close();
        };
        this.changeBtn.onClick = () => {
            this.planList.node.active = !this.planList.node.active;
        };
    }
    @message([
        EventName.stateKey.playerSkill,
        EventName.stateKey.currentSkillFormation,
        EventName.stateKey.skillFormation,
    ])
    initSkills() {
        this.formateAll.onClick = async () => {
            let skills = GModel.playerSkill
                .getSkills()
                .filter((s) => s.level > 0)
                .sort((a, b) => {
                    if (b.getTbl().quality === a.getTbl().quality) {
                        return b.level - a.level;
                    } else {
                        return b.getTbl().quality - a.getTbl().quality;
                    }
                })
                .map((skill) => skill.id);
            if (skills.length === 0) return GTip.showTip([GLang.code.ui.no_skills]);
            let list: number[] = new Array(5).fill(-1);
            if (skills.length >= 5) {
                list = skills.slice(0, 5);
            } else {
                skills.forEach((v, i) => (list[i] = v));
            }
            await GModel.playerSkill.setFormation(GState.data.currentSkillFormation, list);
        };
        this.exclamation1.node.active = GModel.playerSkill.getSkills().some((s) => s.canUpgrade());
        this.strengthenAll.onClick = async () => {
            await GModel.playerSkill.upgradeAllSkill();
        };
        this.effect.setText(...GModel.playerSkill.getProperty());
    }
    @message([EventName.stateKey.playerPet, EventName.stateKey.currentPetFormation, EventName.stateKey.petFormation])
    initPets() {
        this.formateAll.onClick = async () => {
            let pets = GModel.pet
                .getPets()
                .filter((s) => s.level > 0)
                .sort((a, b) => {
                    if (b.getTbl().quality === a.getTbl().quality) {
                        return b.level - a.level;
                    } else {
                        return b.getTbl().quality - a.getTbl().quality;
                    }
                })
                .map((pet) => pet.id);
            if (pets.length === 0) return GTip.showTip([GLang.code.ui.no_skills]);
            let list: number[] = new Array(5).fill(-1);
            if (pets.length >= 5) {
                list = pets.slice(0, 5);
            } else {
                pets.forEach((v, i) => (list[i] = v));
            }
            await GModel.pet.setFormation(GState.data.currentPetFormation, list);
        };
        this.exclamation1.node.active = GModel.pet.getPets().some((s) => s.canUpgrade());
        this.strengthenAll.onClick = async () => {
            await GModel.pet.upgradeAllPet();
        };
        this.effect.setText(...GModel.pet.getProperty());
    }

    @message([
        EventName.stateKey.playerSkill,
        EventName.stateKey.currentSkillFormation,
        EventName.stateKey.skillFormation,
        EventName.stateKey.playerPet,
        EventName.stateKey.currentPetFormation,
        EventName.stateKey.petFormation,
    ])
    refreshFormation() {
        let current;
        let formation;
        let state;
        let state2;
        if (this._windowParam.status === 0) {
            //技能
            current = GState.data.currentSkillFormation;
            formation = GModel.playerSkill.getFormation(current);
            this.plan.setText([GLang.code.ui.plan, this.strings[current - 1]]);
            state = formation.map((id, i) => {
                let chosen = formation.some((f) => f === id);
                return {
                    status: 1,
                    id,
                    chosen,
                    cb: async () => {
                        if (chosen) {
                            formation[i] = -1;
                            await GModel.playerSkill.setFormation(current, formation);
                        }
                    },
                };
            });
            state2 = Object.values(GState.data.skillFormation).map((f, i) => {
                return {
                    formations: f,
                    label: [GLang.code.ui.plan, this.strings[i]],
                    chosen: i === current - 1,
                    cb: async () => {
                        await GModel.playerSkill.changeFormation(i + 1);
                    },
                };
            });
        } else {
            //同伴
            current = GState.data.currentPetFormation;
            formation = GModel.pet.getFormation(current);
            this.plan.setText([GLang.code.ui.plan, this.strings[current - 1]]);
            state = formation.map((id, i) => {
                let chosen = formation.some((f) => f === id);
                return {
                    status: 1,
                    id,
                    chosen,
                    cb: async () => {
                        if (chosen) {
                            formation[i] = -1;
                            await GModel.pet.setFormation(current, formation);
                        }
                    },
                };
            });
            state2 = Object.values(GState.data.petFormation).map((f, i) => {
                return {
                    formations: f,
                    label: [GLang.code.ui.plan, this.strings[i]],
                    chosen: i === current - 1,
                    cb: async () => {
                        await GModel.pet.changeFormation(i + 1);
                    },
                };
            });
        }
        this.formation.setState(state);
        this.planList.setState(state2);
    }
    @message([
        EventName.stateKey.playerSkill,
        EventName.stateKey.currentSkillFormation,
        EventName.stateKey.skillFormation,
        EventName.stateKey.playerPet,
        EventName.stateKey.currentPetFormation,
        EventName.stateKey.petFormation,
    ])
    refreshSkills() {
        let current;
        let formation;
        let state: { status: number; id: number; chosen: boolean; cb: () => void }[];
        if (this._windowParam.status === 0) {
            current = GState.data.currentSkillFormation;
            formation = GModel.playerSkill.getFormation(current);
            state = GModel.playerSkill
                .getSkills()
                .sort((a, b) => a.getTbl().quality - b.getTbl().quality)
                .map((skill) => {
                    return {
                        status: 2,
                        id: skill.id,
                        chosen: formation.some((f) => f === skill.id),
                        cb: async () => {
                            let i = formation.findIndex((f) => f === skill.id);
                            if (i !== -1) {
                                formation[i] = -1;
                                await GModel.playerSkill.setFormation(current, formation);
                            } else {
                                let index = formation.findIndex((f) => f === -1);
                                if (index === -1) {
                                } else {
                                    formation[index] = skill.id;
                                    await GModel.playerSkill.setFormation(current, formation);
                                }
                            }
                        },
                    };
                });
        } else {
            //同伴
            current = GState.data.currentPetFormation;
            formation = GModel.pet.getFormation(current);
            state = GModel.pet
                .getPets()
                .sort((a, b) => a.getTbl().quality - b.getTbl().quality)
                .map((pet) => {
                    return {
                        status: 2,
                        id: pet.id,
                        chosen: formation.some((f) => f === pet.id),
                        cb: async () => {
                            let i = formation.findIndex((f) => f === pet.id);
                            if (i !== -1) {
                                formation[i] = -1;
                                await GModel.pet.setFormation(current, formation);
                            } else {
                                let index = formation.findIndex((f) => f === -1);
                                if (index === -1) {
                                } else {
                                    formation[index] = pet.id;
                                    await GModel.pet.setFormation(current, formation);
                                }
                            }
                        },
                    };
                });
        }
        this.skills.setState(state);
    }
}
