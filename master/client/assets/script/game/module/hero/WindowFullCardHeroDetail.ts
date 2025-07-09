import { autowired, message, registerClass } from "../../../framework/Decorator";
import UIButton from "../../../framework/ui/UIButton";
import UIImage from "../../../framework/ui/UIImage";
import UILabel from "../../../framework/ui/UILabel";
import UIWindow from "../../../framework/ui/UIWindow";
import { WindowOpenAnimationEnum, WindowOpenOption } from "../../../framework/ui/GWindow";
import Hero from "../../entity/Hero";
import UISpine from "../../../framework/ui/UISpine";
import ResourceLoader from "../../../framework/ResourceLoader";

const { ccclass } = cc._decorator;

@registerClass("WindowFullCardHeroDetail")
@ccclass
export default class WindowFullCardHeroDetail extends UIWindow {
    static defaultOpentOption: Partial<WindowOpenOption> = {
        animation: WindowOpenAnimationEnum.default,
    };
    _windowParam: {
        hero: Hero;
        endFunc: Function;
    };
    _returnValue: any;

    // /**返回按钮 */
    // @autowired(cc.Animation) content: cc.Animation = null;
    /**返回按钮 */
    @autowired(UIButton) return: UIButton = null;
    /**普攻 */
    @autowired(UIButton) normal: UIButton = null;
    /**必杀 */
    @autowired(UIButton) mainskill: UIButton = null;
    /**普攻图 */
    @autowired(UIImage) normalbg: UIImage = null;
    /**必杀图 */
    @autowired(UIImage) mainbg: UIImage = null;
    /**普工等级 */
    @autowired(UILabel) normalLevel: UILabel = null;
    /**必杀等级 */
    @autowired(UILabel) mainLevel: UILabel = null;
    /**英雄名 */
    @autowired(UILabel) heroName: UILabel = null;
    /**英雄阶数 */
    @autowired(UILabel) stage: UILabel = null;
    /**英雄职业 */
    @autowired(UIImage) gift: UIImage = null;
    /** 英雄阴影 */
    @autowired(UIImage) shadow: UIImage = null;
    /** 英雄spine */
    @autowired(UISpine) heroSpine: UISpine = null;

    private animation: cc.Animation = null;
    private animNameArr: string[] = ["idle", "attack", "skill"];
    private switchAnimNameIndex: number = 0;
    private switchIntervalTime: number = 10;
    private isSwitchPlayAnim: boolean = true;

    protected onInited(): void {
        this.animation = this.node.getChildByName("content").getComponent(cc.Animation);
        this.animation.play("WindowCardNewHero_Ani");
        this.animation.on("stop", () => {
            this.animation.play("WindowCNHLoop_Ani");
        });

        this.heroInit();
        this.btnRefresh();
    }

    btnRefresh() {
        this.return.onClick = () => {
            if (this._windowParam.endFunc) this._windowParam.endFunc();
            this.close();
        };

        this.heroSpine.node.on(cc.Node.EventType.TOUCH_START, () => {
            // if (this.isSwitchPlayAnim) {
            //     this.isSwitchPlayAnim = false;
            //     this.scheduleOnce(() => {
            //         this.isSwitchPlayAnim = true;
            //     }, this.switchIntervalTime);
            // }
            this.switchAnimNameIndex++;
            if (this.switchAnimNameIndex > 2) {
                this.switchAnimNameIndex = 0;
            }
            this.heroSpine.changeAnimation(this.animNameArr[this.switchAnimNameIndex], true);

            // let track = spine.setAnimation(0, animName, loop);
            // if (track) {
            //     // 注册动画的结束回调
            //     spine.setCompleteListener((trackEntry, loopCount) => {
            //         let name = trackEntry.animation ? trackEntry.animation.name : "";
            //         if (name === animName && callback) {
            //             callback(); // 动画结束后执行自己的逻辑
            //         }
            //     });
            // }
        });
    }

    /**数据展示初始化 */
    heroInit() {
        let hero = GModel.hero.getHeroByUniqueId(this._windowParam.hero.uniqueId);
        let tbl = hero.getTbl();
        if (ResourceLoader.isSpineExist(hero.getImg())) {
            this.heroSpine.setSpine(tbl.img, "default", "run");
            this.heroSpine.node.scale = 0.7;
            this.heroSpine.node.active = true;
        } else {
            this.heroSpine.node.active = false;
        }

        this.refreshSkills();
        this.heroName.setText([tbl.name]);
        this.heroName.node.color = GConstant.heroNameQuality[hero.getQuality()];
        this.stage.setText(["_rs" + "+" + hero.rank]);
        this.stage.node.active = hero.rank > 0;
        this.stage.node.color = GConstant.heroNameQuality[hero.getQuality()];
        this.gift.imgName = "hero_kind_" + tbl.kind;

        this.refreshEquip();
    }

    /**刷新技能展示 */
    refreshSkills() {
        let hero = GModel.hero.getHeroByUniqueId(this._windowParam.hero.uniqueId);
        let skillLevel = hero.getSkillLevel();
        let maintbl = hero.getMainSkillTbl();
        let normaltbl = hero.getNormalAttackTbl();

        this.normalLevel.setText(["_rs" + skillLevel[0]]);
        this.mainLevel.setText(["_rs" + skillLevel[1]]);
        this.normalbg.imgName = normaltbl.img;
        this.mainbg.imgName = maintbl.img;
    }

    /**刷新装备展示 */
    refreshEquip() {
        /**穿戴 */
        let wear = false;
        /**可升级或升阶 */
        let enable = false;

        (enable || wear) && GModel.player.checkSystemUnlock(GConstant.systemId.equipment, false);
    }
}
