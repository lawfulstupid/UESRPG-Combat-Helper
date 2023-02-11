import { Enum } from "./enum";

export class DamageType extends Enum {
  
  public static readonly PHYSICAL = new DamageType('');
  public static readonly SLASHING = new DamageType('Slashing', this.PHYSICAL);
  public static readonly SPLITTING = new DamageType('Splitting', this.PHYSICAL);
  public static readonly CRUSHING = new DamageType('Crushing', this.PHYSICAL);
  
  public static readonly MAGIC = new DamageType('Magic');
  public static readonly FIRE = new DamageType('Fire', this.MAGIC);
  public static readonly FROST = new DamageType('Frost', this.MAGIC);
  public static readonly SHOCK = new DamageType('Shock', this.MAGIC);
  public static readonly POISON = new DamageType('Poison', this.MAGIC);
  
  constructor(name: string, readonly parent?: DamageType) {
    super(name);
  }
  
}