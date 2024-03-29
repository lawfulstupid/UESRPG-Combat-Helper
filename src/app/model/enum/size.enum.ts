import { RegisterPersistable } from "src/app/persistence/persistable";
import { Enum } from "./enum";

@RegisterPersistable('b5450171-b17b-41b8-a490-a4b481bd0e2f')
export class SizeEnum extends Enum<SizeEnum> {
  
  public static readonly PUNY = new SizeEnum('Puny', -3, 0);
  public static readonly TINY = new SizeEnum('Tiny', -2, 0);
  public static readonly SMALL = new SizeEnum('Small', -1, 1);
  public static readonly STANDARD = new SizeEnum('Standard', 0, 1);
  public static readonly LARGE = new SizeEnum('Large', 1, 2);
  public static readonly HUGE = new SizeEnum('Huge', 2, 3);
  public static readonly MASSIVE = new SizeEnum('Massive', 3, 4);
  
  private constructor(
    name: string,
    readonly rank: number,
    readonly width: number
  ) {
    super(name, `${width}x${width}`);
  }
  
  get display(): string {
    if (this === SizeEnum.STANDARD) {
      return '';
    } else {
      return ' (' + this.name + ')';
    }
  }
  
}