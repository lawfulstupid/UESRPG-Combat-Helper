import { Enum } from "../../enum/enum";
import { Identifier } from "../../identifier";
import { Property, TemplateRole } from "../abstract/property";

export class EnumProperty<T extends Enum> extends Property<T> {
  
  serialise(value: T): string {
    return Enum.key(value, this.clazz);
  }
  
  deserialise(key: string): T {
    const value: T = Enum.value(key, this.clazz);
    if (value === undefined) {
      throw new Error('Key \'' + key + '\' does not exist on ' + this.clazz['name']);
    }
    return value;
  }
  
  constructor(key: string, name: string, private clazz: any, templateRole: TemplateRole, defaultValue?: T) {
    const options = Enum.keys(clazz).map(enumKey => {
      const enumValue = Enum.value<typeof clazz>(enumKey, clazz);
      return new Identifier(enumKey, enumValue.name);
    });
    super(key, name, templateRole, defaultValue, options);
  }
  
}