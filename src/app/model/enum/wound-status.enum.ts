import { RegisterPersistable } from "src/app/persistence/persistable";
import { Enum } from "./enum";

@RegisterPersistable('e1b03fb7-54b8-498f-99e9-a0e942e44321')
export class WoundStatusEnum extends Enum<WoundStatusEnum> {
  
  public static readonly OK = new WoundStatusEnum('OK', true, true);
  public static readonly WOUNDED = new WoundStatusEnum('Wounded', true, true);
  public static readonly CRIPPLED = new WoundStatusEnum('Crippled', true, false);
  public static readonly MAIMED = new WoundStatusEnum('Maimed', true, false); // doubles as 'Organ Damage'
  public static readonly LOST = new WoundStatusEnum('Lost', false, false);
  
  private constructor(name: string, readonly canEquipArmour: boolean, readonly canUseItems: boolean) {
    super(name);
  }
  
}