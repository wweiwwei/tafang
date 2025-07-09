import EventBus from "../../framework/event/EventBus";
import Item from "../entity/Item";
import { Sprite } from "../entity/Sprite";
import EventName from "../event/EventName";

export default class SpriteModel {
    getFormation(): number[] {
        return GState.data.spriteFormation;
    }
    /** 设置方案 */
    async setFormation(formation: number[]): Promise<void> {
        const origin = GModel.battle.getBattlePoint();
        await GApi.sprite.setFormation({ formation });
        const after = GModel.battle.getBattlePoint();
        GTip.showBattlePointChange(origin, after, [], [], false);
    }

    /** 升阶 */
    async uprankSprite(id: number): Promise<void> {
        const origin = GModel.battle.getBattlePoint();
        await GApi.sprite.uprankSprite({ id });
        const after = GModel.battle.getBattlePoint();
        GTip.showBattlePointChange(origin, after, [], [], false);
    }
    /**获得精灵列表 */
    getSprites(): Sprite[] {
        return Object.keys(GState.data.sprites).map((id) => {
            return GState.data.sprites[id];
        });
    }
    /**根据id获取 */
    getSpriteById(id: number): Sprite {
        return GState.data.sprites[id];
    }
    /** 召唤
     * id:卡池id
     * count:召唤数量
     * free:是否免费
     */
    call(id: number, count: number, free: boolean): Promise<Item[]> {
        return GApi.sprite.drawCard({ id, count, free });
    }

    /** 获取卡池信息 */
    getPoolInfoById(id: number) {
        return GState.data.spritePool[id];
    }
}
