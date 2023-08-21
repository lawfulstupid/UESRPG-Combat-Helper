import { RegisterPersistable } from "src/app/persistence/persistable";
import { Enum } from "./enum";

@RegisterPersistable('0e20865b-84b0-4551-b0a6-4aacdf104f33')
export class DamageTypeEnum extends Enum<DamageTypeEnum> {
  
  public static readonly PHYSICAL = new DamageTypeEnum('');
  public static readonly SLASHING = new DamageTypeEnum('Slashing', DamageTypeEnum.PHYSICAL);
  public static readonly SPLITTING = new DamageTypeEnum('Splitting', DamageTypeEnum.PHYSICAL);
  public static readonly CRUSHING = new DamageTypeEnum('Crushing', DamageTypeEnum.PHYSICAL);
  
  public static readonly MAGIC = new DamageTypeEnum('Magic');
  public static readonly FIRE = new DamageTypeEnum('Fire', DamageTypeEnum.MAGIC);
  public static readonly FROST = new DamageTypeEnum('Frost', DamageTypeEnum.MAGIC);
  public static readonly SHOCK = new DamageTypeEnum('Shock', DamageTypeEnum.MAGIC);
  public static readonly POISON = new DamageTypeEnum('Poison', DamageTypeEnum.MAGIC);
  
  constructor(name: string, readonly parent?: DamageTypeEnum) {
    super(name);
  }
  
  pretty(damage: number): string {
    return damage.toString() + (this === DamageTypeEnum.PHYSICAL ? '' : ' ' + this.name) + ' damage';
  }
  
}