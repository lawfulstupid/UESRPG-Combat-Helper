import { TemplateRole } from "./abstract/property";
import { NumericalProperty } from "./generic/number.property";
import { TextualProperty } from "./generic/string.property";

export class NpcProperties {
  
  /* Misc properties to be held on the Npc and not the NpcTemplate */
  
  public static readonly MISC_MODIFIER = new NumericalProperty('miscModifier', 'Modifier', TemplateRole.NO_TEMPLATE);
  public static readonly NOTES = new TextualProperty('notes', 'Notes', TemplateRole.NO_TEMPLATE);
  
}