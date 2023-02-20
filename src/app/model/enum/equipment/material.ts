import { RegisterPersistable } from "src/app/persistence/persistable";
import { Enum } from "../enum";

@RegisterPersistable('4f4f14c9-3706-458e-bf1e-328402e352c2')
export class MaterialEnum extends Enum<MaterialEnum> {
  
  public static readonly BONE       = new MaterialEnum('Bone',       +0,  0.5,   0);
  public static readonly WOOD       = new MaterialEnum('Wood',       +0,  0.5, 100);
  public static readonly CHITIN     = new MaterialEnum('Chitin',     +0,  0.8,   1);
  public static readonly IRON       = new MaterialEnum('Iron',       +0,  0.8,   1);
  public static readonly SILVER     = new MaterialEnum('Silver',     +1,  1.3,   2, true);
  public static readonly STEEL      = new MaterialEnum('Steel',      +1,  1.0,   2);
  public static readonly DWEMER     = new MaterialEnum('Dwemer',     +2,  4.0,   3, true, +1);
  public static readonly MOONSTONE  = new MaterialEnum('Moonstone',  +2,  5.0,   3, true);
  public static readonly ORICHALCUM = new MaterialEnum('Orichalcum', +2,  3.0,   2);
  public static readonly ADAMANTIUM = new MaterialEnum('Adamantium', +3,  8.0,   4);
  public static readonly MALACHITE  = new MaterialEnum('Malachite',  +3,  7.0,   2, true);
  public static readonly STAHLRIM   = new MaterialEnum('Stahlrim',   +3, 12.0,   4, true);
  public static readonly DAEDRIC    = new MaterialEnum('Daedric',    +4, 15.0,   5, true, +1);
  public static readonly EBONY      = new MaterialEnum('Ebony',      +4, 10.0,   4, true, +1);
  public static readonly DRAGONBONE = new MaterialEnum('Dragonbone', +5, 30.0,   5, true, +1);
  
  constructor(
    name: string,
    readonly dmgMod: number,
    readonly priceMultiplier: number,
    readonly enchantLevel: number,
    readonly magic: boolean = false,
    readonly encumbrance: number = 0,
  ) {
    super(name);
  }
  
}