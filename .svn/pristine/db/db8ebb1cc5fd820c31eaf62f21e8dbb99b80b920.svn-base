import { EquipmentMonster } from "../../../entity/EquipmentMonster";
import EquipmentSceneData from "./EquipmentSceneData";

export default class EquipmentSceneMonster {
    constructor(public ctx: EquipmentSceneData, public _info: EquipmentMonster) {
        this.initPos();
        this.info = { ..._info };
        this.tbl = GTable.getList("EquipmentMonsterTbl").find((t) => t.quality === this.info.quality);
    }
    pos: { x: number; y: number };
    direction: { x: number; y: number };

    info: EquipmentMonster;
    tbl: EquipmentMonsterTbl;

    private initPos() {
        const initPos = this.ctx.monsterInitPos;
        this.pos = {
            x: (initPos.x[1] - initPos.x[0]) * Math.random() + initPos.x[0],
            y: (initPos.y[1] - initPos.y[0]) * Math.random() + initPos.y[0],
        };
        this.direction = this.randomDirection();
    }

    private randomDirection() {
        // 生成随机角度（弧度制）
        const angle = Math.random() * Math.PI * 2;

        // 计算向量的 x 和 y 分量
        const x = Math.cos(angle);
        const y = Math.sin(angle);

        // 创建单位向量对象
        const unitVector = {
            x: x,
            y: y,
        };

        return unitVector;
    }
    tick() {
        this.updateMonsterPos({ pos: this.pos, direction: this.direction });
    }
    /** 更新怪物位置 */
    private updateMonsterPos(data: { pos: { x: number; y: number }; direction: { x: number; y: number } }) {
        // 边界检查，到达边缘修改方向
        let yBorder = 0;
        let xBorder = 0;
        const borders = this.ctx.monsterBorder;
        if (data.pos.x < borders.x[0]) {
            xBorder = 1;
        } else if (data.pos.x > borders.x[1]) {
            xBorder = -1;
        }
        if (data.pos.y < borders.y[0]) {
            yBorder = 1;
        } else if (data.pos.y > borders.y[1]) {
            yBorder = -1;
        }
        if (yBorder === 0 && xBorder === 0) {
            data.pos.x += data.direction.x * GConstant.equipmentScene.monsterSpeed;
            data.pos.y += data.direction.y * GConstant.equipmentScene.monsterSpeed;
        } else {
            // 到达边界，更改方向
            const direction = this.randomDirection();
            data.direction.x = xBorder === 0 ? direction.x : Math.abs(direction.x) * xBorder;
            data.direction.y = yBorder === 0 ? direction.y : Math.abs(direction.y) * yBorder;
            data.pos.x += xBorder * GConstant.equipmentScene.monsterSpeed;
            data.pos.y += yBorder * GConstant.equipmentScene.monsterSpeed;
        }
    }

    hit(all: boolean) {
        if (all) {
            this.info.life = 0;
        } else {
            this.info.life -= 1;
        }
    }

    die() {}
}
