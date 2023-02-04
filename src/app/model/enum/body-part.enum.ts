import { Enum } from "./enum";

export class BodyPart extends Enum {
  
  public static readonly HEAD  = new BodyPart('Head', [0]);
  public static readonly BODY  = new BodyPart('Body', [1,2,3,4,5]);
  public static readonly LEG_R = new BodyPart('Right Leg', [6]);
  public static readonly LEG_L = new BodyPart('Left Leg', [7]);
  public static readonly ARM_R = new BodyPart('Right Arm', [8]);
  public static readonly ARM_L = new BodyPart('Left Arm', [9]);
  
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
    return this.values<BodyPart>().find(bodyPart => bodyPart.isHitBy(roll));
  }
  
}