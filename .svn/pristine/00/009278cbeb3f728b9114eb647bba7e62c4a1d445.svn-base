import BattleIndex from "./index/BattleIndex";
import IdIndex from "./index/IdIndex";
import MissionIndex from "./index/MissionIndex";
import SceneIndex from "./index/SceneIndex";
import TowerIndex from "./index/TowerIndex";

export class TableIndex {
    /** 抽象语法树缓存 */
    treeCache: Map<string, any> = new Map<string, any>();
    /** 战斗配置缓存 */
    battle = new BattleIndex();
    /** 场景缓存 */
    scene = new SceneIndex();
    id = new IdIndex();
    mission = new MissionIndex();

    tower = new TowerIndex();
}

declare global {
    /** 表格索引 */
    const GIndex: TableIndex;
}
