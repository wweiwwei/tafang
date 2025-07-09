import { autowired, registerClass } from "../../../framework/Decorator";
import ResourceLoader from "../../../framework/ResourceLoader";
import UIListItem from "../../../framework/ui/UIListItem";
import { BattleDamage } from "../../battleLogic/Entity/BattleDamage";
import { BattleEnergyRecover } from "../../battleLogic/Entity/BattleEnergyRecover";
import { BattleEnergyReduce } from "../../battleLogic/Entity/BattleEnergyReduce";
import { BattleHeal } from "../../battleLogic/Entity/BattleHeal";
import { BattleBuff } from "../../battleLogic/Object/Buff/BattleBuff";
import { BattleBaseState } from "../../battleLogic/Object/State/BattleBaseState";
import WindowBattleScene from "./WindowBattleScene";

const { ccclass, property } = cc._decorator;

@registerClass("ListItemBattleDamageText")
@ccclass
export default class ListItemBattleDamageText extends UIListItem {
    static _poolSize: number = 20;

    @autowired(cc.Node) textContainer: cc.Node = null;

    state: {
        position: { x: number; y: number };
        data: BattleDamage | BattleHeal | BattleEnergyReduce | BattleEnergyRecover | BattleBuff | BattleBaseState;
    };
    setState(state: this["state"]): void {
        this.state = state;
        this.node.position = cc.v3(this.state.position.x, this.state.position.y + 80);
        const data = this.state.data;
        this.node.active = false;
        if (data instanceof BattleDamage) {
            if (!data.isHit) {
                this.setText(data.value.toString(), "dodge");
            } else if (data.damageText && data.damageText.length > 0) {
                this.setText(data.value.toString(), data.damageText);
            } else if (data.showCombo) {
                this.setText(data.value.toString(), "combo");
            } else if (data.isCrit) {
                this.setText(data.value.toString(), "crit");
            } else if (data.target.teamSide === 1) {
                if (data.tag.includes("skill1")) {
                    this.setText(data.value.toString(), "skill1");
                } else if (data.tag.includes("skill2")) {
                    this.setText(data.value.toString(), "skill2");
                } else if (data.tag.includes("skill3")) {
                    this.setText(data.value.toString(), "skill3");
                } else {
                    this.setText(data.value.toString(), "toDefend");
                }
            } else if (data.target.teamSide === 0) {
                this.setText(data.value.toString(), "toAttack");
            }
        } else if (data instanceof BattleHeal) {
            this.setText(data.value.toString(), "heal");
        } else if (data instanceof BattleBuff) {
            let type = "attackBuff";
            if (data.valueCache < 0) {
                if (data.target.teamSide === 0) {
                    type = "attackDebuff";
                } else {
                    type = "defenseDeBuff";
                }
            }
            this.setText("", type);
        } else if (data instanceof BattleBaseState) {
            this.setText("", data.stateType);
        }
    }

    doTween() {
        this.node.active = true;
        cc.tween(this.node)
            .by(0.5, { y: 100 }, { easing: "sineOut" })
            .call(() => {
                this.recycle();
            })
            .start();
    }

    setText(text: string, type: string) {
        let nameFunc = GConstant.battle.damageText[type];
        let list = text.split("");
        if (type === "combo") {
            list.unshift("combo");
            // list.unshift("sub");
        } else if (type === "crit") {
            // list.unshift("crit");
            list.unshift("sub");
        } else if (type === "dodge") {
            list = ["dodge"];
        } else if (
            type === "toDefend" ||
            type === "toAttack" ||
            type === "skill1" ||
            type === "skill2" ||
            type === "skill3"
        ) {
            list.unshift("sub");
        } else if (type === "heal") {
            list.unshift("add");
        } else if (type === "lifeRemove") {
            list.unshift("lifeRemove");
        } else if (["attackBuff", "attackDebuff", "defenseDeBuff"].includes(type)) {
            // buff附加
            const data = this.state.data as BattleBuff;
            const value = data.showPercent ? data.percent : data.valueCache;
            const number = value.toString().split("");
            if (data.showPercent) {
                number.push("percent");
            }
            if (number[0] === "-") {
                number.shift();
                number.push("down");
            } else {
                number.push("up");
            }
            if (data.property === "defence") {
                // 这里主要是图片命名错了，待修改
                list = ["defense"].concat(number);
            } else {
                list = [data.property.toString()].concat(number);
            }
        } else if (["stupor"].includes(type)) {
            // 状态附加
            const data = this.state.data as BattleBaseState;
            if (data.target.teamSide === 0) {
                nameFunc = GConstant.battle.damageText.attackAbnormalState;
            } else {
                nameFunc = GConstant.battle.damageText.defenseAbnormalState;
            }
            list = [data.stateType];
        }
        this.syncText(list.map((c) => nameFunc(c)));
    }

    syncText(list: string[]) {
        const atlas = ResourceLoader.damageTextAtlas;
        list.forEach((c, i) => {
            if (this.textContainer.children[i]) {
                const node = this.textContainer.children[i];
                const sprite = node.getComponent(cc.Sprite);
                sprite.spriteFrame = atlas.getSpriteFrame(c);
                node.active = true;
            } else {
                const node = new cc.Node();
                const sprite = node.addComponent(cc.Sprite);
                sprite.spriteFrame = atlas.getSpriteFrame(c);
                node.parent = this.textContainer;
            }
        });
        for (let i = list.length; i < this.textContainer.childrenCount; i++) {
            this.textContainer.children[i].active = false;
        }
    }
}
