import ResourceLoader from "../../../framework/ResourceLoader";
import Survivor from "../../entity/Survivor";
import ListItemSurvivor from "./ListItemSurvivor";

export default class SurvivorControl extends cc.Component {
    survivorContainer: cc.Node = null;
    survivorContainer2: cc.Node = null;

    private survivorList: ListItemSurvivor[] = [];
    private inited = false;

    setSurvivorContainer(survivorContainer: cc.Node, survivorContainer2: cc.Node) {
        this.survivorContainer = survivorContainer;
        this.survivorContainer2 = survivorContainer2;
    }

    async initSurvivor() {
        const list = GModel.survivor.getAllSurvivor();
        const pList = list.map(async (s) => {
            const sItem = await ResourceLoader.getNode(ListItemSurvivor);
            sItem.setState({
                data: s,
                layer: {
                    1: this.survivorContainer,
                    2: this.survivorContainer2,
                },
            });
            return sItem;
        });
        this.survivorList = await Promise.all(pList);
        this.inited = true;
    }

    async addSurvivor(s: Survivor) {
        const sItem = await ResourceLoader.getNode(ListItemSurvivor);
        sItem.setState({
            data: s,
            layer: {
                1: this.survivorContainer,
                2: this.survivorContainer2,
            },
        });
        this.survivorList.push(sItem);
    }

    removeSurvivor(s: Survivor) {
        const idx = this.survivorList.findIndex((sItem) => sItem.state.data.info.uniqueId === s.info.uniqueId);
        if (idx >= 0) {
            this.survivorList[idx].recycle();
            this.survivorList.splice(idx, 1);
        }
    }

    getSurvivorNode(uid: number): cc.Node {
        return this.survivorList.find((sItem) => sItem.state.data.info.uniqueId === uid).node;
    }

    followTo(fromId: number, toId: number) {
        GModel.survivor.followToFacility(fromId, toId);
    }

    tick() {
        if (!this.inited) return;
        GModel.survivor.tick();
        this.survivorList.forEach((s) => s.tick());
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
