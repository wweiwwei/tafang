import ResourceLoader from "../../../framework/ResourceLoader";
import Survivor from "../../entity/Survivor";
import ListItemSceneHero from "./ListItemSceneHero";
import ListItemSurvivor from "./ListItemSurvivor";

export default class SceneHeroControl extends cc.Component {
    private inited = false;

    sceneHeroMap: Map<number, ListItemSceneHero> = new Map();

    container: cc.Node = null;
    setContainer(container: cc.Node) {
        this.container = container;
    }

    async initHero() {
        const list = GModel.facility.getAllFacility().filter((f) => f.hero > 0);
        const pList = list.map(async (f) => {
            const sItem = await ResourceLoader.getNode(ListItemSceneHero);
            sItem.node.parent = this.container;
            sItem.setState({
                uniqueId: f.hero,
            });
            return { uid: f.hero, item: sItem };
        });
        const res = await Promise.all(pList);
        res.forEach((r) => {
            this.sceneHeroMap.set(r.uid, r.item);
        });
        this.inited = true;
    }

    removeHero(uniqueId: number) {
        if (!this.sceneHeroMap.has(uniqueId)) return;
        this.sceneHeroMap.get(uniqueId).recycle();
        this.sceneHeroMap.delete(uniqueId);
    }

    async addHero(uniqueId: number) {
        if (this.sceneHeroMap.has(uniqueId)) return;
        const sItem = await ResourceLoader.getNode(ListItemSceneHero);
        sItem.node.parent = this.container;
        sItem.setState({
            uniqueId: uniqueId,
        });
        this.sceneHeroMap.set(uniqueId, sItem);
    }

    tick() {
        if (!this.inited) return;
        this.sceneHeroMap.forEach((s) => s.tick());
    }

    private _fixedUpdateInterval = 1 / 60;
    private _fixedUpdateTotal: number = 0;
    private _updateTotal: number = 0;
    protected fixedUpdate() {
        this.tick();
    }

    protected update(dt: number) {
        this._updateTotal += dt;
        while (this._updateTotal - this._fixedUpdateTotal >= this._fixedUpdateInterval) {
            this._fixedUpdateTotal += this._fixedUpdateInterval;
            this.fixedUpdate();
        }
        this.afterFixedUpdate();
    }

    protected afterFixedUpdate() {}
}
