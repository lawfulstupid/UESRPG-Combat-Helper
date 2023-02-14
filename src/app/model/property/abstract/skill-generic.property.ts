import { Characteristic } from "../characteristic.property";
import { TemplateRole } from "./property";
import { Rollable } from "./rollable.property";

export abstract class GenericSkill extends Rollable {
  
  protected constructor(key: string, name: string, readonly governingCharacteristics: Array<Characteristic>) {
    super(key, name, TemplateRole.REFERENCE);
  }
  
}