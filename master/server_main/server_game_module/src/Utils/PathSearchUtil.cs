using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GamePlay;

public static class PathSearchUtil
{
    /**
    * itemMatrix是一个二维数组，null代表空的区域
    * beginPos代表玩家的位置（数组第1位是x轴位置，第2位是y轴位置）
    * 返回代表可行走区域的二维数组
    * */
    public static bool[][] GetRoadMatrix(MineBrick[][] itemMatrix, int[] beginPos)
    {
        bool[][] road = new bool[itemMatrix.Length][];
        for (int i = 0; i < itemMatrix.Length; i++)
        {
            road[i] = new bool[itemMatrix[0].Length];
            for (int j = 0; j < itemMatrix[0].Length; j++)
            {
                road[i][j] = false;
            }
        }
        HashSet<int> hasSearch = new HashSet<int>();
        Queue<int[]> queue = new Queue<int[]>();
        queue.Enqueue(beginPos);

        void search(int[] pos)
        {
            int x = pos[0];
            int y = pos[1];
            hasSearch.Add(x * itemMatrix.Length + y);
            if (itemMatrix[y][x] != null) return;
            road[y][x] = true;
            if (x > 0 && !hasSearch.Contains((x - 1) * itemMatrix.Length + y)) queue.Enqueue(new int[] { x - 1, y });
            if (x < itemMatrix[0].Length - 1 && !hasSearch.Contains((x + 1) * itemMatrix.Length + y)) queue.Enqueue(new int[] { x + 1, y });
            if (y > 0 && !hasSearch.Contains(x * itemMatrix.Length + y - 1)) queue.Enqueue(new int[] { x, y - 1 });
            if (y < itemMatrix.Length - 1 && !hasSearch.Contains(x * itemMatrix.Length + y + 1)) queue.Enqueue(new int[] { x, y + 1 });
        }

        while (queue.Count > 0)
        {
            search(queue.Dequeue());
        }
        return road;
    }

    /** 获取可达区域二维数组，传入道路数组 */
    public static bool[][] GetReachableMatrix(bool[][] road)
    {
        bool[][] res = new bool[road.Length][];
        for (int i = 0; i < road.Length; i++)
        {
            res[i] = new bool[road[0].Length];
            for (int j = 0; j < road[0].Length; j++)
            {
                res[i][j] = false;
            }
        }
        for (int i = 0; i < road.Length; i++)
        {
            for (int j = 0; j < road[0].Length; j++)
            {
                if (road[i][j])
                {
                    res[i][j] = true;
                }
                else if (i < road.Length - 1 && road[i + 1][j])
                {
                    res[i][j] = true;
                }
                else if (i > 0 && road[i - 1][j])
                {
                    res[i][j] = true;
                }
                else if (j < road[0].Length - 1 && road[i][j + 1])
                {
                    res[i][j] = true;
                }
                else if (j > 0 && road[i][j - 1])
                {
                    res[i][j] = true;
                }
            }
        }
        return res;
    }

    /** 获取到达位置旁边的位置（让矿工移动过去），传入道路数组和目标地点 */
    public static int[]? GetGoToPos(bool[][] road, int[] pos)
    {
        if (pos[0] > 0 && road[pos[1]][pos[0] - 1])
        {
            return new int[] { pos[0] - 1, pos[1] };
        }
        else if (pos[0] < road[0].Length - 1 && road[pos[1]][pos[0] + 1])
        {
            return new int[] { pos[0] + 1, pos[1] };
        }
        else if (pos[1] > 0 && road[pos[1] - 1][pos[0]])
        {
            return new int[] { pos[0], pos[1] - 1 };
        }
        else if (pos[1] < road.Length - 1 && road[pos[1] + 1][pos[0]])
        {
            return new int[] { pos[0], pos[1] + 1 };
        }
        else
        {
            return null;
        }
    }

}
