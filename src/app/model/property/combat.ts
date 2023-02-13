import { SimplifiedWound, Wound } from "../combat/wound";
import { TemplateRole } from "./abstract/property";
import { ArrayProperty } from "./generic/array.property";
import { BooleanProperty } from "./generic/boolean.property";
import { NumericalProperty } from "./generic/number.property";
import { ObjectProperty } from "./generic/object.property";

export class CombatProperty {
  
  public static readonly STAMINA_SPENT = new BooleanProperty('staminaSpent', 'Stamina Spent', TemplateRole.NO_TEMPLATE, false);
  public static readonly ATTACKS_MADE = new NumericalProperty('attacksMade', 'Attacks Made', TemplateRole.NO_TEMPLATE, 0);
  public static readonly WOUNDS = new ArrayProperty<Wound>('wounds', 'Wounds', TemplateRole.NO_TEMPLATE, ObjectProperty, {simpleClass: SimplifiedWound});
  
}