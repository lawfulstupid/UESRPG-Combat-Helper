import { Identifier } from "../../identifier";
import { Property, TemplateRole } from "../abstract/property";

export class BooleanProperty extends Property<boolean> {
  
  serialise(value: boolean): string {
    return JSON.stringify(value);
  }
  
  deserialise(str: string): boolean {
    return JSON.parse(str);
  }
  
  constructor(key: string, name: string, templateRole: TemplateRole, defaultValue?: boolean) {
    super(key, name, templateRole, defaultValue);
  }
  
}