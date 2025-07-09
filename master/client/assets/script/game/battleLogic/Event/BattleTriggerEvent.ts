import { BattleDamage } from "../Entity/BattleDamage";
import { BattleBattleStageObject } from "../Object/BattleStage/BattleBattleStageObject";

export type BattleTriggerEvent = {
    match: BattleBattleStageObject;
    source: BattleBattleStageObject;
    target: BattleBattleStageObject;
} & BattleTriggerEventBody;

type BattleTriggerEventBody =
    | {
          kind: "hpZero";
          damage: BattleDamage;
      }
    | {
          kind: "beforeDamageSettle";
          damage: BattleDamage;
      }
    | {
          kind: "beforeReceiveDamageSettle";
          damage: BattleDamage;
      }
    | {
          kind: "afterDamageSettle";
          damage: BattleDamage;
      }
    | {
          kind: "afterReceiveDamageSettle";
          damage: BattleDamage;
      }
    | {
          kind: "hurt";
          damage: BattleDamage;
      }
    | {
          kind: "kill";
          damage: BattleDamage;
      }
    | {
          kind: "roundBegin";
      }
    | {
          kind: "roundEnd";
      }
    | {
          kind: "afterNormalAttack";
          damage: BattleDamage;
      };
