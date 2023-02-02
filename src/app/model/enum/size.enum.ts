import { Enum } from "./enum";

export class SizeEnum extends Enum {
  
  public static readonly PUNY = new SizeEnum('Puny', -3);
  public static readonly TINY = new SizeEnum('Tiny', -2);
  public static readonly SMALL = new SizeEnum('Small', -1);
  public static readonly STANDARD = new SizeEnum('Standard', 0);
  public static readonly LARGE = new SizeEnum('Large', 1);
  public static readonly HUGE = new SizeEnum('Huge', 2);
  public static readonly MASSIVE = new SizeEnum('Massive', 3);
  
  private readonly name: string;
  private readonly rank: number;
  
  protected constructor(name: string, rank: number) {
    super();
    this.name = name;
    this.rank = rank;
  }
  
}