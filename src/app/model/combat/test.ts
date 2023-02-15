import { forkJoin, map, Observable } from "rxjs";
import { EventManager } from "src/app/service/event.manager";
import { RandomUtil } from "src/app/util/random.util";
import { Character } from "../character/character";
import { DataCharacter, FetchMethod } from "../character/data-character";
import { Enum } from "../enum/enum";
import { HitLocationEnum } from "../enum/hit-location.enum";
import { TestResultEnum } from "../enum/test-result.enum";
import { ThreatRatingEnum } from "../enum/threat-rating.enum";
import { Rollable } from "../property/abstract/rollable.property";
import { Attribute } from "../property/attribute.property";
import { Modifier } from "../property/modifier.property";

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
  
  static make(character: DataCharacter, property: Rollable, options?: TestOptions): Observable<Test> {
    const fetchMethod = options?.required ? FetchMethod.REQUIRED : FetchMethod.DEFAULT;
    
    return forkJoin([
      character.get(Attribute.THREAT_RATING, fetchMethod),
      property.getTargetNumber(character, fetchMethod),
      Test.getModifier(character, property)
    ]).pipe(map(([threatRating, targetNumber, modifier]) => {
      return new Test(property, targetNumber + modifier, character, threatRating, options?.isAttack);
    }));
  }
  
  private static getModifier(character: DataCharacter, property: Rollable): Observable<number> {
    return forkJoin(
      Enum.values<Modifier>(Modifier)
        .filter(modifier => modifier.appliesTo(property)) // find all modifiers applicable to skill being tested
        .map(modifier => character.get(modifier)) // get modifier value from character
    ).pipe(map(modifierValues => {
      return modifierValues.reduce((x,y) => x+y, 0);      // sum values to get single modifier
    }));
  }
  
}

interface TestOptions {
  isAttack?: boolean;
  required?: boolean;
}