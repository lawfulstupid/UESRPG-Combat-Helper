import { Observable, of } from "rxjs";
import { Property } from "../property/abstract/property";
import { Character } from "./character";

export abstract class DataCharacter extends Character {
  
  private data: Data = {};
  
  protected constructor(name: string, data: Data = {}) {
    super(name);
    this.data = data;
  }
  
  // save data to the internal store
  writeData<T>(property: Property<T>, value: T) {
    this.data[property.key] = property.serialise(value);
  }
  
  // replace the internal data entirely - use with caution!
  replaceData(newData: Data) {
    this.data = {...newData};
  }
  
  // gets a copy of internal data
  getRawDataCopy(): Data {
    return {...this.data};
  }
  
  getProperty<T>(property: Property<T>): Observable<T> {
    if (this.data[property.key] !== undefined) {
      let value: T = property.deserialise(this.data[property.key]);
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

export type Data = {[key: string]: string};