import { identity, Observable, of } from "rxjs";
import { Character } from "./character";
import { Property } from "./lookup/property";

export abstract class DataCharacter extends Character {
  
  private data: {[key: string]: any} = {};
  
  constructor(name: string, data = {}) {
    super(name);
    this.data = data;
  }
  
  // save data to the internal store
  writeData<T>(property: Property, value: T) {
    this.data[property.key] = value;
  }
  
  // gets a property
  getObject<T>(property: Property, castFn: (json: string) => T): Observable<T> {
    let value: T = this.data[property.key];
    if (value) {
      return of(value); // try to get value from internal data
    } else {
      return this.populate(property, castFn); // otherwise get it from elsewhere
    }
  }
  
  // gets a property from some external source
  protected abstract populate<T>(property: Property, castFn: (json: string) => T): Observable<T>;
  
  // gets a numerical property
  getStat(stat: Property): Observable<number> {
    return this.getObject(stat, Number.parseInt);
  }
  
  // gets a textual property
  getText(textId: Property): Observable<string> {
    return this.getObject(textId, identity);
  }
  
}