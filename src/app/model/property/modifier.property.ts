import { TemplateRole } from "./abstract/property";
import { Rollable } from "./abstract/rollable.property";
import { Attribute } from "./attribute.property";
import { CombatProperties } from "./collections/combat";
import { NumericalProperty } from "./types/number.property";

export class Modifier extends NumericalProperty {
  
  override DOMAIN = 'modifier';
  
  public static readonly MISC = new Modifier('miscModifier', 'Modifier');
  public static readonly FATIGUE = new Modifier('fatigue', 'Fatigue Penalty').derivedFrom(Attribute.SP, sp => Math.max(0, -10 * sp));
  public static readonly WOUND_PASSIVE = new Modifier('woundPassive', 'Wound Passive Penalty').derivedFrom(CombatProperties.WOUNDS, list => -20 * list.length);
  
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