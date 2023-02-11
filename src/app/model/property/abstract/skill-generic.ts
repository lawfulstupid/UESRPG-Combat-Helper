import { Characteristic } from "../characteristic";
import { TemplateRole } from "./property";
import { Rollable } from "./rollable";

export abstract class GenericSkill extends Rollable {
  
  readonly governingCharacteristics: Array<Characteristic>;
  
  protected constructor(key: string, name: string, governedBy: Array<Characteristic>) {
    super(key, name, TemplateRole.REFERENCE);
    this.governingCharacteristics = governedBy;
  }
  
}