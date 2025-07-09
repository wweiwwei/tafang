import Table2D from "../../../framework/collection/Table2D";

export default class SceneIndex {
    private pathMap: Table2D<number, number, number[]> = (() => {
        const list = GTable.getList("FacilityTunnelTbl");
        const areaSet = new Set<number>();
        list.forEach((t) => {
            t.area.forEach((area) => {
                areaSet.add(area);
            });
        });
        const getDistance = (p1: number[], p2: number[]) => {
            const d1 = p1[0] - p2[0];
            const d2 = p1[1] - p2[1];
            return Math.sqrt(d1 * d1 + d2 * d2);
        };
        const link = list.map((t) => {
            let distance = 0;
            for (let i = 0; i < t.pathPoint.length - 1; i++) {
                distance += getDistance(t.pathPoint[i], t.pathPoint[i + 1]);
            }
            return {
                from: t.area[0],
                to: t.area[1],
                distance,
            };
        });
        return GUtils.pathSearch.dijkstraForUndirectedGraph(areaSet, link);
    })();

    nextArea(from: number, to: number): { nextArea: number; pathPoint: number[][]; tunnelType: number } {
        const path = this.pathMap.get(from, to);
        if (!path) {
            throw Error(`no path from ${from} to ${to}`);
        }
        const tbl = GTable.getList("FacilityTunnelTbl").find((t) => t.area[0] === path[0] && t.area[1] === path[1]);
        if (tbl)
            return {
                nextArea: path[1],
                pathPoint: tbl.pathPoint,
                tunnelType: tbl.tunnelType,
            };
        const tbl2 = GTable.getList("FacilityTunnelTbl").find((t) => t.area[0] === path[1] && t.area[1] === path[0]);
        if (tbl2)
            return {
                nextArea: path[1],
                pathPoint: tbl2.pathPoint.map((e) => e).reverse(),
                tunnelType: tbl2.tunnelType,
            };
        throw Error(`no tunnel from ${from} to ${to}`);
    }
}
