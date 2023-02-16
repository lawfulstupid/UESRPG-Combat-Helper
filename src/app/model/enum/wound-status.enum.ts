import { Enum } from "./enum";

export class WoundStatusEnum extends Enum {
  
  public static readonly OK = new WoundStatusEnum('OK', true, true);
  public static readonly WOUNDED = new WoundStatusEnum('Wounded', true, true);
  public static readonly CRIPPLED = new WoundStatusEnum('Crippled', true, false);
  public static readonly MAIMED = new WoundStatusEnum('Maimed', true, false); // doubles as 'Organ Damage'
  public static readonly LOST = new WoundStatusEnum('Lost', false, false);
  
  private constructor(name: string, readonly canEquipArmour: boolean, readonly canUseItems: boolean) {
    super(WoundStatusEnum, name);
  }
  
}