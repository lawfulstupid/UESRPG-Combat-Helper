import { HitLocationEnum } from "../../enum/hit-location.enum";
import { TemplateRole } from "../abstract/property";
import { Characteristic } from "../characteristic.property";
import { EnumProperty } from "../types/enum.property";
import { TextAreaProperty } from "../types/text-area.property";

export class MiscProperties {
  
  public static readonly NOTES = new TextAreaProperty('notes', 'Notes', TemplateRole.NO_TEMPLATE);
  public static readonly SHOCK_TEST = Characteristic.ENDURANCE.renamed('Shock Test');
  public static readonly HIT_LOCATION = new EnumProperty(HitLocationEnum, 'hitLocation', 'Hit Location', TemplateRole.TRANSIENT);
  
}