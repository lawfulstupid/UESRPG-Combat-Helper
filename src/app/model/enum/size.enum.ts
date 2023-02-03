import { Enum } from "./enum";

export class SizeEnum extends Enum {
  
  public static readonly PUNY = new SizeEnum('Puny', -3, 0);
  public static readonly TINY = new SizeEnum('Tiny', -2, 0);
  public static readonly SMALL = new SizeEnum('Small', -1, 1);
  public static readonly STANDARD = new SizeEnum('Standard', 0, 1);
  public static readonly LARGE = new SizeEnum('Large', 1, 2);
  public static readonly HUGE = new SizeEnum('Huge', 2, 3);
  public static readonly MASSIVE = new SizeEnum('Massive', 3, 4);
  
  readonly name: string;
  readonly rank: number;
  readonly width: number;
  
  protected constructor(name: string, rank: number, width: number) {
    super();
    this.name = name;
    this.rank = rank;
    this.width = width;
  }
  
  get display(): string {
    if (this === SizeEnum.STANDARD) {
      return '';
    } else {
      return ' (' + this.name + ')';
    }
  }
  
}