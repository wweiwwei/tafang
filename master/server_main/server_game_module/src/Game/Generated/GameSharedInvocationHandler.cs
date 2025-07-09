namespace GamePlay;
#pragma warning disable CS8600
#pragma warning disable CS8605

public static class GameSharedInvocationHandler
{

    private static void CheckInfo(GameErrorInfo info)
    {
        if (info.code != 0)
        {
            throw new GameSharedManagerRequestException(info);
        }
    }

    public static Task Handle(string path, Task<(GameErrorInfo, object?)> data)
    {
        Task res;
        switch (path)
        {
            case "RankingSharedManager/UpdateRanking":
                {
                    res = data.ContinueWith((task) =>
                    {
                        var (info, o) = task.Result;
                        CheckInfo(info);
                        return;
                    });
                    break;
                }
            case "RankingSharedManager/Top100":
                {
                    res = data.ContinueWith((task) =>
                    {
                        var (info, o) = task.Result;
                        CheckInfo(info);
                        return (System.Collections.Immutable.ImmutableArray<GamePlay.ArenaRoleRankInfo>)o;
                    });
                    break;
                }
            case "RankingSharedManager/PlayerRank":
                {
                    res = data.ContinueWith((task) =>
                    {
                        var (info, o) = task.Result;
                        CheckInfo(info);
                        return (System.Int32)o;
                    });
                    break;
                }
            case "VideoGroupPurchaseSharedManager/LaunchGroupPurchase":
                {
                    res = data.ContinueWith((task) =>
                    {
                        var (info, o) = task.Result;
                        CheckInfo(info);
                        return;
                    });
                    break;
                }
            case "VideoGroupPurchaseSharedManager/JoinGroupPurchase":
                {
                    res = data.ContinueWith((task) =>
                    {
                        var (info, o) = task.Result;
                        CheckInfo(info);
                        return;
                    });
                    break;
                }
            case "VideoGroupPurchaseSharedManager/IsCanJoin":
                {
                    res = data.ContinueWith((task) =>
                    {
                        var (info, o) = task.Result;
                        CheckInfo(info);
                        return (System.Boolean)o;
                    });
                    break;
                }
            case "VideoGroupPurchaseSharedManager/RecentVideoGroupPurchase":
                {
                    res = data.ContinueWith((task) =>
                    {
                        var (info, o) = task.Result;
                        CheckInfo(info);
                        return (System.Collections.Immutable.ImmutableDictionary<System.Int64, GamePlay.VideoGroupPurchase>)o;
                    });
                    break;
                }
            default:
                {
                    throw new Exception("not valid invocation");
                }
        }
        return res;
    }
}