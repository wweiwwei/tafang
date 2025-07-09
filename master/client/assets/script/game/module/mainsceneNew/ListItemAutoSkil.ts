import { autowired, registerClass } from "../../../framework/Decorator";
import UIButton from "../../../framework/ui/UIButton";
import UIImage from "../../../framework/ui/UIImage";
import UILabel from "../../../framework/ui/UILabel";
import UIListItem from "../../../framework/ui/UIListItem";
import UISpine from "../../../framework/ui/UISpine";
const { ccclass, property } = cc._decorator;
@registerClass("ListItemAutoSkil")
@ccclass
export default class ListItemAutoSkil extends UIListItem {
    /**技能精灵 */
    @autowired(UIImage) skillImage: UIImage = null;
    /**拒绝 */
    @autowired(UISpine) icon: UISpine = null;
    /**时间 */
    @autowired(UILabel) time_label: UILabel = null;

    /**按钮是否可以交互 */
    private interactable: boolean = true;

    state: {
        id: number;
        time: number /**冷却时长 */;
        isshow_label?: boolean /**是否显示技能冷却时间 */;
        isUnlock: boolean;
    };
    setState(state: this["state"]): void {
        this.state = state;
        this.icon.node.on(cc.Node.EventType.TOUCH_END, () => {
            if (this.interactable) this.onbtn();
            else if (state.isUnlock) {
                GTip.showTip(["_rs未解锁"]);
                return;
            } else {
                GTip.showTip(["_rs技能冷却中"]);
                return;
            }
        });

        if (state.isUnlock) {
            this.skillImage.imgName = "";
            this.interactable = true;
        } else {
            this.skillImage.imgName = "";
            this.interactable = false;
        }
        this.skillImage.fillRange = 1; //游戏开始的时候技能的填充范围是1
    }

    update(dt: number) {
        if (this.skillImage.fillRange != 1) {
            //如果技能精灵的填充不为1 也就是说已经使用了技能
            this.skillImage.fillRange += dt / this.state.time; //恢复技能   每帧恢复的值为帧率 / 技能冷却时间
            this.time_label.string = Math.floor((1 - this.skillImage.fillRange) * this.state.time).toString(); //每帧更新技能剩余时间
            //技能剩余时间首先1 - 技能精灵的填充度再 * 技能冷却时间，最后Math.floor取整

            if (this.state.isshow_label == true) {
                //如果可以显示文字
                this.time_label.node.active = true; //显示技能冷却剩余时间
            }
        }
        if (this.skillImage.fillRange == 1) {
            //如果技能精灵的填充为1 也就是说技能还没被使用
            this.interactable = true; //启动按钮
            this.time_label.node.active = false; //隐藏技能冷却剩余时间
        }
    }

    onbtn() {
        //按下技能按钮时的事件
        this.skillImage.fillRange = 0; //技能填充范围设置为0
        console.log("使用了技能");
        this.interactable = false; //禁用按钮
    }
}
