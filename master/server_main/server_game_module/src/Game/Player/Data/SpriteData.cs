using System.Collections.Immutable;

namespace GamePlay;

public record SpriteData(
    ImmutableArray<int> formation,
    ImmutableDictionary<int, Sprite> sprites,
    /** 总计抽卡 */
    int total,
    /** 今日抽卡 */
    int today,
    /** 保底计数 */
    int guarantee,
    int video
)
{
    public SpriteData() : this(
        formation: ImmutableArray<int>.Empty,
        sprites: ImmutableDictionary<int, Sprite>.Empty,
        total: 0,
        today: 0,
        guarantee: 0,
        video: 2
    )
    { }
}
