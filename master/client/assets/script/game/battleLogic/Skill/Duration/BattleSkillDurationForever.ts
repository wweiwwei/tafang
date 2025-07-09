import { registerDuration } from "../../Processor/BattleIoc";
import { BattleSkillBaseDuration } from "./BattleSkillBaseDuration";

@registerDuration("duration/DurationForever")
export class BattleSkillDurationForever extends BattleSkillBaseDuration {}
