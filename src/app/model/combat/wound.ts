import { Npc } from "../character/npc";
import { HitLocationEnum } from "../enum/hit-location.enum";
import { TestResultEnum } from "../enum/test-result.enum";
import { Simplifiable, Simplified } from "../interface/simple";
import { CombatProperties } from "../property/collections/combat";
import { MiscProperties } from "../property/collections/misc";
import { Modifier } from "../property/modifier.property";
import { Test } from "./test";

export class Wound implements Simplifiable<Wound> {
  
  constructor(
    readonly location: HitLocationEnum,
    readonly severity: number,
    readonly shockTestResult: TestResultEnum
  ) {}
  
  simplify(): SimplifiedWound {
    return new SimplifiedWound(this);
  }
  
  static make(npc: Npc, hitLocation: HitLocationEnum, damage: number) {
    return Test.make(npc, MiscProperties.SHOCK_TEST, {required: true}).subscribe(shockTest => {
      const wound = new Wound(hitLocation, damage, shockTest.result);
      npc.alterProperty(CombatProperties.WOUNDS, wounds => wounds.concat(wound));
      npc.alterProperty(Modifier.WOUND_PASSIVE, penalty => penalty - 20);
      return wound;
    });
  }
  
}

export class SimplifiedWound implements Simplified<Wound> {
  
  private readonly location: string;
  private readonly severity: number;
  private readonly shockTestResult: string;
  
  constructor(wound: Wound) {
    this.location = wound.location.key();
    this.severity = wound.severity;
    this.shockTestResult = wound.shockTestResult.key();
  }
  
  desimplify(): Wound {
    return new Wound(
      HitLocationEnum.value(this.location),
      this.severity,
      TestResultEnum.value(this.shockTestResult)
    );
  }
  
}