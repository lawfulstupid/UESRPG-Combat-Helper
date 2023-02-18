import { Persistable } from "../../../persistence/persistable";
import { Persistence } from "../../../persistence/persistence";
import { Property, TemplateRole } from "../abstract/property";

export class ObjectProperty<T extends Persistable<T>> extends Property<T> {
  
  serialise(value: T): string {
    return Persistence.serialise(value);
  }
  
  deserialise(str: string): T {
    return <T>Persistence.deserialise(str);
  }
  
  constructor(key: string, name: string, templateRole: TemplateRole) {
    super(key, name, templateRole);
  }
  
}