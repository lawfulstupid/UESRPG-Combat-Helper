import { Property, TemplateRole } from "../property";

export class AttributeEnum {

  public static readonly HP = new Property('hitPoints', 'Hit Points', TemplateRole.MAXIMUM);
  public static readonly WT = new Property('woundThreshold', 'Wound Threshold');
  public static readonly MP = new Property('magicka', 'Magicka Points', TemplateRole.MAXIMUM);
  public static readonly SP = new Property('stamina', 'Stamina Points', TemplateRole.MAXIMUM);
  public static readonly IR = new Property('initiative', 'Initiative Rating');
  public static readonly SPEED = new Property('speed', 'Speed');
  public static readonly SIZE = new Property('size', 'Size');

}