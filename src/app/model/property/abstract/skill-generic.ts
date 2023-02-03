import { Characteristic } from "../characteristic";
import { NumericalProperty } from "../generic/number.property";
import { TemplateRole } from "./property";

export abstract class GenericSkill extends NumericalProperty {
  
  readonly governingCharacteristics: Array<Characteristic>;
  
  protected constructor(key: string, name: string, governedBy: Array<Characteristic>) {
    super(key, name, TemplateRole.REFERENCE);
    this.governingCharacteristics = governedBy;
  }
  
}