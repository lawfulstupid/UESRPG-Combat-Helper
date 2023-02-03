import { Property } from "../abstract/property";

export class NumericalProperty extends Property<number> {
  
  serialise(value: number): string {
    return value.toString();
  }
  
  deserialise(str: string): number {
    const value: number = Number.parseInt(str);
    if (value === null || value === undefined || Number.isNaN(value)) {
      throw new Error('Unable to convert \'' + str + '\' to number');
    }
    return value;
  }
  
}