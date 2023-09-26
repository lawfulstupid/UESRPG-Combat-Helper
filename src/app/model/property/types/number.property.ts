import { identity } from "rxjs";
import { DummyProperty } from "../abstract/dummy.property";
import { Property } from "../abstract/property";
import * as math from "mathjs";

export class NumericalProperty extends Property<number> {
  
  readonly DELTA = new DummyProperty<number>(this.name + ' Change').derivedFrom(this, identity);
  
  serialise(value: number): string {
    return value.toString();
  }
  
  deserialise(str: string): number {
    const value: number = math.evaluate(str);
    if (value === null || value === undefined || Number.isNaN(value) || !math.isInteger(value)) {
      throw new Error('Unable to evaluate \'' + str + '\'');
    }
    return value;
  }
  
}