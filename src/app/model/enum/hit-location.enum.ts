import { RegisterPersistable } from "src/app/persistence/persistable";
import { WoundLocationProperty } from "../property/wound-location.property";
import { Enum } from "./enum";

@RegisterPersistable('936b230b-effe-4d1c-b1b3-30510a88a338')
export class HitLocationEnum extends Enum<HitLocationEnum> {
  
  public static readonly HEAD  = new HitLocationEnum('Head (0)', [0], WoundLocationProperty.HEAD);
  public static readonly BODY  = new HitLocationEnum('Body (1-5)', [1,2,3,4,5], WoundLocationProperty.BODY);
  public static readonly LEG_R = new HitLocationEnum('Right Leg (6)', [6], WoundLocationProperty.LEG_R);
  public static readonly LEG_L = new HitLocationEnum('Left Leg (7)', [7], WoundLocationProperty.LEG_L);
  public static readonly ARM_R = new HitLocationEnum('Right Arm (8)', [8], WoundLocationProperty.ARM_R);
  public static readonly ARM_L = new HitLocationEnum('Left Arm (9)', [9], WoundLocationProperty.ARM_L);
  
  private constructor(
    name: string,
    readonly hitRange: Array<number>,
    readonly asWoundLocation: WoundLocationProperty
  ) {
    super(name);
  }
  
  isHitBy(roll: number) {
    return this.hitRange.includes(roll % 10);
  }
  
  static getHitLocation(roll: number) {
    return <HitLocationEnum>this.values<HitLocationEnum>().find(hitLocation => hitLocation.isHitBy(roll));
  }
  
}