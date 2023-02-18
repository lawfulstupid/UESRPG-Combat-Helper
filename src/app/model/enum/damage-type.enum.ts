import { Enum } from "./enum";

export class DamageTypeEnum extends Enum<DamageTypeEnum> {
  
  public static readonly PHYSICAL = new DamageTypeEnum('');
  public static readonly SLASHING = new DamageTypeEnum('Slashing', this.PHYSICAL);
  public static readonly SPLITTING = new DamageTypeEnum('Splitting', this.PHYSICAL);
  public static readonly CRUSHING = new DamageTypeEnum('Crushing', this.PHYSICAL);
  
  public static readonly MAGIC = new DamageTypeEnum('Magic');
  public static readonly FIRE = new DamageTypeEnum('Fire', this.MAGIC);
  public static readonly FROST = new DamageTypeEnum('Frost', this.MAGIC);
  public static readonly SHOCK = new DamageTypeEnum('Shock', this.MAGIC);
  public static readonly POISON = new DamageTypeEnum('Poison', this.MAGIC);
  
  constructor(name: string, readonly parent?: DamageTypeEnum) {
    super(name);
  }
  
}