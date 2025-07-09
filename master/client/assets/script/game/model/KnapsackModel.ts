import Item from "../entity/Item";

export default class KnapsackModel {
    /** 获取当前所有的物品 */
    getAllStorage(): Item[] {
        return Object.keys(GState.data.storage).map((k) => new Item(Number(k), GState.data.storage[k]));
    }

    /** 根据id获取物品库存 */
    getStorageById(id: number): number {
        return GState.data.storage[id] || 0;
    }

    /** 获取所有英雄碎片库存 */
    getAllHeroFrag(): Item[] {
        return GTable.getList("ItemTbl")
            .filter((t) => t.kind === 21 && this.getStorageById(t.id) > 0)
            .map((t) => {
                return new Item(t.id, this.getStorageById(t.id));
            });
    }
    /**是否有可合成碎片 */
    isCanComposeFlag(): boolean {
        return this.getAllHeroFrag().some(
            (t) =>
                GModel.hero
                    .getAllHero()
                    .find((i) => GModel.hero.getHeroByUniqueId(i.uniqueId).getTbl().frag === t.id) === undefined &&
                t.count >= GConfig.hero.composeRequire[GTable.getList("HeroTbl").find((i) => i.frag === t.id).quality]
        );
    }
    private check(cost: Item): boolean {
        const count = this.getStorageById(cost.id);
        return count >= cost.count;
    }

    checkStorage(cost: Item[], tip: boolean): boolean {
        for (let i = 0; i < cost.length; i++) {
            const c = cost[i];
            if (!this.check(c)) {
                if (tip) {
                    GTip.showTip(Item.getName(c), [GLang.code.ui.notEnough]);
                }
                return false;
            }
        }
        return true;
    }
    /**开启任选宝箱 chestId：任选宝箱表id，count：打开的宝箱个数，itemid：宝箱id */
    openChest(id: number, chestCount: number, itemId: number): Promise<Item[]> {
        return GApi.knapsack.openChest({ id, chestCount, itemId });
    }
}
