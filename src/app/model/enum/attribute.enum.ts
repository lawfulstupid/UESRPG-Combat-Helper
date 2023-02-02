import { Property, TemplateRole } from "../property/property";

export class AttributeEnum {

  public static readonly HP = new Property<number>('hitPoints', 'Hit Points', TemplateRole.MAXIMUM);
  public static readonly WT = new Property<number>('woundThreshold', 'Wound Threshold');
  public static readonly MP = new Property<number>('magicka', 'Magicka Points', TemplateRole.MAXIMUM);
  public static readonly SP = new Property<number>('stamina', 'Stamina Points', TemplateRole.MAXIMUM);
  public static readonly IR = new Property<number>('initiative', 'Initiative Rating');
  public static readonly SPEED = new Property<number>('speed', 'Speed');
  public static readonly SIZE = new Property<string>('size', 'Size');

}