import { ColorEnum } from "src/app/enum/color.enum";
import { Enum } from "./enum";

export class TestResultEnum extends Enum<TestResultEnum> {
  
  public static readonly CRIT = new TestResultEnum('Crit', ColorEnum.GREEN, 1);
  public static readonly PASS = new TestResultEnum('Pass', undefined, 0);
  public static readonly FAIL = new TestResultEnum('Fail', undefined, -1);
  public static readonly CRIT_FAIL = new TestResultEnum('Crit Fail', ColorEnum.RED, -2);
  
  private constructor(
    name: string,
    readonly color: ColorEnum | undefined,
    readonly advantagesGained: number
  ) {
    super(name);
  }
  
  isPass() {
    return this.advantagesGained >= 0;
  }
  
  isFail() {
    return !this.isPass();
  }
  
}