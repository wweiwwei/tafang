import { autowired, registerClass } from "../../../framework/Decorator";
import UIButton from "../../../framework/ui/UIButton";
import UILabel from "../../../framework/ui/UILabel";
import UIList from "../../../framework/ui/UIList";
import UIWindow from "../../../framework/ui/UIWindow";
import { WindowOpenAnimationEnum, WindowOpenOption } from "../../../framework/ui/GWindow";
import Hero from "../../entity/Hero";
import ListItemImprove2 from "./ListItemImprove2";
import UIImage from "../../../framework/ui/UIImage";
import ListItemStarItem from "../common/ListItemStarItem";
import UISpine from "../../../framework/ui/UISpine";
import UIRichText from "../../../framework/ui/UIRichText";

const { ccclass, property } = cc._decorator;
@registerClass("WindowUprankImprove")
@ccclass
export default class WindowUprankImprove extends UIWindow {
    static defaultOpentOption: Partial<WindowOpenOption> = {
        animation: WindowOpenAnimationEnum.default,
    };
    _windowParam: {
        origin: Hero;
        uniqueId: number;
        status: number; //0-star,1-rank
    };
    _returnValue: any;
    /**标题 */
    @autowired(UILabel) titleLabel: UILabel = null;
    /**战力 */
    @autowired(UILabel) oldpower: UILabel = null;
    @autowired(UILabel) newpower: UILabel = null;
    /**提升属性 */
    @autowired(UIList) improve: UIList<ListItemImprove2> = null;
    /**新旧技能 */
    @autowired(UIButton) oldskill: UIButton = null;
    @autowired(UIButton) newskill: UIButton = null;
    /**必杀技 */
    @autowired(cc.Node) mainskill: cc.Node = null;
    /**普攻 */
    @autowired(cc.Node) normal: cc.Node = null;
    /**技能节点 */
    @autowired(cc.Node) skills: cc.Node = null;
    /**天赋节点 */
    @autowired(cc.Node) talent: cc.Node = null;
    /**星级节点 */
    @autowired(cc.Node) star: cc.Node = null;
    @autowired(UISpine) heroSpine: UISpine = null;
    @autowired(UILabel) level1: UILabel = null;
    @autowired(UILabel) level2: UILabel = null;
    @autowired(UIRichText) improval: UIRichText = null;
    /**技能描述 */
    @autowired(UIImage) skillDescription: UIImage = null;
    @autowired(UILabel) skillName: UILabel = null;
    @autowired(UILabel) skillKind: UILabel = null;
    @autowired(UILabel) description: UILabel = null;
    /**升星后星级展示容器 */
    @autowired(UIList) upStarList: UIList<ListItemStarItem> = null;
    /**升星前星级展示容器 */
    @autowired(UIList) stars: UIList<ListItemStarItem> = null;
    private clicked = -1;
    protected onInited(): void {
        let btn = this.node.getChildByName("content").getChildByName("bg").getComponent(UIButton);
        btn.onClick = () => {
            this.clicked = -1;
            this.skillDescription.node.active && (this.skillDescription.node.active = false);
        };
        btn.setTransition(false);
        let closebtn = this.node.getComponent(UIButton);
        closebtn.onClick = () => this.close();
        closebtn.setTransition(false);
        this.windowInit();
    }
    /**初始化数据 */
    windowInit() {
        let hero = GModel.hero.getHeroByUniqueId(this._windowParam.uniqueId);
        let maintbl = hero.getMainSkillTbl();
        let normaltbl = hero.getNormalAttackTbl();
        this.heroSpine.setSpine(hero.getImg(), "default", "idle");
        this.node.getChildByName("content").getChildByName("HeroUpGrade_Effect").getComponent(cc.Animation).play();
        this.heroSpine.node.scale = 0.7;
        let state: {
            property: string;
            oldval: string | number;
            newval: string | number;
        }[];
        let oldval: string | number;
        let newval: string | number;
        if (this._windowParam.status === 0) {
            this.talent.active = false;
            this.titleLabel.setText([GLang.code.ui.star_improve]);
            this.improval.setText([GLang.code.ui.skill_improve]);
            if (hero.getSkillLevel()[1] > this._windowParam.origin.getSkillLevel()[1]) {
                this.skillName.setText([maintbl.name]);
                this.skillKind.setText([GLang.code.ui.hero_skill_active]);
                this.newskill.onClick = () => this.showskill(hero, 1);
                this.oldskill.onClick = () => this.showskill(this._windowParam.origin, 1);
                this.normal.active = false;
                this.newskill.bg.imgName = maintbl.img;
                this.oldskill.bg.imgName = maintbl.img;
                this.level1.setText(["_rslv." + this._windowParam.origin.getSkillLevel()[1]]);
                this.level2.setText(["_rslv." + hero.getSkillLevel()[1]]);
            } else {
                this.skillName.setText([hero.getNormalAttackTbl().name]);
                this.skillKind.setText([GLang.code.ui.hero_normal_attack]);
                this.newskill.onClick = () => this.showskill(hero, 0);
                this.oldskill.onClick = () => this.showskill(this._windowParam.origin, 0);
                this.mainskill.active = false;
                this.newskill.bg.imgName = normaltbl.img;
                this.oldskill.bg.imgName = normaltbl.img;
                this.level1.setText(["_rslv." + this._windowParam.origin.getSkillLevel()[0]]);
                this.level2.setText(["_rslv." + hero.getSkillLevel()[0]]);
            }
            //  else {
            //     this.improval.node.active = false;
            //     this.skills.active = false;
            // }
            this.upStarList.setState(this._windowParam.origin.getStarItem(1));
            this.stars.setState(this._windowParam.origin.getStarItem(1));
            let index = hero
                .getStarItem(1)
                .findIndex((s, i) => s.level !== this._windowParam.origin.getStarItem(1)[i].level);
            this.scheduleOnce(() => {
                this.upStarList.setState(hero.getStarItem(1));
                this.upStarList.node.children[index].getComponent(cc.Animation).play();
            }, 0.3);
            let arr = ["attack", "armor", "maxHp"];
            state = arr.map((t) => {
                oldval = this._windowParam.origin.getStarBuff() / 100 + "%";
                newval = hero.getStarBuff() / 100 + "%";
                return { property: t, oldval, newval };
            });
        } else {
            this.star.active = false;
            this.skills.active = false;
            this.titleLabel.setText([GLang.code.ui.rank_improve]);
            // this.improval.setText([GLang.code.ui.hero_unlock_talent]);
            this.talent.children.forEach((c, i) => {
                if (c.children.length > 0) {
                    c.children[0].getChildByName("image").getComponent(UIImage).imgName = hero.getImg() + "_head";
                    c.children[0].getChildByName("bg").getComponent(UIImage).imgName =
                        GConstant.heroQuality[hero.getQuality()];
                    // + (hero.rank > 0 ? "+" + hero.rank : "");
                    c.children[0].getChildByName("gift").getComponent(UIImage).imgName = GConstant.getHeroKindIcon(
                        hero.getKind()
                    );
                    c.children[0]
                        .getChildByName("heroname")
                        .getComponent(UILabel)
                        .setText([hero.getTbl().name], ["_rs+" + (i > 0 ? hero.rank : this._windowParam.origin.rank)]);
                    c.children[0].getChildByName("heroname").color = GConstant.heroNameQuality[hero.getQuality()];
                }
            });
            this.improval.setText([GLang.code.ui.hero_unlock_talent], ...hero.getRankTalent(hero.rank));
            let arr = ["attack", "armor", "maxHp"];
            state = arr.map((t) => {
                oldval = this._windowParam.origin.getProperty(GConstant.propertyList[t]);
                newval = hero.getProperty(GConstant.propertyList[t]);
                return { property: t, oldval, newval };
            });
            state.unshift({
                property: "ui/hero_limit",
                oldval: GConfig.hero.rankLevelLimit[this._windowParam.origin.rank],
                newval: GConfig.hero.rankLevelLimit[hero.rank],
            });
        }
        this.improve.setState(state);
        this.oldpower.setText(["_rs" + this._windowParam.origin.getBattlePoint()]);
        this.newpower.setText(["_rs" + hero.getBattlePoint()]);
    }
    showskill(hero: Hero, index: number) {
        this.skillDescription.node.active = this.clicked !== hero.getSkillLevel()[index];
        this.clicked = this.clicked === hero.getSkillLevel()[index] ? -1 : hero.getSkillLevel()[index];
        if (index === 0) {
            this.description.setText(hero.getNormalAttackDescription());
        } else {
            this.description.setText(hero.getMainSkillDescription());
        }
    }
}
