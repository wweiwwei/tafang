import ResourceLoader from "../../framework/ResourceLoader";
import UIButton from "../../framework/ui/UIButton";
import ListItemGuideFinger from "../module/battle/ListItemGuideFinger";
import WindowGuide from "../module/mainscene/WindowGuide";
import WindowMainSceneUI from "../module/mainscene/WindowMainSceneUI";

export default class WeakGuideModel {
    curGuide: ListItemGuideFinger = null;

    // 上一次玩家操作的时间
    private lastOperate: number = 0;
    async checkWeakGuide() {
        if (this.curGuide || Date.now() - this.lastOperate < 5000 || GWindow.get(WindowGuide)) return;
        if (GWindow.isAnyWindowOpening()) return;
        const win = GWindow.get(WindowMainSceneUI);
        if (!win || !win.node.active) return;
        if (GModel.playerEquipment.temp().length > 0) {
            this.guideFunc.clickNode("Canvas/window/WindowMainSceneUI/bottom/id_challengeBoss", 0, 100);
        } else {
            this.guideFunc.clickNode("Canvas/window/WindowMainSceneUI/bottom/id_bubble", 100, 0);
        }
    }

    guideFunc = {
        clickNode: async (nodePath: string, offsetX?: number, offsetY?: number) => {
            const node = cc.find(nodePath);
            if (node && node.active) {
                const container = cc.find("Canvas/tip");
                this.curGuide = await ResourceLoader.getNode(ListItemGuideFinger);
                const worldPos = node.convertToWorldSpaceAR(cc.Vec3.ZERO);
                const localPos = container.convertToNodeSpaceAR(worldPos);
                this.curGuide.setState({ pos: localPos.add(cc.v3(Number(offsetX) || 0, Number(offsetY) || 0, 0)) });
                this.curGuide.node.parent = container;
            }
        },
    };

    btnClick(btn: UIButton) {
        this.lastOperate = Date.now();
        if (this.curGuide) {
            this.curGuide.recycle();
            this.curGuide = null;
        }
    }

    sceneClick() {
        this.lastOperate = Date.now();
        if (this.curGuide) {
            this.curGuide.recycle();
            this.curGuide = null;
        }
    }

    changeEquipmentWindowOpen() {
        this.lastOperate = Date.now();
        if (this.curGuide) {
            this.curGuide.recycle();
            this.curGuide = null;
        }
    }
}
