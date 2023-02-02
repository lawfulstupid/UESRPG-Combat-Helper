import { TemplateRole } from "../property/property";
import { NumericalProperty } from "../property/property-number";
import { TextualProperty } from "../property/property-string";

export class AttributeEnum {

  public static readonly HP = new NumericalProperty('hitPoints', 'Hit Points', TemplateRole.MAXIMUM);
  public static readonly WT = new NumericalProperty('woundThreshold', 'Wound Threshold');
  public static readonly MP = new NumericalProperty('magicka', 'Magicka Points', TemplateRole.MAXIMUM);
  public static readonly SP = new NumericalProperty('stamina', 'Stamina Points', TemplateRole.MAXIMUM);
  public static readonly IR = new NumericalProperty('initiative', 'Initiative Rating');
  public static readonly SPEED = new NumericalProperty('speed', 'Speed');
  public static readonly SIZE = new TextualProperty('size', 'Size');

}