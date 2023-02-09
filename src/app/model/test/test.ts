import { RandomUtil } from "src/app/util/random.util";
import { Character } from "../character/character";
import { BodyPartEnum } from "../enum/body-part.enum";
import { TestResultEnum } from "../enum/test-result.enum";
import { ThreatRatingEnum } from "../enum/threat-rating.enum";
import { NumericalProperty } from "../property/generic/number.property";

export class Test {
  
  readonly timestamp: Date;
  readonly roll: number;
  readonly result: TestResultEnum;
  readonly degreesOfSuccess: number;
  readonly bodyPartHit?: BodyPartEnum;
  
  constructor(
    readonly property: NumericalProperty,
    readonly target: number,
    readonly character: Character,
    readonly threatRating?: ThreatRatingEnum,
    readonly isAttack: boolean = false
  ) {
    this.timestamp = new Date();
    this.roll = RandomUtil.d100();
    this.target = target;
    this.result = this.determineResult(threatRating);
    this.degreesOfSuccess = this.result.isPass() ? Math.max(1, Math.floor(this.roll/10)) : 0;
    if (isAttack) {
      this.bodyPartHit = BodyPartEnum.getHitLocation(this.roll);
    }
  }
  
  determineResult(threatRating?: ThreatRatingEnum): TestResultEnum {
    if (threatRating !== undefined) {
      if (this.roll <= threatRating.critRange) {
        return TestResultEnum.CRIT;
      } else if (threatRating.critFailRange <= this.roll) {
        return TestResultEnum.CRIT_FAIL;
      }
    }
    return this.roll <= this.target ? TestResultEnum.PASS : TestResultEnum.FAIL;
  }
  
  rollDisplay(): string {
    return this.roll + '/' + this.target;
  }
  
  resultDisplay(): string {
    let str = '';
    str += this.result.name;
    if (this.result.isPass()) {
      str += ' with ' + this.degreesOfSuccess + ' DoS';
      if (this.bodyPartHit) {
        str += ' on ' + this.bodyPartHit.name;
      }
    }
    return str;
  }
  
}