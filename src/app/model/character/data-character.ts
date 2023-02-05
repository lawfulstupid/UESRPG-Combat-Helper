import { Observable, of, throwError } from "rxjs";
import { ValueRequestDialog } from "src/app/dialog/value-request/value-request.dialog";
import { Dictionary } from "src/app/util/dictionary.util";
import { LazyUtil, MaybeLazy } from "src/app/util/lazy.util";
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
  
  // Step 1: retrieves a property of the character from internal data
  getProperty<T>(property?: Property<T>, valueProducer?: ValueProducer<T>): Observable<T> {
    if (property === undefined) {
      return throwError(() => new Error('Undefined property'));
    } else if (this.data[property.key] !== undefined) {
      let value: T = property.deserialise(this.data[property.key]);
      return of(value); // try to get value from internal data
    } else {
      return this.populate(property, valueProducer); // otherwise get it from elsewhere
    }
  }
  
  // Tries to retrieve a value without creating a ValueRequest
  getPropertySilent<T>(property?: Property<T>): Observable<T> {
    return this.getProperty(property, () => throwError(() => new Error('No value available')));
  }
  
  // Step 2: If getProperty() failed to find a value internally, this determines how to go about finding a value externally
  abstract populate<T>(property: Property<T>, valueProducer?: ValueProducer<T>): Observable<T>;
  
  // Step 3: This produces the value from an external source
  produceValue<T>(property: Property<T>, valueProducer: ValueProducer<T> = this.defaultValueProducer(property)): Observable<T> {
    const strictValueProducer: T | Observable<T> = LazyUtil.resolve(valueProducer);
    if (strictValueProducer instanceof Observable) {
      return strictValueProducer;
    } else {
      return of(strictValueProducer);
    }
  }
  
  // Default method to produce values externally -- value request dialog
  private defaultValueProducer<T>(property: Property<T>): ValueProducer<T> {
    return () => ValueRequestDialog.requestValue(property, this);
  }
  
  hasProperty<T>(property?: Property<T>): boolean {
    if (property === undefined) return false;
    return this.data[property.key] !== undefined;
  }
  
}

export type Data = Dictionary<string>;
export type ValueProducer<T> = MaybeLazy<T | Observable<T>>;