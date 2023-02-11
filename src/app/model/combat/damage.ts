import { Npc } from "../character/npc";
import { DamageTypeEnum } from "../enum/damage-type.enum";
import { HitLocationEnum } from "../enum/hit-location.enum";

export class Damage {
  
  constructor(
    private readonly damage: number,
    private damageType: DamageTypeEnum,
    private readonly bonusDamage: number = 0 // the extra damage dealt by slashing/splitting/crushing
  ) {}
  
  getDamage(npc: Npc, hitLocation: HitLocationEnum): [number, DamageTypeEnum] {
    if (this.damageType.parent === DamageTypeEnum.PHYSICAL) {
      // TODO #14: get armour and resolve bonus damage
      return [this.damage, DamageTypeEnum.PHYSICAL];
    } else {
      return [this.damage, this.damageType];
    }
  }
  
}