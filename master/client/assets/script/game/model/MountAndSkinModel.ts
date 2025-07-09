export class MountAndSkinModel {
    /** 获取所有皮肤的信息 */
    getAllSkin() {
        return GTable.getList("PlayerSkinTbl").map((t) => {
            return {
                id: t.id,
                unlock: GState.data.skinStorage.includes(t.id),
            };
        });
    }
    /** 获取所有坐骑的信息 */
    getAllMount() {
        return GTable.getList("PlayerMountTbl").map((t) => {
            return {
                id: t.id,
                unlock: GState.data.mountStorage.includes(t.id),
            };
        });
    }
    /** 是否拥有皮肤 */
    hasSkin(id: number) {
        return GState.data.skinStorage.includes(id);
    }

    /** 是否拥有坐骑 */
    hasMount(id: number) {
        return GState.data.mountStorage.includes(id);
    }

    /** 选择坐骑 */
    changeMount(id: number) {
        return GApi.mount.changeMount({ id });
    }

    /** 选择皮肤 */
    changeSkin(id: number) {
        return GApi.skin.changeSkin({ id });
    }
    /** 当前皮肤 */
    currentSkin() {
        return GState.data.skinCurrent;
    }
    /** 当前坐骑 */
    currentMount() {
        return GState.data.mountCurrent;
    }
}
