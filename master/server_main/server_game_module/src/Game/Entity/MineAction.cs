using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Linq;
using System.Threading.Tasks;

namespace GamePlay
{
    public record MineAction(string action, object data) { }

    public record MineActionMinerChangeDirection(string direction)
    {
        public MineAction ToAction()
        {
            return new MineAction("minerChangeDirection", this);
        }
    }

    public record MineActionMinerMove(int x, int y)
    {
        public MineAction ToAction()
        {
            return new MineAction("minerMove", this);
        }
    }

    public record MineActionMinerHitBrick(int uniqueId)
    {
        public MineAction ToAction()
        {
            return new MineAction("minerHitBrick", this);
        }
    }

    public record MineActionBrickDamage(int uniqueId, int life)
    {
        public MineAction ToAction()
        {
            return new MineAction("brickDamage", this);
        }
    }

    public record MineActionShowBrickReward(int uniqueId, ImmutableArray<Item> reward)
    {
        public MineAction ToAction()
        {
            return new MineAction("showBrickReward", this);
        }
    }

    public record MineActionShowDiamondWindow(int count)
    {
        public MineAction ToAction()
        {
            return new MineAction("showDiamondWindow", this);
        }
    }

    public record MineActionDelay(long time)
    {
        public MineAction ToAction()
        {
            return new MineAction("delay", this);
        }
    }

    public record MineActionFloorChange(int floor)
    {
        public MineAction ToAction()
        {
            return new MineAction("floorChange", this);
        }
    }

    public record MineActionShowBoss(int bossId)
    {
        public MineAction ToAction()
        {
            return new MineAction("showBoss", this);
        }
    }

    public record MineActionBattle(int uniqueId)
    {
        public MineAction ToAction()
        {
            return new MineAction("battle", this);
        }
    }
}