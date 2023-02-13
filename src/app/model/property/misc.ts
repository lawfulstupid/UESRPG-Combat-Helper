import { TemplateRole } from "./abstract/property";
import { Characteristic } from "./characteristic.property";
import { TextAreaProperty } from "./generic/text-area.property";

export class MiscProperties {
  
  /* Miscellaneous properties */
  
  public static readonly NOTES = new TextAreaProperty('notes', 'Notes', TemplateRole.NO_TEMPLATE);
  public static readonly SHOCK_TEST = Characteristic.ENDURANCE.renamed('Shock Test');
  
}