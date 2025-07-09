import { autowired, message, registerClass } from "../../../framework/Decorator";
import ResourceLoader from "../../../framework/ResourceLoader";
import UIButton from "../../../framework/ui/UIButton";
import UIImage from "../../../framework/ui/UIImage";
import UILabel from "../../../framework/ui/UILabel";
import UIList from "../../../framework/ui/UIList";
import UIListItem from "../../../framework/ui/UIListItem";
import { SeedRand } from "../../../framework/utils/RandomUtils";
import Item from "../../entity/Item";
import EventName from "../../event/EventName";
import ListItemFlyItems from "../common/ListItemFlyItems";
import ListItemMapItems from "./ListItemMapItems";

const { ccclass, property } = cc._decorator;

@registerClass("ListItemMap")
@ccclass
export default class ListItemMap extends UIListItem {
    @autowired(UIImage) locked: UIImage = null;
    /**小物体容器 */
    @autowired(UIList) items: UIList<ListItemMapItems> = null;
    /**解锁等级 */
    @autowired(UILabel) level: UILabel = null;
    /**解锁提示 */
    @autowired(UILabel) tip: UILabel = null;
    /**收益数量 */
    @autowired(UILabel) count: UILabel = null;
    @autowired(UIButton) map: UIButton = null;
    /**可收取的材料 */
    @autowired(UIImage) item: UIImage = null;
    /** 地图背景 */
    @autowired(UIImage) bg: UIImage = null;

    @autowired(UIImage) selected: UIImage = null;

    state: {
        mapIndex: number;
        cb: () => void;
        selected: boolean;
    };
    setState(state: this["state"]): void {
        this.state = state;
        this.map.onClick = this.state.cb;
        this.map.setTransition(false);
        this.selected.node.active = this.state.selected;
        let tbl = GTable.getList("StageMapTbl");
        this.bg.imgName = tbl[this.state.mapIndex - 1].img;
        if (this.state.mapIndex == 1) {
            this.unlock(tbl);
        } else {
            let lastMapInfo = GModel.stage.getAllStage()[this.state.mapIndex - 2];
            if (lastMapInfo.stageIndex > tbl[this.state.mapIndex - 1].unlock[1]) {
                this.unlock(tbl);
            } else {
                this.map.bg.node.color = cc.color(180, 180, 180, 255);
                this.tip.setText([
                    GLang.code.ui.map_condition,
                    tbl[this.state.mapIndex - 2].name,
                    "_rs" + tbl[this.state.mapIndex - 1].unlock[1],
                ]);
                this.count.node.active = false;
                this.item.node.active = false;
            }
        }
    }
    /**解锁地图 */
    unlock(tbl: StageMapTbl[]) {
        this.map.bg.node.color = cc.color(255, 255, 255, 255);
        let stage = GModel.stage.getStageByMapIndex(this.state.mapIndex);
        let item = GTable.getById("ItemTbl", stage.produceId());
        this.level.setText([tbl[this.state.mapIndex - 1].name]);
        this.locked.node.active = false;
        this.tip.node.active = false;
        this.item.node.active = true;
        this.count.node.active = true;
        this.item.imgName = item.img;
        this.map.onClick = this.state.cb;
        this.count.setText([
            GLang.code.ui.map_produce_perhour,
            "_rs" + GUtils.ui.getNumberString(stage.produce().count * 60, 2),
        ]);
        // this.setItems();
    }
    /**显示地图产出 */
    // @message([EventName.stateKey.stage, EventName.stateKey.stageAfkMapProduce])
    setItems() {
        const stage = GModel.stage.getStageByMapIndex(this.state.mapIndex);
        // if (stage.stageIndex === 0) {
        //     this.count.setText([GLang.code.ui.map_produce_perhour, "_rs0"]);
        //     return;
        // }
        let produce = GModel.stage.getStageAfkMapProduce()[this.state.mapIndex];
        const producePerMinute = stage.produce();
        if (produce) {
            let count = Math.ceil(produce.count / producePerMinute.count / 24);
            let arr: { item: Item; position: { x: number; y: number } }[] = [];
            const sr = GUtils.random.getSeedRandom(this.state.mapIndex);
            for (let i = 0; i < count; i++) {
                let position = this.sort(i, sr);
                arr.push({ item: produce, position });
            }
            this.items.setState(arr.reverse());
            this.map.onClick = async () => {
                this.state.cb();
                let count = Math.round(
                    GModel.stage.getStageAfkMapProduce()[this.state.mapIndex].count /
                        GModel.stage.getStageByMapIndex(this.state.mapIndex).produce().count /
                        30
                );
                let item = new Item(GModel.stage.getStageAfkMapProduce()[this.state.mapIndex].id, count);
                GTip.showFlyProduce(this.node.convertToWorldSpaceAR(cc.v2()), item);
                await GModel.stage.collectMapProduce(stage.mapIndex);
                GTip.showRewardItem(produce);
            };
        }
    }
    sort(count: number, sr: SeedRand): { x: number; y: number } {
        if (count < 5) {
            return { x: Math.floor(sr.next() * 100 - 50), y: Math.floor(sr.next() * 5 - 82) };
        } else if (count < 16) {
            let num = Math.floor(sr.next() * 300 - 150);
            num > -60 && num < 50 ? this.sort(count, sr) : num;
            return { x: count === 5 && num + 30 < 130 ? num + 30 : num, y: Math.floor(sr.next() * 5 - 88) };
        } else {
            return { x: Math.floor(sr.next() * 100 - 50), y: Math.floor(sr.next() * 5 - 76) };
        }
    }
}
