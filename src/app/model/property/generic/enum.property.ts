import { AbstractType } from "@angular/core";
import { Enum } from "../../enum/enum";
import { Identifier } from "../../identifier";
import { Property, TemplateRole } from "../abstract/property";

export class EnumProperty<T extends Enum> extends Property<T> {
  
  readonly options: Array<Identifier>;
  
  constructor(private clazz: AbstractType<T>, key: string, name: string, templateRole: TemplateRole, defaultValue?: T) {
    super(key, name, templateRole, defaultValue);
    this.options = Enum.keys<T>(clazz).map(enumKey => {
      const enumValue = Enum.value<T>(enumKey, clazz);
      return new Identifier(enumKey, enumValue.name);
    });
  }
  
  serialise(value: T): string {
    return value.key();
  }
  
  deserialise(key: string): T {
    const value: T = Enum.value(key, this.clazz);
    if (value === undefined) {
      throw new Error('Key \'' + key + '\' does not exist on ' + this.clazz.name);
    }
    return value;
  }
  
}