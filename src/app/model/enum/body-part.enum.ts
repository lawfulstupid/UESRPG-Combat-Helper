import { Enum } from "./enum";

export class BodyPartEnum extends Enum {
  
  public static readonly HEAD  = new BodyPartEnum('Head', [0]);
  public static readonly BODY  = new BodyPartEnum('Body', [1,2,3,4,5]);
  public static readonly LEG_R = new BodyPartEnum('Right Leg', [6]);
  public static readonly LEG_L = new BodyPartEnum('Left Leg', [7]);
  public static readonly ARM_R = new BodyPartEnum('Right Arm', [8]);
  public static readonly ARM_L = new BodyPartEnum('Left Arm', [9]);
  
  constructor(
    readonly name: string,
    readonly hitRange: Array<number>
  ) {
    super();
  }
  
  isHitBy(roll: number) {
    return this.hitRange.includes(roll % 10);
  }
  
  static getHitLocation(roll: number) {
    return this.values<BodyPartEnum>().find(bodyPart => bodyPart.isHitBy(roll));
  }
  
}