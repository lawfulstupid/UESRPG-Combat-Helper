import { RandomUtil } from "src/app/util/random.util";
import { BodyPartEnum } from "../enum/body-part.enum";
import { TestResultEnum } from "../enum/test-result.enum";

export class Test {
  
  readonly roll: number;
  readonly target: number;
  readonly result: TestResultEnum;
  readonly degreesOfSuccess: number;
  readonly bodyPartHit?: BodyPartEnum;
  
  constructor(target: number, isAttack: boolean = false) {
    this.roll = RandomUtil.d100();
    this.target = target;
    this.result = this.roll <= this.target ? TestResultEnum.PASS : TestResultEnum.FAIL;
    this.degreesOfSuccess = this.result.isPass() ? Math.max(1, Math.floor(this.roll/10)) : 0;
    if (isAttack) {
      this.bodyPartHit = BodyPartEnum.getHitLocation(this.roll);
    }
  }
  
  display(): string {
    let str = '';
    str += this.result.name;
    str += ' (' + this.roll + '/' + this.target + ')';
    if (this.result.isPass()) {
      str += ' with ' + this.degreesOfSuccess + ' DoS';
      if (this.bodyPartHit) {
        str += ' on ' + this.bodyPartHit.name;
      }
    }
    return str;
  }
  
}