import { Property } from "./property";

export class NumericalProperty extends Property<number> {
  
  serialise(value: number): string {
    return value.toString();
  }
  
  deserialise(str: string): number {
    return Number.parseInt(str);
  }
  
}