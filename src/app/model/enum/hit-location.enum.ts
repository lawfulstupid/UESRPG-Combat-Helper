import { Enum } from "./enum";

export class HitLocationEnum extends Enum {
  
  public static readonly HEAD  = new HitLocationEnum('Head', [0]);
  public static readonly BODY  = new HitLocationEnum('Body', [1,2,3,4,5]);
  public static readonly LEG_R = new HitLocationEnum('Right Leg', [6]);
  public static readonly LEG_L = new HitLocationEnum('Left Leg', [7]);
  public static readonly ARM_R = new HitLocationEnum('Right Arm', [8]);
  public static readonly ARM_L = new HitLocationEnum('Left Arm', [9]);
  
  private constructor(
    name: string,
    readonly hitRange: Array<number>
  ) {
    super(HitLocationEnum, name);
  }
  
  isHitBy(roll: number) {
    return this.hitRange.includes(roll % 10);
  }
  
  static getHitLocation(roll: number) {
    return <HitLocationEnum>this.values<HitLocationEnum>().find(hitLocation => hitLocation.isHitBy(roll));
  }
  
}