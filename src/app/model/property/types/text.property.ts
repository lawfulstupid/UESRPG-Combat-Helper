import { Property } from "../abstract/property";

export class TextProperty extends Property<string> {
  
  serialise(value: string): string {
    return value;
  }
  
  deserialise(str: string): string {
    return str;
  }
  
}