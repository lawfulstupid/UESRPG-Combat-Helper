import { Identifier } from "../../identifier";
import { Property, TemplateRole } from "../abstract/property";

export class BooleanProperty extends Property<boolean> {
  
  private static readonly OPTIONS = [
    new Identifier('true', 'True'),
    new Identifier('false', 'False')
  ];
  
  serialise(value: boolean): string {
    return JSON.stringify(value);
  }
  
  deserialise(str: string): boolean {
    return JSON.parse(str);
  }
  
  constructor(key: string, name: string, templateRole: TemplateRole, defaultValue?: boolean) {
    super(key, name, templateRole, defaultValue, BooleanProperty.OPTIONS);
  }
  
}