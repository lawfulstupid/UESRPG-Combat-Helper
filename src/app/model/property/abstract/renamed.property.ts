import { Property } from "./property";

export class RenamedProperty<T> extends Property<T> {
  
  serialise(value: T): string {
    return this.baseProperty.serialise(value);
  }
  
  deserialise(str: string): T {
    return this.baseProperty.deserialise(str);
  }
  
  constructor(private baseProperty: Property<T>, newName: string) {
    super(baseProperty.key, newName, baseProperty.templateRole, baseProperty.defaultValue);
  }
  
}