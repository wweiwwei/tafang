export class FirePenetrateBullet {
    title = "发射穿透子弹";

    constructor() {
        this.addInput("prev", "skillProcess");
        this.addInput("target", "battleObjectArray");
        this.addOutput("afterHit", "skillProcess");
        this.addOutput("next", "skillProcess");

        this.addProperty("speed", "10000");
        this.addWidget("text", "子弹速度", this.properties.speed, { property: "speed" });
        this.addProperty("curveType", "1");
        this.addWidget("text", "弹道类型", this.properties.curveType, { property: "curveType" });
        this.addProperty("count", "1");
        this.addWidget("text", "子弹数量", this.properties.count, { property: "count" });
        this.addProperty("img", "ball");
        this.addWidget("text", "子弹外观", this.properties.img, { property: "img" });
        this.addProperty("curveParam", "0");
        this.addWidget("text", "曲线参数", this.properties.curveParam, { property: "curveParam" });
        this.addProperty("scale", "1");
        this.addWidget("text", "缩放比例", this.properties.scale, { property: "scale" });
        this.addProperty("penetrateCount", "9999");
        this.addWidget("text", "子弹穿透", this.properties.penetrateCount, { property: "penetrateCount" });
        this.addProperty("maxDistance", "500");
        this.addWidget("text", "最大射程", this.properties.maxDistance, { property: "maxDistance" });
        this.addProperty("lockY", "1");
        this.addWidget("text", "锁定高度", this.properties.lockY, { property: "lockY" });
        this.addProperty("rect", "50|0|100|0");
        this.addWidget("text", "子弹方块（左右上下）", this.properties.rect, { property: "rect" });
    }
}
