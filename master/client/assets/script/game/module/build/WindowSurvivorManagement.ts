import { autowired, message, registerClass } from "../../../framework/Decorator";
import UIButton from "../../../framework/ui/UIButton";
import UIImage from "../../../framework/ui/UIImage";
import UILabel from "../../../framework/ui/UILabel";
import UIScrollList from "../../../framework/ui/UIScrollList";
import UIWindow from "../../../framework/ui/UIWindow";
import { WindowOpenAnimationEnum, WindowOpenOption } from "../../../framework/ui/GWindow";
import EventName from "../../event/EventName";
import ListItemBuildingState from "./ListItemBuildingState";
import ListItemResource from "./ListItemResource";

const { ccclass, property } = cc._decorator;
@registerClass("WindowSurvivorManagement")
@ccclass
export default class WindowSurvivorManagement extends UIWindow {
    static defaultOpentOption: Partial<WindowOpenOption> = {
        animation: WindowOpenAnimationEnum.default,
    };
    _windowParam: {
        state: number; //0-survivor,1-resource
    };
    _returnValue: any;
    /**标题 */
    @autowired(UILabel) title: UILabel = null;
    /**二级标题 */
    @autowired(UILabel) topic: UILabel = null;
    /**幸存者节点 */
    @autowired(cc.Node) survivor: cc.Node = null;
    /**建筑状态列表 */
    @autowired(UIScrollList) buildingList: UIScrollList<ListItemBuildingState> = null;
    /**工作中人数 */
    @autowired(UILabel) workingCount: UILabel = null;
    /**饥饿人数 */
    @autowired(UILabel) hungry: UILabel = null;
    /**生病人数 */
    @autowired(UILabel) sick: UILabel = null;
    /**疲劳人数 */
    @autowired(UILabel) fatigue: UILabel = null;
    /**未分配人数 */
    @autowired(UILabel) undistributedCount: UILabel = null;
    /**无宿舍人数 */
    @autowired(UILabel) noDormiCount: UILabel = null;
    /**资源节点 */
    @autowired(cc.Node) resources: cc.Node = null;
    /**资源列表节点 */
    @autowired(cc.Node) resource: cc.Node = null;
    /**资源列表 */
    @autowired(UIScrollList) resourceList: UIScrollList<ListItemResource> = null;
    /**食材状态 */
    @autowired(UILabel) foodMaterial: UILabel = null;
    /**食材状态图 */
    @autowired(UIImage) materialState: UIImage = null;
    /**食物状态 */
    @autowired(UILabel) food: UILabel = null;
    /**食物状态图 */
    @autowired(UIImage) foodState: UIImage = null;
    /**水状态 */
    @autowired(UILabel) water: UILabel = null;
    /**水状态图 */
    @autowired(UIImage) waterState: UIImage = null;
    @autowired(UIButton) closeBtn: UIButton = null;
    protected onInited(): void {
        this.closeBtn.onClick = () => {
            this.close();
        };
        this.refresh();
    }

    refresh() {
        if (this._windowParam.state === 0) {
            this.refreshSurvivor();
            this.title.setText([GLang.code.ui.survivor_management]);
            this.topic.setText([GLang.code.ui.building_state]);
            this.survivor.active = true;
            this.buildingList.node.active = true;
            this.buildingList.setState(
                GModel.facility
                    .getAllFacility()
                    .filter((f) => f.unlock && f.workerLimit() > 0)
                    .map((f) => {
                        return { facilityId: f.id };
                    })
            );
        } else {
            this.survivor.active = false;
            this.resource.active = true;
            this.resources.active = true;
            let { foodIngredients, food, water } = GModel.facility.getMaintainInfo();
            let lang = [GLang.code.ui.abundant, GLang.code.ui.allowance, GLang.code.ui.insufficient];
            let img = [
                "facility_satisfaction_satisfied",
                "facility_satisfaction_normal",
                "facility_satisfaction_dissatisfied",
            ];
            this.foodMaterial.setText([lang[foodIngredients]]);
            this.materialState.imgName = img[foodIngredients];
            this.food.setText([lang[food]]);
            this.foodState.imgName = img[food];
            this.water.setText([lang[water]]);
            this.waterState.imgName = img[water];
            let arr = GModel.facility.getProduceInfo();
            this.resourceList.setState(arr);
        }
    }

    @message([EventName.stateKey.survivor])
    refreshSurvivor() {
        if (this._windowParam.state === 0) {
            let { working, idle, hungry, sick, fatigue, noDormitory } = GModel.survivor.getSurvivorWorkingState();
            this.workingCount.setText(["_rs" + working]);
            this.undistributedCount.setText(["_rs" + idle]);
            this.noDormiCount.setText(["_rs" + noDormitory]);
            this.hungry.setText(["_rs" + hungry]);
            this.sick.setText(["_rs" + sick]);
            this.fatigue.setText(["_rs" + fatigue]);
        }
    }
}
