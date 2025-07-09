import { autowired, registerClass } from "../../../../framework/Decorator";
import UIListItem from "../../../../framework/ui/UIListItem";
import UISpine from "../../../../framework/ui/UISpine";
import BattleFactory from "../../../battleLogic/Utils/BattleFactory";

const { ccclass, property } = cc._decorator;

@registerClass("ListItemPlayer")
@ccclass
export default class ListItemPlayer extends UIListItem {
    @autowired(UISpine) player: UISpine = null;
    @autowired(UISpine) artifact: UISpine = null;

    state: {
        /** 皮肤id */
        skinId?: number;
        /** 坐骑id */
        mountId?: number;
        /** 神器id */
        artifactId?: number;
    };
    setState(state: this["state"]): void {
        this.state = state;
        this.refresh();
    }

    async refresh() {
        const skinTbl = GTable.getById(
            "PlayerSkinTbl",
            this.state.skinId ? this.state.skinId : GModel.mountAndSkin.currentSkin()
        );
        const mountTbl = GTable.getById(
            "PlayerMountTbl",
            this.state.mountId ? this.state.mountId : GModel.mountAndSkin.currentMount()
        );
        let fossilTbl: FossilComboTbl;
        if (this.state.artifactId) {
            fossilTbl = GTable.getById("FossilComboTbl", this.state.artifactId);
        } else {
            fossilTbl = BattleFactory.getStarTbl(GState.data);
        }
        await this.player.setSpineWithMount(mountTbl.spine, skinTbl.spine);
        if (fossilTbl) {
            this.artifact.node.active = true;
            this.artifact_keys = fossilTbl.spineSkinKey.map((k) => k / 30);
            await this.artifact.setSpine("Artifact_zong", fossilTbl.spineSkin, "idle");
            this.notReady = false;
        } else {
            this.artifact.node.active = false;
            this.notReady = true;
        }
    }
    private notReady = true;
    private artifact_keys: number[];
    protected update(dt: number): void {
        if (this.notReady) return;
        const track = this.artifact.getCurrent(0);
        const animationTime = track.animationLast;
        if (animationTime < this.artifact_keys[0] || animationTime > this.artifact_keys[1]) {
            this.artifact.node.zIndex = 1;
        } else {
            this.artifact.node.zIndex = -1;
        }
    }
}
