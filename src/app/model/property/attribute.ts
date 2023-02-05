import { SizeEnum } from "../enum/size.enum";
import { ThreatRatingEnum } from "../enum/threat-rating.enum";
import { TemplateRole } from "./abstract/property";
import { EnumProperty } from "./generic/enum.property";
import { NumericalProperty } from "./generic/number.property";

export class Attribute extends NumericalProperty {
  
  public static readonly HP = new Attribute('hitPoints', 'Hit Points', TemplateRole.MAXIMUM);
  public static readonly WT = new Attribute('woundThreshold', 'Wound Threshold', TemplateRole.REFERENCE);
  public static readonly MP = new Attribute('magicka', 'Magicka Points', TemplateRole.MAXIMUM);
  public static readonly SP = new Attribute('stamina', 'Stamina Points', TemplateRole.MAXIMUM, 3);
  public static readonly IR = new Attribute('initiative', 'Initiative Rating', TemplateRole.REFERENCE);
  public static readonly AP = new Attribute('actionPoints', 'Action Points', TemplateRole.NO_TEMPLATE, 3);
  public static readonly SPEED = new Attribute('speed', 'Speed', TemplateRole.REFERENCE);
  public static readonly SIZE = new EnumProperty<SizeEnum>('size', 'Size', SizeEnum, TemplateRole.REFERENCE, SizeEnum.STANDARD);
  public static readonly THREAT_RATING = new EnumProperty<ThreatRatingEnum>('threatRating', 'Threat Rating', ThreatRatingEnum, TemplateRole.REFERENCE);
  
}