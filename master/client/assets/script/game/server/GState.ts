import EventBus from "../../framework/event/EventBus";
import AfkData from "../entity/AfkData";
import { BattleCar } from "../entity/BattleCar";
import CarEquipment from "../entity/CarEquipment";
import { CardPool } from "../entity/CardPool";
import { CareerTalent } from "../entity/CareerTalent";
import Equipment from "../entity/Equipment";
import Facility from "../entity/Facility";
import GiftPack from "../entity/GiftPack";
import Hero from "../entity/Hero";
import MainStage from "../entity/MainStage";
import Mission from "../entity/Mission";
import { Pet } from "../entity/Pet";
import { PlayerEquipment } from "../entity/PlayerEquipment";
import { PlayerEquipmentPlace } from "../entity/PlayerEquipmentPlace";
import { PlayerSkill } from "../entity/PlayerSkill";
import { Sprite } from "../entity/Sprite";
import { SpriteCardPool } from "../entity/SpriteCardPool";
import SurvivorStateInfo from "../entity/SurvivorStateInfo";
import { Technology } from "../entity/Technology";
import TowerAfkData from "../entity/TowerAfkData";
import warOrder from "../entity/WarOrder";
import EventName from "../event/EventName";
import { CacheMessage, GameSharedDataMessage } from "./GApi";
import { GameSharedDataCache } from "./GameSharedDataCache";
import { NetWorkDataCache } from "./NetWorkDataCache";

export class DataCache {
    /** 玩家自身状态 */
    data = new NetWorkDataCache();
    /** 服务器共享数据 */
    sharedData = new GameSharedDataCache();

    private initedCb: Function = null;

    /** 时间戳偏差值，用于维护一个高频更新的时间戳，单位：毫秒 */
    updatedStampOffset = 0;
    /** 总计在线时间，单位：秒 */
    totalOnlineTime = 0;
    /** 本次连接在线时长 */
    thisLinkOnlineTime = 0;

    /** 等待数据初始化完成 */
    waitInitCache(cb: Function) {
        this.initedCb = cb;
    }

    /** 处理数据更新信息 */
    handleUpdateMessage(m: CacheMessage) {
        if (m.partial) {
            this.partialUpdate(m.path, m.data, m.delKey);
        } else {
            this.update(m.path, m.data);
            // 初始化判断部分
            if (!this.initedCb) return;
            const hasInit = Object.keys(this.data).filter((k) => this.data[k] !== null).length;
            const total = Object.keys(this.data).length;
            GLog.debug(
                `缓存初始化，${hasInit}/${total}, 缺少${Object.keys(this.data)
                    .filter((k) => this.data[k] === null)
                    .join(",")}`
            );
            EventBus.emit(EventName.setLoadProgress, [GLang.code.ui.loading_init_data], hasInit / total);
            if (this.initedCb && Object.keys(this.data).every((k) => this.data[k] !== null)) {
                this.initedCb();
                this.initedCb = null;
            }
        }
    }

    /** 完全更新某部分数据 */
    private update<Key extends keyof NetWorkDataCache>(key: Key, newData: NetWorkDataCache[Key]) {
        // 部分需要较多操作方法的数据，修改原型链
        if (key === "time") {
            this.updatedStampOffset = 0;
        } else if (key === "stage") {
            Object.keys(newData).forEach((k) => {
                Reflect.setPrototypeOf(newData[k], MainStage.prototype);
            });
        } else if (key === "stageAfkBattleReward") {
            // @ts-ignore
            Reflect.setPrototypeOf(newData, AfkData.prototype);
        } else if (key === "cardPool") {
            Object.keys(newData).forEach((k) => {
                Reflect.setPrototypeOf(newData[k], CardPool.prototype);
            });
        } else if (key === "mainMission") {
            Object.keys(newData).forEach((k) => {
                Reflect.setPrototypeOf(newData[k], Mission.prototype);
            });
        } else if (key === "towerAfkReward") {
            // @ts-ignore
            Reflect.setPrototypeOf(newData, TowerAfkData.prototype);
        } else if (key === "giftPack") {
            Object.keys(newData).forEach((k) => {
                Reflect.setPrototypeOf(newData[k], GiftPack.prototype);
            });
        }
        //  else if (key === "playerEquipment") {
        //     // @ts-ignore
        //     newData.forEach((d) => {
        //         // 非空判定
        //         if (d) Reflect.setPrototypeOf(d, PlayerEquipment.prototype);
        //     });
        // } else if (key === "tempEquipment") {
        //     // @ts-ignore
        //     newData.forEach((d) => Reflect.setPrototypeOf(d, PlayerEquipment.prototype));
        // }
        else if (key === "playerEquipmentStorage") {
            Object.keys(newData).forEach((k) => {
                Reflect.setPrototypeOf(newData[k], PlayerEquipment.prototype);
            });
        } else if (key === "playerEquipmentPlace") {
            Object.keys(newData).forEach((k) => {
                Reflect.setPrototypeOf(newData[k], PlayerEquipmentPlace.prototype);
            });
        } else if (key === "playerSkill") {
            Object.keys(newData).forEach((k) => {
                Reflect.setPrototypeOf(newData[k], PlayerSkill.prototype);
            });
        } else if (key === "playerPet") {
            Object.keys(newData).forEach((k) => {
                Reflect.setPrototypeOf(newData[k], Pet.prototype);
            });
        } else if (key === "techTree") {
            Object.keys(newData).forEach((k) => {
                Reflect.setPrototypeOf(newData[k], Technology.prototype);
            });
        } else if (key === "playerMission") {
            Object.keys(newData).forEach((k) => {
                Reflect.setPrototypeOf(newData[k], Mission.prototype);
            });
        } else if (key === "careerTalent") {
            Object.keys(newData).forEach((k) => {
                Reflect.setPrototypeOf(newData[k], CareerTalent.prototype);
            });
        } else if (key === "sprites") {
            Object.keys(newData).forEach((k) => {
                Reflect.setPrototypeOf(newData[k], Sprite.prototype);
            });
        } else if (key === "warOrder") {
            Object.keys(newData).forEach((k) => {
                Reflect.setPrototypeOf(newData[k], warOrder.prototype);
            });
        } else if (key === "banquetMission") {
            Object.keys(newData).forEach((k) => {
                Reflect.setPrototypeOf(newData[k], Mission.prototype);
            });
        } else if (key === "challengeMission") {
            Object.keys(newData).forEach((k) => {
                Reflect.setPrototypeOf(newData[k], Mission.prototype);
            });
        } else if (key === "spritePool") {
            Object.keys(newData).forEach((k) => {
                Reflect.setPrototypeOf(newData[k], SpriteCardPool.prototype);
            });
        }
        this.data[key] = newData;
        EventBus.emit(EventName.stateKey[key], newData, []);
    }

