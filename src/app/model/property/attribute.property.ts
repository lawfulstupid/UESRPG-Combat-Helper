import { SizeEnum } from "../enum/size.enum";
import { ThreatRatingEnum } from "../enum/threat-rating.enum";
import { TemplateRole } from "./abstract/property";
import { EnumProperty } from "./types/enum.property";
import { NumericalProperty } from "./types/number.property";

export class Attribute extends NumericalProperty {
  
  override DOMAIN = 'attribute';
  
  public static readonly HIT_POINTS = new Attribute('hitPoints', 'Hit Points', TemplateRole.MAXIMUM);
  public static readonly WOUND_THRESHOLD = new Attribute('woundThreshold', 'Wound Threshold', TemplateRole.REFERENCE);
  public static readonly MAGICKA = new Attribute('magicka', 'Magicka Points', TemplateRole.MAXIMUM);
  public static readonly STAMINA = new Attribute('stamina', 'Stamina Points', TemplateRole.MAXIMUM, 3);
  public static readonly INITIATIVE_RATING = new Attribute('initiative', 'Initiative Rating', TemplateRole.REFERENCE);
  public static readonly ACTION_POINTS = new Attribute('actionPoints', 'Action Points', TemplateRole.NO_TEMPLATE, 3);
  public static readonly SPEED = new Attribute('speed', 'Speed', TemplateRole.REFERENCE);
  public static readonly SIZE = new EnumProperty(SizeEnum, 'size', 'Size', TemplateRole.REFERENCE, SizeEnum.STANDARD);
  public static readonly THREAT_RATING = new EnumProperty(ThreatRatingEnum, 'threatRating', 'Threat Rating', TemplateRole.REFERENCE);
  
}