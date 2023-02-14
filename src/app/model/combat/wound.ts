import { InfoDialog } from "src/app/dialog/info/info.dialog";
import { RandomUtil } from "src/app/util/random.util";
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
      
      const failedShockTest = shockTest.result.isFail();
      
      switch (hitLocation) {
        case HitLocationEnum.HEAD:
          InfoDialog.placeholder(npc.name + ' is Stunned for 1 round'); // TODO #30: replace with condition
          if (failedShockTest) {
            const part = RandomUtil.coinFlip() ? 'Eye' : 'Ear'; // TODO #30: pick randomly from remaining eyes/ears
            const side = RandomUtil.coinFlip() ? 'Left' : 'Right';
            InfoDialog.placeholder(npc.name + ' has lost their ' + side + ' ' + part); // TODO #30: replace with set body part status
          }
          break;
        case HitLocationEnum.BODY:
          npc.alterProperty(Attribute.AP, ap => ap - 1); // lose 1 AP
          if (failedShockTest) {
            InfoDialog.placeholder(npc.name + ' has gained the \'Crippled Body\' condition'); // TODO #30: replace with set body status
          }
          break;
        default:
          const status = failedShockTest ? 'Lost' : 'Crippled';
          InfoDialog.placeholder(npc.name + ' has gained the \'' + status + ' ' + hitLocation.name + '\' condition'); // TODO #30: replace with set body status
          break;
      }
      
      switch (damageType) {
        case DamageTypeEnum.FIRE:
          Test.make(npc, Characteristic.AGILITY, {required: true}).subscribe(agTest => {
            if (agTest.result.isFail()) {
              InfoDialog.placeholder(npc.name + ' has gained the Burning(1) condition'); // TODO #30: replace with condition
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