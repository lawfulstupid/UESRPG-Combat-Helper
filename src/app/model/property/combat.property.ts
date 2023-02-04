import { TemplateRole } from "./abstract/property";
import { BooleanProperty } from "./generic/boolean.property";
import { NumericalProperty } from "./generic/number.property";

export class CombatProperty {
  
  public static readonly STAMINA_SPENT = new BooleanProperty('staminaSpent', 'Stamina Spent', TemplateRole.NO_TEMPLATE, false);
  public static readonly ATTACKS_MADE = new NumericalProperty('attacksMade', 'Attacks Made', TemplateRole.NO_TEMPLATE, 0);
  public static readonly MISC_MODIFIER = new NumericalProperty('miscModifier', 'Modifier', TemplateRole.NO_TEMPLATE);
  
}