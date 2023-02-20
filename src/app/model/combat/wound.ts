import { InfoDialog } from "src/app/dialog/info/info.dialog";
import { RandomUtil } from "src/app/util/random.util";
import { Persistable, RegisterPersistable } from "../../persistence/persistable";
import { Npc } from "../character/npc";
import { DamageTypeEnum } from "../enum/damage-type.enum";
import { HitLocationEnum } from "../enum/hit-location.enum";
import { TestResultEnum } from "../enum/test-result.enum";
import { Attribute } from "../property/attribute.property";
import { Characteristic } from "../property/characteristic.property";
import { CombatProperties } from "../property/collections/combat";
import { MiscProperties } from "../property/collections/misc";
import { Test } from "./test";

@RegisterPersistable('8ec0cbd9-9d70-42fe-8594-993bde31afb2')
export class Wound implements Persistable<Wound> {
  
  constructor(
    readonly location: HitLocationEnum,
    readonly severity: number,
    readonly shockTestResult: TestResultEnum,
    public description?: string // TODO #30: remove
  ) {}
  
  clone(): Wound {
    return new Wound(this.location, this.severity, this.shockTestResult, this.description);
  }
  
  display(): string {
    return this.description + ' (' + this.severity.toString() + ')';
  }
  
  static make(npc: Npc, hitLocation: HitLocationEnum, damage: number, damageType: DamageTypeEnum) {
    return Test.make(npc, MiscProperties.SHOCK_TEST, {required: true}).subscribe(shockTest => {
      const failedShockTest = shockTest.result.isFail();
      let description: string;
      
      switch (hitLocation) {
        case HitLocationEnum.HEAD:
          InfoDialog.placeholder(npc.name + ' is Stunned for 1 round'); // TODO #30: replace with condition
          description = 'Wounded Head';
          if (failedShockTest) {
            const part = RandomUtil.coinFlip() ? 'Eye' : 'Ear'; // TODO #30: pick randomly from remaining eyes/ears
            const side = RandomUtil.coinFlip() ? 'Left' : 'Right';
            InfoDialog.placeholder(npc.name + ' has lost their ' + side + ' ' + part); // TODO #30: replace with set body part status
            description = 'Lost ' + side + ' ' + part;
          }
          break;
        case HitLocationEnum.BODY:
          npc.alter(Attribute.ACTION_POINTS, ap => ap - 1); // lose 1 AP
          description = 'Wounded Body';
          if (failedShockTest) {
            InfoDialog.placeholder(npc.name + ' has gained the \'Crippled Body\' condition'); // TODO #30: replace with set body status
            description = 'Crippled Body';
          }
          break;
        default:
          const status = failedShockTest ? 'Lost' : 'Crippled';
          InfoDialog.placeholder(npc.name + ' has gained the \'' + status + ' ' + hitLocation.name + '\' condition'); // TODO #30: replace with set body status
          description = status + ' ' + hitLocation.name;
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
          npc.alter(Attribute.STAMINA, sp => sp - 1); // lose 1 SP
          break;
        case DamageTypeEnum.SHOCK:
        case DamageTypeEnum.MAGIC:
          npc.alter(Attribute.MAGICKA, mp => mp - damage); // lose MP equal to damage taken
          break;
        default:
          // PHYSICAL has no special effect
          break;
      }
      
      const wound = new Wound(hitLocation, damage, shockTest.result, description);
      npc.alter(CombatProperties.WOUNDS, wounds => wounds.concat(wound));
      return wound;
    });
  }
  
}