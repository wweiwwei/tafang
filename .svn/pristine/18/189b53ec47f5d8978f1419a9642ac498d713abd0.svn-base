/**
 * 物品的数据类，该类使用比较广，不要拓展成员方法，只拓展静态方法。
 * 因为很多使用这个类型的地方很可能是JSON.parse出来的，没有对应的原型链。
 *  */
export default class Item {
    constructor(public id: number, public count: number) {}
    static fromItemArray(arr: number[][]) {
        return arr.map((a) => new Item(a[0], a[1]));
    }
    static combine(item: Item[]): Item[] {
        let map = new Map<number, number>();
        item.forEach((i) => {
            if (map.has(i.id)) {
                map.set(i.id, map.get(i.id) + i.count);
            } else {
                map.set(i.id, i.count);
            }
        });
        const res: Item[] = [];
        map.forEach((v, k) => {
            res.push(new Item(k, v));
        });
        return res;
    }
    static getTbl(item: Item) {
        return GTable.getById("ItemTbl", item.id);
    }
    static getQuality(item: Item): number {
        return Item.getTbl(item).quality;
    }
    static getKind(item: Item): number {
        return Item.getTbl(item).kind;
    }
    static getName(item: Item): string[] {
        if (Item.getTbl(item).kind !== 21) {
            return [Item.getTbl(item).name];
        } else {
            return [GLang.code.ui.frag_name, GTable.getList("HeroTbl").find((t) => t.frag === item.id).name];
        }
    }
    static getDescription(item: Item): string[] {
        if (Item.getTbl(item).kind !== 21) {
            return [Item.getTbl(item).description];
        } else {
            return [GLang.code.ui.frag_description, GTable.getList("HeroTbl").find((t) => t.frag === item.id).name];
        }
    }
    static getImg(item: Item): string {
        return Item.getTbl(item).img;
    }
    static getStorage(item: Item): number {
        return GModel.knapsack.getStorageById(item.id);
    }

    static getCountString(item: Item): string[] {
        const tbl = Item.getTbl(item);
        if (tbl.kind === 101) {
            return [GLang.code.ui.minute, "_rs" + item.count];
        } else {
            return ["_rsx" + GUtils.ui.getNumberString(item.count, 1)];
        }
    }
}
