import { TemplateRole } from "./abstract/property";
import { Rollable } from "./abstract/rollable";
import { NumericalProperty } from "./generic/number.property";

export class Modifier extends NumericalProperty {
  
  public static readonly MISC = new Modifier('miscModifier', 'Modifier');
  
  constructor(key: string, name: string, private applications: Array<Rollable> | 'all' = 'all') {
    super(key, name, TemplateRole.NO_TEMPLATE, 0);
  }
  
  appliesTo(skill: Rollable): boolean {
    if (this.applications === 'all') {
      return true;
    } else {
      return !!this.applications.find(applicable => applicable.key === skill.key);
    }
  }
  
}