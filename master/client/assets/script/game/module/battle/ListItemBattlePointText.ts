import { autowired, registerClass } from "../../../framework/Decorator";
import ResourceLoader from "../../../framework/ResourceLoader";
import UIListItem from "../../../framework/ui/UIListItem";

const { ccclass, property } = cc._decorator;
@registerClass("ListItemBattlePointText")
@ccclass
export default class ListItemBattlePointText extends UIListItem {
    @autowired(cc.Node) textContainer: cc.Node = null;
    @autowired(cc.Node) textContainer2: cc.Node = null;
    state: {
        /** 原来的战斗力 */
        origin: number;
        /** 最终的战斗力 */
        final: number;
    };
    setState(state: this["state"]): void {
        this.state = state;
        let d = Math.abs(this.state.origin - this.state.final);
        this.setPart1(this.state.origin.toString());
        this.setPart2(
            this.state.origin !== this.state.final ? (this.state.origin > this.state.final ? "-" : "+") + d : ""
        );
        this.scheduleOnce(this.combine, 0.5);
    }

    combine() {
        this.node.getComponent(cc.Layout).enabled = false;
        this.textContainer2.zIndex = -1;
        cc.tween(this.textContainer2)
            .by(0.2, { x: -this.textContainer2.width })
            .call(() => {
                this.textContainer2.active = false;
            })
            .start();
        this.schedule(this.roll, 0.017, 29);
    }
    private rollTime = 0;

    roll() {
        this.rollTime++;
        const d = this.state.final - this.state.origin;
        const cur = Math.round(this.state.origin + (d * this.rollTime) / 30);
        const text = cur.toString();
        this.setPart1(text);
    }

    setPart1(text: string) {
        const part1: string[] = ["battle_text_h_bp"];
        let list = text.split("");
        for (let i = 0; i < list.length; i++) {
            const c = list[i];
            part1.push(`battle_text_h_${c}`);
        }
        this.syncText(this.textContainer, part1);
    }

    setPart2(text: string) {
        const part2: string[] = [];
        let list = text.split("");
        let mode: "add" | "sub" = "add";
        for (let i = 0; i < list.length; i++) {
            const c = list[i];
            if (c === "+") {
                mode = "add";
                part2.push("battle_text_i_plus");
            } else if (c === "-") {
                mode = "sub";
                part2.push("battle_text_j_sub");
            } else {
                if (mode === "add") {
                    part2.push(`battle_text_i_${c}`);
                } else if (mode === "sub") {
                    part2.push(`battle_text_j_${c}`);
                }
            }
        }
        if (mode === "add") {
            part2.push("battle_text_i_up");
        } else if (mode === "sub") {
            part2.push("battle_text_j_down");
        }
        this.syncText(this.textContainer2, part2);
    }

    syncText(container: cc.Node, list: string[]) {
        const atlas = ResourceLoader.damageTextAtlas;
        list.forEach((c, i) => {
            if (container.children[i]) {
                const node = container.children[i];
                const sprite = node.getComponent(cc.Sprite);
                sprite.spriteFrame = atlas.getSpriteFrame(c);
                node.active = true;
            } else {
                const node = new cc.Node();
                const sprite = node.addComponent(cc.Sprite);
                sprite.spriteFrame = atlas.getSpriteFrame(c);
                node.parent = container;
            }
        });
        for (let i = list.length; i < container.childrenCount; i++) {
            container.children[i].active = false;
        }
    }
}
