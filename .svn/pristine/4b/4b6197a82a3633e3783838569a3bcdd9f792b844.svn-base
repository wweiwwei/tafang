import { MineMapType } from "../config/GEnum";
import { MineAction } from "../entity/MineAction";
import { MineBrick } from "../entity/MineBrick";
import WindowBattleScene from "../module/battle/WindowBattleScene";

export default class MineModel {
    /** 看视频恢复体力 */
    async videoAddPower() {
        if (this.getVideoPowerRecoverRemain() > 0) {
            await GSDK.showVideo("video_add_power");
            return GApi.mine.videoAddPower();
        } else {
            GTip.showTip([GLang.code.ui.mine_not_remain]);
        }
    }
    /** 看视频恢复体力 */
    async videoAddDrill() {
        if (this.getVideoDrillRemain() > 0) {
            await GSDK.showVideo("video_add_drill");
            return GApi.mine.videoAddDrill();
        } else {
            GTip.showTip([GLang.code.ui.mine_not_remain]);
        }
    }
    /** 看视频恢复体力 */
    async videoAddBomb() {
        if (this.getVideoBombRemain() > 0) {
            await GSDK.showVideo("video_add_bomb");
            return GApi.mine.videoAddBomb();
        } else {
            GTip.showTip([GLang.code.ui.mine_not_remain]);
        }
    }
    /** 看视频解锁自动挖矿 */
    videoAuto() {
        return GApi.mine.videoAuto();
    }
    /** 重置层数 */
    resetFloor() {
        return GApi.mine.resetFloor();
    }

    /** 视频获取钻石 */
    videoDiamond() {
        return GApi.mine.videoDiamond();
    }

    wait = false;

    /** 挖矿 */
    async hitBrick(uniqueId: number): Promise<MineAction[]> {
        const brick = this.getBrickByUniqueId(uniqueId);
        if (!brick) {
            return [];
        }
        const baseY = this.getCurrentFloor() - 5;
        const pos = [brick.x, brick.y - baseY];
        const reachMatrix = this.getReachableMatrix();
        const reach = reachMatrix[pos[1]][pos[0]];
        if (!reach) {
            // GTip.showTip(["ui/not_reachable"]);
            GTip.showTip(["_rs无法到达"]);
            return [];
        }
        // if (brick.mapType == MineMapType.BATTLE) {
        //     const road = this.getRoadMatrix();
        //     const goToPos = GUtils.pathSearch.getGoToPos(road, pos);
        //     if (!goToPos) return;
        //     const direction = (() => {
        //         if (goToPos[0] >= pos[0]) {
        //             return "right";
        //         } else {
        //             return "left";
        //         }
        //     })();
        //     return [
        //         { action: "minerChangeDirection", data: { direction } },
        //         { action: "minerMove", data: { x: goToPos[0], y: goToPos[1] + baseY } },
        //         { action: "minerHitBrick", data: { uniqueId } },
        //         { action: "battle", data: { uniqueId } },
        //     ];
        // } else {
        return GApi.mine.hitBrick({ uniqueId, quick: GModel.localStorage.mineQuick === true });
        // }
    }

    /** 挖矿战斗 */
    async mineBattle(uniqueId: number): Promise<MineAction[]> {
        const brick = this.getBrickByUniqueId(uniqueId);
        const tblId = brick.rewardId;
        const processor = GModel.battle.createMineBattle(tblId);
        const { win } = await GWindow.open(WindowBattleScene, {
            startOnInit: true,
            processor,
            battleType: "mine",
        });
        GAudio.playMusic("main");
        if (win) {
            return GApi.mine.hitBrick({ uniqueId, quick: !!GModel.localStorage.mineQuick });
        } else {
            return [];
        }
    }

    /** 挑战boss */
    async challengeBoss() {
        return await GApi.mine.challengeBoss();
    }

    /** 获取所有砖块 */
    getAllBrick(): MineBrick[] {
        return Object.keys(GState.data.mineBrick).map((id) => {
            let brick: MineBrick = GState.data.mineBrick[id];
            return brick;
        });
    }

    /** 通过uid获取砖块 */
    getBrickByUniqueId(uniqueId: number): MineBrick {
        return GState.data.mineBrick[uniqueId];
    }

    /** 通过挖矿奖励id获取挖矿表物品的奖励id */
    getItemIdByRewardId(id: number) {
        return GTable.getList("MineRewardTbl").find((t) => t.id === id).rewardId;
    }
    /** 通过挖矿奖励id获取挖矿表物品的图片 */
    getItemIdByRewardImg(id: number) {
        return GTable.getList("MineRewardTbl").find((t) => t.id === id).img;
    }

    /** 获取砖块二维数组，注意没有砖块的格子是null */
    getBrickAsMatrix(): MineBrick[][] {
        const bricks = this.getAllBrick();
        const matrix: MineBrick[][] = [];
        for (let i = 0; i < 6; i++) {
            matrix[i] = [];
            for (let j = 0; j < 6; j++) {
                matrix[i].push(null);
            }
        }
        const baseY = this.getCurrentFloor() - 5;
        bricks.forEach((brick) => {
            const x = brick.x;
            const y = brick.y - baseY;
            if (y >= 0) {
                matrix[y][x] = brick;
            }
        });
        // console.log(matrix);

        return matrix;
    }

    /** 获取道路区域二维数组 */
    getRoadMatrix(): boolean[][] {
        const bricks = this.getBrickAsMatrix();
        const minerPos = this.getMinerPos();
        const baseY = this.getCurrentFloor() - 5;
        const minerMatrixPos = [minerPos[0], minerPos[1] - baseY];
        return GUtils.pathSearch.getRoadMatrix(bricks, minerMatrixPos);
    }

    /** 获取可达区域二维数组 */
    getReachableMatrix(): boolean[][] {
        const roads = this.getRoadMatrix();
        return GUtils.pathSearch.getReachableMatrix(roads);
    }

    /** 获取当前层数 */
    getCurrentFloor() {
        return GState.data.mineData.floor;
    }

    /** 获取当前体力 */
    getCurrentPower() {
        return GState.data.mineData.power;
    }

    /** 获取剩余视频恢复体力次数 */
    getVideoPowerRecoverRemain() {
        return GConfig.mine.videoPowerLimit - GState.data.mineData.videoPower;
    }
    /** 获取剩余视频恢复体力次数 */
    getVideoDrillRemain() {
        return GConfig.mine.videoPowerLimit - GState.data.mineData.videoDrill;
    }
    /** 获取剩余视频恢复体力次数 */
    getVideoBombRemain() {
        return GConfig.mine.videoPowerLimit - GState.data.mineData.videoBomb;
    }

    /** 获取当前玩家位置 */
    getMinerPos() {
        return GState.data.mineData.minerPos;
    }

    /** 自动挖矿下一个目标位置，返回砖块uniqueId */
    nextAutoPos(): number {
        // todo
        return null;
    }
    /** 使用道具 1-钻头，2-炸药 */
    usePro(propType: number, x: number, y: number): Promise<MineAction[]> {
        return GApi.mine.usePro({ propType, x, y });
    }
}
