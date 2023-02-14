import { Npc } from "../character/npc";
import { DamageTypeEnum } from "../enum/damage-type.enum";
import { HitLocationEnum } from "../enum/hit-location.enum";
import { TestResultEnum } from "../enum/test-result.enum";
import { Attribute } from "../property/attribute.property";
import { Characteristic } from "../property/characteristic.property";
import { CombatProperties } from "../property/collections/combat";
import { MiscProperties } from "../property/collections/misc";
import { Modifier } from "../property/modifier.property";
import { Simplifiable } from "../serialisation/simple";
import { SimplifiedWound } from "../serialisation/simplified-wound";
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
  
  static make(npc: Npc, hitLocation: HitLocationEnum, damage: number, damageType: DamageTypeEnum) {
    return Test.make(npc, MiscProperties.SHOCK_TEST, {required: true}).subscribe(shockTest => {
      const wound = new Wound(hitLocation, damage, shockTest.result);
      npc.alterProperty(CombatProperties.WOUNDS, wounds => wounds.concat(wound));
      npc.alterProperty(Modifier.WOUND_PASSIVE, penalty => penalty - 20);
      
      switch (hitLocation) {
        case HitLocationEnum.HEAD:
          // TODO #30: add 'Stunned' condition for 1 round
          // TODO #30: on failed shock test, set eye/ear (random) status to 'Lost'
          break;
        case HitLocationEnum.BODY:
          npc.alterProperty(Attribute.AP, ap => ap - 1); // lose 1 AP
          // TODO #30: on failed shock test, set body status to 'Crippled'
          break;
        default:
          // TODO #30: set limb status to 'Crippled'
          // TODO #30: on failed shock test, set limb status to 'Lost'
          break;
      }
      
      switch (damageType) {
        case DamageTypeEnum.FIRE:
          Test.make(npc, Characteristic.AGILITY, {required: true}).subscribe(agTest => {
            if (agTest.result.isFail()) {
              // TODO #30: add 'Burning(1)' condition
            }
          });
          break;
        case DamageTypeEnum.FROST:
        case DamageTypeEnum.POISON:
          npc.alterProperty(Attribute.SP, sp => sp - 1); // lose 1 SP
          break;
        case DamageTypeEnum.SHOCK:
        case DamageTypeEnum.MAGIC:
          npc.alterProperty(Attribute.MP, mp => mp - damage); // lose MP equal to damage taken
          break;
        default:
          // PHYSICAL has no special effect
          break;
      }
      
      return wound;
    });
  }
  
}