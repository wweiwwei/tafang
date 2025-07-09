import EventBus from "../../framework/event/EventBus";
import Item from "../entity/Item";
import Mission from "../entity/Mission";
import EventName from "../event/EventName";

export default class MissionModel {
    init() {
        this.taskId = this.taskInfo().id;
        this.completeCount = GUtils.array.count(this.mainMissionList(), (m) => m.getState() === "complete");
        EventBus.on(EventName.stateKey.mainMission, this.onMissionChange, this);
    }
    private taskId = 0;
    private completeCount = 0;
    onMissionChange() {
        const newTaskId = this.taskInfo().id;
        const newCompleteCount = GUtils.array.count(this.mainMissionList(), (m) => m.getState() === "complete");
        if (this.taskId === newTaskId && this.completeCount < newCompleteCount) {
            GTip.showReward("battle_btn_chosen", [[GLang.code.ui.mission_complete]]);
        }
        this.taskId = newTaskId;
        this.completeCount = newCompleteCount;
    }

    /** 目标信息 */
    taskInfo(): {
        id: number;
        progress: number;
        require: number;
        hasGet: boolean;
    } {
        const origin = GState.data.mainMissionTask;
        let require = GTable.getById("MainMissionTaskTbl", origin.id).require;
        const index = GTable.getList("MainMissionTaskTbl").findIndex((t) => t.id === origin.id);
        const lastTbl = GTable.getList("MainMissionTaskTbl")[index - 1];
        let progress = origin.progress;
        if (lastTbl) {
            require = require - lastTbl.require;
            progress = progress - lastTbl.require;
        }
        return {
            ...origin,
            progress,
            require,
        };
    }
    isTaskComplete(): boolean {
        return this.taskInfo().progress >= this.taskInfo().require;
    }
    /**获取目标奖励 */
    getTaskreward(): Item[] {
        return GTable.getById("MainMissionTaskTbl", this.taskInfo().id).reward.map((t) => new Item(t[0], t[1]));
    }
    /** 获取可见的任务列表，已完成任务排序 */
    mainMissionList(): Mission[] {
        const list: Mission[] = Object.keys(GState.data.mainMission).map((k) => {
            return GState.data.mainMission[k];
        });
        return list
            .filter((m) => m.getState() !== "hasGet")
            .sort((a, b) => {
                const aState = a.getStateIndex();
                const bState = b.getStateIndex();
                if (aState === bState) {
                    const aTbl = GTable.getById("MainMissionTbl", a.id);
                    const bTbl = GTable.getById("MainMissionTbl", b.id);
                    return aTbl.index - bTbl.index;
                } else {
                    return aState - bState;
                }
            });
    }

    /** 获取任务 */
    getMissionById(id: number): Mission {
        return GState.data.mainMission[id];
    }

    /** 获取任务奖励 */
    async obtainMissionReward(id: number): Promise<Item[]> {
        const m = this.getMissionById(id);
        const res = await GApi.mission.obtainMissionReward({ id });
        GModel.guide.triggerDialogue(1, id, m.stage);
        GSDK.report({
            kind: "mainMission",
            data: {
                id,
                stage: m.stage,
            },
        });
        if (this.taskInfo().progress === this.taskInfo().require) {
            GModel.guide.triggerDialogue(11, this.taskInfo().id);
        }
        return res;
    }

    /** 获取目标奖励 */
    async obtainTaskReward(): Promise<Item[]> {
        const taskId = this.taskInfo().id;
        const res = await GApi.mission.obtainTaskReward();
        GModel.guide.triggerDialogue(2, taskId);
        GSDK.report({
            kind: "mainMissionTask",
            data: {
                id: taskId,
            },
        });
        return res;
    }

    /** 主线任务是否已完成 */
    isMainMissionComplete(id: number, stage: number): boolean {
        const m = GState.data.mainMission[id];
        if (!m) return false;
        return m.stage > stage || (m.stage === stage && m.getState() === "hasGet");
    }
}
