import { RegisterPersistable } from "src/app/persistence/persistable";
import { Enum } from "../enum";

@RegisterPersistable('5413eb4b-958a-4524-baf3-c6975e48015f')
export class WeaponQualityEnum extends Enum<WeaponQualityEnum> {
  
  public static readonly COMPLEX = new WeaponQualityEnum('Complex');
  public static readonly CONCUSSIVE = new WeaponQualityEnum('Concussive');
  public static readonly DAMAGED = new WeaponQualityEnum('Damaged');
  public static readonly DUELING_WEAPON = new WeaponQualityEnum('Dueling Weapon');
  public static readonly ENTRANGLING = new WeaponQualityEnum('Entangling');
  public static readonly FOCUS = new WeaponQualityEnum('Focus');
  public static readonly EXPLOIT_WEAKNESS = new WeaponQualityEnum('Exploit Weakness');
  public static readonly FLAIL = new WeaponQualityEnum('Flail');
  public static readonly IMPALING = new WeaponQualityEnum('Impaling');
  public static readonly MAGIC = new WeaponQualityEnum('Magic');
  public static readonly ARCANE = new WeaponQualityEnum('Arcane');
  public static readonly MOUNTED = new WeaponQualityEnum('Mounted');
  public static readonly PRIMITIVE = new WeaponQualityEnum('Primitive');
  public static readonly PROVEN = new WeaponQualityEnum('Proven');
  public static readonly SHIELD_SPLITTER = new WeaponQualityEnum('Shield Splitter');
  public static readonly SMALL = new WeaponQualityEnum('Small');
  public static readonly THROWN = new WeaponQualityEnum('Thrown');
  public static readonly UNWIELDY = new WeaponQualityEnum('Unwieldy');
  
}