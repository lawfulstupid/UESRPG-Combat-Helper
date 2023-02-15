import { Property, TemplateRole } from "./property";

export class DummyProperty<T> extends Property<T> {
  
  constructor(name: string) {
    super('', name, TemplateRole.TRANSIENT);
  }
  
  override get key(): string {
    throw new Error('Dummy properties have no key');
  }
  
  serialise(value: T): string {
    throw new Error("Cannot serialise a dummy property");
  }
  
  deserialise(str: string): T {
    throw new Error("Cannot deserialise a dummy property");
  }
  
}