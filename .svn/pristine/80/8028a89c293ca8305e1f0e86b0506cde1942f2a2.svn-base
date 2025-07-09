import ResourceLoader from "../ResourceLoader";

export class UIUtil {
    /** 获取节点完整路径 */
    getNodeFullPath(node: cc.Node) {
        let path = node.name;
        let parent = node.parent;
        while (parent) {
            path = parent.name + "/" + path;
            parent = parent.parent;
        }
        return path;
    }

    /**
     * 递归遍历所有子节点，并进行某一操作
     *
     */
    traverseAllChild(node: cc.Node, cb: (node: cc.Node) => void) {
        node.children.forEach((child) => {
            cb(child);
            this.traverseAllChild(child, cb);
        });
    }
    /** 修改节点的group */
    setGroup(node: cc.Node, group: string) {
        node.group = group;
        this.traverseAllChild(node, (n) => {
            n.group = group;
        });
    }

    /**
     * 递归遍历所有子节点，设置材质
     *
     */
    setAllChildSpMaterials(node: cc.Node, material: cc.Material) {
        const sp = node.getComponent(cc.Sprite);
        if (sp) {
            sp.setMaterial(0, material);
        }
        this.traverseAllChild(node, (node: cc.Node) => {
            const sp = node.getComponent(cc.Sprite);
            if (sp) {
                if (sp.getMaterial(0)) {
                    sp.setMaterial(0, material);
                }
            }
        });
    }
    /**保留小数点,整数时取整 */
    getFixed(num: number, toFixed: number) {
        return this.fixFormat(num.toFixed(toFixed));
    }

    /** 去除小数部分 */
    private fixFormat(fixedNum: string): string {
        let decimalIndex = fixedNum.indexOf("."); // 获取小数点的索引位置

        if (decimalIndex !== -1) {
            // 如果存在小数部分
            let decimalPart = fixedNum.slice(decimalIndex + 1); // 获取小数部分
            let lastNonZeroIndex = decimalPart.search(/[^0]/); // 查找最后一个非零数字的索引

            if (lastNonZeroIndex === -1) {
                // 如果小数部分全为零
                return fixedNum.slice(0, decimalIndex); // 返回整数部分
            } else {
                return fixedNum.slice(0, decimalIndex + lastNonZeroIndex + 2); // 返回整数部分和非零小数部分
            }
        } else {
            return fixedNum; // 返回整数部分
        }
    }

    /** 将节点设置为灰色 */
    setAllChildSpGray(node: cc.Node) {
        const m = ResourceLoader.internalResource.grayMaterial;
        this.setAllChildSpMaterials(node, m);
    }

    /** 将节点设置为常规 */
    setAllChildSpNormal(node: cc.Node) {
        const m = ResourceLoader.internalResource.normalMaterial;
        this.setAllChildSpMaterials(node, m);
    }

    /**
     * 获取数字的字符串表示
     * @param num 数字
     * @param toFixed 保留小数位数
     * */
    getNumberString(num: number, toFixed: number) {
        if (num < 10e3) {
            return num.toString();
        } else if (num < 10e6) {
            return (num / 1e3).toFixed(toFixed).replace(/\.?0+$/, "") + "K";
        } else if (num < 1e9) {
            return (num / 1e6).toFixed(toFixed).replace(/\.?0+$/, "") + "M";
        } else if (num < 1e12) {
            return (num / 1e9).toFixed(toFixed).replace(/\.?0+$/, "") + "G";
        } else if (num < 1e15) {
            return (num / 1e12).toFixed(toFixed).replace(/\.?0+$/, "") + "T";
        } else if (num < 1e18) {
            return (num / 1e15).toFixed(toFixed).replace(/\.?0+$/, "") + "P";
        } else if (num < 1e21) {
            return (num / 1e18).toFixed(toFixed).replace(/\.?0+$/, "") + "E";
        } else if (num < 1e24) {
            return (num / 1e21).toFixed(toFixed).replace(/\.?0+$/, "") + "Z";
        } else if (num < 1e27) {
            return (num / 1e24).toFixed(toFixed).replace(/\.?0+$/, "") + "Y";
        } else if (num < 1e30) {
            return (num / 1e27).toFixed(toFixed).replace(/\.?0+$/, "") + "B";
        } else if (num < 1e33) {
            return (num / 1e30).toFixed(toFixed).replace(/\.?0+$/, "") + "N";
        } else {
            return (num / 1e33).toFixed(toFixed).replace(/\.?0+$/, "") + "D";
        }
    }

    /** rect变换 */
    transformRect(worldRect: cc.Rect, node: cc.Node): cc.Rect {
        const { x, y } = worldRect;
        const { width, height } = worldRect;
        const v = node.convertToNodeSpaceAR(cc.v2(x, y));
        return cc.rect(v.x, v.y, width, height);
    }

    /** 贝塞尔曲线计算 */
    bezierCurve(p0: cc.Vec2, p1: cc.Vec2, p2: cc.Vec2, t: number): cc.Vec2 {
        let result = cc.v2();
        let t1 = 1 - t;
        let t2 = t1 * t1;
        result.x = t2 * p0.x + 2 * t * t1 * p1.x + t * t * p2.x;
        result.y = t2 * p0.y + 2 * t * t1 * p1.y + t * t * p2.y;
        return result;
    }
}
