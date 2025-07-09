//Auto Generate File, Do NOT Modify!!!!!!!!!!!!!!!
export class ConfigIndex {
    config: CommonConfig = (() => {
        const res: any = {};
        const arr = GTable.getList("GameConfigTbl");
        arr.forEach((t) => {
            const [p1, p2] = t.configPath.split("/");
            if (!res[p1]) res[p1] = {};
            res[p1][p2] = adaptorMap[t.adaptor](t.config);
        });
        return res;
    })();
}

/**
 * aInt:转化为int
 * aIntArr:转化为int数组
 * aLong:转化为long
 * aLongArr:转化为long数组
 * aDouble:转化为double
 * aDoubleArr:转化为double数组
 * aString:转化为string
 * aStringArr:转化为string数组
 * aItem:转化为Item
 * aItemArr:转化为Item数组
 */
const adaptorMap = {
    aInt: (origin: string[]) => origin.map((x) => Number(x))[0],
    aIntArr: (origin: string[]) => origin.map((x) => Number(x)),
    aIntMatrix: (origin: string[]) => origin.map((x) => x.split(",").map((a) => Number(a))),
    aLong: (origin: string[]) => origin.map((x) => Number(x))[0],
    aLongArr: (origin: string[]) => origin.map((x) => Number(x)),
    aLongMatrix: (origin: string[]) => origin.map((x) => x.split(",").map((a) => Number(a))),
    aDouble: (origin: string[]) => origin.map((x) => Number(x))[0],
    aDoubleArr: (origin: string[]) => origin.map((x) => Number(x)),
    aDoubleMatrix: (origin: string[]) => origin.map((x) => x.split(",").map((a) => Number(a))),
    aString: (origin: string[]) => origin[0],
    aStringArr: (origin: string[]) => origin,
    aStringMatrix: (origin: string[]) => origin.map((x) => x.split(",")),
    aItem: (origin: string[]) =>
        origin
            .map((x) => x.split(",").map((a) => Number(a)))
            .map((x) => {
                return { id: x[0], count: x[1] };
            })[0],
    aItemArr: (origin: string[]) =>
        origin
            .map((x) => x.split(",").map((a) => Number(a)))
            .map((x) => {
                return { id: x[0], count: x[1] };
            }),
};

declare global {
    /** 游戏配置 */
    const GConfig: CommonConfig;
}
