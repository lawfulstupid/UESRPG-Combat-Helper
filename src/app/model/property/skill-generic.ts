import { Characteristic } from "./characteristic";
import { TemplateRole } from "./property";
import { NumericalProperty } from "./property-number";

export abstract class GenericSkill extends NumericalProperty {
  
  readonly governingCharacteristics: Array<Characteristic>;
  
  protected constructor(key: string, name: string, governedBy: Array<Characteristic>) {
    super(key, name, TemplateRole.REFERENCE);
    this.governingCharacteristics = governedBy;
  }
  
}