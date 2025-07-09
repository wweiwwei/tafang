export default class ManorModel {
    gridBlock = 65;
    getMap() {
        return GState.data.manorData;
    }
    setMap(id: number, x: number, y: number) {
        return GApi.manor.setMap({ id, x, y });
    }
    removeMapItem(id: number, index: number) {
        return GApi.manor.removeMapItem({ id, index });
    }
    getMapMatrix() {
        let map = this.getMap();
        let mapArr: number[][] = [];
        for (let i = 0; i < GConstant.manorGrid.vertical; i++) {
            mapArr.push(new Array(GConstant.manorGrid.horizental).fill(-1));
        }
        Object.keys(map).forEach((id) => {
            let area: number[] = [];
            let facility = GTable.getById("ManorFacilityTbl", Number(id));
            let decoration = GTable.getById("ManorDecorationTbl", Number(id));
            if (facility) {
                area = facility.area;
            } else {
                area = decoration.area;
            }
            /*[[1,1],[2,2]]*/
            let pos = map[Number(id)];
            pos.forEach((list) => {
                for (let y = 0; y < area[1]; y++) {
                    for (let x = 0; x < area[0]; x++) {
                        mapArr[list[1] + y][list[0] + x] = Number(id);
                    }
                }
            });
        });
        // console.log(mapArr);
        return mapArr;
    }
    getIdleMatrix() {
        var newArr = this.getMapMatrix().map((arr) => arr.map((i) => i == -1));
        // console.log(newArr);
        return newArr;
    }
    zeroPoint = {
        x: -((GConstant.manorGrid.horizental - 1) / 2) * this.gridBlock,
        y: -((GConstant.manorGrid.vertical - 1) / 2) * this.gridBlock,
    };
    /** 获取建筑包围盒 */
    getBuildingRect(id: number) {
        let facility = GTable.getById("ManorFacilityTbl", Number(id));
        let decoration = GTable.getById("ManorDecorationTbl", Number(id));
        const width = this.gridBlock * (facility ? facility.area[0] : decoration.area[0]);
        const height = this.gridBlock * (facility ? facility.area[1] : decoration.area[1]);
        return new cc.Rect(-width / 2, -height / 2, width, height);
    }
    /** 游戏坐标系转格子坐标系（不取整） */
    gamePosToBlockPos(p: { x: number; y: number }): { x: number; y: number } {
        const relatePos = { x: p.x - this.zeroPoint.x, y: p.y - this.zeroPoint.y };
        return { x: relatePos.x / this.gridBlock, y: relatePos.y / this.gridBlock };
    }

    /** 格子坐标系转游戏坐标系（不取整） */
    blockPosToGamePos(p: { x: number; y: number }): { x: number; y: number } {
        const relatePos = { x: p.x * this.gridBlock, y: p.y * this.gridBlock };
        return { x: relatePos.x + this.zeroPoint.x, y: relatePos.y + this.zeroPoint.y };
    }

    /** 用建筑左下角坐标和建筑id算出建筑中心坐标（纯格子坐标系转换） */
    leftBottomToCenter(id: number, p: { x: number; y: number }): { x: number; y: number } {
        let facility = GTable.getById("ManorFacilityTbl", Number(id));
        let decoration = GTable.getById("ManorDecorationTbl", Number(id));
        const centerPos = {
            x: p.x + ((facility ? facility.area[0] : decoration.area[0]) - 1) * 0.5,
            y: p.y + ((facility ? facility.area[1] : decoration.area[1]) - 1) * 0.5,
        };
        return centerPos;
    }

    /** 用建筑中心坐标和建筑id算出左下角坐标（会取整） */
    centerToLeftBottom(id: number, p: { x: number; y: number }): { x: number; y: number } {
        let facility = GTable.getById("ManorFacilityTbl", Number(id));
        let decoration = GTable.getById("ManorDecorationTbl", Number(id));
        const leftTop = {
            x: p.x - ((facility ? facility.area[0] : decoration.area[0]) - 1) * 0.5,
            y: p.y - ((facility ? facility.area[1] : decoration.area[1]) - 1) * 0.5,
        };
        return { x: Math.round(leftTop.x), y: Math.round(leftTop.y) };
    }
    /**
     * 检查是否可建造或者移动，参数为建筑id和建筑左下角格子坐标
     * ok 可以
     * overEdge 超出可建造区域
     * hasOtherBuilding 有其他建筑
     */
    checkBuildable(id: number, x: number, y: number): "ok" | "overEdge" | "hasOtherBuilding" {
        if (x < 0 || y < 0 || x >= GConstant.manorGrid.horizental || y >= GConstant.manorGrid.vertical) {
            return "overEdge";
        }
        let facility = GTable.getById("ManorFacilityTbl", Number(id));
        let decoration = GTable.getById("ManorDecorationTbl", Number(id));
        const tbl = facility ? facility : decoration;
        const width = tbl.area[0];
        const height = tbl.area[1];
        if (x + width > GConstant.manorGrid.horizental || y + height > GConstant.manorGrid.vertical) {
            return "overEdge";
        }
        const map = this.getMapMatrix();
        for (let i = y; i < y + height; i++) {
            for (let j = x; j < x + width; j++) {
                if (map[i][j] !== -1 && map[i][j] !== id) return "hasOtherBuilding";
            }
        }
        return "ok";
    }

    /** 格子节点坐标上的建筑id */
    getPosId(p: { x: number; y: number }): number {
        const { x, y } = p;
        if (!this.getMapMatrix()[Math.round(y)]) return -1;
        const id = this.getMapMatrix()[Math.round(y)][Math.round(x)];
        return id ? id : -1;
    }

    /**根据格子坐标和id得到index */
    getIndex(id: number, pos: { x: number; y: number }) {
        let map = this.getMap();
        if (Object.keys(map).some((key) => Number(key) === id)) {
            let posList = map[id];
            let facility = GTable.getById("ManorFacilityTbl", Number(id));
            let decoration = GTable.getById("ManorDecorationTbl", Number(id));
            const tbl = facility ? facility : decoration;
            posList.forEach((list, i) => {
                for (let y = 0; y < tbl.area[1]; y++) {
                    for (let x = 0; x < tbl.area[0]; x++) {
                        if (list[0] + x === pos.x && list[1] + y === pos.y) {
                            return i;
                        }
                    }
                }
            });
            return -1;
        } else {
            return -1;
        }
    }
}
