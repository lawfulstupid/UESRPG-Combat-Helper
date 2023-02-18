import { Wound } from "../../combat/wound";
import { TemplateRole } from "../abstract/property";
import { ArrayProperty } from "../types/array.property";
import { BooleanProperty } from "../types/boolean.property";
import { NumericalProperty } from "../types/number.property";
import { ObjectProperty } from "../types/object.property";

export class CombatProperties {
  
  public static readonly STAMINA_SPENT = new BooleanProperty('staminaSpent', 'Stamina Spent', TemplateRole.NO_TEMPLATE, false);
  public static readonly ATTACKS_MADE = new NumericalProperty('attacksMade', 'Attacks Made', TemplateRole.NO_TEMPLATE, 0);
  public static readonly WOUNDS = new ArrayProperty<Wound>('wounds', 'Wounds', TemplateRole.NO_TEMPLATE, ObjectProperty);
  
}