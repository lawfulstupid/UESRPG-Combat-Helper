import { map, mergeMap, Observable } from "rxjs";
import { EventManager } from "src/app/service/event.manager";
import { RandomUtil } from "src/app/util/random.util";
import { Character } from "../character/character";
import { DataCharacter } from "../character/data-character";
import { HitLocationEnum } from "../enum/hit-location.enum";
import { TestResultEnum } from "../enum/test-result.enum";
import { ThreatRatingEnum } from "../enum/threat-rating.enum";
import { Rollable } from "../property/abstract/rollable";
import { Attribute } from "../property/attribute";

export class Test {
  
  readonly timestamp: Date;
  readonly roll: number;
  readonly result: TestResultEnum;
  readonly degreesOfSuccess: number;
  readonly hitLocation?: HitLocationEnum;
  
  private constructor(
    readonly property: Rollable,
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
      this.hitLocation = HitLocationEnum.getHitLocation(this.roll);
    }
    EventManager.diceRollEvent.emit(this);
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
      if (this.hitLocation) {
        str += ' on ' + this.hitLocation.name;
      }
    }
    return str;
  }
  
  static make(character: DataCharacter, property: Rollable, isAttack: boolean = false): Observable<Test> {
    return property.getTargetNumber(character).pipe(mergeMap(target => {
      return character.getProperty(Attribute.THREAT_RATING).pipe(map(threatRating => {
        return new Test(property, target, character, threatRating, isAttack);
      }));
    }));
  }
  
}