import { RandomUtil } from "src/app/util/random.util";
import { BodyPartEnum } from "../enum/body-part.enum";
import { TestResultEnum } from "../enum/test-result.enum";

export class Test {
  
  readonly roll: number;
  readonly target: number;
  readonly result: TestResultEnum;
  readonly degreesOfSuccess: number;
  readonly bodyPartHit: BodyPartEnum;
  
  constructor(target: number) {
    this.roll = RandomUtil.d100();
    this.target = target;
    this.result = this.roll <= this.target ? TestResultEnum.PASS : TestResultEnum.FAIL;
    this.degreesOfSuccess = this.result.isPass() ? Math.max(1, Math.floor(this.roll/10)) : 0;
    this.bodyPartHit = BodyPartEnum.getHitLocation(this.roll);
  }
  
}