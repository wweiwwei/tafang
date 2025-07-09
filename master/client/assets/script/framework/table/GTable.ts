import { TableIndex } from "../../game/table/GIndex";
import { ConfigIndex } from "./GConfig";

export class ConfigPool {
    private datas: any = {};
    private dataLists: any = {};
    private battleConfig: any = {};
    private battleScript: any = {};
    hasInited: boolean = false;

    public loadTblByData(data: any) {
        const schemas: { name: string; fields: string[]; types: string[] }[] = data.tableSchema;
        this.battleConfig = data.battleConfig;
        this.battleScript = data.battleScript;
        const temp1: any = {};
        const temp2: any = {};
        schemas.forEach((schema) => {
            const tempMap = new Map();
            const tempList: any[] = [];
            const tableStr: string[] = data[schema.name].split("\n");
            tableStr.forEach((col) => {
                const cells = col.split("\t");
                const tbl: any = {};
                cells.forEach((c, i) => {
                    switch (schema.types[i]) {
                        case "int":
                        case "long":
                        case "double":
                            tbl[schema.fields[i]] = c === "?" ? -1 : Number(c);
                            break;
                        case "string":
                            tbl[schema.fields[i]] = c === "?" ? "" : c;
                            break;
                        case "int[]":
                        case "long[]":
                        case "double[]":
                            tbl[schema.fields[i]] = (() => {
                                if (c === "?") return [];
                                return c.split("|").map((x) => Number(x));
                            })();
                            Object.freeze(tbl[schema.fields[i]]);
                            break;
                        case "string[]":
                            tbl[schema.fields[i]] = (() => {
                                if (c === "?") return [];
                                return c.split("|");
                            })();
                            Object.freeze(tbl[schema.fields[i]]);
                            break;
                        case "int[][]":
                        case "long[][]":
                        case "double[][]":
                            tbl[schema.fields[i]] = (() => {
                                if (c === "?") return [];
                                return c.split("|").map((x) => Object.freeze(x.split(",").map((y) => Number(y))));
                            })();
                            Object.freeze(tbl[schema.fields[i]]);
                            break;
                        case "string[][]":
                            tbl[schema.fields[i]] = (() => {
                                if (c === "?") return [];
                                return c.split("|").map((x) => Object.freeze(x.split(",")));
                            })();
                            Object.freeze(tbl[schema.fields[i]]);
                            break;
                    }
                });
                Object.freeze(tbl);
                tempMap.set(tbl.id, tbl);
                tempList.push(tbl);
            });
            Object.freeze(tempMap);
            Object.freeze(tempList);
            temp1[schema.name] = tempMap;
            temp2[schema.name] = tempList;
        });
        Object.freeze(temp1);
        Object.freeze(temp2);
        this.datas = temp1;
        this.dataLists = temp2;
        window["GTable"] = this;
        window["GIndex"] = new TableIndex();
        window["GConfig"] = new ConfigIndex().config;
        this.hasInited = true;
    }

    // getBattleConfig(name: string): string {
    //     return this.battleConfig[name];
    // }

    getBattleScript(name: string): string {
        return this.battleScript[name];
    }

    /**
     * 获取数据表
     * @param name 表类型
     * @param id 表id
     */
    getById<tblName extends keyof TblTypeMap>(name: tblName, id: number): TblTypeMap[tblName] {
        return this.datas[name].get(id);
    }

    /**
     * 以数组形式获取数据表
     * @param name 表类型
     */
    getList<tblName extends keyof TblTypeMap>(name: tblName): TblTypeMap[tblName][] {
        return this.dataLists[name];
    }

    /**
     * 以字典形式获取数据表，键为id
     * @param name 表类型
     */
    getMap<tblName extends keyof TblTypeMap>(name: tblName): Map<number, TblTypeMap[tblName]> {
        return this.datas[name];
    }
}
