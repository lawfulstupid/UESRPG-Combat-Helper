import { of } from "rxjs";
import { LogComponent } from "src/app/components/log/log.component";
import { ValueRequestDialog } from "src/app/dialog/value-request/value-request.dialog";
import { ObservableUtil } from "src/app/util/observable.util";
import { Npc } from "../character/npc";
import { DamageTypeEnum } from "../enum/damage-type.enum";
import { HitLocationEnum } from "../enum/hit-location.enum";
import { MultiProperty } from "../property/abstract/multi.property";
import { Attribute } from "../property/attribute.property";
import { MiscProperties } from "../property/collections/misc";
import { Wound } from "./wound";

// This represents a damage expression delivered by the damage dealer
export class Damage {
  
  constructor(
    private readonly damage: number,
    private readonly damageType: DamageTypeEnum = DamageTypeEnum.PHYSICAL,
    private readonly bonusDamage: number = 0 // the extra damage dealt by slashing/splitting/crushing
  ) {
    if (damage < 0) {
      throw new Error('Cannot deal negative damage');
    }
  }
  
  // Applies the damage to an NPC, return final damage taken after all mitigations
  apply(npc: Npc, hitLocation: HitLocationEnum): DamageApplication {
    // Compute the damage taken to target's HP
    // TODO #14: get armour and resolve bonus damage
    let appliedDamage: DamageApplication;
    if (this.damageType.parent === DamageTypeEnum.PHYSICAL) {
      appliedDamage = new DamageApplication(this.damage + this.bonusDamage, DamageTypeEnum.PHYSICAL, npc, hitLocation);
    } else {
      appliedDamage = new DamageApplication(this.damage, this.damageType, npc, hitLocation);
    }
    
    npc.alter(Attribute.HIT_POINTS, hp => hp - appliedDamage.damage);
    return appliedDamage;
  }
  
}

// This represents damage as applied to an NPC, and generates a wound if required
export class DamageApplication {
  
  constructor(
    readonly damage: number,
    readonly damageType: DamageTypeEnum,
    readonly npc: Npc,
    readonly hitLocation?: HitLocationEnum
  ) {
    if (damage < 0) {
      throw new Error('Cannot deal negative damage');
    }
    if (damageType.parent === DamageTypeEnum.PHYSICAL) {
      throw new Error('Physical damage subtypes cannot be applied');
    }
    
    LogComponent.log(npc.name + ' took ' + damageType.pretty(damage) + (hitLocation ? ' to their ' + hitLocation.name : '') + '.');
    
    npc.get(Attribute.HIT_POINTS).subscribe(hp => {
      if (hp <= 0) {
        LogComponent.log(npc.name + ' died.');
        return; // no need to generate wound if already dead
      }
      npc.get(Attribute.WOUND_THRESHOLD).subscribe(wt => {
        if (damage > wt) {
          // Use hit location provided, or ask user if missing
          ObservableUtil.coalesce(
            () => of(MultiProperty.combine(hitLocation, 0)),
            () => ValueRequestDialog.requestValue(MiscProperties.WOUND_LOCATION, this.npc, true)
          ).subscribe(([hitLocation, tempModifier]) => {
            Wound.make(npc, hitLocation, damage, damageType, tempModifier);
          });
        }
      });
    });
  }
  
}