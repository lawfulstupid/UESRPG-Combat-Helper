import { Enum } from "./enum";

export class TestResultEnum extends Enum {
  
  public static readonly CRIT = new TestResultEnum(1);
  public static readonly PASS = new TestResultEnum(0);
  public static readonly FAIL = new TestResultEnum(-1);
  public static readonly CRIT_FAIL = new TestResultEnum(-2);
  
  constructor(
    readonly advantagesGained: number
  ) {
    super();
  }
  
  isPass() {
    return this.advantagesGained >= 0;
  }
  
  isFail() {
    return !this.isPass();
  }
  
}