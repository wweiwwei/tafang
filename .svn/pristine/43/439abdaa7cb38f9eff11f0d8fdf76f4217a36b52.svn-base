import { GameDate } from "../../framework/date/GameDate";
import EventBus from "../../framework/event/EventBus";
import { EnumFacilityType } from "../config/GEnum";
import Survivor from "../entity/Survivor";
import SurvivorStateInfo from "../entity/SurvivorStateInfo";
import EventName from "../event/EventName";
import WindowAdvertisement from "../module/common/WindowAdvertisement";
import WindowCommonConfirm from "../module/common/WindowCommonConfirm";

export default class SurvivorModel {
    data: {
        /** 幸存者数据 */
        survivor: { [uniqueId: number]: Survivor };
        /** 最近一次结算时间 */
        lastSettle: number;
        /** 食物库存 */
        food: number;
        /** 食材库存 */
        foodIngredients: number;
        /** 吃饭队列 */
        eatQueen: number;
        /** 睡觉队列 */
        healQueen: number;
    } = {
        survivor: [],
        lastSettle: 0,
        food: 0,
        foodIngredients: 0,
        eatQueen: 0,
        healQueen: 0,
    };

    /** 初始化幸存者数据 */
    init() {
        Object.keys(GState.data.survivor).forEach((k) => {
            const s = GState.data.survivor[k];
            this.data.survivor[s.uniqueId] = this.createSurvivor(s);
        });
        EventBus.on(EventName.stateKey.survivor, this.onSurvivorChange, this);
        EventBus.on(EventName.stateKey.survivorTemp, this.onSurvivorTempChange, this);
    }

    onSurvivorChange(newData: { [uniqueId: number]: SurvivorStateInfo }, delKey: string[]) {
        Object.keys(newData).forEach((k) => {
            const s = newData[k];
            if (!this.data.survivor[s.uniqueId]) {
                this.data.survivor[s.uniqueId] = this.createSurvivor(s);
                EventBus.emit(EventName.addSurvivor, this.data.survivor[s.uniqueId]);
                GTip.showTip([GLang.code.ui.new_survivor_arrive]);
            } else {
                this.data.survivor[s.uniqueId].changeInfo(s);
            }
        });
        delKey.forEach((k) => {
            EventBus.emit(EventName.removeSurvivor, this.data.survivor[k]);
            delete this.data.survivor[k];
        });
    }

    onSurvivorTempChange() {
        this.tempSurvivorHasEat = 0;
    }

    onSurvivorAction() {}

    followToFacility(fromId: number, toId: number) {
        const uid = Number(Object.keys(this.data.survivor)[0]);
        const s = this.data.survivor[uid];
        s.followTo(fromId, toId);
    }

    /** 计算下一帧 */
    tick() {
        Object.keys(this.data.survivor).forEach((k) => {
            const s: Survivor = this.data.survivor[k];
            s.tick();
        });
    }

    /** 时间分类 1睡觉 2吃饭 3工作 */
    getHourType(): number {
        const now = GameDate.nowUpdated();
        const hour = GConstant.survivor.getGameHour(now);
        const hourType = GConstant.survivor.time[hour];
        return hourType;
    }

    /** 是否为白天 */
    isDay(): boolean {
        const now = GameDate.nowUpdated();
        const hour = GConstant.survivor.getGameHour(now);
        return hour >= 6 && hour < 20;
    }

    getAllSurvivor(): Survivor[] {
        return Object.keys(this.data.survivor).map((k) => this.data.survivor[k]);
    }

    private createSurvivor(info: SurvivorStateInfo): Survivor {
        let dormId = info.dormId;
        if (dormId === -1) {
            dormId = GUtils.random.rdArrayElement(
                GModel.facility.getAllFacility().filter((f) => f.unlock),
                1
            )[0].id;
        }
        const tbl = GTable.getById("FacilityTbl", dormId);
        const posTbl = GTable.getById("FacilityPositionTbl", tbl.posId);
        const s = new Survivor(info, [posTbl.position[0], posTbl.position[1]], posTbl.area);
        return s;
    }

    /** 获取人口信息 current当前人口 max最大人口 */
    getPeopleInfo(): {
        current: number;
        max: number;
    } {
        const allSurvivor = this.getAllSurvivor();
        const current = allSurvivor.filter((s) => s.isALive()).length;
        const max = GUtils.array
            .chain(GModel.facility.getAllFacility())
            .filter((f) => f.getKind() === EnumFacilityType.dormitory && f.unlock)
            .sumBy((f) => f.clientLimit());
        return { current, max };
    }

    /**
     * 生存者工作状态
     * working 工作中
     * canNotWork 无法工作
     * idle 闲置
     * */
    getSurvivorWorkingState(): {
        working: number;
        idle: number;
        noDormitory: number;
        hungry: number;
        sick: number;
        fatigue: number;
    } {
        const allSurvivor = this.getAllSurvivor().filter((s) => s.isALive());
        const working = allSurvivor.filter((s) => s.info.buildId > 0).length;
        const canNotWork = allSurvivor.filter((s) => s.info.state === "heal").length;
        const idle = allSurvivor.filter((s) => s.info.buildId <= 0).length;
        const noDormitory = allSurvivor.filter((s) => s.info.dormId == -1).length;
        const hungry = allSurvivor.filter((s) => s.isHungry()).length;
        const sick = allSurvivor.filter((s) => s.isSick()).length;
        const fatigue = allSurvivor.filter((s) => s.isFatigue()).length;
        return { working, hungry, sick, fatigue, idle, noDormitory };
    }

    /** 看视频增加幸存者 */
    async videoAddSurvivor(): Promise<boolean> {
        const ok = await GWindow.open(WindowAdvertisement, {
            title: [GLang.code.ui.advertisement_recruit_survivor],
            content: [
                [GLang.code.ui.advertisement_watch_ad],
                [GLang.code.ui.recruit],
                [GLang.code.ui.advertisement_get_survivor, `_rs${GConfig.survivor.videoAddSurvivor}`],
            ],
            text: [GLang.code.ui.recruit],
            cb: async () => {
                await GSDK.showVideo("video_add_survivor");
                await GApi.facility.videoAddSurvivor();
            },
        });
        return ok;
    }

    /** 吃了饭的幸存者数量，这里暂时记录 */
    private tempSurvivorHasEat = 0;

    /** 有饭吃的幸存者列表 */
    survivorEatList() {
        return GState.data.survivorTemp.eat;
    }

    /** 幸存者吃饭完成汇报 */
    eatComplete() {
        this.tempSurvivorHasEat++;
        EventBus.emit(EventName.refreshFood);
    }

    /** 食堂剩余食物，这是个展示值 */
    foodRemain() {
        const hourType = this.getHourType();
        const origin = GModel.facility.getFacilityStorageById(GConstant.build.ID_BUILD_CANTEEN);
        if (hourType === 2) {
            return origin + GState.data.survivorTemp.eat.length - this.tempSurvivorHasEat;
        } else {
            return origin;
        }
    }
}
