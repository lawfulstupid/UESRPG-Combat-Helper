import { Enum } from "../enum/enum";
import { Property, TemplateRole } from "./property";

export class EnumProperty<T extends Enum> extends Property<T> {
  
  serialise(value: T): string {
    return Enum.key(value, this.clazz);
  }
  
  deserialise(key: string): T {
    return Enum.value(key, this.clazz);
  }
  
  constructor(key: string, name: string, private clazz: any, templateRole: TemplateRole) {
    super(key, name, templateRole);
  }
  
}