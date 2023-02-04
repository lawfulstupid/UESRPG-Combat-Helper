import { Enum } from "./enum";

export class TestResultEnum extends Enum {
  
  public static readonly CRIT = new TestResultEnum('Crit', 1);
  public static readonly PASS = new TestResultEnum('Pass', 0);
  public static readonly FAIL = new TestResultEnum('Fail', -1);
  public static readonly CRIT_FAIL = new TestResultEnum('Crit Fail', -2);
  
  constructor(
    readonly name: string,
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