import UISpine from "../../../framework/ui/UISpine";
import Hero from "../../entity/Hero";

const { ccclass, property } = cc._decorator;

@ccclass
export default class DrawCardAnimationEven extends cc.Component {
    @property(cc.Node) heroParentNode: cc.Node = null;
    heroStopMove() {
        this.heroParentNode.getComponent(UISpine).changeAnimation("idle", true);
    }
}