    /** 更新某个键中的部分数据 */
    private partialUpdate<Key extends keyof NetWorkDataCache>(
        key: Key,
        newData: { [id: number | string]: any },
        delKey: (string | number)[]
    ) {
        Object.keys(newData).forEach((k) => {
            // 部分需要较多操作方法的数据，修改原型链
            if (key === "cardPool") {
                Reflect.setPrototypeOf(newData[k], CardPool.prototype);
            } else if (key === "mainMission") {
                Reflect.setPrototypeOf(newData[k], Mission.prototype);
            } else if (key === "giftPack") {
                Reflect.setPrototypeOf(newData[k], GiftPack.prototype);
            } else if (key === "playerSkill") {
                Reflect.setPrototypeOf(newData[k], PlayerSkill.prototype);
            } else if (key === "playerPet") {
                Reflect.setPrototypeOf(newData[k], Pet.prototype);
            } else if (key === "techTree") {
                Reflect.setPrototypeOf(newData[k], Technology.prototype);
            } else if (key === "playerEquipmentStorage") {
                Reflect.setPrototypeOf(newData[k], PlayerEquipment.prototype);
            } else if (key === "playerEquipmentPlace") {
                Reflect.setPrototypeOf(newData[k], PlayerEquipmentPlace.prototype);
            } else if (key === "playerMission") {
                Reflect.setPrototypeOf(newData[k], Mission.prototype);
            } else if (key === "stage") {
                Reflect.setPrototypeOf(newData[k], MainStage.prototype);
            } else if (key === "careerTalent") {
                Reflect.setPrototypeOf(newData[k], CareerTalent.prototype);
            } else if (key === "sprites") {
                Reflect.setPrototypeOf(newData[k], Sprite.prototype);
            } else if (key === "warOrder") {
                Reflect.setPrototypeOf(newData[k], warOrder.prototype);
            } else if (key === "banquetMission") {
                Reflect.setPrototypeOf(newData[k], Mission.prototype);
            } else if (key === "challengeMission") {
                Reflect.setPrototypeOf(newData[k], Mission.prototype);
            } else if (key === "spritePool") {
                Reflect.setPrototypeOf(newData[k], SpriteCardPool.prototype);
            }
            this.data[key][k] = newData[k];
        });
        if (delKey) {
            delKey.forEach((k) => {
                delete this.data[key][k];
            });
        }
        EventBus.emit(EventName.stateKey[key], newData, delKey || []);
    }

    /** 处理共享数据的更新 */
    handleGameSharedDataMessage(data: GameSharedDataMessage) {
        const originData = this.sharedData[data.path];
        switch (data.mode) {
            case "append": {
                data.data.forEach((d) => {
                    // @ts-ignore
                    originData.push(d);
                });
                break;
            }
            case "keyDel": {
                data.data.forEach((k) => {
                    delete originData[k];
                });
                break;
            }
            case "keyUpdate": {
                Object.keys(data.data).forEach((k) => {
                    originData[k] = data.data[k];
                });
                break;
            }
            case "replace": {
                this.sharedData[data.path] = data.data;
                break;
            }
        }
        EventBus.emit(EventName.sharedDataKey[data.path]);
    }
}
window["GState"] = new DataCache();
declare global {
    /** 玩家数据 */
    const GState: DataCache;
}
