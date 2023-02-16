import { InfoDialog } from "src/app/dialog/info/info.dialog";
import { EventManager } from "src/app/service/event.manager";
import { Persistable, RegisterPersistable } from "../../persistence/persistable";
import { Npc } from "../character/npc";
import { DamageTypeEnum } from "../enum/damage-type.enum";
import { HitLocationEnum } from "../enum/hit-location.enum";
import { TestResultEnum } from "../enum/test-result.enum";
import { WoundStatusEnum } from "../enum/wound-status.enum";
import { Attribute } from "../property/attribute.property";
import { Characteristic } from "../property/characteristic.property";
import { CombatProperties } from "../property/collections/combat";
import { MiscProperties } from "../property/collections/misc";
import { WoundLocationProperty } from "../property/wound-location.property";
import { Test } from "./test";

@RegisterPersistable('8ec0cbd9-9d70-42fe-8594-993bde31afb2')
export class Wound implements Persistable<Wound> {
  
  guid: string = crypto.randomUUID();
  
  constructor(
    readonly location: HitLocationEnum,
    readonly severity: number,
    readonly shockTestResult: TestResultEnum,
    public description?: string // TODO #30: remove
  ) {}
  
  clone(): Wound {
    const copy = new Wound(this.location, this.severity, this.shockTestResult, this.description);
    copy.guid = this.guid;
    return copy;
  }
  
  display(): string {
    return this.description + ' (' + this.severity.toString() + ')';
  }
  
  static make(npc: Npc, hitLocation: HitLocationEnum, damage: number, damageType: DamageTypeEnum) {
    let woundLocation: WoundLocationProperty = hitLocation.asWoundLocation;
    let woundStatus: WoundStatusEnum;
    
    return Test.make(npc, MiscProperties.SHOCK_TEST, {required: true}).subscribe(shockTest => {
      const failedShockTest = shockTest.result.isFail();
      
      switch (hitLocation) {
        case HitLocationEnum.HEAD:
          woundStatus = WoundStatusEnum.WOUNDED;
          InfoDialog.placeholder(npc.name + ' is Stunned for 1 round'); // TODO #30: replace with condition
          if (failedShockTest) {
            woundStatus = WoundStatusEnum.LOST;
            woundLocation = WoundLocationProperty.randomHeadPart();
          }
          break;
        case HitLocationEnum.BODY:
          woundStatus = WoundStatusEnum.WOUNDED;
          npc.alter(Attribute.ACTION_POINTS, ap => ap - 1); // lose 1 AP
          if (failedShockTest) {
            woundStatus = WoundStatusEnum.CRIPPLED;
          }
          break;
        default:
          woundStatus = failedShockTest ? WoundStatusEnum.LOST : WoundStatusEnum.CRIPPLED;
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
      
      const description = woundStatus.name + ' ' + woundLocation.name;
      InfoDialog.placeholder(npc.name + ' has gained the \'' + description + '\' condition'); // TODO #30: replace with set body status
      const wound = new Wound(hitLocation, damage, shockTest.result, description);
      npc.put(woundLocation, woundStatus);
      npc.alter(CombatProperties.WOUNDS, wounds => wounds.concat(wound));
      EventManager.npcWoundedEvent.emit(npc);
      return wound;
    });
  }
  
}