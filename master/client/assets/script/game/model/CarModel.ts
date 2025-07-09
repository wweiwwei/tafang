import { BattleCar } from "../entity/BattleCar";
import CarEquipment from "../entity/CarEquipment";

export class CarModel {
    /** 获取战车数据 */
    getBattleCar(): BattleCar {
        return GState.data.battleCar;
    }

    /** 获取所有战车装备 */
    getAllCarEquipment(): CarEquipment[] {
        return Object.keys(GState.data.battleCarEquipment).map((k) => GState.data.battleCarEquipment[k]);
    }

    /** 通过id获取战车装备 */
    getCarEquipmentById(id: number): CarEquipment {
        return GState.data.battleCarEquipment[id];
    }

    /** 设置战车装备 */
    setCarEquipment(equipment: { id: number; level: number }[]) {
        return GApi.car.setCarEquipment({ equipment });
    }

    /** 升级战车装备 */
    upgradeCarEquipment(part: number): Promise<void> {
        return GApi.car.upgradeCarEquipment({ part });
    }

    /** 在背包中升级战车装备 */
    upgradeCarEquipmentInKnapsack(id: number, level: number): Promise<void> {
        return GApi.car.upgradeCarEquipmentInKnapsack({ id, level });
    }

    /** 更换战车装备 */
    replaceCarEquipment(part: number, equipment: { id: number; level: number }): Promise<void> {
        return GApi.car.replaceCarEquipment({ part, equipment });
    }

    /** 战车升级 */
    upgradeCar(): Promise<void> {
        return GApi.car.upgradeCar();
    }
}
