import { Observable, of } from "rxjs";
import { Property } from "../property/property";
import { Character } from "./character";

export abstract class DataCharacter extends Character {
  
  private data: {[key: string]: any} = {};
  
  constructor(name: string, data = {}) {
    super(name);
    this.data = data;
  }
  
  // save data to the internal store
  writeData<T>(property: Property<T>, value: T) {
    this.data[property.key] = value;
  }
  
  // gets a copy of internal data
  getRawDataCopy(): {[key: string]: any} {
    return {...this.data};
  }
  
  getProperty<T>(property: Property<T>): Observable<T> {
    let value: T = this.data[property.key];
    if (value) {
      return of(value); // try to get value from internal data
    } else {
      return this.populate(property); // otherwise get it from elsewhere
    }
  }
  
  // gets a property from some external source
  protected abstract populate<T>(property: Property<T>): Observable<T>;
  
  hasProperty<T>(property: Property<T>): boolean {
    return this.data[property.key] !== undefined;
  }
  
}