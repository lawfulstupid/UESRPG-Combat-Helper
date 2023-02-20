import { RegisterPersistable } from "src/app/persistence/persistable";
import { Enum } from "../enum";

@RegisterPersistable('237ea306-b393-441e-9600-f78a07ec38f4')
export class EquipmentQualityEnum extends Enum<EquipmentQualityEnum> {
  
  public static readonly INFERIOR = new EquipmentQualityEnum('Inferior');
  public static readonly COMMON = new EquipmentQualityEnum('Common');
  public static readonly SUPERIOR = new EquipmentQualityEnum('Superior');
  
}