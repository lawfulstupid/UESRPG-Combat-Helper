import { HitLocationEnum } from "../enum/hit-location.enum";
import { TemplateRole } from "./abstract/property";
import { EnumProperty } from "./generic/enum.property";

export class TransientProperties {
  
  public static readonly HIT_LOCATION = new EnumProperty(HitLocationEnum, 'hitLocation', 'Hit Location', TemplateRole.TRANSIENT);
  
}