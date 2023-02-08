import { TemplateRole } from "./abstract/property";
import { NumericalProperty } from "./generic/number.property";

export class Modifier extends NumericalProperty {
  
  public static readonly MISC = new Modifier('miscModifier', 'Modifier');
  
  constructor(key: string, name: string) {
    super(key, name, TemplateRole.NO_TEMPLATE, 0);
  }
  
}