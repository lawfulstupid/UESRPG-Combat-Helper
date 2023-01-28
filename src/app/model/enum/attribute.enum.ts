import { Identifier } from "../identifier/identifier";

export class AttributeEnum {

  public static readonly HP = new Identifier('hitPoints', 'Hit Points');
  public static readonly WT = new Identifier('woundThreshold', 'Wound Threshold');
  public static readonly MP = new Identifier('magicka', 'Magicka Points');
  public static readonly SP = new Identifier('stamina', 'Stamina Points');
  public static readonly IR = new Identifier('initiative', 'Initiative Rating');
  public static readonly SPEED = new Identifier('speed', 'Speed');
  public static readonly SIZE = new Identifier('size', 'Size');

}