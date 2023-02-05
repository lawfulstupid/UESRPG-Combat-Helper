export class ThreatRatingEnum {
  
  public static readonly MINOR_SOLO      = new ThreatRatingEnum('Minor Solo',       0,  95);
  public static readonly MINOR_GROUP     = new ThreatRatingEnum('Minor Group',      1,  96);
  public static readonly MAJOR_SOLO      = new ThreatRatingEnum('Major Solo',       2,  97);
  public static readonly MAJOR_GROUP     = new ThreatRatingEnum('Major Group',      3,  98);
  public static readonly DEADLY_SOLO     = new ThreatRatingEnum('Deadly Solo',      4,  99);
  public static readonly DEADLY_GROUP    = new ThreatRatingEnum('Deadly Group',     5, 100);
  public static readonly LEGENDARY_SOLO  = new ThreatRatingEnum('Legendary Solo',   6, 101);
  public static readonly LEGENDARY_GROUP = new ThreatRatingEnum('Legendary Group', 10, 101);
  
  constructor(
    readonly name: string,
    readonly critRange: number,
    readonly critFailRange: number
  ) {}
  
}