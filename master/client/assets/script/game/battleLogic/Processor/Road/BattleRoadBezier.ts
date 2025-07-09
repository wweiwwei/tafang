import { BattleVec } from "../../Map/BattleVec";
import { IBattleRoad } from "./IBattleRoad";

export class BattleRoadBezier implements IBattleRoad {
    getTotalLength(): number {
        let res = 0;
        this.curveData.forEach((d) => {
            res += d.len;
        });
        return res;
    }

    getPointAt(baseP: number): {
        pos: { x: number; y: number };
        direction: { x: number; y: number };
    } {
        const p = baseP - Math.floor(baseP);
        let pos: { x: number; y: number };
        let direction = { x: 1, y: 0 };
        for (let i = 0; i < this.ratio.length; i++) {
            if (p <= this.ratio[i]) {
                const last = this.ratio[i - 1] || 0;
                const offset = p - last;
                const t = Math.ceil((offset / (this.ratio[i] - last)) * 10000);
                const curveData = this.curveData[i];
                const res = BattleVec.bezier(curveData.p1, curveData.p2, curveData.p3, curveData.lenList[t]);
                pos = { x: res[0] + this.x, y: res[1] + this.y };
                if (curveData.p3[0] > curveData.p1[0]) {
                    direction = { x: 1, y: 0 };
                } else {
                    direction = { x: -1, y: 0 };
                }
                break;
            }
        }
        return {
            pos,
            direction,
        };
    }

    private curveData: {
        p1: number[];
        p2: number[];
        p3: number[];
        len: number;
        lenList: number[];
    }[] = [];
    private ratio: number[] = [];
    x: number;
    y: number;
    init(pos: number[], scale: number, data: number[][]) {
        this.x = pos[0];
        this.y = pos[1];
        data.forEach((d) => {
            const x1 = d[0] * scale;
            const y1 = d[1] * scale;
            const x2 = d[2] * scale;
            const y2 = d[3] * scale;
            const offset = d[4] * scale;
            const p1 = [x1, y1];
            const p2 = [(x1 + x2) / 2, (y1 + y2) / 2 + offset];
            const p3 = [x2, y2];
            const info = this.calculateBezierLength(p1, p2, p3);
            this.curveData.push({
                p1,
                p2,
                p3,
                len: info.len,
                lenList: info.lenList,
            });
        });
        const total = this.getTotalLength();
        let acc = 0;
        this.ratio = this.curveData.map((d) => {
            acc += d.len;
            return acc / total;
        });
    }
    private calculateBezierLength(
        p1: number[],
        p2: number[],
        p3: number[]
    ): {
        len: number;
        lenList: number[];
    } {
        let pList: number[][] = [];
        for (let i = 0; i <= 10000; i++) {
            const t = i / 10000;
            pList.push(BattleVec.bezier(p1, p2, p3, t));
        }
        let len = 0;
        let temp: number[] = [];
        for (let i = 0; i < 10000; i++) {
            const add = BattleVec.distance(pList[i], pList[i + 1]);
            len += add;
            temp.push(len);
        }
        temp = temp.map((d) => Math.round((d /= len) * 10000));
        const lenList: number[] = [];
        for (let i = 0; i < temp.length; i++) {
            const v = temp[i];
            while (lenList.length < v) {
                lenList.push(i * 0.0001);
            }
        }
        lenList.push(1);
        return {
            len,
            lenList,
        };
    }
}
